import { useEffect, useState } from 'react'

interface SearchBarProps {
  onSearch: (value: string) => void
  delay?: number
}

export default function SearchBar({ onSearch, delay = 350 }: SearchBarProps) {
  const [value, setValue] = useState('')
  useEffect(() => {
    const timeout = setTimeout(() => onSearch(value.trim()), delay)
    return () => clearTimeout(timeout)
  }, [value, delay, onSearch])

  return <label className="search-box"><span className="search-icon" aria-hidden="true">⌕</span><span className="sr-only">Search title or author</span><input type="search" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Search by title or author..." /><kbd>↵</kbd></label>
}
