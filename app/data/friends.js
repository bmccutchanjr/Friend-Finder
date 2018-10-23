var Friends = function ()
{   // Construct an array of 10 celebrity names unfortunate enough to be selected for use in my
    // app.

    this.celebs = 
    [   {   name:   "Carol Channing",
            photo:  "carol.jpg"
        },
        {   name:   "Grace Kelly",
            photo:  "grace.jpg"
        },
        {   name:   "Philip Seymour Hoffman",
            photo:  "philip.jpg"
        },
        {   name:   "Jane Mansfield",
            photo:  "jane.jpg"
        },
        {   name:   "Steve McQueen",
            photo:  "steve.jpg"
        },
        {   name:   "Marilyn Monroe",
            photo:  "marilyn.jpg"
        },
        {   name:   "Paul Newman",
            photo:  "paul.jpg"
        },
        {   name:   "Elvis Presley",
            photo:  "elvis.jpg"
        },
        {   name:   "John Wayne",
            photo:  "john.jpg"
        },
        {   name:   "Natalie Wood",
            photo:  "natalie.jpg"
        }
    ];

    this.findMatch = function(data)
    {   // Compare the submitted survey results to ALL of the celebrity "profiles" to determine a best
        // match

        var score = 0;

        for (var i=0; i<10; i++)
        {   score = score + parseInt(data[i]);
        }
        var bestFriend = 0;                 // has to default to something - might as well be the first
        var bestMatch = 1000;

        var cLength = this.celebs.length;
        for (var i=0; i<cLength; i++)
        {   

            var iScore = 0;
            for (var j=0; j<10; j++)
            {   iScore += this.celebs[i].profile[j];
            }

console.log ("i: ", i, " score: ", score, " celeb score: ", iScore, " delta: ", Math.abs(score - iScore));
            if (Math.abs(iScore - score) < bestMatch)
            {   bestMatch = Math.abs(iScore - score);
                bestFriend = i;
            };
        };

        return bestFriend;
    };

    this.getMatch = function (match)
    {   return this.celebs[match];
    }

    var cLength = this.celebs.length;

    for (var i=0; i<cLength; i++)
    {   // Add an array of 10 randomly generated numbers to each of the celebrities.  This represents
        // their profile.

        var profile = [];

        for (var j=0; j<10; j++)
        {   profile.push (Math.floor(Math.random() * 5) + 1);
        }

        this.celebs[i].profile = profile;
    }
}

module.exports = Friends;