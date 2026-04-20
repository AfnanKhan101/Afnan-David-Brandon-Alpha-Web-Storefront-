const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
const port = 3005;

const uri = "mongodb://team5:team5@localhost:27017";
const client = new MongoClient(uri);

let db;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.post("/products", async (req, res) => {
  try {
    console.log("PRODUCT:", req.body);
    const result = await db.collection("products").insertOne(req.body);
    console.log("products document saved with _id:", result.insertedId);
    res.json({ message: "Product received", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to save product" });
  }
});

app.post("/cart", async (req, res) => {
  try {
    console.log("CART:", req.body);
    const result = await db.collection("shoppingcart").insertOne(req.body);
    console.log("shoppingcart document saved with _id:", result.insertedId);
    res.json({ message: "Cart received", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ error: "Failed to save cart" });
  }
});

app.post("/billing", async (req, res) => {
  try {
    console.log("BILLING:", req.body);
    const result = await db.collection("shippingbilling").insertOne(req.body);
    console.log("shippingbilling document saved with _id:", result.insertedId);
    res.json({ message: "Billing received", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error saving billing:", error);
    res.status(500).json({ error: "Failed to save billing" });
  }
});

app.post("/shipping", async (req, res) => {
  try {
    console.log("SHIPPING:", req.body);
    const result = await db.collection("shippingbilling").insertOne(req.body);
    console.log("shippingbilling document saved with _id:", result.insertedId);
    res.json({ message: "Shipping received", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error saving shipping:", error);
    res.status(500).json({ error: "Failed to save shipping" });
  }
});

app.post("/returns", async (req, res) => {
  try {
    console.log("RETURNS:", req.body);
    const result = await db.collection("returns").insertOne(req.body);
    console.log("returns document saved with _id:", result.insertedId);
    res.json({ message: "Return received", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error saving return:", error);
    res.status(500).json({ error: "Failed to save return" });
  }
});

app.post("/shopper", async (req, res) => {
  try {
    console.log("SHOPPER:", req.body);
    const result = await db.collection("shopper").insertOne(req.body);
    console.log("shopper document saved with _id:", result.insertedId);
    res.json({ message: "Shopper received", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error saving shopper:", error);
    res.status(500).json({ error: "Failed to save shopper" });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    db = client.db("team5DB");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
}

startServer();
