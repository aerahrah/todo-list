const loadText = document.querySelector('.loading-text')
const alertText = document.querySelector('.form-alert')
const tasksDOM = document.querySelector('.tasks')
const formDOM = document.querySelector('.card-task-form')
const taskInputDOM = document.querySelector('.form-task-input')

const displayTask = async () =>{
    loadText.style.visibility = "visible"
    try {
        const{
            data: { tasks },
        } = await axios.get('/api/v1/tasks')
        if (tasks.length < 1){
            tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
            loadText.style.visibility = "hidden"
            return
        }
        const allTasks = tasks.map((task) =>{
            let circle =""

            const {completed, _id: taskID, name} = task 
            if(completed && 'task-completed'){
                circle = "fa-check-circle"
            }else{
                circle = "fa-circle"
            }

            return `<div class="tasks-single ${completed && 'task-completed'}">
            <h5><span><i class="far ${circle}"></i></span>${name}</h5>
            <div class="task-links">
                
            <!-- edit link -->
            <a href="task.html?id=${taskID}"  class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>`
        }).join('')
        tasksDOM.innerHTML = allTasks
    } catch(error){
        tasksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadText.style.visibility = 'hidden'
}

displayTask()

tasksDOM.addEventListener("click", async(e) => {
    const el = e.target
    if(el.parentElement.classList.contains('delete-btn')){
        loadText.style.visibility="visible"
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`/api/v1/tasks/${id}`)
            displayTask()
        } catch (error) {
            console.log(error)
        }
    }
    loadText.style.visibility='hidden'
})

formDOM.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const name = taskInputDOM.value
    try {
        await axios.post('/api/v1/tasks', {name})
        displayTask()
        taskInputDOM.value = ""
        alertText.style.display = "block"
        alertText.textContent = "success, task added"
        alertText.classList.add('text-success')
    } catch (error) {
        alertText.style.display = "block"
        alertText.innerHTML ='error, please try again'
    }
    setTimeout(()=>{
        alertText.style.display = "none"
        alertText.classList.remove('text-success')
    }, 3000)
})