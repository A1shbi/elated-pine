const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Кросс-домен рұқсат ету
app.use(cors());
app.use(express.json());

// Файлдар сақталатын папка
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Папканы статикалық қылу
app.use("/uploads", express.static("uploads"));

// Файлды жүктеу
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Серверді іске қосу
app.listen(PORT, () => {
  console.log(`🚀 Сервер http://localhost:${PORT} портында жұмыс істеп тұр`);
});
