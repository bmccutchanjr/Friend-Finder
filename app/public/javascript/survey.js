var ting = new Audio("audio/ting.mp3");

$(document).ready (function ()
{   // The page has just loaded -- the user has not had an opportunity to interact with it yet.  Make
    // the first survey question visible...
    $(".question-div[which=0]").css("display", "block");

    $(".chosen-select").on("change", function(event)
    {   // The value of a survey question has been changed -- hopefully to a valid response.  Validate
        // it and if valid, display the next question.

        event.preventDefault ();

        var valid = true;
        var question = $(event.currentTarget);
        var which = question.attr("which");

        // The survey responses are predefined in a <select> and this function is called by the on change
        // event listener.  If the event fired, the associated <select> was changed and the value should
        // always be valid.  No need to validate the response here, just display the next question.

        if (which < 9)
        {   // If this is not the last question in the survey, then hide this question and display the
            // next.

            $(".question-div[which=" + which + "]").css("display", "none");
            
            ting.load();
            ting.play();
        
            which++;
            $(".question-div[which=" + which + "]")
            .css(
                {   "display": "block",
                    "opacity":  0.0
                })
            .animate({opacity: 1.0}, 2000);
        }
        else
        {   // If it is the last question, display the submit button

            $(".submit-button").css("display", "block");
        }
    });

    $(".submit-button").click(function (event)
    {   // event listener for sunmit button

        event.preventDefault();

        // First, set the color of all the labels and questions to black.  It's possible this is not the
        // first time the user has clicked the submit button, and it it possible that everything is still
        // not filled in.  To avoid confusion, reset the colors so we won't be inadvertantly signaling
        // an error on a field that has been corrected.

        $(".prompt-text").css("color", "black");

        var valid = true;

        var name = $("#name").val().trim();
        if (!name)
        {   valid = false;
            $("#name-label").css("color", "red");
        }

        var photo = $("#photo").val().trim();
        if (!photo)
        {   valid = false;
            $("#photo-label").css("color", "red");
        }
        
        var scores = [];

        for (var i=0; i<10; i++)
        {   // build an array of survey responses...at the same time, insure that all survey questions
            // have been answered.

            var option = $(".chosen-select[which=" + i + "] option:selected").val();

            if (!option)
            {   valid = false;

                $(".question-text[which=" + i + "]").css ("color", "red");
            }
            else
            {   scores.push(parseInt(option));
            }
        }

        if (valid)
        {   var data =
            {   "name":     $("#name").val().trim(),
                "photo":    $("#photo").val().trim(),
                "scores":   scores
            }

            $.post ("api/friends/", data, function (response, status)
            {   // format the data received from the server and display on the screen
                var rDiv = $(".response-data")
                rDiv.empty();

                var title = $("<h2>");
                title.text (response.name);

                var image = $("<img>");
                image
                .attr ("src", "images/" + response.photo)
                .css ("hieght", 300)
                .css ("width", 200);

                rDiv
                .append (title)
                .append (image);

                $(".response").css("display", "flex");
            })

        }
    });

    $(".close-button").click(function(event)
    {   // event handler for "close" button in response <div>

        $(".response").css("display", "none");
    })
})
