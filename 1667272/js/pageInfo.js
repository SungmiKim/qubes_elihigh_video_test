var pageInfo = {
  subject: "social",
  grade: "3",
  term: "1",
  lessonNum: 1,
  feedback: ["concept2_1", "apply", "summary"],
  // index
  index: {
    step: 0,
    page: 0,
    bgm: false,
  },
  // 인트로
  intro: {
    step: 0,
    page: 0,
    bgm: "intro.mp3",
  },
  // 생각하이
  think: {
    step: 1,
    page: 1,
    prevPage: "index.html",
    nextPage: "concept1_1.html",
    bgm: false,
  },

  // 개념하이 1
  concept1_1: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept2_1.html",
    bgm: "page.mp3",
  },

  // 개념하이 2
  concept2_1: {
    step: 2,
    page: 5,
    prevPage: "concept1_1.html",
    nextPage: "apply_gap.html",
    bgm: "page.mp3",
  },

  // 적용하이 간지
  apply_gap: {
    step: 3,
    page: 6,
    prevPage: "concept2_1.html",
    nextPage: "apply.html",
    bgm: "page.mp3",
  },

  // 적용하이 1
  apply: {
    step: 3,
    page: 6,
    prevPage: "concept2_1.html",
    nextPage: "summary_gap.html",
    bgm: "page.mp3",
  },

  // 정리하이
  summary_gap: {
    step: 4,
    page: 8,
    prevPage: "apply_gap.html",
    nextPage: "summary.html",
    bgm: "page.mp3",
  },

  // 정리하이
  summary: {
    step: 4,
    page: 8,
    prevPage: "apply_gap.html",
    nextPage: "outro.html",
    bgm: "page.mp3",
  },
  // 아웃트로
  outro: {
    step: 5,
    page: 9,
    prevPage: "",
    nextPage: "",
    bgm: "outro.mp3",
  },
};
