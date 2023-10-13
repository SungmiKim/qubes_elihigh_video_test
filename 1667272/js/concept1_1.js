window.addEventListener("load", function () {
  let directiveAudio = new Audio("audio/concept1_1/directive.mp3");
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    let startCharacterAudio = new Audio("audio/concept1_1/startCharacter.mp3");

    startScaffolding();
    setTimeout(function () {
      startCharacterAudio.play();
    }, 1000);

    startCharacterAudio.addEventListener("ended", function () {
      popWait();
      endScaffolding();
      playGuide();
      scale();
    });
  });
});

var guide;
function scale() {
  guide = setTimeout(function () {
    qs(".has_guide").classList.add("hide");
    qs(".place_list").classList.add("scale");
  }, 2000);
}

let placeAudio = new Audio();

$(".place").click(function () {
  clearTimeout(guide);
  qs(".has_guide").classList.add("hide");
  qs(".place_list").classList.remove("scale");
  num = $(this).attr("class").replace("place place", "");
  qs(".blank").classList.remove("hide");
  openPop(num);
  playGif(".pop_ct" + num + " .pop_card");
  placeAudio.src = "audio/concept1_1/place" + num + ".mp3";
  placeAudio.play();
});

placeAudio.addEventListener("ended", function () {
  closePop(num);
  qs(".place" + num).classList.add("on");
  qs(".blank").classList.add("hide");
  qs(".place_list").classList.add("scale");

  if (qsa(".place.on").length == 7) {
    qs(".blank").classList.remove("hide");

    setTimeout(function () {
      let endCharacterAudio = new Audio("audio/concept1_1/endCharacter.mp3");

      startScaffolding("bubble");
      endCharacterAudio.play();

      endCharacterAudio.addEventListener("ended", function () {
        endScaffolding();
        playFeedback();
        // setTimeout(function () {
        //   if (!$(".btn_next").hasClass("active")) {
        //     var correctAudio = new Audio("../common/sound/effect/next_page.mp3");
        //     correctAudio.play();
        //   }
        //   console.log(qs(".btn_next"));
        //   qs(".btn_next").classList.add("active");
        //   popNext();
        // }, 1500);
      });
    }, 1000);
  }
});
