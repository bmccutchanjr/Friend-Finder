// A simple NodeJS server

// get the dependencies
const express = require("express");
const chalk = require("chalk");
const apiRoutes = require ("./app/routing/apiRoutes.js");
const htmlRoutes = require ("./app/routing/htmlRoutes.js");

// Configure ExpressJS
const app = express();
app.use(express.static ("app/public"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

const router = express.Router ();
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use ("/", router);

// Start the server to begin listening
app.listen(PORT, function()
{
    console.log("FriendFinder is listening on PORT " + PORT);

});
