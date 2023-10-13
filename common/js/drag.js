(function () {
  // 드래그
  let fixRevert = true;
  let freeRevert = true;
  let fixDragBox, freeDragBox;
  let offsetTop, offsetLeft;
  let quizArea;

  let fixTop = new Array();
  let fixLeft = new Array();
  let freeTop = new Array();
  let freeLeft = new Array();

  let correctAudio = new Audio("../common/sound/effect/correct.mp3");
  let incorrectAudio = new Audio("../common/sound/effect/incorrect.mp3");

  for (var i = 0; i < $(".fix .drag_box").length; i++) {
    fixTop[i] = $(".fix .drag_box").eq(i).css("top");
    fixLeft[i] = $(".fix .drag_box").eq(i).css("left");
  }
  for (var i = 0; i < $(".free .drag_box").length; i++) {
    freeTop[i] = $(".free .drag_box").eq(i).css("top");
    freeLeft[i] = $(".free .drag_box").eq(i).css("left");
  }

  $(".fix .drag_box").draggable({
    revert: "invalid",
    revertDuration: 0,
    start: function () {
      $(".blank").removeClass("hide");
      fixDragBox = $(this).data("name");
      dataNum = $(this).data("num");
      offsetTop = $(this).offset().top;
      offsetLeft = $(this).offset().left;
      quizArea = "fix";
      $(this).css("zIndex", 4);
    },
  });

  $(".fix .drop_box").droppable({
    drop: function (e, ui) {
      $(ui.draggable).css("zIndex", 3);
      if (item == "social3110" || item == "social3111" || item == "social3113") {
        if ($(this).data("name") == fixDragBox) {
          setTimeout(function () {
            $(".blank").addClass("hide");
          }, 500);
          fixRevert = false;
          if (dataNum) {
            dropBox = $(this);
            dropCorrect(dataNum, dropBox);
          } else {
            dropCorrect(fixDragBox);
          }
        }
      } else {
        if ($(this).data("name") == fixDragBox) {
          try {
            PreelemBridge.stopAudio(1);

            PreelemBridge.playAudio("common/sound/effect/correct.mp3", 1);
          } catch (error) {
            correctAudio.pause();
            correctAudio.currentTime = 0;

            correctAudio.play();
          }

          fixRevert = false;

          drop(fixDragBox);
        }
      }
    },
  });

  var z = 1;

  $(".free .drag_box").draggable({
    revert: "invalid",
    revertDuration: 0,
    start: function () {
      freeDragBox = $(this).data("name");
      $(this).addClass("on").css("z-index", z);
      z++;
      quizArea = "free";
    },
  });

  $(".free .drop_box").droppable({
    drop: function (e, ui) {
      $(".btn_wrap.drag").removeClass("hide");

      freeRevert = false;
    },
  });

  $("html, .school").droppable({
    out: function () {
      setTimeout(function () {
        $(".blank").addClass("hide");
      }, 500);
    },
    drop: function (e, ui) {
      if (quizArea == "fix") {
        if (fixRevert == true) {
          if (dataNum) {
            $(".drag_area [data-num=" + dataNum + "]").css({
              top: fixTop[dataNum - 1],
              left: fixLeft[dataNum - 1],
            });
          } else {
            $(".drag_area [data-name=" + fixDragBox + "]").css({
              top: fixTop[fixDragBox - 1],
              left: fixLeft[fixDragBox - 1],
            });
          }
          try {
            PreelemBridge.stopAudio(2);

            PreelemBridge.playAudio("common/sound/effect/incorrect.mp3", 2);
          } catch (error) {
            incorrectAudio.pause();
            incorrectAudio.currentTime = 0;

            incorrectAudio.play();
          }
          setTimeout(function () {
            $(ui.draggable).removeClass("on");
            $(".blank").addClass("hide");
          }, 500);
        }
      }

      if (quizArea == "free") {
        if (freeRevert == true) {
          $(".drag_area [data-name=" + freeDragBox + "]").css({
            top: freeTop[freeDragBox - 1],
            left: freeLeft[freeDragBox - 1],
          });
          $(ui.draggable).removeClass("on");
        }
      }

      if ($(".drag_box.on").length == 0) {
        $(".btn_wrap.drag").addClass("hide");
      }

      fixRevert = true;
      freeRevert = true;
    },
  });

  $(".fix .replay").click(function () {
    for (var i = 0; i < $(".fix .drag_box").length; i++) {
      $(".fix .drag_box").eq(i).css({ top: fixTop[i], left: fixLeft[i] });
    }
    $(".fix .drag_box.on").removeClass("on");
    $(".btn_wrap.drag").addClass("hide");
  });

  $(".free .replay").click(function () {
    for (var i = 0; i < $(".free .drag_box").length; i++) {
      $(".free .drag_box").eq(i).css({ top: freeTop[i], left: freeLeft[i] });
    }
    $(".free .drag_box.on").removeClass("on");
    $(".btn_wrap.drag").addClass("hide");
  });
})();
