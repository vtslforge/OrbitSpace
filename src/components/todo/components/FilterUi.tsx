import type { FilterValue } from "../taskTypes";

type FilterUiProps = {
  filter: FilterValue;
  filters: FilterValue[];
  handleFilter: (filterValue: FilterValue) => void;
};

export const FilterUi = ({ filter, handleFilter, filters }: FilterUiProps) => {
  return (
    <div className="task-filter-bar">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Show</span>
      <div className="task-filter-options" role="group" aria-label="Filter tasks">

        {filters.map((filterValue) => (
          <button
            key={filterValue}
            type="button"
            onClick={() => handleFilter(filterValue)}
            aria-pressed={filter === filterValue}
            className={`task-filter-option ${
              filter === filterValue
                ? "selected"
                : ""
            }`}
          >
            {filterValue}
          </button>
        ))}
      </div>
    </div>
  );
};
