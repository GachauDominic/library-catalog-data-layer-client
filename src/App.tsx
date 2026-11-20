import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetail from "./pages/BookDetail";

export default function App() {
  const [isDark, setIsDark] = useState(
    () => window.localStorage.getItem("stacks-theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    window.localStorage.setItem("stacks-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="mx-auto max-w-[1600px] px-[21px] sm:px-[5%] xl:px-[7.4%] text-library-ink">
      <header className="flex h-[70px] items-center justify-between border-b border-library-line sm:h-[86px]">
        <Link
          className="flex items-center gap-2.5 text-[21px] font-bold -tracking-[1px] text-library-ink no-underline"
          to="/"
          aria-label="Stacks home"
        >
          <span className="grid h-[29px] w-[29px] place-items-center bg-library-green font-serif text-[18px] italic text-library-paper">
            S
          </span>
          <span>
            stacks<span className="text-library-orange">.</span>
          </span>
        </Link>
        <span className="hidden font-mono text-[11px] tracking-[1.4px] text-[#899087] md:block">
          YOUR NEIGHBORHOOD LIBRARY
        </span>
        <Link
          className="text-[14px] text-library-ink no-underline sm:text-[12px]"
          to="/"
        >
          Browse catalog{" "}
          <span className="ml-2 text-library-orange" aria-hidden="true">
            ↗
          </span>
        </Link>
        <button
          className="inline-flex items-center gap-2 border border-library-line bg-transparent px-2.5 py-2 font-sans text-[12px] text-library-ink hover:bg-library-line sm:px-2.5"
          type="button"
          onClick={() => setIsDark((current) => !current)}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          aria-pressed={isDark}
        >
          <span aria-hidden="true">{isDark ? "\u2600" : "\u263e"}</span>{" "}
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="flex h-[68px] items-center justify-between border-t border-library-line font-mono text-[11px] tracking-[1.4px] text-[#858b80] sm:h-[76px]">
        <span>STORIES LIVE HERE.</span>
        <span className="font-sans tracking-normal">
          Made for curious minds <span className="text-library-orange">✳</span>
        </span>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <section className="max-w-[680px] px-0 py-[75px] sm:py-[100px]">
      <span className="flex items-center gap-2.5 font-mono text-[12px] tracking-[1.4px] text-[#758077]">
        404 · PAGE NOT FOUND
      </span>
      <h1 className="my-[27px] font-serif text-[42px] leading-[1.02] -tracking-[3px] sm:text-[54px]">
        This page wandered off.
      </h1>
      <Link
        className="mt-3 inline-block border-b border-library-green/60 pb-1 text-[15px] text-library-green no-underline"
        to="/"
      >
        Back to the catalog →
      </Link>
    </section>
  );
}
