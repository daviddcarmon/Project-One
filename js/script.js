function gameStats(search) {
  var queryURL =
    "https://www.superheroapi.com/api.php/" + accessToken + dropDown;
  // var apiKey = "options"; from drop down menu
  var accessToken = "/10223238752664036";
  var dropDown = "powerstats";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}

var search = "api/";
gameStats(search);

// gameStats();
// $(".btn").on("click", function (event) {
//   event.preventDefault();
//   alert(JSON.parse(response));
//   gameStats();
//   console.log(gameStats);
// });

// window.location.href =
// "http://www.dnd5eapi.co/api/spells?callback=jQuery35007148894171472757_1588304846655&_=1588304846656/";

// dataType: "jsonp",
// cors: true,
// // contentType: "application/json",
// secure: true,
// headers: {
//   "Access-Control-Allow-Origin": "*",
// },

// console.log(Object.keys(response.results));

// var responseKeys = Object.keys(response.results);
// var responseValues = Object.values(response.results);
// console.log(responseKeys, responseValues);

// responseKeys.forEach();
// var helper = "ability-scores";
// console.log(helper);
// console.log("alt" + response);
// var test = response;
// console.log("this is test: " + response);
// var charClass = response.class not working need response DOM location
//var charRace =   response.race not working need response DOM location
//var charRace =   response. not working need response DOM location
//var charRace =   response.race not working need response DOM location
// var statsResponse = $("<div>").text(JSON.stringify(queryURL + helper));
// $(".stats").append(JSON.parse(statsResponse));
