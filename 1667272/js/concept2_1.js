window.addEventListener("load", function () {
  let directive1Audio = new Audio("audio/concept2_1/directive1.mp3");
  directive1Audio.play();

  directive1Audio.addEventListener("ended", function () {
    let startCharacterAudio = new Audio("audio/concept2_1/startCharacter.mp3");

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
    $(".has_guide").addClass("hide");
    $(".card_list").addClass("scale");
    $(".p_list").addClass("scale");
  }, 2000);
}

var character;
var hasGuide = true;
let character0Audio = new Audio();
let characterAudio = new Audio();

$(".card_list li").click(function () {
  clearTimeout(guide);
  $(".has_guide").addClass("hide");
  $(".p_list").removeClass("scale");
  qs(".blank").classList.remove("hide");
  if ($(this).index() == 0) {
    character = "haro";
  } else if ($(this).index() == 1) {
    character = "ella";
  } else if ($(this).index() == 2) {
    character = "eo";
  }

  character0Audio.src = "audio/concept2_1/" + character + "0.mp3";
  character0Audio.play();
  qs(".content").dataset.num = $(this).index() + 1;
});

character0Audio.addEventListener("ended", function () {
  qs(".blank").classList.add("hide");
  if (hasGuide == true) {
    playGuide();
    scale();
  } else {
    $(".has_guide").addClass("hide");
    $(".card_list").addClass("scale");
    $(".p_list").addClass("scale");
  }
});

var imgSrc, pngImg;
$(".p_list .click").click(function () {
  clearTimeout(guide);
  $(".has_guide").addClass("hide");
  $(".p_list").removeClass("scale");
  qs(".blank").classList.remove("hide");
  this.parentNode.classList.add("on");
  // if (imgSrc) {
  //   pngImg.attr("src", imgSrc);
  // }
  pngImg = $(this).next().find("img");
  imgSrc = $(this).next().find("img").attr("src");
  playGif($(this).next().find("img"));

  characterAudio.src = "audio/concept2_1/" + character + this.dataset.num + ".mp3";
  characterAudio.play();
});

characterAudio.addEventListener("ended", function () {
  if (imgSrc) {
    pngImg.attr("src", imgSrc);
  }
  qs(".blank").classList.add("hide");
  $(".p_list").addClass("scale");

  if (qsa(".p_list li.on").length == 4 || qsa(".p_list li.on").length == 8 || qsa(".p_list li.on").length == 12) {
    hasGuide = false;
    setTimeout(function () {
      qs(".content").dataset.num = 0;

      if (character == "haro") {
        $(".card_list li").eq(0).addClass("on");
      } else if (character == "ella") {
        $(".card_list li").eq(1).addClass("on");
      } else if (character == "eo") {
        $(".card_list li").eq(2).addClass("on");
      }

      $(".card_list").addClass("scale");
    }, 2000);
  }

  if (qsa(".p_list li.on").length == 12) {
    let endCharacterAudio = new Audio("audio/concept2_1/endCharacter.mp3");

    setTimeout(function () {
      startScaffolding();
      setTimeout(function () {
        endCharacterAudio.play();
      }, 1000);

      endCharacterAudio.addEventListener("ended", function () {
        // qs(".scaffolding").classList.add("end");
        qs(".bubble").classList.remove("hide");
        let directive2Audio = new Audio("audio/concept2_1/directive2.mp3");
        directive2Audio.play();

        directive2Audio.addEventListener("ended", function () {
          endScaffolding();
          playFeedback();
        });
      });
    }, 2000);
  }
});
