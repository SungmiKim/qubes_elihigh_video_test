window.addEventListener("load", function () {
  let directiveAudio = new Audio("audio/summary/directive.mp3");
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    let titleAudio = new Audio("audio/summary/title0.mp3");
    titleAudio.play();
    qs(".center_title .title").classList.add("on");

    titleAudio.addEventListener("ended", function () {
      let startCharacterAudio = new Audio("audio/summary/startCharacter.mp3");

      startScaffolding();
      setTimeout(function () {
        startCharacterAudio.play();
      }, 1000);

      startCharacterAudio.addEventListener("ended", function () {
        popWait();
        playGuide();
        endScaffolding();
        qs(".center_title .title").classList.remove("on");

        scale();
      });
    });
  });
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".area .title").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

let clickEffect = new Audio("../common/sound/effect/click.mp3");
let clickSumEffect = new Audio("../common/sound/effect/click_sum.mp3");

$(".area .title").click(function () {
  var src = $(this).attr("src");
  src = src.replace(".png", "_o.png");
  $(this).attr("src", src);
});

qs(".area1 .title").addEventListener("click", function () {
  clearTimeout(guide);
  $(".area .title").addClass("scale");
  $(".has_guide").addClass("hide");
  let leftAudio = new Audio("audio/summary/title1.mp3");

  clickEffect.play();
  setTimeout(function () {
    leftAudio.play();
  }, 500);

  $(".area .title").removeClass("scale");
  qs(".area1 .desc").classList.add("on");
  qs(".area1 .title").classList.add("on");
  qs(".blank").classList.remove("hide");

  setTimeout(function () {
    txtList("area1");
  }, 2000);
});

qs(".area2 .title").addEventListener("click", function () {
  clearTimeout(guide);
  $(".area .title").addClass("scale");
  $(".has_guide").addClass("hide");
  let rightAudio = new Audio("audio/summary/title2.mp3");

  clickEffect.play();
  setTimeout(function () {
    rightAudio.play();
  }, 500);

  $(".area .title").removeClass("scale");
  qs(".area2 .desc").classList.add("on");
  qs(".area2 .title").classList.add("on");
  qs(".blank").classList.remove("hide");

  setTimeout(function () {
    txtList("area2");
  }, 2000);
});

qs(".area3 .title").addEventListener("click", function () {
  clearTimeout(guide);
  $(".area .title").addClass("scale");
  $(".has_guide").addClass("hide");
  let rightAudio = new Audio("audio/summary/title3.mp3");

  clickEffect.play();
  setTimeout(function () {
    rightAudio.play();
  }, 500);

  $(".area .title").removeClass("scale");
  qs(".area3 .desc").classList.add("on");
  qs(".area3 .title").classList.add("on");
  qs(".blank").classList.remove("hide");

  setTimeout(function () {
    txtList("area3");
  }, 1000);
});

function txtList(area) {
  if (area == "area1") {
    var txt = 7;
  } else {
    var txt = 2;
  }
  var i = 1;
  var txtInterval = setInterval(function () {
    if (i < txt) {
      console.log(area, "/", i);
      clickSumEffect.play();
      qs("." + area + " .txt_list .txt" + i).classList.remove("hide");
    } else {
      clearInterval(txtInterval);
      $(".area .title").addClass("scale");
      qs(".blank").classList.add("hide");

      summaryComplete();
    }
    i++;
  }, 2000);
}

function summaryComplete() {
  if (qsa(".area .desc.on").length == 3) {
    setTimeout(function () {
      qs(".completeStamp").classList.remove("hide");
      playFeedback();

      // setTimeout(function () {
      //   qs(".btn_next").classList.add("active");
      //   popNext();
      // }, 3000);
      qs(".blank").classList.remove("hide");
    }, 3000);
  }
}
