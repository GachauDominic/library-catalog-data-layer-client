import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import type { Book } from '../types'

const colors = ['#d9a27e', '#8ca3a0', '#c9b77e', '#a58c9d', '#bd806c', '#78909b']

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const color = colors[(book.title?.charCodeAt(0) || 0) % colors.length]
  const coverStyle: CSSProperties & { '--cover-color': string } = { '--cover-color': color }
  return <article className="book-card">
    <Link to={`/books/${book.id}`} className="book-cover-link" aria-label={`View ${book.title}`}>
      <div className="book-cover" style={coverStyle}><span className="cover-top">{book.genre?.name || 'FROM THE COLLECTION'}</span><span className="cover-title">{book.title}</span><span className="cover-rule" /><span className="cover-author">{book.author}</span><span className="cover-seal">S</span></div>
      <span className="cover-open">VIEW BOOK <span aria-hidden="true">↗</span></span>
    </Link>
    <div className="book-card-info"><div><span className="book-genre">{book.genre?.name || 'THE COLLECTION'}</span><h3><Link to={`/books/${book.id}`}>{book.title}</Link></h3><p>{book.author}</p></div><Link className="card-arrow" to={`/books/${book.id}`} aria-label={`View ${book.title}`}>↗</Link></div>
  </article>
}
