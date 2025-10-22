require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ======================
// 🧩 Middleware cơ bản
// ======================
app.use(cors({
  origin: [
    "https://expense-tracker-2-itir.onrender.com",  // frontend Render URL
    "http://localhost:5173"                         // để test local
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// ======================
// 🧠 Kết nối MongoDB
// ======================
connectDB();



// ======================
// 📦 API routes
// ======================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


// ======================
// 🛡️ CSP Fix — Cho phép Google Fonts
// ======================
// ⚠️ Đặt CSP SAU routes để nó không ghi đè header CORS
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' data: blob: https://expense-tracker-2-itir.onrender.com https://expense-tracker-backend.onrender.com; " +
    "connect-src 'self' https://expense-tracker-2-itir.onrender.com https://expense-tracker-backend.onrender.com https://fonts.googleapis.com https://fonts.gstatic.com data: blob:; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:;"
  );
  next();
});

// ======================
// 📁 Static frontend
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// 🚀 Start server
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
