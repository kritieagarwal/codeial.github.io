const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controller/posts_controller');

// checking authentication so that only signed in user can only post
router.post('/create', passport.checkAuthentication, postsController.create);
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;