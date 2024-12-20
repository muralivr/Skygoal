const express = require("express");
const mongoose = require("mongoose");
const customerRouter = require("../Backend/routes/CustomerRoutes.js");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;

mongoose
  .connect(process.env.URI)
  .then(() => {
    h;
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("MongoDB Not Connected");
  });

app.use("/api", customerRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
