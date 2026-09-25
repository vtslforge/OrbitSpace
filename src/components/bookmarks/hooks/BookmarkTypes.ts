import type { Dispatch, SubmitEvent, SetStateAction } from "react";

export type BookmarkType =
  | "Article"
  | "YouTube"
  | "Documentation"
  | "GitHub"
  | "Blog"
  | "Course"
  | "Website";

export type AddBookmarkType = {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
  category: BookmarkType;
  url: string;
};

export type UseBookmarkType = {
  handleBookmarkSave: (e?: SubmitEvent<HTMLFormElement>) => void;
  bookmarkInput: AddBookmarkType;
  setBookmarkInput: Dispatch<SetStateAction<AddBookmarkType>>;
  savedBookmarks: AddBookmarkType[];
  toggleFavorite: (id: string) => void;
  handleDelete: (id: string) => void;
};
