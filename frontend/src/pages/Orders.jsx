import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/mine")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="max-w-4xl mx-auto px-6 py-16 text-ink/60">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl mb-8">Your Orders</h1>
      {orders.length === 0 && <p className="text-ink/60">You haven't placed any orders yet.</p>}
      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="flex items-center justify-between bg-white border border-ink/10 rounded-2xl p-4 hover:border-moss/40 transition-colors"
          >
            <div>
              <p className="font-medium text-sm">#{order._id.slice(-8)}</p>
              <p className="text-xs text-ink/50">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <span className="text-xs uppercase tracking-wide bg-moss/10 text-moss-dark px-3 py-1 rounded-full">
              {order.status}
            </span>
            <span className="font-medium">${order.totalPrice.toFixed(2)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
