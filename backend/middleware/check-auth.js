const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: "Bearer Token"
    if (!token) {
      throw new Error("Auth failed");
    }

    // Validiramo token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // Dodajemo data to request
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
