const express = require("express");
const router = express.Router();
const {sendAuthRequest} = require('../controllers/oauth.controller')


router.get("/", sendAuthRequest);

module.exports = router;
