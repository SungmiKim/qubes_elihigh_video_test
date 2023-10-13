let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.src = "audio/intro/directive.mp3";
  setTimeout(function () {
    directiveAudio.play();
    $(".txt").addClass("on");
  }, 1500);

  directiveAudio.addEventListener("ended", function () {
    $(".btn_intro").fadeIn();
  });
});
