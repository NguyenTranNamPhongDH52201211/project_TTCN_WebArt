const express = require("express");
const cors = require("cors");

const productRoutes = require("./src/routes/ProductRoute");
const categoryRoutes = require("./src/routes/CategoryRoute");
const inventory = require("./src/routes/InventoryRoute");
const authen = require("./src/routes/AuthenRoute");
const cart = require("./src/routes/CartRoute");
const item = require("./src/routes/CartItemRoute");

const app = express();

// ✅ cho phép cả client & admin
const allowedOrigins = [
  "http://localhost:3001", // client
  "http://localhost:5173", // admin
];

app.use(
  cors({
    origin: (origin, callback) => {
      // cho Postman, server gọi
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/inventory", inventory);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/authen", authen);
app.use("/api/cart", cart);
app.use("/api/cart-item", item);

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
