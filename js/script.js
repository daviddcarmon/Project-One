var heroesInfo = [];

superHeroData(1, 99);
superHeroData(100, 199);
superHeroData(200, 299);
superHeroData(300, 399);
superHeroData(400, 499);
superHeroData(500, 599);
superHeroData(600, 699);
superHeroData(700, 732);
function superHeroData(value, end) {
  // var end = 732;
  if (value > end) return;
  var queryURL = "https://www.superheroapi.com/api.php/";
  // var apiKey = "options"; from drop down menu
  var accessToken = "10223238752664036/";
  var dropDown = value;
  var search = "api/";
  // console.log(dropDown);
  var concatenate = queryURL.concat(accessToken + dropDown);
  $.ajax({
    url: concatenate,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
    heroesInfo.push(response);
    // console.log("end: " + end);
    superHeroData(value + 1, end);
    // console.log(heroesInfo);
  });
}
// superHeroData();

/// Marvel API
// function marvelAPICall() {
//   var timeStamp = "marvelAPI";
//   var MarvelApiKey = "b45ce047211df1651f4238f87bdcddb3";
//   var MarvelApiKeyPrivate = "6c6dc0777d2cb44c4d0809e202e0f71dd2eae3a6";
//   var hash = "400b3bf7e604977dc19260da4c3f407b";

//   var queryURL =
//     "https://gateway.marvel.com/v1/public/characters/" +
//     timeStamp +
//     "&apikey=" +
//     MarvelApiKey +
//     "&hash=" +
//     hash;
//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (marvelCall) {
//     console.log("marvel " + marvelCall);
//   });
// }
// marvelAPICall();

// have default values outside of the change event slider
var userIntelligence = 50;
$("#int").on("change input", function () {
  userIntelligence = $(this).next().siblings().val();
  // console.log("intelligence " + userIntelligence);
});
var userCombat = 50;
$("#combat").on("change input", function () {
  userCombat = $(this).next().siblings().val();
  // console.log("combat " + userCombat);
});
var userDurability = 50;
$("#durab").on("change input", function () {
  userDurability = $(this).next().siblings().val();
});

var userPower = 50;
$("#power").on("change input", function () {
  userPower = $(this).next().siblings().val();
});

var userSpeed = 50;
$("#speed").on("change input", function () {
  userSpeed = $(this).next().siblings().val();
});

var userStrength = 50;
$("#str").on("change input", function () {
  userStrength = $(this).next().siblings().val();
});

function calculateUserStats() {
  var userTotalStats =
    userIntelligence +
    userCombat +
    userDurability +
    userPower +
    userSpeed +
    userStrength;
  console.log(userTotalStats);
}
calculateUserStats();

function calculateHeroStats() {
  var superheroStats = heroesInfo;
  console.log(superheroStats);
  //powerstats
}
calculateHeroStats();

var bestSuperHeroMatch = {};
var bestMarvelMatch = {};

//for(){
//calculate the difference
//if difference < bestDifference{
// bestMatch = this hero
//   bestDifference = difference
// }
//}
for (var i = 0; i < heroesInfo.length; i++) {
  user;
}

// function getSuperheroData(targetElement, characterId) {
//   // configure request url
//   var url = '' + characterId;

//   // send get request to server
//   $.get(url, function (characterData) {
//       // parse response
//       var parsedCharacterData = JSON.parse(characterData);

//       // set super hero content
//       setSuperHeroContent(targetElement, parsedCharacterData);
//   });
// }

function powerStats(characterData) {
  // destructure character data
  var powerstats = characterData.powerstats;

  // destructure powerstats
  var intelligence = powerstats.intelligence;
  var strength = powerstats.strength;
  var speed = powerstats.speed;
  var durability = powerstats.durability;
  var power = powerstats.power;
  var combat = powerstats.combat;
}

function renderHeroesContent(targetElement, heroesInfo) {
  if (targetElement === "#dcbtn") {
    dcCharacter = heroesInfo;
  }
  if (targetElement === "#marbtn") {
    marCharacter = heroesInfo;
  }

  // destructure character data
  var characterName = heroesInfo.name;
  var characterImage = heroesInfo.image.url;
  var characterIntelligence = heroesInfo.powerstats.intelligence;
  var characterStrength = heroesInfo.powerstats.strength;
  var characterSpeed = heroesInfo.powerstats.speed;
  var characterDurability = heroesInfo.powerstats.durability;
  var characterPower = heroesInfo.powerstats.power;
  var characterCombat = heroesInfo.powerstats.combat;

  // var from MARV api needed

  // select corresponding player div
  var characterDiv = $(targetElement);

  // set background image
  characterDiv.css("background-image", "url('" + characterImage + "')");
  // set name
  characterDiv.find(".character-name").text(characterName);
  // set image
  characterDiv.find(".character-image").attr("src", characterImage);
  // set intelligence
  characterDiv.find(".character-intelligence").text(characterIntelligence);
  // set strength
  characterDiv.find(".character-strength").text(characterStrength);
  // set speed
  characterDiv.find(".character-speed").text(characterSpeed);
  // set durability
  characterDiv.find(".character-durability").text(characterDurability);
  // set power
  characterDiv.find(".character-power").text(characterPower);
  // set combat
  characterDiv.find(".character-combat").text(characterCombat);
}

function changeButton(event) {
  // destructure event object
  var buttonElement = event.target;
  // get select element data-target
  var targetElement = $(buttonElement).attr("data-target");
  // get select element value
  var characterId = $(buttonElement).val();
  // get superhero data
  getSuperheroData(targetElement, characterId);
  // reset result
  result.find($(".nav-wrapper")).text("");
}
