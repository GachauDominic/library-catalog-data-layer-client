import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Book } from '../types'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

type BookDetailState =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'error' }
  | { status: 'ready'; book: Book }

export default function BookDetail() {
  const { id = '' } = useParams()
  const [state, setState] = useState<BookDetailState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })
    fetch(`${API_URL}/books/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(async (response) => {
        if (response.status === 404) throw new Error('not-found')
        if (!response.ok) throw new Error('request-failed')
        return response.json() as Promise<Book>
      })
      .then((book) => setState({ status: 'ready', book }))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          setState({ status: error.message === 'not-found' ? 'not-found' : 'error' })
        }
      })
    return () => controller.abort()
  }, [id])

  if (state.status === 'loading') return <section className="detail-loading"><div className="detail-skeleton-cover" /><div className="detail-skeleton-copy"><span /><span /><span /><span /></div></section>
  if (state.status === 'not-found') return <section className="message-panel detail-message"><span className="eyebrow">404 · BOOK NOT FOUND</span><h1>This book isn’t on our shelves.</h1><Link className="text-link" to="/">Return to the catalog →</Link></section>
  if (state.status === 'error') return <section className="message-panel detail-message"><span className="eyebrow">A SMALL PAUSE</span><h1>We couldn’t open this book.</h1><p>Please check your connection and try again.</p><Link className="text-link" to="/">Back to the catalog →</Link></section>

  const { book } = state
  const totalCopies = book.totalCopies ?? 0

  return <section className="detail-page">
    <Link className="back-link" to="/">← Back to the catalog</Link>
    <div className="detail-layout"><div className="detail-cover-wrap"><div className="detail-cover"><span className="detail-cover-label">STACKS · {book.genre?.name || 'LIBRARY'}</span><span className="detail-cover-title">{book.title}</span><span className="detail-cover-divider" /><span className="detail-cover-author">{book.author}</span><span className="detail-cover-seal">S</span></div><span className="cover-caption">A little world of its own.</span></div>
      <div className="detail-copy"><span className="eyebrow"><span className="eyebrow-line" /> BOOK DETAILS</span><h1>{book.title}</h1><p className="detail-author">by {book.author}</p><div className="detail-tags"><span>{book.genre?.name || 'Library collection'}</span><span>{book.publishedAt ? new Date(book.publishedAt).getFullYear() : 'A Stacks pick'}</span></div><div className="detail-rule" /><h2>Between the covers</h2><p className="description">{book.description || 'A story waiting to be discovered. Ask a librarian to learn more about this title.'}</p><dl className="book-facts">{book.isbn && <div><dt>ISBN</dt><dd>{book.isbn}</dd></div>}<div><dt>AVAILABILITY</dt><dd>{totalCopies > 0 ? `${totalCopies} ${totalCopies === 1 ? 'copy' : 'copies'} in the collection` : 'Ask a librarian'}</dd></div></dl><Link to="/" className="button-primary">Keep exploring <span>↗</span></Link></div>
    </div>
  </section>
}
