import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import type { Book, BookSortField } from "../types";

const API_URL = (
  import.meta.env.LIVE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

interface BookGridProps {
  genreId: string;
  search: string;
  sortBy?: BookSortField;
  onClear: () => void;
}

export default function BookGrid({
  genreId,
  search,
  sortBy = "title",
  onClear,
}: BookGridProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (genreId) params.set("genreId", genreId);
    if (search) params.set("search", search);
    setStatus("loading");
    setError("");
    fetch(`${API_URL}/books${params.size ? `?${params}` : ""}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok)
          throw new Error(
            `The catalog returned an error (${response.status}).`,
          );
        return response.json();
      })
      .then((data: Book[]) => {
        setBooks(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (!(err instanceof Error && err.name === "AbortError")) {
          setError(
            err instanceof Error
              ? err.message || "Something went wrong."
              : "Something went wrong.",
          );
          setStatus("error");
        }
      });
    return () => controller.abort();
  }, [genreId, search, retryKey]);

  if (status === "loading")
    return (
      <div
        className="grid grid-cols-2 gap-[19px_12px] sm:grid-cols-3 sm:gap-[30px_18px] lg:grid-cols-4 lg:gap-[36px_22px]"
        aria-label="Loading books"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index}>
            <div className="aspect-[0.78] animate-[library-shimmer_1.4s_infinite] bg-[linear-gradient(110deg,#e6e4da_8%,#f0eee6_18%,#e6e4da_33%)] bg-[length:200%_100%]" />
            <div className="mt-[17px] h-[10px] w-[70%] bg-[#e7e5dc]" />
            <div className="mt-[9px] h-[10px] w-[45%] bg-[#e7e5dc]" />
          </div>
        ))}
      </div>
    );
  if (status === "error")
    return (
      <div className="max-w-[680px] px-0 py-[58px]">
        <span className="font-mono text-[12px] tracking-[1.4px] text-[#758077]">
          A SMALL PAUSE
        </span>
        <h3 className="my-[13px] font-serif text-[28px] font-medium">
          We couldn’t reach the shelves.
        </h3>
        <p className="text-[15px] leading-[1.7] text-[#777c73]">
          {error} Check your connection and try again.
        </p>
        <button
          className="mt-[15px] border border-library-line bg-transparent px-[15px] py-[11px] text-[15px] text-library-ink hover:bg-library-green hover:text-white"
          onClick={() => setRetryKey((key) => key + 1)}
        >
          Try again
        </button>
      </div>
    );
  if (!books.length)
    return (
      <div className="max-w-[680px] px-0 py-[58px]">
        <span className="font-mono text-[12px] tracking-[1.4px] text-[#758077]">
          NOT ON THIS SHELF
        </span>
        <h3 className="my-[13px] font-serif text-[28px] font-medium">
          No books found.
        </h3>
        <p className="text-[15px] leading-[1.7] text-[#777c73]">
          Try another title, author, or genre. Your next favorite is still out
          there.
        </p>
        <button
          className="mt-3 border-b border-library-green/60 pb-1 text-[15px] text-library-green"
          onClick={onClear}
        >
          Clear filters →
        </button>
      </div>
    );

  return (
    <>
      <div className="flex justify-between border-t border-library-line py-[14px] font-mono text-[11.5px] tracking-[1.4px] text-[#858b80]">
        <span>
          {books.length} {books.length === 1 ? "BOOK" : "BOOKS"} TO EXPLORE
        </span>
        <span className="hidden sm:inline">SHOWING YOUR NEXT CHAPTER ↓</span>
      </div>
      <div className="grid grid-cols-2 gap-[19px_12px] sm:grid-cols-3 sm:gap-[30px_18px] lg:grid-cols-4 lg:gap-[36px_22px]">
        {[...books]
          .sort((a, b) => (a[sortBy] || "").localeCompare(b[sortBy] || ""))
          .map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
      </div>
    </>
  );
}
