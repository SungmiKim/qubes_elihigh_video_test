if (!/SM-T500|SM-T583|SM-T536|SM-X200/i.test(navigator.userAgent)) {
  function preelemBridge() {
    this.saveStudyProgress = function (num) {
      // alert(num);
      sessionStorage.setItem(item, num);
    };

    this.getInitialStepIndex = function () {
      var step = 0;
      if (sessionStorage.getItem(item)) {
        step = sessionStorage.getItem(item);
      }
      return step;
    };

    this.getMediaVolume = function () {
      console.log("getMediaVolume");
    };
    this.setMediaVolume = function (num) {
      console.log(num);
    };
    this.stopBgm = function () {
      console.log("stopBgm");
    };
    this.playBgm = function () {
      console.log("playBgm ");
    };
    this.getModes = function () {
      return '["dailywork"]';
    };
  }
  var PreelemBridge = new preelemBridge();
}

var pageName = $("#wrap").attr("data-page");
var bgmFile = pageInfo[pageName].bgm;
var getModes = PreelemBridge.getModes();
var item = pageInfo["subject"] + pageInfo["grade"] + pageInfo["term"] + pageInfo["lessonNum"];

$(document).ready(function () {
  var stopVolume;
  var page = new PageEvent();

  page.init();
  $("body").addClass("on");
  $(".header").load("../common/template/header.html", function () {
    /**
     * 상단바
     */
    $(".header_btn").click(function () {
      $(".header").toggleClass("active");
    });

    // 페이지 닫기
    $(".header .btn.quit").click(function () {
      if (getModes === '["dailywork"]') {
        $(".pop_close").addClass("show set_day");
      } else {
        $(".pop_close").addClass("show");
      }
    });
    $(".header .btn.keep").click(function () {
      $(".pop_close").removeClass("show");
    });
    $(".header .btn.exit").click(function () {
      PreelemBridge.quit();
    });

    $(".step").click(function () {
      if ($(this).hasClass("step4")) {
        if (PreelemBridge.getInitialStepIndex() >= 3 || sessionStorage.getItem(item) >= 3) {
          window.location.href = "summary_gap.html";
        }
      } else if ($(this).hasClass("step3")) {
        if (PreelemBridge.getInitialStepIndex() >= 2 || sessionStorage.getItem(item) >= 2) {
          window.location.href = "apply_gap.html";
        }
      } else if ($(this).hasClass("step2")) {
        if (PreelemBridge.getInitialStepIndex() >= 1 || sessionStorage.getItem(item) >= 1) {
          window.location.href = "concept1_1.html";
        }
      } else if ($(this).hasClass("step1")) {
        if (PreelemBridge.getInitialStepIndex() >= 0 || sessionStorage.getItem(item) >= 0) {
          window.location.href = "think.html";
        }
      }
    });

    page.pageControl();
    page.setPage();

    window.ContentHandler = {
      updateVolume: function updateVolume(number) {
        $(".sound_slide .slider").val(number);
        handleInputChange();
      },
      onStop: function onStop() {
        stopVolume = PreelemBridge.getMediaVolume();
        PreelemBridge.setMediaVolume(0);
        // PreelemBridge.stopBgm();
      },
      onStart: function onStart() {
        PreelemBridge.setMediaVolume(stopVolume + 1);
        // PreelemBridge.playBgm("common/sound/bgm/" + bgmFile);
      },
      onVideoClosed: function () {},
    };
  });

  // 도움말 버튼
  $(".btn.help").click(function () {
    $(this).parents(".help_wrap").addClass("on");
  });

  $(".help_wrap .close").click(function () {
    $(this).parents(".help_wrap").removeClass("on");
  });
});

window.addEventListener("load", function () {
  handleInputChange();
});

/**
 * 아웃트로
 */
function outro(name) {
  setTimeout(function () {
    PreelemBridge.quit();
  }, 4000);
}
/**
 * Gif sequence
 */
function seqGif(name) {
  var seqCnt = 1;
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var pageName = $("#wrap").attr("data-page");
  var fileName = option[0];
  var totalCut = option[1];
  var gifOp = option[2];
  var time = option[3];

  seqGif0 = setInterval(playSeqGif, time);

  function playSeqGif() {
    seqCnt++;
    console.log("playSeqGif");
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif0);
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}

function stopSeqGif(name) {
  var pageName = $("#wrap").attr("data-page");
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var fileName = option[0];
  clearInterval(seqGif0);
  $(name + " img").attr("src", "./img/" + pageName + "/" + fileName + "/1.webp");
}

/**
 * 스케폴딩
 */

var cha0 = 0;
function playScaffolding(name) {
  var cut = 120;
  var timer = 50;
  switch (name) {
    case "lizy":
      cut = 34;
      timer = 100;
      break;
    case "ella":
      cut = 61;
      timer = 40;
      break;
    case "eo":
      cut = 40;
      timer = 120;
      break;
    default:
      cut = 120;
      timer = 50;
  }
  aniScaffolding = setInterval(seqScaffolding, timer);

  function seqScaffolding() {
    let randNum = Math.floor(Math.random() * 10000);
    cha0++;
    if (cha0 > cut) {
      cha0 = 0;
    } else {
      $(".scaffolding img").attr("src", "../common/images/ani/" + name + "/" + cha0 + ".png" + "?" + randNum);
    }
  }
}

function startScaffolding(key, text) {
  const charStart = document.querySelector(".scaffolding");
  if (text) {
    $(".scaffolding .bubble").html(text);
    clearInterval(aniScaffolding);
  }

  if ($(".scaffolding").hasClass("seq")) {
    const charName = $(".scaffolding").attr("data-name");
    playScaffolding(charName);
  } else {
    playGif(".scaffolding img");
  }

  charStart.classList.add("on");

  if (key === "bubble") {
    $(".scaffolding .bubble").removeClass("hide");
  }
}

function endScaffolding(key) {
  const charStart = document.querySelector(".scaffolding");
  let randNum = Math.floor(Math.random() * 10000);

  if ($(".scaffolding").hasClass("seq")) {
    clearInterval(aniScaffolding);
    cha0 = 0;
    const charName = $(".scaffolding").attr("data-name");
    $(".scaffolding img").attr("src", "../common/images/ani/" + charName + "/1.png" + "?" + randNum);
  } else {
    let scaffoldingImg = $(".scaffolding .ani_wrap img");
    scaffoldingImg.attr("src", "../common/images/ani/" + scaffoldingImg.attr("alt") + ".png" + "?" + randNum);
  }

  if (key === "bubble") {
    setTimeout(function () {
      charStart.classList.remove("on");
    }, 1500);
  } else {
    setTimeout(function () {
      charStart.classList.remove("on");
      qs(".blank").classList.add("hide");
    }, 500);
  }
}

/**
 * 상단바 볼륨 컨트롤
 */
function handleInputChange() {
  let target = document.querySelector(".slider");
  const min = target.min;
  const max = target.max;
  const val = target.value;
  if (val == 0) {
    document.querySelector(".btn.sound").classList.add("mute");
  } else {
    document.querySelector(".btn.sound").classList.remove("mute");
  }

  var getSize = ((val - min) * 100) / (max - min);
  target.style.backgroundSize = getSize + "% 100%";
}

/**
 * 정오답 사운드
 */

function answerAudio(answer) {
  let correctAudio = new Audio("../common/sound/effect/correct.mp3");
  let incorrectAudio = new Audio("../common/sound/effect/incorrect.mp3");
  if (answer) {
    try {
      PreelemBridge.stopAudio(4);
      PreelemBridge.playAudio("common/sound/effect/correct.mp3", 4);
    } catch (error) {
      correctAudio.pause();
      correctAudio.currentTime = 0;
      correctAudio.play();
    }
  } else {
    try {
      PreelemBridge.stopAudio(3);
      PreelemBridge.playAudio("common/sound/effect/incorrect.mp3", 3);
    } catch (error) {
      incorrectAudio.pause();
      incorrectAudio.currentTime = 0;
      incorrectAudio.play();
    }
  }
}

// 선택자
function qs(query) {
  return document.querySelector(query);
}

function qsa(query) {
  return document.querySelectorAll(query);
}

// 팝업
function openPop(num) {
  $(".pop_bg").fadeIn();
  $(".pop_ct" + num).fadeIn();
}
function closePop(num) {
  $(".pop_bg").fadeOut();
  $(".pop_ct" + num).fadeOut();
}
/**
 * 다음 페이지 자동 이동
 */
function autoNextPage(sec, nextPageUrl) {
  var pageName = $("#wrap").attr("data-page");
  setTimeout(function () {
    window.location.href = nextPageUrl;
  }, sec);
}

/**
 * gif 재생
 */
function playGif(tag) {
  let gifImg = $(tag);
  let gifImgSrc = gifImg.attr("src").replace("png", "gif");
  let randNum = Math.floor(Math.random() * 10000);
  gifImg.attr("src", gifImgSrc + "?" + randNum);
}

/**
 * 손가락 가이드
 */
var cnt0 = 0;
function playGuide() {
  id0 = setInterval(guideHand, 100);
  $(".has_guide").removeClass("hide");

  function guideHand() {
    cnt0++;
    if (cnt0 > 18) {
      clearInterval(id0);
      cnt0 = 0;
    } else {
      $(".has_guide img").attr("src", "../common/images/icon/hand/" + cnt0 + ".png");
    }
  }
}

/**
 * 칭찬 스탬프 피드백
 */
function playFeedback() {
  setTimeout(function () {
    $(".blank").removeClass("hide");
  }, 300);
  setTimeout(function () {
    var arr = ["ella", "haro", "io", "lizzy"];
    var pageName = $("#wrap").attr("data-page");
    var feedbackArr = pageInfo["feedback"];

    if (feedbackArr.includes(pageName)) {
      if (PreelemBridge.getInitialStepIndex() < pageInfo[pageName].step) {
        PreelemBridge.saveStudyProgress(pageInfo[pageName].step);
      }
      if (sessionStorage.getItem(item) < pageInfo[pageName].step) {
        sessionStorage.setItem(item, pageInfo[pageName].step);
      }
    }

    $(".completeStamp").fadeIn();
    let feedbackAudio = new Audio();
    let num2 = Math.floor(Math.random() * 4);
    let name1 = arr[num2];
    let num1 = Math.floor(Math.random() * 3) + 1;
    $(".completeStamp img").attr("src", "../common/images/pop/" + name1 + ".png");
    feedbackAudio.src = "../common/sound/feedback/feedback_" + name1 + "0" + num1 + ".mp3";
    feedbackAudio.play();

    setTimeout(function () {
      if (!$(".btn_next").hasClass("active")) {
        var correctAudio = new Audio("../common/sound/effect/active_next.mp3");
        correctAudio.play();
      }
      qs(".btn_next").classList.add("active");
      popNext();
    }, 3000);
  }, 1500);
}

function PageEvent() {
  // 다음 페이지 버튼 클릭 시
  $(".btn_next").click(function (e) {
    if (!$(this).hasClass("active")) {
      e.preventDefault();
    } else {
      e.preventDefault();
      var pageName = $("#wrap").attr("data-page");
      let dripAudio = new Audio("../common/sound/effect/click_next.mp3");
      try {
        PreelemBridge.playAudio("common/sound/effect/click_next.mp3", 0);
        setTimeout(function () {
          window.location.href = pageInfo[pageName].nextPage;
        }, 700);
      } catch (error) {
        dripAudio.play();
        dripAudio.addEventListener("ended", function () {
          setTimeout(function () {
            window.location.href = pageInfo[pageName].nextPage;
          }, 500);
        });
      }
    }
  });
  // 인트로 시작 버튼 클릭
  $(".btn_intro").click(function (e) {
    e.preventDefault();
    let dripAudio = new Audio("../common/sound/effect/drip.wav");
    try {
      PreelemBridge.playAudio("common/sound/effect/drip.wav", 0);
      setTimeout(function () {
        window.location.href = "think.html";
      }, 700);
    } catch (error) {
      dripAudio.play();
      dripAudio.addEventListener("ended", function () {
        setTimeout(function () {
          window.location.href = "think.html";
        }, 500);
      });
    }
  });

  // 이전 페이지 버튼 클릭 시
  $(".btn_prev").click(function (e) {
    e.preventDefault();
    var correctAudio = new Audio("../common/sound/effect/click_next.mp3");
    correctAudio.play();
    correctAudio.addEventListener("ended", function () {
      window.location.href = pageInfo[pageName].prevPage;
    });
  });

  // 화면 가로,세로값
  var stdWidth = 2000;
  // var stdHeight = 1200;

  // 기본 스케일
  var currentScale = 1;

  this.init = function () {
    //스케일 설정되는 영역의 기본 가로,세로 설정
    $(".container").css("width", "100vw");
    $(".container").css("height", "100vh");

    $(window).resize(function () {
      // setPageScale();
    });
    setPageScale();

    if (window.innerWidth <= 1920) {
      $("#wrap").addClass("w1920");
    }
  };

  /**
   * 컨텐츠영역 스케일 조절
   */
  function setPageScale() {
    var windowW = $(window).width();
    var windowH = $(window).height();

    var contentW = stdWidth;
    // var contentH = stdHeight;
    var scale;
    scale = windowW / contentW;
    // $(".container").css("transform", `scale(${scale}) translate(-50%, -50%)`);
    $("meta[name=viewport]").attr("content", "width=device-width, user-scalable=no, initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale);
  }

  this.pageControl = function () {
    // 시작 볼륨 셋팅
    var volume = PreelemBridge.getMediaVolume();
    $(".sound_slide .slider").val(volume);
    $(".sound_slide .slider").css("background-size", volume + "%");

    // 미디어 음량 on & off
    $(".btn.sound").click(function () {
      $(this).toggleClass("mute");
      if ($(this).hasClass("mute")) {
        volume = PreelemBridge.getMediaVolume();
        setVolume(0);
      } else {
        setVolume(volume + 1);
      }
    });

    //  볼륨 조절
    $(".sound_slide .slider").on("propertychange change keyup paste input", function () {
      var volume = $(this).val();
      setVolume(volume);
    });

    function setVolume(num) {
      num = Math.ceil(num);
      $(".sound_slide .slider").val(num);
      PreelemBridge.setMediaVolume(+num);
      handleInputChange();
    }

    if (sessionStorage.getItem("bgmMute") == "mute") {
      $(".btn.bgm").addClass("mute");
    } else {
      // 배경음악 play
      if (sessionStorage.getItem("bgmFile") == bgmFile) {
      } else {
        sessionStorage.setItem("bgmFile", bgmFile);
        if (bgmFile) {
          PreelemBridge.playBgm("common/sound/bgm/" + bgmFile);
        } else if (!bgmFile) {
          PreelemBridge.stopBgm();
        }
      }
    }

    // 배경음악 on & off
    $(".btn.bgm").click(function () {
      $(this).toggleClass("mute");
      if ($(this).hasClass("mute")) {
        sessionStorage.setItem("bgmMute", "mute");
        PreelemBridge.stopBgm();
      } else {
        sessionStorage.removeItem("bgmMute");
        PreelemBridge.playBgm("common/sound/bgm/" + bgmFile);
      }
    });

    if (getModes === '["review"]') {
      sessionStorage.setItem(item, 9);
      // PreelemBridge.saveStudyProgress(9);
    }
  };

  this.setPage = function () {
    var step = $(".step" + pageInfo[pageName].step);

    $(".header .lecture_num span").text(pageInfo["lessonNum"]);
    $(".move.btn_prev").attr("href", pageInfo[pageName].prevPage);
    $(".move.btn_next").attr("href", pageInfo[pageName].nextPage);

    if (PreelemBridge.getInitialStepIndex() >= 4) {
      $(".step").addClass("finish");
    } else if (PreelemBridge.getInitialStepIndex() >= 3) {
      $(".step4").prevAll(".step").addClass("finish");
    } else if (PreelemBridge.getInitialStepIndex() >= 2) {
      $(".step3").prevAll(".step").addClass("finish");
    } else if (PreelemBridge.getInitialStepIndex() >= 1) {
      $(".step2").prevAll(".step").addClass("finish");
    }

    if (sessionStorage.getItem(item) >= 4) {
      $(".step").addClass("finish");
    } else if (sessionStorage.getItem(item) >= 3) {
      $(".step4").prevAll(".step").addClass("finish");
    } else if (sessionStorage.getItem(item) >= 2) {
      $(".step3").prevAll(".step").addClass("finish");
    } else if (sessionStorage.getItem(item) >= 1) {
      $(".step2").prevAll(".step").addClass("finish");
    }

    step.addClass("ing").removeClass("finish");
    step.prevAll(".step").addClass("finish");

    if (PreelemBridge.getInitialStepIndex() >= pageInfo[pageName].step) {
      $(".btn_next").addClass("active");
    }
    if (sessionStorage.getItem(item) >= pageInfo[pageName].step) {
      $(".btn_next").addClass("active");
    }
  };

  if ($(".pop_next").length > 0) {
    var correctAudio = new Audio("../common/sound/effect/next_page.mp3");
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutations) {
        if (document.querySelector(".btn_next").classList.contains("active")) {
          // correctAudio.play();
        }
      });
    });

    var config = {
      attributes: true,
    };

    observer.observe(document.querySelector(".btn_next"), config);
  }
}

var wait;
function popWait() {
  clearTimeout(wait);
  wait = setTimeout(function () {
    if (document.querySelector(".pop_ct.pop_next").style.display != "block") {
      document.querySelector(".pop_ct.pop_wait").style.display = "block";
    }
  }, 30000);
}

$(".pop_wait").click(function () {
  document.querySelector(".pop_ct.pop_wait").style.display = "none";
  popWait();
});

$(document).bind("touchstart mousedown click", function () {
  popWait();
});

function popNext() {
  clearTimeout(wait);
  if (document.querySelector(".btn_next").classList.contains("active")) {
    setTimeout(function () {
      document.querySelector(".pop_ct.pop_next").style.display = "block";
    }, 10000);
  }
}

$(".pop_next").click(function () {
  document.querySelector(".pop_ct.pop_next").style.display = "none";
  popNext();
});

function scratch(beforeImgSrc, scratchComplete) {
  let canvas = document.querySelector("canvas");
  let context = canvas.getContext("2d");
  let beforeImg = new Image();

  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.getBoundingClientRect().height;

  beforeImg.src = beforeImgSrc;
  beforeImg.onload = function () {
    context.drawImage(beforeImg, 0, 0, canvas.width, canvas.height);
  };

  context.lineJoin = "round";
  context.lineCap = "round";

  let mouseX = 0;
  let mouseY = 0;
  let isDrawing = false;

  let events = {
    mouse: {
      down: "mousedown",
      move: "mousemove",
      up: "mouseup",
    },
    touch: {
      down: "touchstart",
      move: "touchmove",
      up: "touchend",
    },
  };

  let deviceType = "";

  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      deviceType = "touch";
      return true;
    } catch (e) {
      deviceType = "mouse";
      return false;
    }
  };

  let rectLeft = canvas.getBoundingClientRect().left;
  let rectTop = canvas.getBoundingClientRect().top;

  const getXY = (e) => {
    mouseX = (!isTouchDevice() ? e.clientX : e.touches[0].clientX) - rectLeft;
    mouseY = (!isTouchDevice() ? e.clientY : e.touches[0].clientY) - rectTop;
  };

  isTouchDevice();

  canvas.addEventListener(events[deviceType].down, (event) => {
    document.querySelector(".scratch_content").classList.remove("on");

    getXY(event);
    scratch(mouseX, mouseY);
  });

  canvas.addEventListener(events[deviceType].move, (event) => {
    if (!isTouchDevice()) {
      event.preventDefault();
    }
    if (isDrawing) {
      isDrawing = true;
      getXY(event);
      scratch(mouseX, mouseY);
    }
  });

  canvas.addEventListener(events[deviceType].up, () => {
    isDrawing = false;
    context.globalCompositeOperation = "source-over";
    context.lineWidth = 0;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  const scratch = (x, y) => {
    if (!isDrawing) {
      isDrawing = true;
      context.beginPath();
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = 200;
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
      context.stroke();
    }

    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;

    const pixels = data.length / 4;
    let transparent = 0;

    for (let i = 3; i < data.length; i += 4) {
      transparent += data[i] ? 0 : 1;
    }

    const percent = (transparent / pixels) * 100;

    if (percent >= 70) {
      canvas.parentNode.removeChild(canvas);

      qs(".blank").classList.remove("hide");

      scratchComplete();
    }
  };
}

function camera() {
  var video = document.getElementById("camera--view");
  var cover = document.querySelector("#camera .cover");
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
      video.srcObject = stream;
      video.play();
      cover.classList.add("off");
    });
  }

  $("#picStartBtn").click(function () {
    video.pause();
  });
  $("#picEndBtn").click(function () {
    video.play();
  });

  let canvas1 = document.querySelector("#canvas");

  $("#picSaveBtn").on("click", function () {
    canvas1.getContext("2d").drawImage(video, 0, 0, canvas1.width, canvas1.height);
    var base64 = canvas1.toDataURL("image/*");
    var strImage = base64.replace(/^data:image\/[a-z]+;base64,/, "");
    // console.log(strImage);
    PreelemBridge.saveImage(strImage);
  });
}

function record() {
  var ar = new AudioRecorder();
  var playComplete = false;
  var volume;
  $("#recordStartBtn").click(function () {
    $(".blank").removeClass("hide");
    // 녹음 시작
    volume = PreelemBridge.getMediaVolume();
    PreelemBridge.setMediaVolume(100);

    PreelemBridge.stopBgm();
    ar.startRecord();
    // alert(1);
    $(".btn_record_wrap").addClass("finish");
    setTimeout(function () {
      $(".blank").addClass("hide");
    }, 1000);
  });

  $("#recordEndBtn").click(function () {
    // 녹음 중지
    ar.stopRecord();
    $("#recordPlayBtn").addClass("on");
    $("#recordPlayBtn").addClass("play");
  });

  $("#recordPlayBtn").click(function () {
    if ($(this).hasClass("on")) {
      if (playComplete == false) {
        // 녹음 듣기
        ar.playRecordedFile(function () {
          $(".drop_area").addClass("on313");
          $("#recordPlayBtn").removeClass("play");
          $(".btn_wrap.record").addClass("complete");
          PreelemBridge.setMediaVolume(volume + 1);
          recordPlayEnd();
          // 녹음 완료
        });
        playComplete = true;
      }

      // $(".blank").removeClass("hide");
    }
  });
}

function AudioRecorder() {
  //현재 녹음중인지 여부
  this.isRecording = false;

  // MediaRecorder 변수
  var mediaRecorder = null;

  const audioArray = [];

  var blobURL = "";

  /*
   * *** 녹음 시작
   * */
  this.startRecord = async function () {
    if (this.isRecording == false) {
      // alert(2);
      // 마이크 mediaStream 생성: Promise를 반환하므로 async/await 사용
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channels: 2,
          autoGainControl: true,
          echoCancellation: false, //이 옵션을 true로 설정하면 디바이스에서 소리녹음 과정이나 녹음후 다른 볼륨들이 불규칙하게 변함
          noiseSuppression: true,
        },
      });

      // MediaRecorder 생성
      mediaRecorder = new MediaRecorder(mediaStream);

      // 이벤트핸들러: 녹음 데이터 취득 처리
      mediaRecorder.ondataavailable = (event) => {
        // alert(3);
        audioArray.push(event.data);
      };

      // 이벤트핸들러: 녹음 종료 처리 & 재생하기
      mediaRecorder.onstop = (event) => {
        // alert(4);
        console.log(audioArray);
        // 녹음이 종료되면, 배열에 담긴 오디오 데이터(Blob)들을 합친다: 코덱도 설정해준다.
        const blob = new Blob(audioArray, {
          type: "audio/ogg codecs=opus",
        });
        audioArray.splice(0);

        // Blob 데이터에 접근할 수 있는 주소를 생성한다.
        blobURL = window.URL.createObjectURL(blob);
      };

      // 녹음 시작
      mediaRecorder.start();
      // alert(5);
      this.isRecording = true;

      timer();
    }
  };

  /*
   * *** 녹음 중지
   * */
  this.stopRecord = function () {
    if (this.isRecording == true) {
      mediaRecorder.stop();
      this.isRecording = false;
    }
    clearInterval(timerInterval);
  };

  /*
   * *** 녹음된 파일 재생
   * */
  this.playRecordedFile = function (_endCallback) {
    console.log(blobURL);
    var audio = new Audio(blobURL);
    // document.querySelector("audio").src = blobURL;
    audio.play();
    audio.volume = 1;

    audio.addEventListener("ended", function () {
      if (typeof _endCallback == "function") {
        _endCallback();
      }
    });
  };
}

let timerInterval;
let count, time;

function timer() {
  // document.querySelector(".time").innerHTML = "0:00";
  count = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    popWait();
    count += 1;
    document.querySelector(".gauge .inner").style.width = (count / 60) * 100 + "%";
    if (count < 60) {
      // time = new Date(count * 1000).toISOString().substr(15, 4);
      // document.querySelector(".time").innerHTML = time;
    } else {
      // time = new Date(count * 1000).toISOString().substr(15, 4);
      // document.querySelector(".time").innerHTML = time;
      document.querySelector("#recordEndBtn").click();
    }
  }, 1000);
}

function LineGame(LineGameClear) {
  let correctAudio = new Audio("../common/sound/effect/correct.mp3");
  let incorrectAudio = new Audio("../common/sound/effect/incorrect.mp3");

  var isLock = false;

  // 선잇기 게임
  var LineGame = (function (settings) {
    var _settings = $.extend(true, {}, settings);

    var $wrapper = $(".line_game");

    var $startPointObj = $(".start-point", $wrapper);
    var $endPointObj = $(".end-point", $wrapper);

    function guide() {
      fingerGuide([getAbsoluteCenterPosition($startPointObj.first()), { type: "down" }, getAbsoluteCenterPosition($endPointObj.first()), { type: "up" }]);
    }

    var curStartPoint; // 현재 선택된 시작점
    var curEndPoint; // 현재 선택된 종료점

    var isPress = false; // 마우스, 터치 클릭시

    function setPress() {
      isPress = true;
    }

    function setNotPress() {
      isPress = false;
    }

    function reset() {
      curStartPoint = undefined;
      curEndPoint = undefined;
      $startPointObj
        .not(".checked")
        .css({
          transform: ``,
          height: 0,
        })
        .removeClass("attached linehint");

      $endPointObj.not(".checked").removeClass("attached linehint");
    }

    $wrapper
      .on("mousedown touchstart", function (event) {
        // isLock = false 일 경우, 마우스 좌클릭(event.button===0)일 경우, touchstart는 버튼 유형이 없으므로 체크안함.
        if (
          !isLock &&
          (event.type === "touchstart" || (event.type === "mousedown" && event.button === 0)) &&
          $(event.target).hasClass("start-point") && // start Point 항목만
          !$(event.target).hasClass("checked")
        ) {
          // 체크되지 않은 항목만
          $(event.target).parent().addClass("on");

          setPress.call(event, "mousedown touchstart");

          // 클릭시마다 현재 화면 기준으로 offset을 설정해준다.
          $endPointObj.each(function () {
            if (!$(this).data().hasOwnProperty("top")) {
              $(this).data($(this).offset());
            }
          });

          var pageX;
          var pageY;

          if (event.type === "mousedown") {
            pageX = event.pageX;
            pageY = event.pageY;
          } else if (event.type === "touchstart") {
            pageX = event.changedTouches[0].pageX;
            pageY = event.changedTouches[0].pageY;
          }

          // 포인터 위치는 최초 1회만 설정한다.
          // TODO element의 위치가 조정된다던지 했을 경우 재설정이 필요할 수도 있다.
          if (!$(event.target).data().hasOwnProperty("pageX")) {
            $(event.target).data({ pageX: pageX, pageY: pageY });
          }

          $(event.target).data($(event.target).offset());

          $(event.target)
            .off("mouseup touchend")
            .on("mouseup touchend", function (event) {
              $wrapper.trigger(event.type);
            });

          curStartPoint = event.target;
        }
      })
      .on("mousemove touchmove", function (event) {
        // 현재 마우스 포인터의 위치와 기준 포인터의 위치 계산하여 선의 길이 및 각도를 변경한다.
        if (isPress) {
          var pageX;
          var pageY;

          if (event.type === "mousemove") {
            pageX = event.pageX;
            pageY = event.pageY;
          } else if (event.type === "touchmove") {
            pageX = event.changedTouches[0].pageX;
            pageY = event.changedTouches[0].pageY;
          }

          var targetPageY = $(curStartPoint).data("pageY");
          var targetPageX = $(curStartPoint).data("pageX");

          var angle = (Math.atan2(targetPageY - pageY, targetPageX - pageX) * 180) / Math.PI;
          var height = Math.sqrt(Math.pow(targetPageX - pageX, 2) + Math.pow(targetPageY - pageY, 2)) + 40;

          $(curStartPoint).css({
            transform: `rotate(${angle + 90}deg)`,
            height: height,
          });

          attachedLine(event);
        }
      })
      .on("mouseup touchend", function (event) {
        // 이미 체크된 항목은 정답을 체크하지 않는다.
        if (isPress && !$(event.target).hasClass("checked")) {
          if (!checkAnswer(event)) {
            reset();

            // if (wrongCount >= 2) {
            //   if (!curStartPoint) {
            //     curStartPoint = $startPointObj.filter(":not(.checked)").first();
            //   }

            //   var curAnswer = $(curStartPoint).data("answer");

            //   var rightAnswerObj = $endPointObj.filter(function () {
            //     return $(this).data("answer") === curAnswer;
            //   });

            //   var rightAnswerTop = $(rightAnswerObj).offset().top;
            //   var rightAnswerLeft = $(rightAnswerObj).offset().left;

            //   var _angle = (Math.atan2(rightAnswerTop - $(curStartPoint).offset().top, rightAnswerLeft - $(curStartPoint).offset().left) * 180) / Math.PI;
            //   var _height = Math.sqrt(Math.pow($(curStartPoint).offset().left - rightAnswerLeft, 2) + Math.pow($(curStartPoint).offset().top - rightAnswerTop, 2)) + 40;

            //   $(curStartPoint)
            //     .css({
            //       transform: `rotate(${_angle - 90}deg)`,
            //       height: _height,
            //     })
            //     .addClass("attached linehint");

            //   $(rightAnswerObj).addClass("attached linehint");

            //   setTimeout(function () {
            //     reset();
            //   }, 1000);
            // }

            wrongCount++;
          }

          setNotPress.call(event, "mouseup touchend");
        }
      });

    function attachedLine(event) {
      var pageX;
      var pageY;

      if (event.type === "mousemove") {
        pageX = event.pageX;
        pageY = event.pageY;
      } else if (event.type === "touchmove") {
        pageX = event.changedTouches[0].pageX;
        pageY = event.changedTouches[0].pageY;
      }

      var $enteredPoint = $endPointObj.filter(function () {
        var top = $(this).offset().top;
        var left = $(this).offset().left;
        var width = $(this).outerWidth();
        var height = $(this).outerHeight();

        if (top <= pageY && pageY <= top + height && left <= pageX && pageX <= left + width) {
          var targetPageY = $(curStartPoint).data("top");
          var targetPageX = $(curStartPoint).data("left");

          var _top = $(this).data("top") + 30;
          var _left = $(this).data("left") + 30;

          var _angle = (Math.atan2(targetPageY - _top, targetPageX - _left) * 180) / Math.PI;
          var _height = Math.sqrt(Math.pow(_left - targetPageX, 2) + Math.pow(_top - targetPageY, 2)) + 40;

          console.log("height 값: " + _height);

          $(curStartPoint)
            .css({
              transform: `rotate(${_angle + 90}deg)`,
              height: _height,
            })
            .addClass("attached");

          $(this).addClass("attached");
          curEndPoint = $(this);

          return true;
        }
      });

      if ($enteredPoint.length === 0) {
        $(curStartPoint).not(".checked").removeClass("attached");
        $(curEndPoint).not(".checked").removeClass("attached");

        curEndPoint = undefined;

        return false;
      } else {
        return true;
      }
    }

    var wrongCount = 0;

    // 정답을 확인함.
    function checkAnswer(event) {
      var curAnswer = $(curStartPoint).data("answer");

      // 시작, 종료점이 있을 경우에만 정답을 체크한다.
      if (curStartPoint && curEndPoint && curAnswer === $(curEndPoint).data("answer")) {
        $(curStartPoint).addClass("checked");
        $(curEndPoint).addClass("checked");

        try {
          PreelemBridge.stopAudio(1);

          PreelemBridge.playAudio("common/sound/effect/correct.mp3", 1);
        } catch (error) {
          correctAudio.pause();
          correctAudio.currentTime = 0;

          correctAudio.play();
        }

        $(curEndPoint).parent().addClass("on");
        $(".item_list.end_list li[data-answer=" + curAnswer + "]").addClass("on");

        wrongCount = 0;

        checkLast();

        curStartPoint = undefined;
        curEndPoint = undefined;

        if ($(".line_game .end .dot:not(.on)").length == 0) {
          LineGameClear();
        }

        return true;
      } else {
        try {
          PreelemBridge.stopAudio(1);

          PreelemBridge.playAudio("common/sound/effect/incorrect.mp3", 1);
        } catch (error) {
          incorrectAudio.pause();
          incorrectAudio.currentTime = 0;

          incorrectAudio.play();
        }

        $(curStartPoint).parent().removeClass("on");

        wrongCount++;
      }

      return false;
    }

    function checkLast() {
      if ($startPointObj.filter(":not(.checked)").length === 0) {
        if (typeof _settings["finished"] === "function") {
          _settings["finished"]();
        }
      }
    }

    return {
      guide: guide,
    };
  })();
}
