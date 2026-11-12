import type { Course } from "../types";

type NavProp = {
  savedCourse: Course[];
  toggle: boolean;
  toggleUi: () => void;
};

const LibraryHeader = ({ toggle, toggleUi, savedCourse }: NavProp) => {
  return (
    <header className="mb-6 flex items-end justify-between gap-5 max-[760px]:items-start max-[520px]:flex-col max-[520px]:items-stretch">
      <div>
        <h1 className="m-0 font-[Manrope,sans-serif] text-[27px] font-bold tracking-[-.8px] text-[#18251f] max-[760px]:text-2xl">Learning library</h1>
        <p className="mt-2 mb-0 text-[13px] leading-relaxed text-[#78857d]">Keep your courses and learning resources in one place.</p>
      </div>
      <div className="flex items-center gap-2.5 max-[520px]:justify-start">
        <span className="whitespace-nowrap text-xs text-[#78857d]">{savedCourse.length} saved</span>
        <button onClick={toggleUi} className="inline-flex min-h-[42px] items-center justify-center rounded-[10px] bg-[#2f704f] px-4 text-sm font-semibold text-white transition hover:bg-[#21573d] active:translate-y-px" type="button">
          {toggle ? "Close form" : "+ Add course"}
        </button>
      </div>
    </header>
  );
};

export default LibraryHeader;
