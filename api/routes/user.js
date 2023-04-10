const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const END_POINTS = require("../utils/endPoints");

router.post(END_POINTS.register_url, UserController.user_register);

router.post(END_POINTS.login_url, UserController.user_login);

router.get(END_POINTS.user, checkAuth, UserController.get_all_user);

router.delete(END_POINTS.user_with_id_path, checkAuth, UserController.user_delete);

router.get(END_POINTS.user_with_id_path, checkAuth, UserController.user_details);

router.patch(END_POINTS.user_with_id_path, checkAuth, UserController.update_user_details);

module.exports = router;