const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
  {
    name: "Aurora Wireless Headphones",
    description: "Over-ear headphones with active noise cancellation and 30-hour battery life.",
    price: 2000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    category: "Electronics",
    brand: "Aurora",
    countInStock: 25,
  },
  {
    name: "Terra Ceramic Pour-Over Set",
    description: "Handcrafted ceramic pour-over coffee dripper with matching mug.",
    price: 2200,
    image: "https://images.unsplash.com/photo-1515442261605-65987783cb6a?w=600",
    category: "Home",
    brand: "Terra",
    countInStock: 40,
  },
  {
    name: "Voyage Canvas Backpack",
    description: "Water-resistant canvas backpack with padded laptop sleeve, 22L capacity.",
    price: 1500,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Accessories",
    brand: "Voyage",
    countInStock: 18,
  },
  {
    name: "Halo Smart Desk Lamp",
    description: "Adjustable LED desk lamp with wireless charging base and touch dimmer.",
    price: 1900,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    category: "Home",
    brand: "Halo",
    countInStock: 30,
  },
  {
    name: "Fable Merino Wool Sweater",
    description: "Soft, breathable merino wool crewneck sweater for everyday wear.",
    price: 2100,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600",
    category: "Apparel",
    brand: "Fable",
    countInStock: 22,
  },
  {
    name: "Basin Stainless Water Bottle",
    description: "Insulated 750ml stainless steel bottle, keeps drinks cold for 24 hours.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
    category: "Accessories",
    brand: "Basin",
    countInStock: 60,
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);

    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      });
      console.log("Admin user created: admin@example.com / admin123");
    }

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
