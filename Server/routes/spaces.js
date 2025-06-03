const express = require('express');
const { createSpace, joinSpace, uploadImage } =  require('../controllers/spaceController.js');
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/create', authMiddleware, createSpace);
router.post('/join', authMiddleware, joinSpace);
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
