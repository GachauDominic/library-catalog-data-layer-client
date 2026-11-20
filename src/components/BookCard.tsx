import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Book } from "../types";

const colors = [
  "#d9a27e",
  "#8ca3a0",
  "#c9b77e",
  "#a58c9d",
  "#bd806c",
  "#78909b",
];

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const color = colors[(book.title?.charCodeAt(0) || 0) % colors.length];
  const coverStyle: CSSProperties = { backgroundColor: color };
  return (
    <article>
      <Link
        to={`/books/${book.id}`}
        className="group relative block overflow-hidden no-underline"
        aria-label={`View ${book.title}`}
      >
        <div
          className="relative flex aspect-[0.78] flex-col overflow-hidden px-3 py-[14px] text-[#f4eddf] shadow-[inset_6px_0_9px_rgba(25,39,27,0.145),inset_-1px_0_rgba(255,255,255,0.33)] sm:px-[18px] sm:py-[20px]"
          style={coverStyle}
        >
          <span className="absolute inset-[10px] border border-[#f4eddf]/30" />
          <span className="relative z-[1] font-mono text-[10px] tracking-[0.5px] opacity-80 sm:text-[11px]">
            {book.genre?.name || "FROM THE COLLECTION"}
          </span>
          <span className="relative z-[1] mt-auto mb-[9px] font-serif text-[16px] leading-[1.08] font-medium sm:text-[29px]">
            {book.title}
          </span>
          <span className="mb-[9px] h-px w-[25px] bg-[#eee4d1]" />
          <span className="max-w-[85%] text-[11px] leading-[1.5] tracking-[0.5px] opacity-90 sm:text-[11px]">
            {book.author}
          </span>
          <span className="absolute bottom-[13px] right-3 grid h-[22px] w-[22px] place-items-center rounded-full border border-[#eee4d1]/60 font-serif text-[12px] italic sm:bottom-[19px] sm:right-[19px]">
            S
          </span>
        </div>
        <span className="absolute inset-x-0 bottom-0 flex justify-between bg-[#26322de8] px-[15px] py-[13px] font-mono text-[11px] tracking-[0.5px] text-library-paper transition-transform duration-200 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0">
          VIEW BOOK <span aria-hidden="true">↗</span>
        </span>
      </Link>
      <div className="flex justify-between gap-2.5 px-0 py-[13px]">
        <div>
          <span className="font-mono text-[11px] tracking-[0.8px] text-[#9a7b5b] dark:text-[#d4aa83]">
            {book.genre?.name || "THE COLLECTION"}
          </span>
          <h3 className="my-[5px] font-serif text-[15px] font-medium leading-[1.3] sm:text-[17px]">
            <Link
              className="text-library-ink no-underline"
              to={`/books/${book.id}`}
            >
              {book.title}
            </Link>
          </h3>
          <p className="m-0 text-[13px] text-[#777c73] dark:text-[#b4bdb2]">
            {book.author}
          </p>
        </div>
        <Link
          className="grid h-[27px] w-[27px] flex-none place-items-center border border-library-line text-library-ink no-underline transition-colors hover:bg-library-green hover:text-white"
          to={`/books/${book.id}`}
          aria-label={`View ${book.title}`}
        >
          ↗
        </Link>
      </div>
    </article>
  );
}
