$(document).ready(init);

function init() {

  let targetNum = 0;
  let hits = 0;
  const maxHits = 10;
  let missHits = 0;
  let firstHitTime = 0;

  $("#button-reload").hide();

  $("#button-start").click(function() {
    round();
    $(this).hide();
    $("#button-reload").show();
  });

  $("#button-reload").click(function() {
    location.reload();
  });

  $(".game-field").click(handleClick);

  function round() {
    let divSelector = randomDivId();
    $(divSelector).addClass("target");

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
    } else 
      missHits++;
      $("#total-miss-hits").text(missHits);
  }

  function endGame() {
    $(".game-field").hide();

    let lastHitTime = getTimestamp();
    let difference = (lastHitTime - firstHitTime) / 1000;
    $("#total-time-played").text(difference);

    $("#win-message").removeClass("d-none");
  }
}