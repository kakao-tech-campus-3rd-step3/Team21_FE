export const AUTH_SIGNUP_TEXT = {
  signup: {
    title: "회원가입",
    email: "이메일",
    emailPlaceholder: "ex) user@example.com",
    sendCode: "인증코드 전송",
    code: "인증코드",
    codePlaceholder: "6자리 코드",
    verify: "코드 확인",
    id: "아이디(별도)",
    idPlaceholder: "로그인에 사용할 아이디",
    duplicateCheck: "중복 확인",
    password: "비밀번호",
    passwordPlaceholder: "영문/숫자/특수문자 조합",
    passwordConfirm: "비밀번호 확인",
    passwordConfirmPlaceholder: "비밀번호를 다시 입력",
    submit: "회원가입",
    toLogin: "로그인으로 돌아가기",
    note: "이메일은 인증용이며, 로그인 아이디는 별도로 사용됩니다.",
  },
} as const;

export const AUTH_SIGNUP_ERROR = {
  email: "올바른 이메일 형식",
  userId: {
    min: "아이디 3자 이상",
    max: "20자 이하",
    regex: "영문/숫자/._-만 사용",
  },
  password: {
    min: "8자 이상",
    alpha: "영문 포함",
    number: "숫자 포함",
    special: "특수문자 포함",
  },
  passwordConfirm: {
    required: "비밀번호 확인을 입력",
    notMatch: "비밀번호가 일치하지 않습니다.",
  },
  signupFail: "회원가입 실패",
} as const;
