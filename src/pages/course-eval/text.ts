export const COURSE_EVAL_TEXT = {
  title: "강의 평가",
  semesterLabel: "수강 학기를 입력해 주세요",
  yearSuffix: "년",
  termSuffix: "학기",
  yearPlaceholder: "2025",
  termPlaceholder: "1 또는 2",

  difficulty: "강의 난이도를 평가해 주세요.",
  examDifficulty: "시험 난이도를 평가해 주세요.",
  lectureSkill: "교수의 강의력을 평가해 주세요.",

  taskAmount: "과제량을 선택해 주세요.",
  taskDifficulty: "과제 난이도를 선택해 주세요.",
  teamProject: "팀플 여부를 선택해 주세요.",

  taskAmountOptions: [
    { label: "매우 적음", value: "very-few" },
    { label: "적음", value: "few" },
    { label: "보통", value: "normal" },
    { label: "많음", value: "many" },
    { label: "매우 많음", value: "very-many" },
  ],
  taskDifficultyOptions: [
    { label: "매우 쉬움", value: "very-easy" },
    { label: "쉬움", value: "easy" },
    { label: "보통", value: "normal" },
    { label: "어려움", value: "hard" },
    { label: "매우 어려움", value: "very-hard" },
  ],
  teamProjectOptions: [
    { label: "없음", value: "none" },
    { label: "있음", value: "yes" },
  ],

  totalComment: "강의 총평을 작성해 주세요. (선택)",
  commentPlaceholder: "강의에 대한 총평을 작성해 주세요.",

  actions: {
    submit: "제출하기",
  },

  validate: {
    yearRequired: "연도를 입력해주세요.",
    yearInvalid: "연도는 정수여야 합니다.",
    yearRange: "연도는 1900~2100 사이여야 합니다.",
    termRequired: "학기를 입력해주세요.",
    termInvalid: "학기는 1 또는 2만 가능합니다.",

    requiredStar: "별점을 선택해주세요.",
    selectRequired: "옵션을 선택해주세요.",
  },
} as const;
