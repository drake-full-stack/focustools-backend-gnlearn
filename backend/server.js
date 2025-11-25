require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

app.use("/", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
