function gameStats() {
<<<<<<< HEAD
  var queryURL =
    "https://www.superheroapi.com/api.php" + accessToken + dropDown;
  var accessToken = "/10223238752664036";
  var dropDown = "/664";

=======
  var queryURL = "http://www.dnd5eapi.co/api/";
  // var apiKey = "options"; from drop down menu
>>>>>>> 175262b2495078d99b972ab33655512e1784f9f6
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
<<<<<<< HEAD
    console.log(response);
    response.array.forEach((element) => {
      console.log(element);
    });
=======
    console.log(JSON.parse(statsResponse));
    var results = response.data;
    var helper = "ability-scores";
    var statsResponse = $("<div>").text(response.helper);
    $(".stats").append(JSON.parse(statsResponse));
    // var charClass = response.class not working need response DOM location
    //var charRace =   response.race not working need response DOM location
    //var charRace =   response. not working need response DOM location
    //var charRace =   response.race not working need response DOM location
>>>>>>> 175262b2495078d99b972ab33655512e1784f9f6
  });
}
gameStats();
$(".btn").on("click", function (event) {
  event.preventDefault();
  alert(JSON.parse(response));
  gameStats();
  console.log(gameStats);
});