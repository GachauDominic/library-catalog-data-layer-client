import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Login failed");
      const token = data.token || data.accessToken || data.jwt;
      if (!token) throw new Error("The login response did not include a token");
      window.localStorage.setItem("token", token);
      navigate("/");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-[520px] px-0 py-[56px] sm:py-[82px]">
      <div className="border border-library-line bg-[#faf9f5] p-6 shadow-[0_18px_50px_rgba(38,50,45,0.06)] dark:bg-[#222a24] sm:p-10">
        <span className="mb-4 flex items-center gap-2.5 font-mono text-[11px] tracking-[1.5px] text-[#758077]">
          <span className="h-px w-6 bg-library-orange" /> YOUR NEXT CHAPTER
        </span>
        <h1 className="mb-2 mt-0 font-serif text-[40px] leading-[1.08] -tracking-[1.5px] sm:text-[48px]">
          Welcome back<span className="text-library-orange">.</span>
        </h1>
        <p className="mb-8 mt-0 text-[14px] leading-[1.7] text-[#777c73] dark:text-[#b4bdb2]">
          Sign in to pick up where you left off.
        </p>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid gap-2 font-mono text-[11px] tracking-[1px] text-[#737b71] dark:text-[#b4bdb2]">
            EMAIL ADDRESS
            <input
              className="h-[50px] w-full border border-library-line bg-library-paper px-3.5 font-sans text-[15px] tracking-normal text-library-ink outline-none transition focus:border-library-green focus:ring-2 focus:ring-library-green/20"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="grid gap-2 font-mono text-[11px] tracking-[1px] text-[#737b71] dark:text-[#b4bdb2]">
            PASSWORD
            <input
              className="h-[50px] w-full border border-library-line bg-library-paper px-3.5 font-sans text-[15px] tracking-normal text-library-ink outline-none transition focus:border-library-green focus:ring-2 focus:ring-library-green/20"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error && (
            <p className="m-0 border border-[#c76a47]/30 bg-[#c76a47]/5 px-3.5 py-3 text-[13px] leading-[1.5] text-[#9b5036]" role="alert">
              {error}
            </p>
          )}
          <button
            className="mt-1 flex h-[50px] items-center justify-center gap-3 bg-library-green px-4 font-sans text-[15px] font-medium text-white transition hover:bg-[#284b3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-library-green disabled:cursor-wait disabled:opacity-65 dark:text-[#191f1b]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
        </form>
        <p className="mb-0 mt-7 border-t border-library-line pt-5 text-center text-[14px] text-[#777c73] dark:text-[#b4bdb2]">
          New to Stacks?{" "}
          <Link className="font-medium text-library-green underline decoration-library-green/40 underline-offset-4 hover:decoration-library-green" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
