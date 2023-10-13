window.addEventListener("load", function () {
  let introAudio = new Audio("../common/sound/gap/apply.mp3");
  introAudio.play();
  // playGif(".ani");

  introAudio.addEventListener("ended", function () {
    autoNextPage(1000, "apply.html");
  });
});
