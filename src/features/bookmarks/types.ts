import type { Dispatch, SetStateAction, SubmitEvent } from "react";

export type BookmarkCategory =
  | "Article"
  | "YouTube"
  | "Documentation"
  | "GitHub"
  | "Blog"
  | "Course"
  | "Website";

export type Bookmark = {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
  category: BookmarkCategory;
  url: string;
};

export type BookmarksOutletContext = {
  handleBookmarkSave: (event?: SubmitEvent<HTMLFormElement>) => void;
  bookmarkInput: Bookmark;
  setBookmarkInput: Dispatch<SetStateAction<Bookmark>>;
  savedBookmarks: Bookmark[];
  toggleFavorite: (id: string) => void;
  handleDelete: (id: string) => void;
};
