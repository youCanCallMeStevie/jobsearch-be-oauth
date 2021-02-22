const { verifyToken } = require("./tokens");
const UserModel = require("../services/users/schema");

exports.isAuthorized = async (req, res, next) => {
  try {
    console.log("is Authorized req.cookies", req.cookies);
    const { accessToken } = req.cookies;
    console.log("is Authorized accessToken", accessToken);
    const decoded = verifyToken(accessToken, "access");
    console.log("is Authorized decoded", decoded);
    if (!decoded) throw new Error("Token not valid");
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error("User not authorised with that token");
    req.user = user;
    next();
  } catch (error) {
    new Error("You are not authorized");
    error.code = 401;
    next(error);
  }
};
