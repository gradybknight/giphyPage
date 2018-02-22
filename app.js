// Global Variables
var arrayOfGifNames = ["goat", "cow", "monkey", "gorilla", "dog", "cat", "sheep"];
var queryURL="https://api.giphy.com/v1/gifs/search?api_key=N2zokGkLIaXSDEHpDeCVnMxgUT8NcTa1&limit=25&q=";
var currentResponseFromGiphy;

function queryGiphy(testString){
    $.ajax({
        url: queryURL+testString,
        method: 'GET'
      }).then(function(response) {
        console.log(response);
        currentResponseFromGiphy=response;
        populateGifHolder();
      });
}

function populateGifHolder(){
    $(".gifHolder").empty();
    for (var i=0; i<currentResponseFromGiphy.data.length;i++){
        var newParentDiv = $("<div>");
        var newImg = $("<img>");
        newImg.attr("isMoving",false);
        newImg.attr("src",currentResponseFromGiphy.data[i].images.fixed_width_small_still.url);
        var newDesc = $("<div>");
        newDesc.text(currentResponseFromGiphy.data[i].rating);
        newParentDiv.append(newDesc);
        newParentDiv.append(newImg);
        $(".gifHolder").append(newParentDiv);
    }
}

function toggleAnimation(){
    if ($(this).attr("isMoving")=="false"){
        $(this).attr("src",$(this).attr(currentResponseFromGiphy.data[i].images.fixed_width_small.url));
        $(this).attr("isMoving","true");
    } else {
        $(this).attr("src",$(this).attr(currentResponseFromGiphy.data[i].images.fixed_width_small_still.url));
        $(this).attr("isMoving","true");
    }
}

function buildGifAndAttributeDiv(indexOfGifInArrayOfGIFs){

}

/*
Main program flow
prepoulate div of buttons from array of gif strings
Click listener for buttons: 1. Query giphy and populate div of gifs
Click listener for gifs: toggle animation
Click listener for user input: 1. query giphy and populate div of gifs. 2. add button and update array of strings

*/
queryGiphy("goat");