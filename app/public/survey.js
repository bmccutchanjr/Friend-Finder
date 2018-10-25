$(document).ready (function ()
{   
// console.log ("survey.html");

    $(".submit").click(function (event)
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
        {   // build an array of survey responses...at th same time, insure that all survey questions
            // have been answered.

            var option = $(".chosen-select[value=" + i + "] option:selected").val();
// console.log ($(".chosen-select[value=" + i + "]"));
// console.log ($(".chosen-select[value=" + i + "] option:selected"));
// console.log ("option: ", option);
            if (!option)
            {   valid = false;
// console.log ("question #", i, " not answered");
                $(".select-text[value=" + i + "]").css ("color", "red");
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
