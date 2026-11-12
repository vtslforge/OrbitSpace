import type { Course } from "../types";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type ContinueLearningProps = {
  currentWatch: Course[] | undefined;
  handleCurrentNavAndValue: (course: Course) => void;
};

const ContinueLearning = ({ currentWatch, handleCurrentNavAndValue }: ContinueLearningProps) => {
  return (
    <section className="min-w-0 rounded-[18px] border border-[#e4e9e2] bg-white/[.88] p-5 shadow-[0_6px_20px_rgb(36_57_42_/_3%)] max-[520px]:p-4">
      <div className="mb-[17px] flex items-center justify-between gap-[14px]">
        <div>
          <h2 className="m-0 font-[Manrope,sans-serif] text-sm font-bold tracking-[-.2px] text-[#18251f]">Continue learning</h2>
          <p className="mt-1 mb-0 text-[11px] text-[#78857d]">Pick up where you left off</p>
        </div>
        <Link className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold text-[#3a7557] no-underline hover:underline" to="/library">Library <ArrowRight size={13} aria-hidden="true" /></Link>
      </div>

        {currentWatch?.length ? (
          <div>
            {currentWatch.map((watch) => (
              <div
                key={watch.id ?? watch.url}
                className="flex items-center justify-between gap-4 rounded-[13px] border border-[#e9eee7] bg-[#fbfcfa] p-[14px] max-[520px]:items-start max-[520px]:flex-col"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-gray-400">{watch.category} · {watch.difficulty}</p>
                  <h3 className="mt-1 truncate text-sm font-semibold text-gray-900">{watch.title}</h3>
                  {watch.description && <p className="mt-1 line-clamp-1 text-sm text-gray-500">{watch.description}</p>}
                </div>
                  <button
                    onClick={() => handleCurrentNavAndValue(watch)}
                    className="min-h-[38px] shrink-0 rounded-[9px] border border-[#e4e9e2] bg-white px-3 text-[13px] font-semibold text-[#47544f] transition hover:border-[#c6d1ca] hover:bg-[#f8faf8]"
                  >
                    Resume
                  </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid min-h-[220px] content-center justify-items-center rounded-[14px] border border-dashed border-[#d9e3d8] bg-[#fbfcfa] p-8 text-center"><p className="text-sm text-gray-500">Open a course from your library and it will be ready here.</p></div>
        )}
    </section>
  );
};

export default ContinueLearning;
