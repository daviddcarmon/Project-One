function gameStats() {
  var queryURL = "http://www.dnd5eapi.co/api/spells";

  // var apiKey = "options"; from drop down menu
  $.ajax({
    url: queryURL,
    type: "GET",
    dataType: "jsonp",
    cors: true,
    // contentType: "application/json",
    secure: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // response.header("Access-Control-Allow-Origin": "*"),
  }).then(function (response) {
    console.log(response);
    window.location.href =
      "http://www.dnd5eapi.co/api/spells?callback=jQuery35007148894171472757_1588304846655&_=1588304846656/";

    // var statsResponse = $("<div>").text(response.ability - scores);
    // $(".stats").append(JSON.parse(response));
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
