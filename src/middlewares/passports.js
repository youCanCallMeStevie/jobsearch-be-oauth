const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../services/users/schema");
const { generateTokens } = require("./tokens");
const { generateUserFromGoogle } = require("../utils/oAuthUsers");

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.BE_URL}/googleRedirect`,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log("Google user's profile", profile);
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = generateUserFromGoogle;
          user = await newUser.save();
        }
        const tokens = generateTokens(user);
        user.refreshToken = tokens.refreshToken;
        done(null, { user, tokens });
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
