import { useReadingList } from "../context/ReadingListContext";
import { Link } from "react-router-dom";

export default function ReadingListPage() {
  const { readingList, removeBook, clearList } = useReadingList();

  return (
    <section className="py-[70px]">
      <div className="flex items-end justify-between">
        <h1 className="font-serif text-[44px]">Your reading list.</h1>
        {readingList.length > 0 && (
          <button type="button" onClick={clearList}>Clear list</button>
        )}
      </div>
      {!readingList.length ? (
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
