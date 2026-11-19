import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookDetail from './pages/BookDetail'

export default function App() {
  return <div className="app-shell">
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Stacks home"><span className="brand-mark">S</span><span>stacks<span className="brand-dot">.</span></span></Link>
      <span className="header-note">YOUR NEIGHBORHOOD LIBRARY</span>
      <Link className="header-link" to="/">Browse catalog <span aria-hidden="true">↗</span></Link>
    </header>
    <main><Routes><Route path="/" element={<HomePage />} /><Route path="/books/:id" element={<BookDetail />} /><Route path="*" element={<NotFound />} /></Routes></main>
    <footer className="site-footer"><span>STORIES LIVE HERE.</span><span>Made for curious minds <span className="brand-dot">✳</span></span></footer>
  </div>
}

function NotFound() {
  return <section className="message-panel"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>This page wandered off.</h1><Link className="text-link" to="/">Back to the catalog →</Link></section>
}
