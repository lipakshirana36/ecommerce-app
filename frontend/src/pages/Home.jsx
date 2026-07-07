import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/products/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("/products", {
          params: { keyword, category, sort },
        });
        setProducts(data.products);
      } catch (err) {
        setError("Could not load products. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, category, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-moss-dark mb-3">The collection</p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight max-w-2xl">
          {keyword ? `Results for "${keyword}"` : "Goods worth keeping around."}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-ink/20 rounded-full px-4 py-1.5 text-sm bg-white"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-ink/20 rounded-full px-4 py-1.5 text-sm bg-white"
        >
          <option value="newest">Newest</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {loading && <p className="text-ink/60">Loading products…</p>}
      {error && <p className="text-clay">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-ink/60">No products found. Try a different search or filter.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
