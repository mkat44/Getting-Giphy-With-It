$(document).ready(function() {

    // arrays for gif pages
    var animals = [];
    var anime = [];
    var movies = [];
    var shows = [];
    var hobbies = [];

    // click on search
    $("#go-search").on("click", function(event) {
        event.preventDefault();
        var searchTerm = $("#search-term").val().trim();
        console.log(searchTerm);
        searchGIFS(searchTerm);
    });

    // call the API
    function searchGIFS(searchTerm) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=jMGBUBVO8vEvHOQhw9gvKH15kMsqokTo&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        })
    }

    // show the results

    // pause & play
})