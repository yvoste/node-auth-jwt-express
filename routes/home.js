const express = require('express')
const router = express.Router()
const front = require("../controllers/controller_frontend");

router.get('/', front.home)

module.exports = router