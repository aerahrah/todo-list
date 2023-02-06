const taskIDDOM = document.querySelector('.form-control-edit-id')
const taskNameDOM = document.querySelector('.form-control-edit-name')
const taskCompletedDOM = document.querySelector('.form-control-edit-completed')
const editFormDOM = document.querySelector('.card-single-task-form')
const editBtnDOM = document.querySelector('.edit-btn')
const textAlert = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id: taskID, completed, name } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    })

    const { _id: taskID, completed, name } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    textAlert.style.display = 'block'
    textAlert.textContent = `success, edited task`
    textAlert.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    textAlert.style.display = 'block'
    textAlert.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    textAlert.style.display = 'none'
    textAlert.classList.remove('text-success')
  }, 3000)
})
