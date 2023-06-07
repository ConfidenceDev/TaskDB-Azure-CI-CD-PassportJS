const router = require("express").Router();
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = require("../configs/config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const {
  storeUser,
  findAUser,
  getAllUsers,
  getAllSize,
  getAvgFollowers,
  mostCommonLocation,
} = require("../controller/user_controller");

// =============== Configurations ============
const pointGoogle = "/users/google";
const pointGithub = "/users/github";
const startPoint = "/task";

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: pointGoogle,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: pointGithub,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, callback) => callback(null, user));
passport.deserializeUser((user, callback) => callback(null, user));

// =============== Login ============
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// =============== Callback ============
router.get("/users/google", passport.authenticate("google"), (req, res) => {
  storeUser(req.user, res);
});

router.get("/users/github", passport.authenticate("github"), (req, res) => {
  storeUser(req.user, res);
});

// =============== Data Endpoints ============
router.get(`${startPoint}/:id`, (req, res) => {
  findAUser(req.params.id, res);
});

router.get(`${startPoint}/all/:provider`, (req, res) => {
  getAllUsers(req.params.provider, res);
});

router.get(`${startPoint}/size/:provider`, (req, res) => {
  getAllSize(req.params.provider, res);
});

router.get(`${startPoint}/avg/:provider`, (req, res) => {
  getAvgFollowers(req.params.provider, res);
});

router.get(`${startPoint}/location/:provider`, (req, res) => {
  mostCommonLocation(req.params.provider, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
