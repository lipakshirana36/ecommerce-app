import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch(() => setError("Order not found or you don't have access to it."));
  }, [id]);

  if (error) return <p className="max-w-3xl mx-auto px-6 py-16 text-clay">{error}</p>;
  if (!order) return <p className="max-w-3xl mx-auto px-6 py-16 text-ink/60">Loading…</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl mb-1">Order #{order._id.slice(-8)}</h1>
      <p className="text-sm text-ink/50 mb-8">
        Placed {new Date(order.createdAt).toLocaleString()} &middot; Status:{" "}
        <span className="text-moss-dark font-medium">{order.status}</span>
      </p>

      <div className="grid sm:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-medium mb-2">Shipping address</h2>
          <p className="text-sm text-ink/70">
            {order.shippingAddress.street}, {order.shippingAddress.city}
            {order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ""}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
        </div>
        <div>
          <h2 className="font-medium mb-2">Payment method</h2>
          <p className="text-sm text-ink/70">{order.paymentMethod}</p>
        </div>
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl p-5 space-y-2 text-sm">
        {order.orderItems.map((item) => (
          <div key={item.product} className="flex items-center gap-3 py-1">
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
            <span className="flex-1">
              {item.name} × {item.qty}
            </span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-ink/10 pt-2 flex justify-between">
          <span>Shipping</span>
          <span>{order.shippingPrice === 0 ? "Free" : `$${order.shippingPrice.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
