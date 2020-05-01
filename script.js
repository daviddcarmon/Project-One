function gameStats() {
  var queryURL = "http://dnd5eapi.co/api/";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var statsResponse = "";
    console.log(response);
  });
}
