function displayImg() {
    $("#display-images").empty();
    var input = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=8OnpuK93M1dvSH36Erw7nQlOEdnVRuGs";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        for (var i = 0; i < limit; i++) {

            // create a div tag for each search query then ...
            var display_Div = $("<div>");
            display_Div.addClass("holder");

            // ... create an imageTag tag and add a bunch of attributes ...
            var imageTag = $("<img>");
            imageTag.attr("src", response.data[i].images.original_still.url);
            imageTag.attr("data-still", response.data[i].images.original_still.url);
            imageTag.attr("data-animate", response.data[i].images.original.url);
            imageTag.attr("data-state", "still");
            imageTag.attr("class", "gif");

            // ... then append imageTag tag to parent div
            display_Div.append(imageTag);

            // ... then create a P tag and obtain the gifs rating ...
            var ratingData = response.data[i].rating;

            var rating_Ptag = $("<p>");
            rating_Ptag.attr("id", "gifRating")
            rating_Ptag.text("Rating: " + ratingData);

            // ... add tag to display div below image
            display_Div.append(rating_Ptag);

            // add new divs to the display-imageTags parent div
            $("#display-images").append(display_Div);
        }
    });
};

function renderButtons(buttonList) {
    // you are rebuilding the buttons everytime
    // there is a new button; clear old first
    $("#display-buttons").empty();

    for (var i = 0; i < buttonList.length; i++) {
        var newButton = $("<button>");
        newButton.attr("class", "btn btn-light");
        newButton.attr("id", "input")
        newButton.attr("data-name", buttonList[i]);
        newButton.text(buttonList[i]);
        $("#display-buttons").append(newButton);
    }
};

// change whether the image is still or an animated gif by clicking
function ChangeImageState() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
};

// code entry point
function Main() {

    // set page to run only after everything loaded
    $(document).ready(function () {
        var displayedButtons = ["No, really", "That's great", "You're so funny"];

        $("#submitPress").on("click", function () {
            var input = $("#user-input").val().trim();
            form.reset();
            displayedButtons.push(input);

            renderButtons(displayedButtons);

            return false;
        });

        renderButtons(displayedButtons);

        $(document).on("click", "#input", displayImg);
        $(document).on("click", ".gif", ChangeImageState);
    });

};

Main()