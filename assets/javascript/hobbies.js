$(document).ready(function() {

    // global variables
    topics = ["knitting", "sewing", "gaming", "sleeping", "writing", "coloring", "flowers", "reading", "books", "animals", "computers"];
    limit = 10;
    var searchTerm = "";

    renderButtons();

    // put buttons on the DOM
    function renderButtons() {
    $(".topic-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
          var buttonDIV = $("<div>");
          buttonDIV.addClass("col-md-2");
          var button = $("<button>");
          button.addClass("topic");
          button.addClass("btn");
          button.addClass("btn-primary");
          button.addClass("btn-block");
          button.attr("value", topics[i]);
          button.text(topics[i]);
          $(buttonDIV).append(button);
          $(".topic-buttons").append(buttonDIV);
        }
      }

    // click on buttons
    $(".topic").on("click", function(event) {
        event.preventDefault();
        $(".giphy-div").empty();
        limit = 10;
        searchTerm = $(this).attr("value").trim();
        console.log(searchTerm);
        searchGIFS(searchTerm);
    })

    // click on search
    $("#go-search").on("click", function(event) {
        event.preventDefault();
        $(".giphy-div").empty();
        limit = 10;
        searchTerm = $("#search-term").val().trim();
        topics.push(searchTerm);
        renderButtons();
        console.log(searchTerm);
        searchGIFS(searchTerm);
    });

    
    // call the API & show the results
    function searchGIFS(searchTerm) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=jMGBUBVO8vEvHOQhw9gvKH15kMsqokTo&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (i = limit - 10; i < response.data.length; i++) {
        var giphyItem = $("<div>");
        $(giphyItem).addClass("col-md-6");
        var giphyImage = $("<img>");
        $(giphyImage).attr("src", response.data[i].images.fixed_width_still.url);
        $(giphyImage).addClass("img-fluid");
        $(giphyImage).addClass("gif" + limit)
        $(giphyImage).attr("data-animate", response.data[i].images.fixed_width.url);
        $(giphyImage).attr("data-still", response.data[i].images.fixed_width_still.url);
        $(giphyImage).attr("data-state", "still");
        var giphyTitle = $("<div>").html("<strong>Title:</strong> " + response.data[i].title);
        $(giphyTitle).addClass("col-md-6");
        $(giphyTitle).addClass("float-right");
        var giphyRating = $("<div>").html("<strong>Rated:</strong> " + response.data[i].rating);
        var giphyTitle = $("<div>").html("<strong>Title:</strong> " + response.data[i].title);
        var giphyLinks = $("<div>").html("<strong>Found at:</strong> <a href='" + response.data[i].url + "' target='_blank'>Giphy</a> | <a href='" + response.data[i].source + "' target='_blank'>Source</a>");
        // var giphyDL = $("<div>").html("<a href='" + response.data[i].images.original.url + "' download><button class='btn btn-primary'><i class='fa fa-download'></i>Download</button></a>");
        $(".giphy-div").append(giphyItem);
        $(giphyItem).append(giphyImage, giphyTitle, giphyRating, giphyLinks);
        }

        // pause & play
        $(".gif" + limit).on("click", function() {
        var state = $(this).attr("data-state");
        console.log("clicking captured");
        console.log(state);

        if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }
        else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
        }
        })
    })

    }

    // more gifs button
    $(".more").on("click", function(event) {
        event.preventDefault();
        limit += 10;
        searchGIFS(searchTerm);
    })

    // clear gifs
    $(".clear").on("click", function(event) {
        event.preventDefault();
        $(".giphy-div").empty();
    })

})