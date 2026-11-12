import type { Bookmark } from "../types";
import { ArrowUpRight, Star } from "lucide-react";

type Props = {
  savedBookmarks: Bookmark[];
  toggleFavorite: (id: string) => void;
  handleDelete: (id: string) => void;
};

const BookmarkGrid = ({
  savedBookmarks,
  toggleFavorite,
  handleDelete,
}: Props) => {
  return (
    <div className="grid grid-cols-3 gap-3.5 max-[1100px]:grid-cols-2 max-[760px]:grid-cols-2 max-[520px]:grid-cols-1">
        {savedBookmarks.map((savedBookmarklist) => (
          <div
            className="flex min-h-53.75 flex-col justify-between rounded-[15px] border border-[#e5ebe3] bg-white p-4.5 shadow-[0_4px_15px_rgb(36_57_42/3%)] transition hover:-translate-y-0.5 hover:border-[#cbd8d0] hover:shadow-[0_10px_28px_rgb(32_55_43/6%)]"
            key={savedBookmarklist.id}
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="line-clamp-2 text-base font-semibold text-gray-900">
                  {savedBookmarklist.title}
                </h2>
                <span className="rounded-full bg-[#f0f3f1] px-2.25 py-1.5 text-[11px] font-bold text-[#52635a]">{savedBookmarklist.category}</span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                {savedBookmarklist.description}
              </p>
            </div>

            <div className="flex items-center justify-start gap-2 border-t border-[#edf1ed] pt-3.25">
              <a
                href={savedBookmarklist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10.5 items-center justify-center gap-1.5 rounded-[10px] bg-[#2f704f] px-4 text-sm font-semibold text-white no-underline transition hover:bg-[#21573d]"
              >
                Open <ArrowUpRight size={14} aria-hidden="true" />
              </a>

              <button
                type="button"
                aria-pressed={savedBookmarklist.isFavorite}
                aria-label={savedBookmarklist.isFavorite ? "Remove from favorites" : "Add to favorites"}
                title={savedBookmarklist.isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={() => toggleFavorite(savedBookmarklist.id)}
                className={`grid size-9 flex-none place-items-center rounded-lg border ${savedBookmarklist.isFavorite ? "border-[#d6e8ce] bg-[#eff7e9] text-[#53783e]" : "border-[#e4e9e2] bg-white text-[#66736c]"} `}
              >
                <Star size={16} fill={savedBookmarklist.isFavorite ? "currentColor" : "none"} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(savedBookmarklist.id)}
                className="min-h-9.5 rounded-[9px] border border-[#e4e9e2] bg-white px-3 text-[13px] font-semibold text-[#47544f] transition hover:border-[#c6d1ca] hover:bg-[#f8faf8]"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookmarkGrid;
