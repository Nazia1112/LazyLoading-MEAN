var express = require('express');
var router = express.Router();
var postCont = require('../controller/postCont');

/* GET home page. */
router.post('/getPosts', postCont.getPost);

module.exports = router;
