import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(user ? "/checkout" : "/login?redirect=/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">Your cart is empty</h1>
        <p className="text-ink/60 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-ink text-bone px-6 py-2.5 rounded-full font-medium">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl mb-8">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.product}
            className="flex items-center gap-4 bg-white border border-ink/10 rounded-2xl p-4"
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-clay text-sm">${item.price.toFixed(2)}</p>
            </div>
            <select
              value={item.qty}
              onChange={(e) => updateQty(item.product, Number(e.target.value))}
              className="border border-ink/20 rounded-full px-3 py-1.5 text-sm bg-white"
            >
              {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeFromCart(item.product)}
              className="text-ink/40 hover:text-clay text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div className="w-full sm:w-72 bg-white border border-ink/10 rounded-2xl p-5">
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4 text-ink/60">
            <span>Shipping</span>
            <span>{subtotal > 100 ? "Free" : "$10.00"}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-ink text-bone py-2.5 rounded-full font-medium hover:bg-moss-dark transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
