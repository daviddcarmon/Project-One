function gameStats() {
  var queryURL =
    "https://www.superheroapi.com/api.php" + accessToken + dropDown;
  var accessToken = "/10223238752664036";
  var dropDown = "/664";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    response.array.forEach((element) => {
      console.log(element);
    });
  });
}
