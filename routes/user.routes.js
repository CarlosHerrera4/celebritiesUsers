const express = require('express');
const router = express.Router();
const routerController = require('../controllers/user.controller');

router.get('/create', routerController.create)
router.post('/create', routerController.doCreate);

module.exports = router;