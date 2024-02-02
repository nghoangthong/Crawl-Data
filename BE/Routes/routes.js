const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/controllers');

// router.get('/', homeController.renderHomePage);
router.get('/comments',homeController.getComments);
router.get('/token', homeController.accessToken);
router.post('/save', express.json(), express.urlencoded({ extended: true }), homeController.saveData);

module.exports = router;