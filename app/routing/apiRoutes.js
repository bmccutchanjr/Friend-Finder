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
    console.log(chalk.yellow("route = 'GET /friends'"));
    console.log(chalk.blue("serving file: ", request.params.what));

    response.json(friends.getAll());
})
.post("/friends", function(request, response)
{   // handle the survey submission

console.log (chalk.yellow("POST!!!"));
// console.log (chalk.yellow(request.url));

    // request.body hosts is equal to the JSON post sent from the user

    // This works because of our body parsing middleware

    var surveyResults = request.body;

// console.log("survey results: ", surveyResults);
// console.log ("request: ", request);
// console.log(chalk.yellow("profile: ", request.body));

// console.log("match: ", friends.findMatch (request.body.profile));
console.log ("apiRoutes: ", request.body.scores);
var match = friends.findMatch (request.body.scores);
//     // characters.push(newcharacter);
// 
// 
    response.json(friends.getMatch (match));

    // Now that we've searched the database and returned our best match, add this survey response to the
    // database.  Can't do that before we find the best match or the application would alway return the
    // response that was just submitted
console.log (request.body);
    friends.add (request.body);

});

module.exports = router;