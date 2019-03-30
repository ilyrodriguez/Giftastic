$(document).ready(function() { 
   
    var gifs = ["Animals", "Food and Drinks", "Cartoons", "Movies", "Music", "nature", "Science"];
    
    function displayGifRating() {

        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=dc6zaTOxFJmzC";
         
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(this);
            var results = response.rating;

            var gifDiv = $("<div class='divGif'>");
            var showGif = $('<img>');
            showGif.attr('src', results[i].images.fixed_height_still.url);
            showGif.attr('title', "Rating: " + results[i].rating);
			showGif.attr('data-still', results[i].images.fixed_height_still.url);
			showGif.attr('data-state', 'still');
			showGif.addClass('gif');
			showGif.attr('data-animate', results[i].images.fixed_height.url);
            // var image = $("<img>").attr("src", results[i].images.fixed_height.url);
            gifDiv.append(p);
            gifDiv.append(showGif);
    
            $("#gif-view").prepend(gifDiv);
        });
    }
    
    function makeButtons(){ 
        // deletes the gif prior to adding new gif so there are no repeat buttons
        $("#buttons-view").empty();
        // loops through the gif array
        for (var i = 0; i < gifs.length; i++){
            // dynamically makes buttons for every gif in the array
            var a = $("<button>") 
            a.addClass("gif-btn"); // add a class
            a.attr("data-name", gifs[i]); // add a data-attribute
            a.text(gifs[i]); // make button text
            $("#buttons-view").append(a); // append the button to buttonsView div
        }
    }
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        makeButtons();
      });

    $(document).on("click", ".gif-btn", displayGifRating);
    makeButtons();







})