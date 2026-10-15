export default function Header({ onAddTask }) {
  return (
    <header className="h-20 w-full text-text p-control shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <p className="font-bold "> Task Planner </p>
        {/* <p>Here's what happenning with your task today!</p> */}
      </div>
      <button
        onClick={onAddTask}
        className="bg-primary px-control md:py-1 hover:bg-primary-hover sm:text-small  cursor-pointer rounded-full text-white font-semibold"
      >
        + Add Task
      </button>
    </header>
  );
}
