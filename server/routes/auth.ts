const { Router } = require("express");
const Auth = require("../controllers/AuthController");
const Verify = require("../middleware/authMiddleware")
// const User = require("../db/models/auth")
const router = Router();

// router.get("/signup", Auth.signup_get);
router.post("/signup", Auth.signup_post);
// router.get("/login", Auth.login_get);
router.post("/login", Auth.login_post);
router.get("/currUser", Verify.verifyToken, Verify.getUser)
router.get("/refresh", Verify.refreshToken, Verify.verifyToken, Verify.getUser)
router.post("/logout", Verify.verifyToken, Verify.logout)


module.exports = router;
