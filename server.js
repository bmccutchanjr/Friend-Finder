// NodeJS server

// Dependencies and initialization
// Express
const express = require("express");
var app = express();

app.use(express.static ("apps"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const PORT = process.env.PORT || 3000;

// other modules
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

// custome modules
const Friends = require("./app/data/friends.js");
var friends = new Friends ();

// And now to the stuff that servers are made of

// handle GET requests

app.get ("/", function (request, response)
{   console.log (chalk.green("requesting home page"));

    response.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get ("/image/:what", function (request, response)
{   // generic handler for images in the response data

console.log(chalk.blue("serving: ", request.params.what))
        response.sendFile(path.join(__dirname, "app/images/" + request.params.what));
});

app.get ("/:what", function (request, response)
{   // generic handler for all routes other than the home page

    switch (request.params.what)
    {   case "favicon.ico":
        case "style.css":
        case "survey.html":
        case "survey.js":
        {   console.log(chalk.green("serving file: ", request.params.what));
        
            response.sendFile(path.join(__dirname, "app/public/" + request.params.what));
            break;
        }
        default:
        {   console.log(chalk.blue("requested file: ", request.params.what));
            response.send ("404 - File not found");
            break;
        }
    }
});

app.post("/api/survey", function(request, response)
{   // handle the survey submission

console.log (chalk.yellow("POST!!!"));
console.log (chalk.yellow(request.url));

    // request.body hosts is equal to the JSON post sent from the user

    // This works because of our body parsing middleware

    var surveyResults = request.body;

    // console.log("survey results: ", surveyResults);
    // console.log("profile: ", request.body.profile);

    // console.log("match: ", friends.findMatch (request.body.profile));
    var match = friends.findMatch (request.body.profile);
//     // characters.push(newcharacter);
// 
// 
    response.json(friends.getMatch (match));

});




// Starts the server to begin listening
app.listen(PORT, function()
{
    console.log("Freind Finder is listening on PORT " + PORT);

});
