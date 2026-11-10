const express = require('express');
const router = express.Router();
const kameraControllers = require('../controllers/kameraControllers');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', kameraControllers.getAll);
router.get('/:id', kameraControllers.getById);
router.post('/', cekApiKey, kameraControllers.create);
router.put('/:id', cekApiKey, kameraControllers.update);
router.delete('/:id', cekApiKey, kameraControllers.remove);
module.exports = router;