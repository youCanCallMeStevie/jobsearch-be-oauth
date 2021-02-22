const express = require("express");
const passport = require("passport");

exports.oAuthRedirectController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.user.tokens;
    //setting a cookie and giving it a name
    res.cookie(
      "accessToken",
      accessToken,
      //providing options, which means the JS code cannot check the content
      {
        httpOnly: true,
        //anther option is 'secure' and this is regarding using https
      }
    );
    //setting a cookie and giving it a name
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //determine when the cookie needs to be used
      path: "/refreshToken",
    });
    res.status(200).redirect(`${process.env.FE_URL_DEV}`); //sending back to FE & there is no body in a redirect
  } catch (error) {
    console.log(error);
    next(error);
  }
};
