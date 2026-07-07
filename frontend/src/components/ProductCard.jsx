import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-ink/10 hover:border-moss/40 hover:shadow-lg hover:shadow-ink/5 transition-all duration-300"
    >
      <div className="aspect-[4/5] overflow-hidden bg-bone">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-moss-dark mb-1">
          {product.category}
        </p>

        <h3 className="font-display text-lg leading-snug mb-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="price-tag text-sm font-semibold text-clay">
            ₹{product.price ? product.price.toFixed(2) : "0.00"}
          </span>

          <span className="text-xs text-ink/50">
            {product.countInStock > 0
              ? `${product.countInStock} in stock`
              : "Sold out"}
          </span>
        </div>
      </div>
    </Link>
  );
}