import type { FilterValue } from "../types";

type FilterUiProps = {
  filter: FilterValue;
  filters: FilterValue[];
  handleFilter: (filterValue: FilterValue) => void;
};

export const FilterUi = ({ filter, handleFilter, filters }: FilterUiProps) => {
  return (
    <div className="flex min-h-[52px] items-center gap-[14px] rounded-[13px] border border-[#e4e9e2] bg-white/[.85] px-3 py-2 max-[760px]:items-start max-[760px]:flex-col max-[760px]:gap-1.5 max-[760px]:py-[9px]">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Show</span>
      <div className="flex gap-1 max-[520px]:w-full" role="group" aria-label="Filter tasks">

        {filters.map((filterValue) => (
          <button
            key={filterValue}
            type="button"
            onClick={() => handleFilter(filterValue)}
            aria-pressed={filter === filterValue}
            className={`min-h-8 rounded-[7px] border px-[10px] text-xs font-semibold transition-colors max-[520px]:flex-1 ${filter === filterValue ? "border-[#d8e6dd] bg-[#e8f1e8] text-[#20533f]" : "border-transparent bg-transparent text-[#6c7972] hover:bg-[#f0f4f0]"}`}
          >
            {filterValue}
          </button>
        ))}
      </div>
    </div>
  );
};
