import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ReadingListProvider } from "./context/ReadingListContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import BookDetail from "./pages/BookDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SpaceBookingPage from "./pages/SpaceBookingPage";
import ReadingListPage from "./pages/ReadingListPage";

export default function App() {
  const [isDark, setIsDark] = useState(
    () => window.localStorage.getItem("stacks-theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    window.localStorage.setItem("stacks-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ReadingListProvider>
      <div className="mx-auto max-w-[1600px] px-[21px] sm:px-[5%] xl:px-[7.4%] text-library-ink">
        <Navbar isDark={isDark} onToggleTheme={() => setIsDark((current) => !current)} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/reading-list" element={<ReadingListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <SpaceBookingPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="flex h-[68px] items-center justify-between border-t border-library-line font-mono text-[12.25px] tracking-[1.4px] text-[#858b80] sm:h-[76px]">
          <span>STORIES LIVE HERE.</span>
          <span className="font-sans tracking-normal">
            Made for curious minds <span className="text-library-orange">✳</span>
          </span>
        </footer>
      </div>
    </ReadingListProvider>
  );
}

function NotFound() {
  return (
    <section className="max-w-[680px] px-0 py-[75px] sm:py-[100px]">
      <h1 className="my-[27px] font-serif text-[42px]">This page wandered off.</h1>
      <Link to="/" className="text-library-green">Back to the catalog →</Link>
    </section>
  );
}
