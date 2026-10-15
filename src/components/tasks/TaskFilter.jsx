export default function TaskFilter({
  activeFilter,
  onFilterChange,
  sortOrder,
  onSortChange,
}) {
  const filters = ["All", "Pending", "Completed", "Overdue"];

  return (
    <div className="w-full flex p-control">
      <div className="flex flex-1 gap-control">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`border-2 cursor-pointer px-control py-1 rounded-full w-25 ${
              activeFilter === filter
                ? "bg-primary text-surface border-primary"
                : "bg-background border-primary hover:bg-primary hover:text-surface"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="border-2 border-primary-hover px-control outline-none py-1 rounded-full"
      >
        <option value="none">Sort by Priority</option>
        <option value="high-low">High → Medium → Low</option>
        <option value="low-high">Low → Medium → High</option>
      </select>
    </div>
  );
}