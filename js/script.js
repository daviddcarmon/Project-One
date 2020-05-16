$(document).ready(function () {
  $("#modal-content").modal();

  var heroesInfo = [];
  var marvalInfo = [];
  var marvalPressed = false;

  superHeroData(1, 200);
  // superHeroData(100, 199);
  // superHeroData(200, 299);
  // superHeroData(300, 399);
  // superHeroData(400, 499);
  // superHeroData(500, 599);
  // superHeroData(600, 699);
  // superHeroData(700, 732);
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

  // Marvel API
  function marvelAPICall(character) {
    var timeStamp = "broncos";
    var apiKey = "b45ce047211df1651f4238f87bdcddb3";
    var hash = "2e2a32e0b19ea53b12f0a0644ab17519";

    // for the hash
    // its ts + private + public

    var queryURL =
      "https://gateway.marvel.com/v1/public/characters?ts=" +
      timeStamp +
      "&apikey=" +
      apiKey +
      "&hash=" +
      hash;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      //use the heroesInfo
      marvalPressed = true;
      calculateHeroStats();
      //console.log("marvel " + response);
    });
  }
  marvelAPICall("hulk");
  $("#submit").on("click", function (event) {
    event.preventDefault();
    clear();
    var userSearch = $("#first_name").val();
    calculateHeroStats();
    //marvelAPICallmarvelAPICall(userSearch);
  });

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

  var nearest = 700;

  function calculateHeroStats() {
    var closestHero = [{}, 700];
    var sideKick = [{}, 700];
    var nemesis = [{}, 700];
    var userTotalStats =
      parseInt(userIntelligence) +
      parseInt(userCombat) +
      parseInt(userDurability) +
      parseInt(userPower) +
      parseInt(userSpeed) +
      parseInt(userStrength);
    // console.log(userTotalStats);
    if (marvalPressed === true) {
      // THIS IS MARVAL API
      var superheroStats = marvalInfo;

      marvalPressed = false;
    } else {
      // THIS IS HEROAPI
      var superheroStats = heroesInfo;
      var superSideKick = heroesInfo;
    }

    superheroStats.forEach((hero) => {
      var powerstats = Object.values(hero.powerstats);

      //converted array to array of numbers
      var result = powerstats.map(Number);
      // console.log(result);

      var finalArr = result.filter(Boolean);
      // gets total stats of the hero in totalStats
      for (var i = 0; i < result.length; i++) {
        var totalStats = finalArr.reduce((a, b) => a + b, 0);
      }
      // gets the hero id in heroId
      var heroId = hero.id;

      var totalHero = {
        id: heroId,
        total: totalStats,
      };
      // console.log(totalHero);
      //now we need to decide if the hero is closest to the users hero
      // console.log(typeof userTotalStats);
      var different = Math.abs(totalHero.total - userTotalStats);
      // var nextDifferent = Math.abs(totalHero.total - userTotalStats);
      var compare = closestHero[1];
      var compareSideKick = sideKick[1];
      var nemesisCompare = nemesis[1];
      // console.log(" difference", different, closestHero);
      if (different < compare) {
        // console.log("new hero", totalHero);
        closestHero = [totalHero, different];
        console.log(closestHero);
      }
      if (different < compareSideKick && different > compare) {
        console.log(sideKick);
        sideKick = [totalHero, different];
      }
      if (different > nemesisCompare) {
        console.log(nemesis);
        nemesis = [totalHero, different];
      }
      if (hero.id === "200") {
        // console.log("all don!");
        finishedHero(closestHero, sideKick, nemesis);
      }
    });
  }

  function finishedHero(closestHero, sideKick, nemesis) {
    heroesInfo.forEach((hero) => {
      if (hero.id === closestHero[0].id) {
        // console.log();
        renderHeroesContent(hero);
        // console.log("render hero: ", hero);
        //console.log(hero);
      }
      if (hero.id === sideKick[0].id) {
        renderSideKickContent(hero);
      }
      if (hero.id === nemesis[0].id) {
        renderNemesisContent(hero);
      }
    });
  }
  // console.log(heroesInfo.find());
  // var bestMarvelMatch = {};

  // if(userTotalStats <= superheroStats + 10 || userTotalStats >= superHeroData - 10)

  function renderHeroesContent(heroesInfo) {
    // console.log("RENDER!", heroesInfo);
    // destructure character data
    var characterName = $("<h4>")
      .text(heroesInfo.name)
      .attr("class", "name")
      .attr("id", "charaName");
    var characterImage = $("<img>")
      .attr("src", heroesInfo.image.url)
      .css({ width: 100, height: 100 })
      .attr("id", "img");
    var characterIntelligence = $("<ul>")
      .text("Intelligence " + heroesInfo.powerstats.intelligence)
      .attr("id", "intelligence");
    var characterStrength = $("<ul>")
      .text("Strength " + heroesInfo.powerstats.strength)
      .attr("id", "strength");
    var characterSpeed = $("<ul>")
      .text("Speed " + heroesInfo.powerstats.speed)
      .attr("id", "speed");
    var characterDurability = $("<ul>")
      .text("Durability " + heroesInfo.powerstats.durability)
      .attr("id", "durability");
    var characterPower = $("<ul>").text("Power " + heroesInfo.powerstats.power);
    var characterCombat = $("<ul>")
      .text("Combat " + heroesInfo.powerstats.combat)
      .attr("id", "combat");
    var space = $("<br>");

    var characterBio = $("<p>")
      .attr("id", "name")
      .text(heroesInfo.biography["full-name"])
      .css({ "font-size": 26, "line-height": "80%" });
    // var characterBio = $("<p>").text(bioString).css({ "font-size": 30 });
    var characterAliases = $("<p>")
      .attr("id", "aliases")
      .text(
        "Aliases: " +
          heroesInfo.biography["aliases"][0] +
          " " +
          heroesInfo.biography["aliases"][1] +
          " " +
          heroesInfo.biography["aliases"][2]
      )
      .css({ "font-size": 26, "line-height": "80%" });
    var characterAlignment = $("<p>")
      .attr("id", "alignment")
      .text("Alignment: " + heroesInfo.biography["alignment"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterAlter = $("<p>")
      .attr("id", "alter")
      .text("Alter Ego: " + heroesInfo.biography["alter-egos"])
      .css({ "font-size": 26, "line-height": "80%" });
    var characterAppearance = $("<p>")
      .attr("id", "appearance")
      .text("Fist Appearance: " + heroesInfo.biography["first-appearance"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterBirth = $("<p>")
      .attr("id", "birth")
      .text("Birth place: " + heroesInfo.biography["place-of-birth"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterPublisher = $("<p>")
      .attr("id", "publisher")
      .text("Publisher: " + heroesInfo.biography["publisher"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterConnection = $("<p>")
      .attr("id", "connection")
      .text("Affiliation: " + heroesInfo.connections["group-affiliation"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterRace = $("<p>")
      .attr("id", "race")
      .text("Publisher: " + heroesInfo.appearance["race"])
      .css({ "font-size": 26, "line-height": "80%" });

    // var characterPublisher = $("<p>")
    // .text("Publisher: " + heroesInfo.biography["publisher"])
    // .css({ "font-size": 26, "line-height": "80%" });

    // console.log(typeof heroesInfo.biography);
    // console.log("name: ", characterName);
    // var from MARV api needed
    var charDiv = $("<div>").attr("class", "charDiv");
    charDiv.append(
      characterName,
      characterImage,
      characterIntelligence,
      characterStrength,
      characterSpeed,
      characterPower,
      characterConnection
    );

    var heroDiv = $("<div>").attr("id", "hero");
    var backstory = $("<h3>").text("BACKSTORY");
    var yourHero = $("<h3>").text("Your Hero");
    heroDiv.append(
      characterBio,
      characterAliases,
      characterAlignment,
      characterAlter,
      characterBirth,
      characterPublisher,
      characterConnection,
      characterRace
    );

    $("#charResult").empty();
    $("#backstory").empty();
    $("#charResult").append(yourHero, charDiv);
    $("#backstory").append(backstory, heroDiv);
  }

  function renderSideKickContent(heroesInfo) {
    // console.log("RENDER!SIDEKICK", heroesInfo);

    // destructure character data
    var characterName = $("<h4>").text(heroesInfo.name).attr("class", "name");
    var characterImage = $("<img>")
      .attr("src", heroesInfo.image.url)
      .css({ width: 100, height: 100 });
    var characterIntelligence = $("<ul>").text(
      "Intelligence " + heroesInfo.powerstats.intelligence
    );
    var characterStrength = $("<ul>").text(
      "Strength " + heroesInfo.powerstats.strength
    );
    var characterSpeed = $("<ul>").text("Speed " + heroesInfo.powerstats.speed);
    var characterDurability = $("<ul>").text(
      "Durability " + heroesInfo.powerstats.durability
    );
    var characterPower = $("<ul>").text("Power " + heroesInfo.powerstats.power);
    var characterCombat = $("<ul>").text(
      "Combat " + heroesInfo.powerstats.combat
    );
    var space = $("<br>");

    var characterBio = $("<p>")
      .text(heroesInfo.biography["full-name"])
      .css({ "font-size": 26, "line-height": "80%" });
    // var characterBio = $("<p>").text(bioString).css({ "font-size": 30 });
    var characterAliases = $("<p>")
      .text(
        "Aliases: " +
          heroesInfo.biography["aliases"][0] +
          " " +
          heroesInfo.biography["aliases"][1] +
          " " +
          heroesInfo.biography["aliases"][2]
      )
      .css({ "font-size": 26, "line-height": "80%" });
    var characterAlignment = $("<p>")
      .text("Alignment: " + heroesInfo.biography["alignment"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterAlter = $("<p>")
      .text("Alter Ego: " + heroesInfo.biography["alter-egos"])
      .css({ "font-size": 26, "line-height": "80%" });
    var characterAppearance = $("<p>")
      .text("Fist Appearance: " + heroesInfo.biography["first-appearance"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterBirth = $("<p>")
      .text("Birth place: " + heroesInfo.biography["place-of-birth"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterPublisher = $("<p>")
      .text("Publisher: " + heroesInfo.biography["publisher"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterConnection = $("<p>")
      .text("Affiliation: " + heroesInfo.connections["group-affiliation"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterRace = $("<p>")
      .text("Publisher: " + heroesInfo.appearance["race"])
      .css({ "font-size": 26, "line-height": "80%" });

    // var characterPublisher = $("<p>")
    // .text("Publisher: " + heroesInfo.biography["publisher"])
    // .css({ "font-size": 26, "line-height": "80%" });

    // console.log(typeof heroesInfo.biography);
    // console.log("name: ", characterName);
    // var from MARV api needed

    var sideStatsDiv = $("<div>").attr({
      class: "sideKickStats card",
    });
    sideStatsDiv.append(
      characterName,
      characterImage,
      characterIntelligence,
      characterStrength,
      characterSpeed,
      characterPower,
      characterConnection
    );

    var sideKickDiv = $("<div>").attr("id", "sideKickDes");

    sideKickDiv.append(
      characterBio,
      characterAliases,
      characterAlignment,
      characterAlter,
      characterBirth,
      characterPublisher,
      characterConnection,
      characterRace
    );

    $("#secHero").empty();
    $("#backstory").empty();
    $("#secHero").append(sideStatsDiv, sideKickDiv);
  }

  function renderNemesisContent(heroesInfo) {
    console.log("RENDER!NemesisKICK", heroesInfo);
    // destructure character data
    var characterName = $("<h4>")
      .text(heroesInfo.name)
      .attr("class", "name")
      .attr("id", "charaName");
    var characterImage = $("<img>")
      .attr("src", heroesInfo.image.url)
      .css({ width: 100, height: 100 })
      .attr("id", "img");
    var characterIntelligence = $("<ul>")
      .text("Intelligence " + heroesInfo.powerstats.intelligence)
      .attr("id", "intelligence");
    var characterStrength = $("<ul>")
      .text("Strength " + heroesInfo.powerstats.strength)
      .attr("id", "strength");
    var characterSpeed = $("<ul>")
      .text("Speed " + heroesInfo.powerstats.speed)
      .attr("id", "speed");
    var characterDurability = $("<ul>")
      .text("Durability " + heroesInfo.powerstats.durability)
      .attr("id", "durability");
    var characterPower = $("<ul>").text("Power " + heroesInfo.powerstats.power);
    var characterCombat = $("<ul>")
      .text("Combat " + heroesInfo.powerstats.combat)
      .attr("id", "combat");
    var space = $("<br>");

    var characterBio = $("<p>")
      .attr("id", "name")
      .text(heroesInfo.biography["full-name"])
      .css({ "font-size": 26, "line-height": "80%" });
    // var characterBio = $("<p>").text(bioString).css({ "font-size": 30 });
    var characterAliases = $("<p>")
      .attr("id", "aliases")
      .text(
        "Aliases: " +
          heroesInfo.biography["aliases"][0] +
          " " +
          heroesInfo.biography["aliases"][1] +
          " " +
          heroesInfo.biography["aliases"][2]
      )
      .css({ "font-size": 26, "line-height": "80%" });
    var characterAlignment = $("<p>")
      .attr("id", "alignment")
      .text("Alignment: " + heroesInfo.biography["alignment"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterAlter = $("<p>")
      .attr("id", "alter")
      .text("Alter Ego: " + heroesInfo.biography["alter-egos"])
      .css({ "font-size": 26, "line-height": "80%" });
    var characterAppearance = $("<p>")
      .attr("id", "appearance")
      .text("Fist Appearance: " + heroesInfo.biography["first-appearance"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterBirth = $("<p>")
      .attr("id", "birth")
      .text("Birth place: " + heroesInfo.biography["place-of-birth"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterPublisher = $("<p>")
      .attr("id", "publisher")
      .text("Publisher: " + heroesInfo.biography["publisher"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterConnection = $("<p>")
      .attr("id", "connection")
      .text("Affiliation: " + heroesInfo.connections["group-affiliation"])
      .css({ "font-size": 26, "line-height": "80%" });

    var characterRace = $("<p>")
      .attr("id", "race")
      .text("Publisher: " + heroesInfo.appearance["race"])
      .css({ "font-size": 26, "line-height": "80%" });

    // var characterPublisher = $("<p>")
    // .text("Publisher: " + heroesInfo.biography["publisher"])
    // .css({ "font-size": 26, "line-height": "80%" });

    // console.log(typeof heroesInfo.biography);
    // console.log("name: ", characterName);
    // var from MARV api needed
    var nemCard = $("<section>").attr({ class: "nemesis card" });
    var nemStatsDiv = $("<div>").attr("class", "nemesisDiv");
    nemStatsDiv.append(
      characterName,
      characterImage,
      characterIntelligence,
      characterStrength,
      characterSpeed,
      characterPower,
      characterConnection
    );

    var nemesisDiv = $("<div>").attr("id", "hero");

    nemesisDiv.append(
      characterBio,
      characterAliases,
      characterAlignment,
      characterAlter,
      characterBirth,
      characterPublisher,
      characterConnection,
      characterRace
    );
    nemCard.append(nemStatsDiv, nemesisDiv);

    $("#thirdHero").empty();
    $("#thirdHero").append(nemCard);
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
});

function clear() {
  $("#hero").empty();
  $("#name").empty();
  $("#backstory").empty();
}
