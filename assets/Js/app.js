$(document).ready(function() { 
   
    var topics = ["Animals", "Food and Drinks", "Cartoons", "Movies", "Music", "nature", "Science"];
    
    function displayGifRating() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=UxNR1uNih1F65bA3EEK3M4XZnDrOhr2A&limit=10";
         
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
            console.log(queryURL);
            console.log(response.data);

            var results = response.data;
            for (var i = 0; i < results.length; i++){
                var gifDiv = $('<div class= card>');
                gifDiv.addClass("mx-3")
                var showGif = $('<img>');
                var gifBody = $('<div class= card-body>');
                showGif.addClass("card-img-top gifClick");
                showGif.attr('src', results[i].images.fixed_height_still.url);
                showGif.attr('data-still', results[i].images.fixed_height_still.url);
                showGif.attr('data-animate', results[i].images.fixed_height.url);
                var p = $("<p>").text("Rating: " + results[i].rating);
                showGif.attr("data-state", "data-still");
                gifDiv.append(showGif);
                gifDiv.append(gifBody);
                gifBody.append(p);
                $("#gif-view").prepend(gifDiv);
            }
        });
    }

    function makeButtons(){ 
        $("#buttons-view").empty();
        for (i = 0; i < topics.length; i++){
            var a = $("<button>") 
            a.addClass("gif-btn"); 
            a.attr("data-name", topics[i]); 
            a.text(topics[i]); 
            $("#buttons-view").append(a); 
        }
    }
    // $(".gifClick").on("click", function(){
        $(document).on("click", ".gifClick", function(){
        console.log(this);
        var state = $(this).attr("data-state");
            if (state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            };
        });

    $("#add-gif").on("click", function() {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        makeButtons();
      });

    $(document).on("click", ".gif-btn", displayGifRating);
    makeButtons();
})