const express = require('express');
const { createSpace, joinSpace } =  require('../controllers/spaceController.js');

const router = express.Router();

router.post('/create', createSpace);
router.post('/join', joinSpace);

module.exports = router;
