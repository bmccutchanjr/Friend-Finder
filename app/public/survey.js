$(document).ready (function ()
{   
console.log ("survey.html");

    $(".submit").click(function (event)
    {   // event listener for sunmit button

console.log("on click")
        event.preventDefault();

        var data = 
        {   name:   "something",
            photo:  "something else",
            profile:
            [   Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1),
                Math.floor((Math.random() * 5) + 1)
            ]
        }
//         console.log ("data: ", data);

        $.post ("http://localhost:3000/api/survey", data, function (response, status)
        {   var rDiv = $(".response-data")
            rDiv.empty();

            var title = $("<h2>");
            title.text (response.name);

            var image = $("<img>");
            image
            .attr ("src", "http://localhost:3000/image/" + response.photo)
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
    });

    $(".response-data").on ("click", ".close", function(event)
    {   // event handler for "close" button in response <div>

//         $(".response").hide();

        $(".response").css("display", "none");
    })

    // // Chosen CSS
    // var config = 
    // {   ".chosen-select": {},
    //     ".chosen-select-deselect": {
    //         allow_single_deselect: true
    //     },
    //     ".chosen-select-no-single": {
    //         disable_search_threshold: 10
    //     },
    //     ".chosen-select-no-results": {
    //         no_results_text: "Oops, nothing found!"
    //     },
    //     ".chosen-select-width": {
    //         width: "95%"
    //     }
    // };
    // 
    // for (var selector in config)
    // {   $(selector).chosen(config[selector]);
    // }
})
