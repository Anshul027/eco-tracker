const express = require("express");
require("dotenv").config();
const connectToMongo = require("./db/connectToMongo.js");
const authRoutes = require("./routes/authRoutes.js");
const tipsRoutes = require("./routes/tipsRoutes.js");
const trackRoutes = require("./routes/trackRoutes.js");
const isAuthenticated = require("./middlewares/isAuthenticated.middleware.js");
const app = express();
const port = process.env.PORT || 8000;
const databaseName = process.env.DATABASE_NAME;

app.use(express.json()); // to parse incoming json req

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/eco-friendly-practices", isAuthenticated, tipsRoutes);
app.use("/api/v1/carbon-footprint", isAuthenticated, trackRoutes);
app.listen(port, () => {
  connectToMongo(databaseName);
  console.log("server is runing");
});
