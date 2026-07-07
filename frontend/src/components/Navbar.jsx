import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(keyword.trim() ? `/?keyword=${encodeURIComponent(keyword.trim())}` : "/");
  };

  return (
    <header className="sticky top-0 z-40 bg-bone/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-6">
        <Link to="/" className="font-display italic text-2xl tracking-tight shrink-0">
          Meridian
        </Link>

        <form onSubmit={handleSearch} className="flex-1 hidden sm:flex">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search the shop..."
            className="w-full max-w-md border border-ink/20 rounded-full px-4 py-1.5 text-sm bg-white/60 focus:bg-white transition-colors"
          />
        </form>

        <nav className="flex items-center gap-5 text-sm font-medium ml-auto">
          <Link to="/" className="hover:text-moss transition-colors">
            Shop
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-moss transition-colors">
              Admin
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="hover:text-moss transition-colors">
                Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="hover:text-clay transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-moss transition-colors">
              Sign in
            </Link>
          )}
          <Link to="/cart" className="relative flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-clay text-bone text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
