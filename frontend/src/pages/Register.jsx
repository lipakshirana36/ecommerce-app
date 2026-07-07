import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display text-3xl mb-8">Create an account</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          required
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-ink/20 rounded-xl px-4 py-2.5 bg-white"
        />
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
          minLength={6}
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-ink/20 rounded-xl px-4 py-2.5 bg-white"
        />
        {error && <p className="text-clay text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-ink text-bone py-2.5 rounded-full font-medium hover:bg-moss-dark transition-colors"
        >
          Create account
        </button>
      </form>
      <p className="text-sm text-ink/60 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-moss-dark font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
