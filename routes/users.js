const express = require('express');
const router = express.Router();


const usersController = require('../controller/users_controller');


router.get('/profile', usersController.profile);

router.get('/posts', usersController.posts);

router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);

// router.post('/signout', usersController.delete);
router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);

module.exports = router;