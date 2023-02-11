const { Router } = require("express");
const Auth = require("../controllers/AuthController");
const Verify = require("../middleware/authMiddleware")
const router = Router();
const Quiz = require("../controllers/QuizController")
// import { google_login } from "../controllers/AuthController"

router.post("/signup", Auth.signup_post);
router.post("/login", Auth.login_post);
router.get("/currUser", Verify.verifyToken, Verify.getUser)
router.get("/refresh", Verify.refreshToken, Verify.verifyToken, Verify.getUser)
router.post("/logout", Verify.verifyToken, Verify.logout)
//post quiz
router.post("/user/:id/quizes", Quiz.quiz_post)
//google login
router.post("/google-login", Auth.google_login)
//facebook login
router.post("/facebook-login", Auth.facebook_login)
//social media logout
router.post("/social-media-logout", Verify.social_media_logout)
//refresh socialMediaLogin
router.get("/social-media-login-refresh", Verify.getUser)





module.exports = router;
