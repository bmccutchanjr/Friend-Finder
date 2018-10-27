// htmlRoutes implements the routes that handle static files; the HTML, CSS and JavaScript files
// that make up the front-end of the app

// First get the dependencies
const chalk = require ("chalk");
const express = require("express");
const path = require("path");

// Configure ExpressJS
const app = express();
const router = express.Router ();
app.use ("/", router);
app.use(express.static ("../public"));

// And now to the meat and potatoes of the application
router
.use (function (request, response, next)
{   // Here for debugging...I couldn't figure out my routes without it because if the route isn't
    // working, the console.log() doesn't execute.  I needed something that would always execute
    // regardless of the routes...
    //
    // Interesting to note that this doesn't always execute either, but that may be because the
    // browser is caching.

    console.log(chalk.yellow("requesting file: ", request.url));
    next ();
})
.get ("/images/:what", function (request, response)
{   // generic handler for images in the response data

    console.log(chalk.blue("serving: image/", request.params.what))
    response.sendFile(path.join(__dirname, "images/" + request.params.what));
})
.get ("/javascript/:what", function (request, response)
{   // generic handler for images in the response data

    console.log(chalk.blue("serving: javascript/", request.params.what))
    response.sendFile(path.join(__dirname, "javascript/" + request.params.what));
})
.get ("/style/:what", function (request, response)
{   // generic handler for images in the response data

    console.log(chalk.blue("serving: style/", request.params.what))
    response.sendFile(path.join(__dirname, "style/" + request.params.what));
})
.get ("/:what", function (request, response)
{   // generic handler for all routes other than the home page

    console.log(chalk.blue("serving file: ", request.params.what));
        
    response.sendFile(path.join(__dirname, request.params.what));
})
.get ("/", function (request, response)
{   // The default route...return the home page
    
    console.log (chalk.blue("requesting home page"));
    response.sendFile(path.join(__dirname, "home.html"));
});

module.exports = router;