// htmlRoutes implements the routes that handle static files; the HTML, CSS and JavaScript files
// that make up the front-end of the app

// First get the dependencies
// Start with ExpressJS
const express = require("express");
// Configure ExpressJS
const app = express();
const router = express.Router ();
app.use ("/", router);
// app.use(express.static ("../public"));

// Other dependencies
const chalk = require ("chalk");
const path = require("path");

router
.get ("/", function (request, response)
{   // The default route...return the home page

    console.log (chalk.blue("requesting home page"));
    response.sendFile(path.join(__dirname, "../public/home.html"));
})
.get ("/image/:what", function (request, response)
{   // generic handler for images in the response data

    console.log(chalk.blue("serving: ", request.params.what))
    response.sendFile(path.join(__dirname, "../images/" + request.params.what));
})
.get ("/:what", function (request, response)
{   // generic handler for all routes other than the home page

console.log (chalk.yellow("/:what"));
    switch (request.params.what)
    {   case "favicon.ico":
        case "style.css":
        case "survey.html":
        case "survey.js":
        {   console.log(chalk.blue("serving file: ", request.params.what));
        
            response.sendFile(path.join(__dirname, "../public/" + request.params.what));
            break;
        }
        default:
        {   console.log(chalk.red("requested file: ", request.params.what));
            response.send ("404 - File not found");
            break;
        }
    }
});

module.exports = router;