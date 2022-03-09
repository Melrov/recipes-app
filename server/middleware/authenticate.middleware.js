const passport = require("passport");

async function authenticate(req, res, next) {
  //passport.authenticate returns a function that (req, res, next is immediately calling)
  await passport.authenticate("jwt", (err, user, info) => {
      if(err || !user){
          return res.status(500).send({success: false, data: null, error: info})
      }
      req.user = user;
      return next()
  })(req, res, next);
}

module.exports = authenticate;