const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // payload
    process.env.JWT_SECRET,            // secret
    { expiresIn: "7d" }                // expiry
  );
};

module.exports = generateToken;
