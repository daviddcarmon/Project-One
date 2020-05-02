function gameStats() {
  var queryURL = "http://www.dnd5eapi.co/api/";
  // var apiKey = "options"; from drop down menu
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(JSON.parse(statsResponse));
    var results = response.data;
    var helper = "ability-scores";
    var statsResponse = $("<div>").text(response.helper);
    $(".stats").append(JSON.parse(statsResponse));
    // var charClass = response.class not working need response DOM location
    //var charRace =   response.race not working need response DOM location
    //var charRace =   response. not working need response DOM location
    //var charRace =   response.race not working need response DOM location
  });
}
gameStats();
$(".btn").on("click", function (event) {
  event.preventDefault();
  alert(JSON.parse(response));
  gameStats();
  console.log(gameStats);
});