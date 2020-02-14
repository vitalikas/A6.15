$(document).ready(init);

function init() {

  let targetNum = 0;
  let hits = 0;
  const maxHits = 10;
  let missHits = 0;
  let allHits = 0;

  $("#button-reload").hide();

  $("#button-start").click(function() {
    round();
    $(this).hide();
    $("#button-reload").show();
    $(".game-field").click(handleClick);
  });

  $("#button-reload").click(function() {
    location.reload();
  });

  

  function round() {
    let divSelector = randomDivId();
    $(divSelector).addClass("target");
    $(".game-field").removeClass("miss");

    targetNum++;
    $(divSelector).text(targetNum);

    if (hits < 1) {
      firstHitTime = getTimestamp();
    }
    if (hits === maxHits) {
      endGame();
    }
  }

  function handleClick(event) {
    if ($(event.target).hasClass("target")) {
      hits++;

      $(event.target).removeClass("target");
      $(event.target).text("");

      round();
    } else {
      missHits++;
      $(event.target).addClass("miss");
    }
  }

  function endGame() {
    $(".game-field").hide();
    $("#win-message").removeClass("d-none");

    lastHitTime = getTimestamp();
    difference = (lastHitTime - firstHitTime) / 1000;
    $("#total-time-played").text(difference);

    allHits = hits + missHits;
    $("#hitsCount").text(allHits);

    $("#total-miss-hits").text(missHits);
  }
}