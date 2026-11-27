import { createContext, useContext, useEffect, useReducer } from "react";

export const ReadingListContext = createContext(null);
const STORAGE_KEY = "readingList";

function readingListReducer(state, action) {
  switch (action.type) {
    case "ADD_BOOK":
      if (state.some((book) => String(book.id) === String(action.book.id))) {
        return state;
      }
      return [...state, action.book];
    case "REMOVE_BOOK":
      return state.filter((book) => String(book.id) !== String(action.bookId));
    case "CLEAR_LIST":
      return [];
    default:
      return state;
  }
}

function loadReadingList() {
  try {
    const stored =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.localStorage.getItem("reading-list");
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ReadingListProvider({ children }) {
  const [readingList, dispatch] = useReducer(readingListReducer, undefined, loadReadingList);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
  }, [readingList]);

  const addBook = (book) => dispatch({ type: "ADD_BOOK", book });
  const removeBook = (bookId) => dispatch({ type: "REMOVE_BOOK", bookId });
  const clearList = () => dispatch({ type: "CLEAR_LIST" });

  return (
    <ReadingListContext.Provider
      value={{ readingList, addBook, removeBook, clearList, dispatch }}
    >
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error("useReadingList must be used within a ReadingListProvider");
  }
  return context;
}

export { readingListReducer, STORAGE_KEY };
export default ReadingListProvider;
