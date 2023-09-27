const { Router } = require("express");
const Auth = require("../controllers/AuthController");
const Verify = require("../middleware/authMiddleware");
const router = Router();
const Quiz = require("../controllers/QuizController");
const UploadImg = require("../middleware/uploadMiddleware")


router.post("/signup", Auth.signup_post);
router.post("/login", Auth.login_post);
router.get("/currUser", Verify.verifyToken, Verify.getUser);
router.get("/refresh", Verify.refreshToken, Verify.verifyToken, Verify.getUser);
router.post("/logout", Verify.verifyToken, Verify.logout);

//google login
router.post("/google-login", Auth.google_login);
//facebook login
router.post("/facebook-login", Auth.facebook_login);
//social media logout
router.post("/social-media-logout", Verify.socialMediaLogout);
//get current google or facebook login
router.get(
  "/curr-google-user",
  Verify.verifySocialMediaUser,
  Auth.google_login
);
router.get(
  "/curr-facebook-user",
  Verify.verifySocialMediaUser,
  Verify.getFacebookUser
);

//post quiz
router.post("/user/:id/quizes", UploadImg.array('images'), Quiz.quiz_post);
//delete quiz
router.delete("/user/:userId/:quizId/quiz", Quiz.quiz_delete);
//get all quizes
router.get("/user/:userId/quizes", Quiz.quiz_get);


module.exports = router;
