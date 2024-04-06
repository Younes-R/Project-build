const { Router } = require('express');
const authContorller = require('../controllers/authController')
const router = Router();

router.get('/signup',authContorller.signup_get);
router.post('/signup',authContorller.signup_post);
router.get('/login',authContorller.login_get);                                                                         
router.post('/login',authContorller.login_post);
router.get('/logout',authContorller.logout_get);

module.exports = router;