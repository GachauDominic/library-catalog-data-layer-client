import { Link } from "react-router-dom";
import { useReadingList } from "../context/ReadingListContext";

export default function Navbar({ isDark, onToggleTheme }) {
  const { readingList } = useReadingList();

  return (
    <header className="flex h-[70px] items-center justify-between border-b border-library-line sm:h-[86px]">
      <Link
        className="flex items-center gap-2.5 text-[21px] font-bold -tracking-[1px] text-library-ink no-underline"
        to="/"
        aria-label="Stacks home"
      >
        <span className="grid h-[29px] w-[29px] place-items-center bg-library-green font-serif text-[18px] italic text-library-paper">S</span>
        <span>stacks<span className="text-library-orange">.</span></span>
      </Link>
      <nav className="flex items-center gap-3 text-[14px]">
        <Link className="text-library-ink no-underline" to="/">Browse</Link>
        <Link className="text-library-ink no-underline" to="/bookings">Bookings</Link>
        <Link className="text-library-ink no-underline" to="/reading-list">
          Reading list ({readingList.length})
        </Link>
      </nav>
      <button
        className="inline-flex items-center gap-2 border border-library-line bg-transparent px-2.5 py-2 text-[12px] text-library-ink"
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    </header>
  );
}
