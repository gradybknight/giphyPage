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
        var newImg = $("<img class='theGIF'>");
        newImg.attr("isMoving",false);
        newImg.attr("arrayIndex",i);
        newImg.attr("src",currentResponseFromGiphy.data[i].images.original_still.url);
        var newDesc = $("<div>");
        newDesc.text(currentResponseFromGiphy.data[i].rating);
        newParentDiv.append(newDesc);
        newParentDiv.append(newImg);
        $(".gifHolder").append(newParentDiv);
    }
}

function populateButtonHolder(){
    $(".buttonHolder").empty()
    for (var i=0;i<arrayOfGifNames.length;i++){
        var textToSearch=arrayOfGifNames[i];
        var newButton = $('<button/>');
        newButton.attr("class","searchButton");
        newButton.text(arrayOfGifNames[i]);
        $(".buttonHolder").append(newButton);
    }
}

function toggleAnimation(theDiv){
    console.log(theDiv);
    console.log($(theDiv).attr("arrayIndex"));
    if ($(theDiv).attr("isMoving")=="false"){
        $(theDiv).attr("src",currentResponseFromGiphy.data[$(theDiv).attr("arrayIndex")].images.original.url);
        console.log($(theDiv).attr("src"));
        $(theDiv).attr("isMoving","true");
    } else {
        $(theDiv).attr("src",currentResponseFromGiphy.data[$(theDiv).attr("arrayIndex")].images.original_still.url);
        $(theDiv).attr("isMoving","true");
    }
}




/*
Main program flow
prepoulate div of buttons from array of gif strings
Click listener for buttons: 1. Query giphy and populate div of gifs
Click listener for gifs: toggle animation
Click listener for user input: 1. query giphy and populate div of gifs. 2. add button and update array of strings
*/
populateButtonHolder();

// Click Listeners
$(document).on("click",".theGIF",function(){
    event.preventDefault;
    console.log(currentResponseFromGiphy);
    console.log("holder clicked");
    toggleAnimation(this);
});
$(document).on("click",".searchButton",function(){
    event.preventDefault;
    console.log($(this).text());
    queryGiphy($(this).text());
});

$("input[type='submit']").on("click", function(event) {
    event.preventDefault();
    // Setting the input value to a variable and then clearing the input
    var val = $("input[type='text']").val();
    console.log(val);
    $("input[type='text']").val("");
    console.log(arrayOfGifNames);
    arrayOfGifNames.push(val);
    console.log(arrayOfGifNames);
    queryGiphy(val);
    populateButtonHolder();
    populateGifHolder();
  });
