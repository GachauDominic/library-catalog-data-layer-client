import { useEffect, useState } from "react";
import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";
import type { BookSortField, Genre } from "../types";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

export default function HomePage() {
  const [genreId, setGenreId] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<BookSortField>("title");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreError, setGenreError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_URL}/genres`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load genres");
        return response.json();
      })
      .then((data: Genre[]) => setGenres(data))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError")
          setGenreError(error.message);
      });
    return () => controller.abort();
  }, []);

  return (
    <>
      <section className="relative grid min-h-0 grid-cols-1 items-center overflow-hidden border-b border-library-line py-[50px] lg:min-h-[493px] lg:grid-cols-2 lg:py-0">
        <div className="z-[1] py-0 lg:py-[55px] lg:pb-[68px]">
          <span className="flex items-center gap-2.5 font-mono text-[12px] tracking-[1.4px] text-[#758077]">
            <span className="h-px w-6 bg-library-orange" /> THE GOOD KIND OF
            GETTING LOST
          </span>
          <h1 className="my-[22px] font-serif text-[58px] leading-[1.02] -tracking-[3px] font-medium lg:my-[27px] lg:text-[77px]">
            Find your next
            <br />
            <em className="font-medium text-library-green">favorite</em> story.
          </h1>
          <p className="m-0 max-w-[390px] text-[15px] leading-[1.8] text-[#777c73]">
            Browse the shelves, follow a curiosity, and see where a good book
            takes you.
          </p>
        </div>
        <div
          className="relative flex h-[285px] items-center justify-center lg:h-[385px]"
          aria-hidden="true"
        >
          <div className="absolute left-[calc(50%-130px)] top-[20px] h-[260px] w-[260px] rounded-full bg-[#e7e4d9] dark:bg-[#303a32] lg:top-[47px]" />
          <div className="absolute h-[348px] w-[348px] rotate-[-27deg] rounded-full border border-[#d7d5ca] dark:border-[#3b473e]" />
          <div className="absolute h-[250px] w-[410px] rotate-[45deg] rounded-full border border-[#d7d5ca] dark:border-[#3b473e]" />
          <div className="relative flex h-[205px] rotate-[-7deg] items-center justify-center drop-shadow-[15px_20px_15px_rgba(38,50,45,0.125)]">
            <span className="relative mx-[1.5px] block h-[189px] w-[59px] border border-[#e9e3d6] bg-library-green after:absolute after:left-[38%] after:top-[33%] after:text-[18px] after:text-[#eee5d2] after:content-['✳']" />
            <span className="relative mx-[1.5px] block h-[204px] w-[69px] rotate-[7deg] border border-[#e9e3d6] bg-library-orange after:absolute after:left-[38%] after:top-[33%] after:text-[18px] after:text-[#eee5d2] after:content-['✳']" />
            <span className="relative mx-[1.5px] block h-[178px] w-[54px] rotate-[-5deg] border border-[#e9e3d6] bg-[#d8b982] after:absolute after:left-[38%] after:top-[33%] after:text-[18px] after:text-[#eee5d2] after:content-['✳']" />
            <span className="relative mx-[1.5px] block h-[198px] w-[64px] rotate-[9deg] border border-[#e9e3d6] bg-[#697d78] after:absolute after:left-[38%] after:top-[33%] after:text-[18px] after:text-[#eee5d2] after:content-['✳']" />
          </div>
          <div className="absolute bottom-[23px] right-[2%] font-serif text-[16px] italic leading-[1.5] text-[#70796e] dark:text-[#b4bdb2]">
            A world between
            <br />
            the covers.
          </div>
          <span className="absolute left-[17%] top-[80px] text-[23px] text-library-orange">
            ✳
          </span>
          <span className="absolute right-[8%] top-[105px] text-[23px] text-[#bba771]">
            ✦
          </span>
        </div>
        <div className="absolute bottom-2 left-0 flex items-center gap-2.5 font-mono text-[10px] text-[#858b80] lg:bottom-[25px]">
          01 <span className="h-px w-10 bg-[#c5c5b8]" /> 04
        </div>
      </section>
      <section
        className="px-0 py-[57px] sm:py-[76px] sm:pb-[95px]"
        aria-labelledby="catalog-heading"
      >
        <div className="mb-[31px] flex items-start justify-between sm:items-end">
          <div>
            <span className="flex items-center gap-2.5 font-mono text-[12px] tracking-[1.4px] text-[#758077]">
              A SHELF FOR EVERY MOOD
            </span>
            <h2
              id="catalog-heading"
              className="mt-[11px] font-serif text-[36px] leading-[1.1] -tracking-[1.5px] sm:text-[49px]"
            >
              The catalog<span className="text-library-orange">.</span>
            </h2>
          </div>
          <span className="text-right font-serif text-[12px] italic leading-[1.65] text-[#86897f] sm:text-[14px] sm:text-left">
            Take your time.
            <br />
            There’s no wrong turn.
          </span>
        </div>
        <div className="mb-[22px] flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <SearchBar onSearch={setSearch} />
          <label className="relative h-[54px] min-w-0 border border-library-line bg-[#faf9f5] px-[35px] py-[7px] pl-[14px] dark:bg-[#222a24] sm:min-w-[200px]">
            <span className="block font-mono text-[11px] tracking-[1.4px] text-[#92958c]">
              EXPLORE BY
            </span>
            <select
              className="w-full appearance-none border-0 bg-transparent pt-0.5 text-[15px] text-library-ink outline-0"
              value={genreId}
              onChange={(event) => setGenreId(event.target.value)}
              aria-label="Filter by genre"
            >
              <option value="">All genres</option>
              {genres.map((genre) => (
                <option value={genre.id} key={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <span className="absolute bottom-[11px] right-[14px] text-[#777]">
              ⌄
            </span>
          </label>
        </div>
        {genreError && (
          <p className="my-2 text-[15px] text-[#8b695a]">
            Genre filters are unavailable right now. You can still browse all
            books.
          </p>
        )}
        <div className="mb-3 mt-[-4px] flex items-center justify-between font-mono text-[9px] tracking-[1px] text-[#858b80]">
          <span>ORDER THE SHELVES</span>
          <label className="flex items-center gap-2 font-sans text-[15px] tracking-normal">
            Sort by{" "}
            <select
              className="border-0 bg-transparent text-[15px] text-library-ink"
              value={sortBy}
              onChange={(event) => {
                const value = event.currentTarget.value;
                if (value === "title" || value === "author") setSortBy(value);
              }}
              aria-label="Sort books"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </label>
        </div>
        <BookGrid
          genreId={genreId}
          search={search}
          sortBy={sortBy}
          onClear={() => {
            setSearch("");
            setGenreId("");
          }}
        />
      </section>
    </>
  );
}
