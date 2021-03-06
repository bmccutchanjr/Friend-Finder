# Friend-Finder

Friend Finder is a full stack NodeJS application utilizing ExpressJS.  It's model is a simple "dating" site.  Visitors answer a short survey which are compared to data on the server.  The closest match is returned to the web browser.

Here's a [video](https://drive.google.com/file/d/1PEIqVOxlSr4BNR7-NNAMuJIOlVRAfIud/view) of the application in action, or feel free to [try it](https://bmccutchanjr-friend-finder.herokuapp.com/) for yourself.

## the user intervace

![home page](/app/public/images/home.png)

The user interface is two simple web pages that are served up by the server, utilizing HTML, CSS, JavaScript an jQuery.  The home page simply identifies the application and provides a button to access the survey.

## the server

The server is a NodeJS application and uses ExpressJS.  It consists of four modules `server.js`, `htmlRoutes.js`, `apiRoutes.js` and `friends.js`.  apiRoutes is responsible for implementing the API endpoints and htmlRoutes implements the routes to serve the web pages, images, CSS and JavaScript files used on the front end.

### apiRoutes

There are two endpoints, both identified as '/api/friends' and accessed with a `GET` and `POST` request.  The GET request returns a list of all of the 'friends' registered in the database as a JSON file.  It is simply displayed as such in the browser.

```
[
    {
        "name": "Carol Channing",
        "photo": "carol.jpg",
        "scores": [
            3,
            4,
            5,
            3,
            3,
            1,
            2,
            3,
            1,
            1
        ]
    }
]
```

`scores` is an array of 10 elements ranging from 1 to 5 and represent the survey results submitted by the browser.

The POST endpoint does the real work of the application.  The survey results from the visitor are compared to each of the 'friends' in the database.  The difference in the scores of each survey question is accumulated and the 'friend' with the closest match is returned to the browser.
