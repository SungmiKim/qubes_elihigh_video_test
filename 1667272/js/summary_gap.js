window.addEventListener("load", function () {
  let introAudio = new Audio("../common/sound/gap/summary.mp3");
  introAudio.play();
  // playGif(".ani");

  introAudio.addEventListener("ended", function () {
    autoNextPage(1000, "summary.html");
  });
});
