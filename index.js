// Loading modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Cookies = require("cookies");

// require dotenv for local testing env
if (process.env.NODE_ENV === "test") require("dotenv").config();

// Loading router
const router = require("./router");

// PORTS
const HTTP_PORT = process.env.PORT || 5000;

// Set up HTTP server
let app;
app = express();
const server = app.listen(HTTP_PORT);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Router
router(app);

module.exports = app;
