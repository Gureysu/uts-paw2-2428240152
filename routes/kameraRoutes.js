const express = require('express');
const router = express.Router();
const c = require('../controllers/kameraControllers');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', c.getAll);
router.get('/:id', c.getById);
router.post('/', cekApiKey, c.create);
router.put('/:id', cekApiKey, c.update);
router.delete('/:id', cekApiKey, c.remove);
module.exports = router;