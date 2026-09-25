import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import type { AddBookmarkType, UseBookmarkType } from "./BookmarkTypes";

export function useBookmark(): UseBookmarkType {
  const [bookmarkInput, setBookmarkInput] = useState<AddBookmarkType>({
    id: "",
    title: "",
    description: "",
    isFavorite: false,
    category: "Website",
    url: "",
  });

  const [savedBookmarks, setSavedBookmarks] = useState<AddBookmarkType[]>(
    () => {
      const savedBookmarks = localStorage.getItem("savedBookmarks");
      if (!savedBookmarks) {
        return [];
      }

      try {
        return JSON.parse(savedBookmarks);
      } catch {
        return [];
      }
    },
  );

  useEffect(() => {
    localStorage.setItem("savedBookmarks", JSON.stringify(savedBookmarks));
  }, [savedBookmarks]);

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
