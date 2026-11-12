import type { ToggleFormProps } from "../types";


const TasksHeader = ({ toggleForm }: ToggleFormProps) => {
  return (
    <header className="mb-[23px] flex items-end justify-between gap-5 max-[760px]:items-start max-[520px]:gap-3">
      <div>
        <h1 className="m-0 font-[Manrope,sans-serif] text-[27px] font-bold tracking-[-.8px] text-[#18251f] max-[760px]:text-2xl">Tasks</h1>
        <p className="mt-2 mb-0 text-[13px] leading-relaxed text-[#78857d]">Plan your next steps and keep the important work visible.</p>
      </div>
      <button
        onClick={toggleForm}
        type="button"
        className="inline-flex min-h-[42px] items-center justify-center rounded-[10px] bg-[#2f704f] px-4 text-sm font-semibold text-white transition hover:bg-[#21573d] active:translate-y-px max-[520px]:shrink-0"
      >
        {"New task"}
      </button>
    </header>
  );
};

export default TasksHeader;
