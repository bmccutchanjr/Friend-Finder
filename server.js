// NodeJS server

// Dependencies and initialization
// Express
const express = require("express");
// Configure ExpressJS
const app = express();
app.use(express.static ("app/public"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

// other modules
const chalk = require("chalk");

// Custome modules to handle the routes
const apiRoutes = require ("./app/routing/apiRoutes.js");           // 02
const htmlRoutes = require ("./app/routing/htmlRoutes.js");         // 01

// ...And use those modules to handle routes

const router = express.Router ();
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use ("/", router);

// Start the server to begin listening
app.listen(PORT, function()
{
    console.log("FreindFinder is listening on PORT " + PORT);

});
