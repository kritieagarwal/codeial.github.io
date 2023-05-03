const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controller/comments_controller');

// checking authentication so that only signed in user can only post
router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;