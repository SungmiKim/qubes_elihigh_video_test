function summary(left, right, ls, rs) {
  window.addEventListener("load", function () {
    let directiveAudio = new Audio("audio/summary/directive.mp3");
    directiveAudio.play();

    directiveAudio.addEventListener("ended", function () {
      let titleAudio = new Audio("audio/summary/title.mp3");
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

  qs(".left_area .title").addEventListener("click", function () {
    clearTimeout(guide);
    $(".area .title").addClass("scale");
    $(".has_guide").addClass("hide");
    let leftAudio = new Audio("audio/summary/left.mp3");

    clickEffect.play();
    setTimeout(function () {
      leftAudio.play();
    }, 500);

    $(".area .title").removeClass("scale");
    qs(".left_area .desc").classList.add("on");
    qs(".left_area .title").classList.add("on");
    qs(".blank").classList.remove("hide");

    setTimeout(function () {
      txtList("left", ls);
    }, 2000);
  });

  qs(".right_area .title").addEventListener("click", function () {
    clearTimeout(guide);
    $(".area .title").addClass("scale");
    $(".has_guide").addClass("hide");
    let rightAudio = new Audio("audio/summary/right.mp3");
    clickEffect.play();
    setTimeout(function () {
      rightAudio.play();
    }, 500);

    $(".area .title").removeClass("scale");
    qs(".right_area .desc").classList.add("on");
    qs(".right_area .title").classList.add("on");
    qs(".blank").classList.remove("hide");

    setTimeout(function () {
      txtList("right", rs);
      console.log("2초");
    }, 2000);
  });

  function txtList(area, s) {
    if (area == "left") {
      var txt = left + 1;
    } else {
      var txt = right + 1;
    }
    var i = 1;
    var txtInterval = setInterval(function () {
      if (i < txt) {
        if (!$("." + area + "_area .txt_list li.txt" + i).hasClass("a_txt")) {
          clickSumEffect.play();
        }
        qs("." + area + "_area .txt" + i).classList.remove("hide");
      } else {
        clearInterval(txtInterval);
        $(".area .title").addClass("scale");
        qs(".blank").classList.add("hide");

        summaryComplete();
      }
      i++;
    }, s);
  }

  function summaryComplete() {
    if (qsa(".area .desc.on").length == 2) {
      setTimeout(function () {
        qs(".completeStamp").classList.remove("hide");
        playFeedback();

        qs(".blank").classList.remove("hide");
      }, 3000);
    }
  }
}
