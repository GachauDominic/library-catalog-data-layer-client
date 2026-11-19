import { useEffect, useState } from 'react'
import BookGrid from '../components/BookGrid'
import SearchBar from '../components/SearchBar'
import type { BookSortField, Genre } from '../types'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

export default function HomePage() {
  const [genreId, setGenreId] = useState('')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<BookSortField>('title')
  const [genres, setGenres] = useState<Genre[]>([])
  const [genreError, setGenreError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_URL}/genres`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('Could not load genres'); return response.json() })
      .then((data: Genre[]) => setGenres(data))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') setGenreError(error.message)
      })
    return () => controller.abort()
  }, [])

  return <>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-line" /> THE GOOD KIND OF GETTING LOST</span><h1>Find your next<br /><em>favorite</em> story.</h1><p>Browse the shelves, follow a curiosity, and see where a good book takes you.</p></div>
      <div className="hero-art" aria-hidden="true"><div className="sun-disc" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="book-stack"><span /><span /><span /><span /></div><div className="art-caption">A world between<br />the covers.</div><span className="sparkle sparkle-one">✳</span><span className="sparkle sparkle-two">✦</span></div>
      <div className="hero-index">01 <span /> 04</div>
    </section>
    <section className="catalog-section" aria-labelledby="catalog-heading">
      <div className="section-heading"><div><span className="eyebrow">A SHELF FOR EVERY MOOD</span><h2 id="catalog-heading">The catalog<span className="brand-dot">.</span></h2></div><span className="section-aside">Take your time.<br />There’s no wrong turn.</span></div>
      <div className="catalog-tools"><SearchBar onSearch={setSearch} /><label className="genre-select-wrap"><span className="filter-label">EXPLORE BY</span><select value={genreId} onChange={(event) => setGenreId(event.target.value)} aria-label="Filter by genre"><option value="">All genres</option>{genres.map((genre) => <option value={genre.id} key={genre.id}>{genre.name}</option>)}</select><span className="select-chevron">⌄</span></label></div>
      {genreError && <p className="inline-notice">Genre filters are unavailable right now. You can still browse all books.</p>}
      <div className="sort-row"><span>ORDER THE SHELVES</span><label>Sort by <select value={sortBy} onChange={(event) => {
        const value = event.currentTarget.value
        if (value === 'title' || value === 'author') setSortBy(value)
      }} aria-label="Sort books"><option value="title">Title</option><option value="author">Author</option></select></label></div>
      <BookGrid genreId={genreId} search={search} sortBy={sortBy} onClear={() => { setSearch(''); setGenreId('') }} />
    </section>
  </>
}
