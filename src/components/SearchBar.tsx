import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
  delay?: number;
}

export default function SearchBar({ onSearch, delay = 350 }: SearchBarProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => onSearch(value.trim()), delay);
    return () => clearTimeout(timeout);
  }, [value, delay, onSearch]);

  return (
    <label className="flex h-[54px] w-full max-w-[530px] items-center gap-3 border border-library-line bg-[#faf9f5] px-[15px] dark:bg-[#222a24]">
      <span
        className="-rotate-20 text-[24px] text-[#737a70]"
        aria-hidden="true"
      >
        ⌕
      </span>
      <span className="sr-only">Search title or author</span>
      <input
        className="w-full border-0 bg-transparent text-[15px] text-library-ink outline-0 placeholder:text-[#92958c]"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by title or author..."
      />
      <kbd className="border border-[#e1dfd5] px-1.5 py-[3px] font-mono text-[10px] text-[#898d84]">
        ↵
      </kbd>
    </label>
  );
}
