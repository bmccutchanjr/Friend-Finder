$(document).ready(function()
{   // JavaScript for home.html

    $(".api-button").click(function(event)
    {   // event handle for button clicks on the "Take the Survey" button.

        event.preventDefault();

        window.open ("api/friends", "_blank");
    });

    $(".survey-button").click(function(event)
    {   // event handle for button clicks on the "Take the Survey" button.
    
        event.preventDefault();

        window.open ("survey.html", "_blank");
    });
});