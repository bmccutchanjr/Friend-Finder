// apiRoutes handles the routes specific to the Friends API.

// First, get the dependencies
// Start with ExpressJS
const express = require("express");
// ...Add configure ExpressJS
const app = express();
const router = express.Router ();
app.use ("/", router);
app.use(express.json ());
app.use(express.urlencoded({ extended: true }));

// Other dependencies
const chalk = require ("chalk");
const path = require("path");

// custom modules
const Friends = require("../data/friends.js");
const friends = new Friends ();

// Handle the routes
router
.get("/friends", function (request, response)
{   // get a list of the people reqistered with the app.  The list is returned as a JSON object

    console.log(chalk.blue("serving file: ", request.params.what));

    response.json(friends.getAll());
})
.post("/friends", function(request, response)
{   // handle the survey submission

    var surveyResults = request.body;

    var match = friends.findMatch (request.body.scores);

    response.json(friends.getMatch (match));

    // Now that we've searched the database and returned our best match, add this survey response to the
    // database.  Can't do that before we find the best match or the application would alway return the
    // response that was just submitted

    friends.add (request.body);
});

module.exports = router;