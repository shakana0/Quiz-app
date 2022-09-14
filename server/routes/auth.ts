const { Router } = require("express");
const Auth = require("../controllers/AuthController");
const requireAuth = require("../middleware/authMiddleware")

const router = Router();

router.get("/signup", Auth.signup_get);
router.post("/signup", Auth.signup_post);
router.get("/login", requireAuth, Auth.login_get);
router.post("/login", Auth.login_post);

module.exports = router;
