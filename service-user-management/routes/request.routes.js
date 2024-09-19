const express = require("express");
const router = express.Router();
const {generateAuthUrl} = require('../controllers/request.controller')

router.get("/", generateAuthUrl);

module.exports = router;
