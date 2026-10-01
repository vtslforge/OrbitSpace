import { useState } from "react";
import type { SubmitEvent } from "react";
import type { AddBookmarkType, UseBookmarkType } from "./BookmarkTypes";
import { isRecord, useUserStorage } from "../../../shared/hooks/useUserStorage";

function isBookmarkList(value: unknown): value is AddBookmarkType[] {
  return Array.isArray(value) && value.every((bookmark) =>
    isRecord(bookmark) &&
    typeof bookmark.id === "string" &&
    typeof bookmark.title === "string" &&
    typeof bookmark.description === "string" &&
    typeof bookmark.isFavorite === "boolean" &&
    typeof bookmark.category === "string" &&
    typeof bookmark.url === "string",
  );
}

export function useBookmark(): UseBookmarkType {
  const [bookmarkInput, setBookmarkInput] = useState<AddBookmarkType>({
    id: "",
    title: "",
    description: "",
    isFavorite: false,
    category: "Website",
    url: "",
  });

  const [savedBookmarks, setSavedBookmarks] = useUserStorage("savedBookmarks", [], isBookmarkList);

  const handleBookmarkSave = (e?: SubmitEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const bookmarkInputID: AddBookmarkType = {
      ...bookmarkInput,
      id: crypto.randomUUID(),
    };

    setSavedBookmarks((prev) => [bookmarkInputID, ...prev]);
    setBookmarkInput({
      id: "",
      title: "",
      description: "",
      isFavorite: false,
      category: "Website",
      url: "",
    });
  };

  const toggleFavorite = (id: string) => {
    setSavedBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id
          ? { ...bookmark, isFavorite: !bookmark.isFavorite }
          : bookmark,
      ),
    );
  };

    function handleDelete(id: string) {
    setSavedBookmarks((prev) => prev.filter((task) => task.id !== id));
  }

  return {
    handleBookmarkSave,
    bookmarkInput,
    setBookmarkInput,
    savedBookmarks,
    toggleFavorite,
    handleDelete
  };
}
