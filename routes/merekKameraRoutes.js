const express = require('express');
const router = express.Router();
const merekkameraControllers = require('../controllers/merekKameraController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', merekkameraControllers.getAll);
router.post('/', cekApiKey, merekkameraControllers.create);

module.exports = router;