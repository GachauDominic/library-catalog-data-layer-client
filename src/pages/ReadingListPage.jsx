import { useReadingList } from "../context/ReadingListContext";
import { Link } from "react-router-dom";

export default function ReadingListPage() {
  const { readingList, removeBook, clearList } = useReadingList();
  const isLoggedIn = Boolean(window.localStorage.getItem("token"));

  return (
    <section className="py-[70px]">
      <div className="flex items-end justify-between">
        <h1 className="font-serif text-[44px]">Your reading list.</h1>
        {isLoggedIn && readingList.length > 0 && (
          <button type="button" onClick={clearList}>Clear list</button>
        )}
      </div>
      {!isLoggedIn ? (
        <div className="mt-6 max-w-[520px]">
          <p>Log in to see and manage your reading list.</p>
          <Link
            className="mt-2 inline-flex items-center gap-3 bg-library-green px-5 py-3 text-[14px] font-medium text-white no-underline transition hover:bg-[#284b3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-library-green dark:text-[#191f1b]"
            to="/login"
          >
            Log in <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : !readingList.length ? (
        <p>Your reading list is empty. <Link to="/">Browse the catalog</Link></p>
      ) : (
        <ul className="grid gap-3">
          {readingList.map((book) => (
            <li key={book.id} className="flex justify-between border-b py-3">
              <Link to={`/books/${book.id}`}>{book.title} — {book.author}</Link>
              <button type="button" onClick={() => removeBook(book.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
