var ting = new Audio("ting.mp3");

// function getQuestion()
// {   // Returns an array of .question-div with attribute unanswered=true
// 
//     return questions = $(".question-div[unanswered='true'");
// }

$(document).ready (function ()
{   

// var questions = $(".question-div[unanswered='true'");
// console.log("ready");
// console.log("questions: ", questions);
// console.log("which: ", $(questions[0]).attr("which"));
//     var questions = getQuestions ();

// console.log ("survey.html");
    // The page has just loaded -- the user has not had an opportunity to interact with it yet.  Make
    // the first survey question visible...
    $(".question-div[which=0]").css("display", "block");

    $(".chosen-select").on("change", function(event)
    {   // The value of a survey question has been changed -- hopefully to a valid response.  Validate
        // it and if valid, display the next question.

        event.preventDefault ();

// console.log("change");
// console.log("event: ", event);
// console.log("target: ", event.currentTarget);
// console.log("which one: ", $(event.currentTarget).attr("select"));
        var valid = true;
        var question = $(event.currentTarget);
        var which = question.attr("which");
// console.log("which: ", which);

//         var option = parseInt($(event + " option:selected").val());
//         var option = parseInt($(".chosen-select[which=" + which + "] option:selected").val());
// console.log("option: ", option);
//         if (isNaN(option)) valid = false;
    
//         if ((option < 1) || (option > 5))
//         {   // The survey responses are predefined in a <select>.  Possible <options> are a null
//             // string or values "1", "2", "3", "4" or "5".  This should never happen, but should it
//             // happen it needs to be handled.
        
//             valid = false;
//         }

//         if (!valid)
//         {   $("question-text[which=" + which + "]").css ("color", "red");
//         }
//         else
//         {   // The response was valid.  Hide this question and display the next.

//             $(".question-div[which=" + which + "]").css("display", "none");
            
//             if (which < 9)
//             {   which++;
//                 $(".question-div[which=" + which + "]").css("display", "block");
//             }
//         }
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

// console.log("on click")
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
// console.log ($(".chosen-select[value=" + i + "]"));
// console.log ($(".chosen-select[value=" + i + "] option:selected"));
// console.log ("option: ", option);
            if (!option)
            {   valid = false;
// console.log ("question #", i, " not answered");
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

console.log ("data: ", data);

            $.post ("http://localhost:4000/api/friends/", data, function (response, status)
            {
console.log ("posted and responded");            

                var rDiv = $(".response-data")
                rDiv.empty();

                var title = $("<h2>");
                title.text (response.name);

                var image = $("<img>");
                image
                .attr ("src", "image/" + response.photo)
                .css ("hieght", 300)
                .css ("width", 200);

                var close = $("<button>");
                close
                .addClass("close")
                .attr ("value", "close")
                .text ("CLOSE");

                rDiv
                .append (title)
                .append (image)
                .append (close);

                $(".response").css("display", "flex");
            })

        }
    });

    $(".response-data").on ("click", ".close", function(event)
    {   // event handler for "close" button in response <div>

//         $(".response").hide();

        $(".response").css("display", "none");
    })
})
