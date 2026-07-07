import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const { data } = await api.post("/orders", {
        orderItems: cartItems.map((item) => ({ product: item.product, qty: item.qty })),
        shippingAddress: address,
        paymentMethod,
      });
      clearCart();
      navigate(`/orders/₹{data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl mb-8">Checkout</h1>
      <form onSubmit={placeOrder} className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-medium">Shipping address</h2>
          {["street", "city", "state", "postalCode", "country"].map((field) => (
            <input
              key={field}
              required={field !== "state"}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={address[field]}
              onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
              className="w-full border border-ink/20 rounded-xl px-4 py-2.5 bg-white"
            />
          ))}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-ink/20 rounded-xl px-4 py-2.5 bg-white"
          >
            <option>Cash on Delivery</option>
            <option>Credit Card (demo)</option>
            <option>PayPal (demo)</option>
          </select>
        </div>

        <div>
          <h2 className="font-medium mb-4">Order summary</h2>
          <div className="bg-white border border-ink/10 rounded-2xl p-5 space-y-2 text-sm">
            {cartItems.map((item) => (
              <div key={item.product} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-ink/10 pt-2 flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          {error && <p className="text-clay text-sm mt-3">{error}</p>}
          <button
            type="submit"
            disabled={placing}
            className="w-full mt-4 bg-ink text-bone py-2.5 rounded-full font-medium hover:bg-moss-dark transition-colors disabled:opacity-60"
          >
            {placing ? "Placing order…" : "Place order"}
          </button>
        </div>
      </form>
    </div>
  );
}
