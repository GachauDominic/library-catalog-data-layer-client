import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'
import type { Book, BookSortField } from '../types'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

interface BookGridProps {
  genreId: string
  search: string
  sortBy?: BookSortField
  onClear: () => void
}

export default function BookGrid({ genreId, search, sortBy = 'title', onClear }: BookGridProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState('')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams()
    if (genreId) params.set('genreId', genreId)
    if (search) params.set('search', search)
    setStatus('loading')
    setError('')
    fetch(`${API_URL}/books${params.size ? `?${params}` : ''}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`The catalog returned an error (${response.status}).`)
        return response.json()
      })
      .then((data: Book[]) => { setBooks(Array.isArray(data) ? data : []); setStatus('ready') })
      .catch((err: unknown) => {
        if (!(err instanceof Error && err.name === 'AbortError')) {
          setError(err instanceof Error ? err.message || 'Something went wrong.' : 'Something went wrong.')
          setStatus('error')
        }
      })
    return () => controller.abort()
  }, [genreId, search, retryKey])

  if (status === 'loading') return <div className="book-grid" aria-label="Loading books">{Array.from({ length: 8 }, (_, index) => <div className="book-skeleton" key={index}><div className="skeleton-cover" /><div className="skeleton-line" /><div className="skeleton-line short" /></div>)}</div>
  if (status === 'error') return <div className="message-panel compact"><span className="eyebrow">A SMALL PAUSE</span><h3>We couldn’t reach the shelves.</h3><p>{error} Check your connection and try again.</p><button className="button-secondary" onClick={() => setRetryKey((key) => key + 1)}>Try again</button></div>
  if (!books.length) return <div className="message-panel compact"><span className="eyebrow">NOT ON THIS SHELF</span><h3>No books found.</h3><p>Try another title, author, or genre. Your next favorite is still out there.</p><button className="text-link clear-search" onClick={onClear}>Clear filters →</button></div>

  return <>
    <div className="results-meta"><span>{books.length} {books.length === 1 ? 'BOOK' : 'BOOKS'} TO EXPLORE</span><span>SHOWING YOUR NEXT CHAPTER ↓</span></div>
    <div className="book-grid">{[...books].sort((a, b) => (a[sortBy] || '').localeCompare(b[sortBy] || '')).map((book) => <BookCard book={book} key={book.id} />)}</div>
  </>
}
