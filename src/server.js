const express = require("express");
const listEndPoints =require("express-list-endpoints");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const apiRoutes = require("./services/index");
require("./middlewares/passports")

const cookieParser = require("cookie-parser");
const {
    notFoundHandler,
    badRequestHandler,
    genericErrorHandler,
  } = require("./middlewares/errorHandling");

//INITIAL SETUP
const server = express();
const PORT = process.env.PORT || 4040;


//MIDDLEWARES

const whitelist = [`${process.env.FE_URL}`, `${process.env.FE_URL_DEV}` ]; //whose allowed, which can be an array of strings
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //credentials=cookies, and letting cors know that cookies are allowed
};

server.use(cors(corsOptions)); //if using cookies, you can't leave cors empty
server.use(passport.initialize());
server.use(express.json());
server.use(cookieParser());

//ROUTES
server.use('/api',apiRoutes)


//ERROR HANDLERS
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);
console.log(listEndPoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(PORT, () => {
      if (server.get("env") === "production")
      console.log("Server is running on CLOUD on PORT:", PORT);
      console.log("Server is running LOCALLY on PORT: http://localhost:", PORT);
    })
  )
  .catch((err) => console.log(err));