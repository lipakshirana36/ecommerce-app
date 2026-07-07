import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display text-3xl mb-8">Sign in</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-ink/20 rounded-xl px-4 py-2.5 bg-white"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-ink/20 rounded-xl px-4 py-2.5 bg-white"
        />
        {error && <p className="text-clay text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-ink text-bone py-2.5 rounded-full font-medium hover:bg-moss-dark transition-colors"
        >
          Sign in
        </button>
      </form>
      <p className="text-sm text-ink/60 mt-6">
        New here?{" "}
        <Link to="/register" className="text-moss-dark font-medium">
          Create an account
        </Link>
      </p>
      <p className="text-xs text-ink/40 mt-8">
        Demo admin: admin@example.com / admin123 (after running the seed script)
      </p>
    </div>
  );
}
