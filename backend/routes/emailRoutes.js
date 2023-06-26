const express = require('express');
const mailController = require('../controllers/emailController');

const router = express.Router();

router.route('/').post(mailController.sendEmail);

module.exports = router;
