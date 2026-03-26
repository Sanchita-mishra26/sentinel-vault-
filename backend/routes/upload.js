const express = require("express");
const router = express.Router();

const { handleUpload } = require("../controllers/uploadController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), handleUpload);

module.exports = router;