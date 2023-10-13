window.onload = function () {
  // Video
  var video = document.getElementById("video");
  // Buttons
  var playButton = document.getElementById("playPause");

  // Sliders
  var progressBar = document.querySelector(".progress_bar");
  var videoControls = document.querySelector("#videoControls");
  var seekBar = document.querySelector(".seek_bar");

  playButton.classList.add("hide");

  // 동영상 자동 시작
  video.play();

  video.addEventListener("playing", function () {
    setTimeout(function () {
      document.querySelector("#videoContainer").classList.remove("hide");
    }, 500);
  });

  playButton.addEventListener("click", function () {
    clearTimeout(timeout);
    if (video.paused == true) {
      video.play();
      playButton.classList.remove("play");
      // 3초 뒤 fadeOut 애니메이션 실행
      if (!playButton.classList.contains("play")) {
        // timeout = setTimeout(function () {
        //   fadeInterval = setInterval(fadeOut, 10);
        // }, 3000);
        timeout = setTimeout(function () {
          var t = 0;
          const callback = function () {
            if (t < 11) {
              t++;
              fadeOut();
              requestAnimationFrame(callback);
            }
          };
          requestAnimationFrame(callback);
        }, 3000);
      }
    } else {
      video.pause();
      playButton.classList.add("play");
    }
  });

  seekBar.addEventListener("input", function () {
    var time = video.duration * (seekBar.value / 100);
    video.currentTime = time;
  });

  // Update the seek bar as the video plays
  video.addEventListener("timeupdate", function () {
    var value = (100 / video.duration) * video.currentTime;

    seekBar.value = value;
    progressBar.value = value;
    if (video.currentTime > 4.8 && !$("#video").hasClass("cut")) {
      $(".pop_txt").addClass("on");
      $("#video").addClass("cut");
      $("#video").click();
      $("#playPause").click();
      $("#videoContainer").addClass("off");
    }
  });
  $(".pop_txt").click(function () {
    $(this).removeClass("on");
    openPop(1);
  });

  $(".pop_ct1 .btn_start").click(function (e) {
    closePop(1);
    $("#playPause").click();
    $("#videoContainer").removeClass("off");
  });

  seekBar.addEventListener("mousedown", function () {
    video.pause();
  });

  seekBar.addEventListener("mouseup", function () {
    video.play();
  });

  video.addEventListener("ended", function () {
    setTimeout(function () {
      $("#videoContainer").addClass("hide");
      $(".content").removeClass("hide");
      $(".fixed.bottom").removeClass("hide");
    }, 600);
    if (!$(".btn_next").hasClass("active")) {
      answerAudio(true);
    }
    $(".btn_next").addClass("active");
    popNext();
  });

  var timeout;
  var fadeInterval;
  var opacity = 0;
  var videoClick = true;

  // 재생 & 정지 버튼, 컨트롤 바
  document.getElementById("video").addEventListener("click", function () {
    if (videoClick == true) {
      videoClick = false;
      if (playButton.style.opacity == 1) {
        // fadeInterval = setInterval(fadeOut, 10);
        var t = 0;
        const callback = function () {
          if (t < 11) {
            t++;
            fadeOut();
            requestAnimationFrame(callback);
          }
        };
        requestAnimationFrame(callback);
      } else {
        // fadeIn 애니메이션 실행
        // fadeInterval = setInterval(fadeIn, 10);
        var t = 0;
        const callback = function () {
          if (t < 11) {
            t++;
            fadeIn();
            requestAnimationFrame(callback);
          }
        };
        requestAnimationFrame(callback);
      }

      // 클릭 시 아래 Timeout 초기화 후 다시 실행
      clearTimeout(timeout);
      // 3초 뒤 fadeOut 애니메이션 실행
      if (!playButton.classList.contains("play")) {
        // timeout = setTimeout(function () {
        //   fadeInterval = setInterval(fadeOut, 10);
        // }, 3000);
        timeout = setTimeout(function () {
          var t = 0;
          const callback = function () {
            if (t < 11) {
              t++;
              fadeOut();
              requestAnimationFrame(callback);
            }
          };
          requestAnimationFrame(callback);
        }, 3000);
      }
    }
  });

  // 재생 & 정지 버튼, 컨트롤 바 fadeIn 애니메이션
  function fadeIn() {
    opacity = Number(window.getComputedStyle(playButton).getPropertyValue("opacity"));

    if (opacity < 1) {
      opacity = opacity + 0.1;
      playButton.style.opacity = opacity;
      playButton.classList.remove("hide");
      videoControls.style.opacity = opacity;
      seekBar.style.opacity = opacity;
      seekBar.classList.remove("hide");
    } else {
      clearInterval(fadeInterval);
      videoClick = true;
    }
  }

  // 재생 & 정지 버튼, 컨트롤 바 fadeOut 애니메이션
  function fadeOut() {
    opacity = Number(window.getComputedStyle(playButton).getPropertyValue("opacity"));

    if (opacity > 0) {
      opacity = opacity - 0.1;
      playButton.style.opacity = opacity;
      playButton.classList.add("hide");
      videoControls.style.opacity = opacity;
      seekBar.style.opacity = opacity;
      seekBar.classList.add("hide");
    } else {
      clearInterval(fadeInterval);
      videoClick = true;
    }
  }

  // 동영상 시간 변경 시 currentTimeUpdate 실행
  video.ontimeupdate = function () {
    currentTimeUpdate(video.currentTime.toFixed(0));
  };

  // currentTime 을 HH:mm:ss 형식으로 포맷
  function currentTimeUpdate(time) {
    current = new Date(time * 1000).toISOString().substr(11, 8);
    document.querySelector(".current").innerHTML = current;
  }

  // 동영상 로드 후 durationTimeUpdate 실행
  video.addEventListener("playing", function () {
    durationTimeUpdate(video.duration.toFixed(0));
  });

  // durationTime 을 HH:mm:ss 형식으로 포맷
  function durationTimeUpdate(time) {
    duration = new Date(time * 1000).toISOString().substr(11, 8);

    document.querySelector(".duration").innerHTML = duration;
  }

  // 다음 페이지 버튼 클릭 시
  $(".btn_next").click(function (e) {
    if (pageName == "think") {
      if (PreelemBridge.getInitialStepIndex() < pageInfo[pageName].step) {
        PreelemBridge.saveStudyProgress(pageInfo[pageName].step);
      }
      if (sessionStorage.getItem(item) < pageInfo[pageName].step) {
        sessionStorage.setItem(item, pageInfo[pageName].step);
      }
    }
  });
};
