
const GitHubStrategy = require("passport-github").Strategy;
const passport = require("passport");

export default class Passport {
  init(): any {
    return passport.use(
      new GitHubStrategy(
        {
          clientID: "32c165309b81af8510b0",
          clientSecret: "c78b52ea8eb44fa3e5e35730d726fc132667538f",
          callbackURL: "http://localhost:5000/auth/github/callback",
        },
        function (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: Function
        ) {
          console.log("Auth successful");
        }
      )
    );
  }
}
