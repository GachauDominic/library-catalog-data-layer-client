import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Book } from "../types";

const API_URL = (
  import.meta.env.LIVE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

type BookDetailState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "error" }
  | { status: "ready"; book: Book };

export default function BookDetail() {
  const { id = "" } = useParams();
  const [state, setState] = useState<BookDetailState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    fetch(`${API_URL}/books/${encodeURIComponent(id)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (response.status === 404) throw new Error("not-found");
        if (!response.ok) throw new Error("request-failed");
        return response.json() as Promise<Book>;
      })
      .then((book) => setState({ status: "ready", book }))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError") {
          setState({
            status: error.message === "not-found" ? "not-found" : "error",
          });
        }
      });
    return () => controller.abort();
  }, [id]);

  if (state.status === "loading")
    return (
      <section className="grid min-h-[550px] grid-cols-1 items-center gap-[35px] px-[3%] py-[50px] lg:grid-cols-[340px_1fr] lg:gap-[10%] lg:px-[7%] lg:py-[85px]">
        <div className="mx-auto aspect-[0.73] w-full max-w-[265px] animate-[library-pulse_1.4s_infinite] bg-[#e6e4da] lg:max-w-[340px]" />
        <div>
          <span className="mb-[17px] block h-[14px] w-[25%] animate-[library-pulse_1.4s_infinite] bg-[#e6e4da]" />
          <span className="my-[17px] block h-[42px] w-[80%] animate-[library-pulse_1.4s_infinite] bg-[#e6e4da]" />
          <span className="my-[17px] block h-[14px] w-[65%] animate-[library-pulse_1.4s_infinite] bg-[#e6e4da]" />
        </div>
      </section>
    );
  if (state.status === "not-found")
    return (
      <section className="min-h-[430px] max-w-[680px] py-[75px] sm:py-[100px]">
        <span className="font-mono text-[12px] tracking-[1.4px] text-[#758077]">
          404 · BOOK NOT FOUND
        </span>
        <h1 className="my-[27px] font-serif text-[42px] leading-[1.02] -tracking-[3px] sm:text-[54px]">
          This book isn’t on our shelves.
        </h1>
        <Link
          className="mt-3 inline-block border-b border-library-green/60 pb-1 text-[15px] text-library-green no-underline"
          to="/"
        >
          Return to the catalog →
        </Link>
      </section>
    );
  if (state.status === "error")
    return (
      <section className="min-h-[430px] max-w-[680px] py-[75px] sm:py-[100px]">
        <span className="font-mono text-[12px] tracking-[1.4px] text-[#758077]">
          A SMALL PAUSE
        </span>
        <h1 className="my-[27px] font-serif text-[42px] leading-[1.02] -tracking-[3px] sm:text-[54px]">
          We couldn’t open this book.
        </h1>
        <p className="text-[15px] leading-[1.7] text-[#777c73]">
          Please check your connection and try again.
        </p>
        <Link
          className="mt-3 inline-block border-b border-library-green/60 pb-1 text-[15px] text-library-green no-underline"
          to="/"
        >
          Back to the catalog →
        </Link>
      </section>
    );

  const { book } = state;
  const totalCopies = book.totalCopies ?? 0;
  const sourceUrl = book.sourceUrl?.trim() || "";
  const isSafeSourceUrl = /^https?:\/\//i.test(sourceUrl);

  return (
    <section className="px-0 pb-[100px] pt-[30px]">
      <Link className="text-[14px] text-[#727a70] no-underline" to="/">
        ← Back to the catalog
      </Link>
      <div className="grid grid-cols-1 items-center gap-[36px] px-[2%] pt-[34px] lg:grid-cols-[minmax(260px,390px)_1fr] lg:gap-[10%] lg:px-[6%] lg:pt-[50px]">
        <div className="mx-auto w-full max-w-[300px] lg:max-w-[360px]">
          <div className="relative flex aspect-[0.73] flex-col bg-library-green p-[35px] text-[#f4eddf] shadow-[18px_23px_35px_rgba(38,50,45,0.125),inset_8px_0_12px_rgba(25,39,27,0.145)]">
            <span className="absolute inset-[15px] border border-[#f4eddf]/30" />
            <span className="relative z-[1] font-mono text-[11px] tracking-[0.5px]">
              STACKS · {book.genre?.name || "LIBRARY"}
            </span>
            <span className="relative z-[1] my-[15px] mt-auto font-serif text-[30px] leading-[1.06] font-medium sm:text-[48px]">
              {book.title}
            </span>
            <span className="mb-[15px] h-px w-[34px] bg-[#eee4d1]" />
            <span className="relative z-[1] font-mono text-[11px] tracking-[1px]">
              {book.author}
            </span>
            <span className="absolute bottom-[26px] right-[25px] grid h-[29px] w-[29px] place-items-center rounded-full border border-[#eee4d1]/50 font-serif text-[17px] italic">
              S
            </span>
          </div>
          <span className="mt-[17px] block text-center font-mono text-[12px] tracking-[0.5px] text-[#92948a]">
            A little world of its own.
          </span>
        </div>
        <div className="max-w-[530px] py-[15px]">
          <span className="flex items-center gap-2.5 font-mono text-[12px] tracking-[1.4px] text-[#758077]">
            <span className="h-px w-6 bg-library-orange" /> BOOK DETAILS
          </span>
          <h1 className="mb-[10px] mt-[18px] font-serif text-[46px] leading-[1.02] -tracking-[2px] lg:text-[64px]">
            {book.title}
          </h1>
          <p className="mb-[22px] mt-0 font-serif text-[19px] italic text-[#70796e] dark:text-[#b4bdb2]">
            by {book.author}
          </p>
          <div className="flex gap-2">
            <span className="border border-library-line px-[10px] py-2 font-mono text-[12px] tracking-[0.7px] text-[#747a70]">
              {book.genre?.name || "Library collection"}
            </span>
            <span className="border border-library-line px-[10px] py-2 font-mono text-[11px] tracking-[0.7px] text-[#747a70]">
              {book.publishedAt
                ? new Date(book.publishedAt).getFullYear()
                : "A Stacks pick"}
            </span>
          </div>
          <div className="my-[28px] h-px bg-library-line" />
          <h2 className="mb-[10px] mt-0 font-serif text-[21px] font-medium">
            Between the covers
          </h2>
          <p className="text-[15px] leading-[1.9] text-[#72786f] dark:text-[#b4bdb2]">
            {book.description ||
              "A story waiting to be discovered. Ask a librarian to learn more about this title."}
          </p>
          <dl className="mt-[25px] grid grid-cols-2 gap-[18px] border-t border-library-line pt-[17px]">
            {book.isbn && (
              <div>
                <dt className="mb-[7px] font-mono text-[11.5px] text-[#96998f]">
                  ISBN
                </dt>
                <dd className="m-0 text-[15px] text-[#5c655c] dark:text-library-ink">
                  {book.isbn}
                </dd>
              </div>
            )}
            <div>
              <dt className="mb-[7px] font-mono text-[11px] text-[#96998f]">
                AVAILABILITY
              </dt>
              <dd className="m-0 text-[15px] text-[#5c655c] dark:text-library-ink">
                {totalCopies > 0
                  ? `${totalCopies} ${totalCopies === 1 ? "copy" : "copies"} in the collection`
                  : "Ask a librarian"}
              </dd>
            </div>
            {isSafeSourceUrl && (
              <div className="col-span-2">
                <dt className="mb-[7px] font-mono text-[11px] text-[#96998f]">
                  MORE ABOUT THIS BOOK
                </dt>
                <dd className="m-0 text-[15px] text-[#5c655c]">
                  <a
                    className="text-library-green underline decoration-[#9cac9d] underline-offset-[3px]"
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit source <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
          <Link
            to="/"
            className="mt-[25px] inline-flex items-center gap-[26px] bg-library-green px-[16px] py-[13px] text-[15px] text-white no-underline dark:text-[#191f1b]"
          >
            Keep exploring <span className="text-[#dcb18b]">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
