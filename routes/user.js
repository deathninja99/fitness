require("dotenv").config();
const cookie_parser = require("cookie-parser");
const express = require("express");
const { cookie_secret } = process.env;
const userRouter = express.Router();

userRouter.use(async (req, res, next) => {});
