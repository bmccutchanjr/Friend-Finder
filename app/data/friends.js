var Friends = function ()
{   // Construct an array of 10 celebrity names unfortunate enough to be selected for use in my
    // app.

    this.friends = 
    [   {   name:   "Carol Channing",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/carol.jpg"
        },
        {   name:   "Grace Kelly",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/grace.jpg"
        },
        {   name:   "Philip Seymour Hoffman",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/philip.jpg"
        },
        {   name:   "Jane Mansfield",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/jane.jpg"
        },
        {   name:   "Steve McQueen",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/steve.jpg"
        },
        {   name:   "Marilyn Monroe",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/marilyn.jpg"
        },
        {   name:   "Paul Newman",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/paul.jpg"
        },
        {   name:   "Elvis Presley",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/elvis.jpg"
        },
        {   name:   "John Wayne",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/john.jpg"
        },
        {   name:   "Natalie Wood",
            photo:  "https://bmccutchanjr-friend-finder.herokuapp.com/images/natalie.jpg"
        }
    ];

    this.findMatch = function(data)
    {   // Compare the submitted survey results to ALL of the friend's scores to determine a best
        // match

        var bestFriend = 0;                 // has to default to something - might as well be the first
        var bestMatch = 1000;               // some random value much larger than actually possible

        var fLength = this.friends.length;
        for (var i=0; i<fLength; i++)
        {   // for each element in friends[]...

            // accumulate the absolute value of the difference of scores submitted by our user
            // and scores of each element in friends[].

            var score = 0;
            for (var j=0; j<10; j++)
            {   // for each element in the respective profiles...

                score += Math.abs(parseInt(data[j]) - this.friends[i].scores[j]);
            }

            if (score < bestMatch)
            {   // The accumulated difference in scores is less than the previous best match.
                // This becomes the best match.  But keep looking, there could be a better match.

                bestMatch = score;
                bestFriend = i;
            }
        };

        return bestFriend;
    };

    this.add = function (data)
    {   // Add the data submitted by the user to friends[]

        var scores = [];
        for (var i=0; i<10; i++)
        {   scores.push (parseInt(data.scores[i]));
        }

        var newFriend = 
        {   "name": data.name,
            "photo": data.photo,
            "scores": scores
        }

        this.friends.push (newFriend);
    }

    this.getAll = function (match)
    {   return this.friends;
    }

    this.getMatch = function (match)
    {   return this.friends[match];
    }

    var cLength = this.friends.length;

    for (var i=0; i<cLength; i++)
    {   // Add an array of 10 randomly generated numbers to each of the friends.  This represents
        // their survey responses.

        var scores = [];

        for (var j=0; j<10; j++)
        {   scores.push (Math.floor(Math.random() * 5) + 1);
        }

        this.friends[i].scores = scores;
    }
}

module.exports = Friends;