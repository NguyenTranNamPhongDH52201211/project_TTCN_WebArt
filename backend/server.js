const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const productRoutes = require("./src/routes/ProductRoute");
const categoryRoutes = require("./src/routes/CategoryRoute");
const inventory = require("./src/routes/InventoryRoute");
const authen = require("./src/routes/AuthenRoute");
const cart = require("./src/routes/CartRoute");
const item = require("./src/routes/CartItemRoute");
const order = require("./src/routes/OrderRoute");
const payment=require("./src/routes/PaymentRoute");
const addressJson = require("./src/routes/AddressJsonRoute");
const address=require("./src/routes/AddressRoute");
const user=require("./src/routes/UserRoute")

const app = express();
app.use(cookieParser()); // ✅ BẮT BUỘC, TOÀN APP

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
app.use("/api/orders", order);
app.use("/api/payments",payment);
app.use("/api/addressJson", addressJson);
app.use("/api/addresses",address);
app.use("/api/user",user);

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
