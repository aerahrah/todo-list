const AddProjectPopover = ({
  title,
  setTitle,
  handleCreateProject,
  Popover,
  Transition,
}) => {
  return (
    <Popover>
      <Popover.Button className="pl-12 font-bold text-lg mt-6 hover:bg-white text-left py-1 mx-auto rounded-md w-full">
        Add Project
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel>
          <div className="mt-2 bg-white p-4 rounded-md mx-1">
            <input
              className="outline-0"
              type="text"
              placeholder="Add project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mt-2 flex justify-between">
              <Popover.Button>cancel</Popover.Button>
              <Popover.Button onClick={handleCreateProject}>
                create
              </Popover.Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default AddProjectPopover;
