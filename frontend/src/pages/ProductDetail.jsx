import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewMsg, setReviewMsg] = useState("");

  const loadProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      setError("Product not found.");
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewMsg("");
    try {
      await api.post(`/products/${id}/reviews`, reviewForm);
      setReviewMsg("Review added — thank you!");
      setReviewForm({ rating: 5, comment: "" });
      loadProduct();
    } catch (err) {
      setReviewMsg(err.response?.data?.message || "Could not submit review.");
    }
  };

  if (error) return <p className="max-w-6xl mx-auto px-6 py-16 text-clay">{error}</p>;
  if (!product) return <p className="max-w-6xl mx-auto px-6 py-16 text-ink/60">Loading…</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-ink/10">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-moss-dark mb-2">
            {product.category} &middot; {product.brand}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl mb-3">{product.name}</h1>
          <p className="text-ink/50 text-sm mb-4">
            {product.numReviews > 0
              ? `★ ₹{product.rating.toFixed(1)} (₹{product.numReviews} reviews)`
              : "No reviews yet"}
          </p>
          <p className="price-tag text-2xl font-semibold text-clay mb-6">
            ₹{product.price.toFixed(2)}
          </p>
          <p className="text-ink/80 leading-relaxed mb-8">{product.description}</p>

          {product.countInStock > 0 ? (
            <div className="flex items-center gap-4">
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border border-ink/20 rounded-full px-4 py-2 text-sm bg-white"
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    Qty {x + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddToCart}
                className="bg-ink text-bone px-8 py-2.5 rounded-full font-medium hover:bg-moss-dark transition-colors"
              >
                Add to cart
              </button>
            </div>
          ) : (
            <p className="text-clay font-medium">Currently sold out</p>
          )}
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <h2 className="font-display text-2xl mb-6">Reviews</h2>
        <div className="space-y-4 mb-8">
          {product.reviews.length === 0 && (
            <p className="text-ink/50 text-sm">Be the first to review this product.</p>
          )}
          {product.reviews.map((r) => (
            <div key={r._id} className="border-b border-ink/10 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{r.name}</span>
                <span className="text-mustard text-sm">{"★".repeat(r.rating)}</span>
              </div>
              <p className="text-ink/70 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={submitReview} className="space-y-3">
            <h3 className="font-medium">Write a review</h3>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
              className="border border-ink/20 rounded-full px-4 py-1.5 text-sm bg-white"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <textarea
              required
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              placeholder="Share your thoughts on this product..."
              className="w-full border border-ink/20 rounded-xl px-4 py-2 text-sm bg-white"
              rows={3}
            />
            <button
              type="submit"
              className="bg-moss text-bone px-6 py-2 rounded-full text-sm font-medium hover:bg-moss-dark transition-colors"
            >
              Submit review
            </button>
            {reviewMsg && <p className="text-sm text-ink/70">{reviewMsg}</p>}
          </form>
        ) : (
          <p className="text-sm text-ink/60">Sign in to leave a review.</p>
        )}
      </div>
    </div>
  );
}
