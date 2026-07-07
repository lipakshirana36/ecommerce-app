import { useEffect, useState } from "react";
import api from "../api/axios";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  brand: "",
  countInStock: "",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadProducts = () => api.get("/products?limit=100").then((res) => setProducts(res.data.products));
  const loadOrders = () => api.get("/orders").then((res) => setOrders(res.data));

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      ...form,
      price: Number(form.price),
      countInStock: Number(form.countInStock),
    };
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        setMessage("Product updated.");
      } else {
        await api.post("/products", payload);
        setMessage("Product created.");
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  const editProduct = (p) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      brand: p.brand,
      countInStock: p.countInStock,
    });
    setEditingId(p._id);
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/₹{id}`);
    loadProducts();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/orders/₹{id}/status`, { status });
    loadOrders();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl mb-8">Admin Dashboard</h1>

      <div className="flex gap-2 mb-8">
        {["products", "orders"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize ₹{
              tab === t ? "bg-ink text-bone" : "bg-white border border-ink/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-4 bg-white border border-ink/10 rounded-2xl p-4"
              >
                <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-ink/50">
                  {p.category} &middot; ₹{p.price.toFixed(2)} &middot; {p.countInStock} in stock  
                  </p>
                </div>
                <button onClick={() => editProduct(p)} className="text-sm text-moss-dark font-medium">
                  Edit
                </button>
                <button onClick={() => deleteProduct(p._id)} className="text-sm text-clay font-medium">
                  Delete
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={submitProduct} className="bg-white border border-ink/10 rounded-2xl p-5 space-y-3 h-fit">
            <h2 className="font-medium">{editingId ? "Edit product" : "New product"}</h2>
            {["name", "brand", "category", "image"].map((field) => (
              <input
                key={field}
                required
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full border border-ink/20 rounded-xl px-3 py-2 text-sm bg-bone"
              />
            ))}
            <textarea
              required
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-ink/20 rounded-xl px-3 py-2 text-sm bg-bone"
              rows={3}
            />
            <div className="flex gap-2">
              <input
                required
                type="number"
                step="0.01"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-1/2 border border-ink/20 rounded-xl px-3 py-2 text-sm bg-bone"
              />
              <input
                required
                type="number"
                placeholder="Stock"
                value={form.countInStock}
                onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
                className="w-1/2 border border-ink/20 rounded-xl px-3 py-2 text-sm bg-bone"
              />
            </div>
            {message && <p className="text-xs text-ink/60">{message}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-ink text-bone py-2 rounded-full text-sm font-medium hover:bg-moss-dark transition-colors"
              >
                {editingId ? "Save changes" : "Create product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-full text-sm border border-ink/20"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="flex items-center gap-4 bg-white border border-ink/10 rounded-2xl p-4">
              <div className="flex-1">
                <p className="font-medium text-sm">#{o._id.slice(-8)} &middot; {o.user?.name || "Unknown"}</p>
                <p className="text-xs text-ink/50">
                 {new Date(o.createdAt).toLocaleDateString()} &middot; ₹{o.totalPrice.toFixed(2)} 
                </p>
              </div>
              <select
                value={o.status}
                onChange={(e) => updateStatus(o._id, e.target.value)}
                className="border border-ink/20 rounded-full px-3 py-1.5 text-sm bg-white"
              >
                {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
