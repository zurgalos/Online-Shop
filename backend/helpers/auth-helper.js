const jwt = require("jsonwebtoken");

async function getNewToken(user) {
  const payload = {
    user: {
      isAdmin: user.user.isAdmin,
      _id: user.user._id,
    },
  };
  return jwt.sign(payload, config.Jwt_Secret, { expiresIn: "1h" });
}

module.exports = getNewToken;
