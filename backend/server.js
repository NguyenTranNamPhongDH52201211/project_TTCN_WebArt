const express = require("express");
const cors = require("cors");
const productRoutes = require("./src/routes/ProductRoute");
const categoryRoutes = require("./src/routes/CategoryRoute");
const inventory =require ("./src/routes/InventoryRoute");



const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true }));
app.use("/api/inventory",inventory);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
