export const AUTH_SIGNUP_TEXT = {
  signup: {
    title: "회원가입",
    email: "이메일",
    emailPlaceholder: "ex) user@example.com",
    sendCode: "인증코드 전송",
    sendCodePending: "전송 중...",
    sendCodeSuccess: "인증코드가 전송되었습니다.",
    sendCodeError: "이메일 전송 실패. 다시 시도해주세요.",

    code: "인증코드",
    codePlaceholder: "6자리 코드를 입력해 주세요.",
    verify: "코드 확인",
    verifyPending: "확인 중...",
    verifySuccess: "이메일 인증 완료",
    verifyError: "인증코드가 올바르지 않습니다.",

    id: "아이디(별도)",
    idPlaceholder: "로그인에 사용할 아이디를 입력해 주세요.",
    duplicateCheck: "중복 확인",
    duplicateCheckSuccess: "사용 가능한 아이디입니다.",
    duplicateCheckError: "이미 사용 중인 아이디입니다.",

    password: "비밀번호",
    passwordPlaceholder: "영문/숫자/특수문자 조합하여 입력해 주세요.",
    passwordConfirm: "비밀번호 확인",
    passwordConfirmPlaceholder: "비밀번호를 다시 입력해 주세요.",

    submit: "회원가입",
    toLogin: "로그인으로 돌아가기",

    note: "이메일은 인증용이며, 로그인 아이디는 별도로 사용됩니다.",
  },
} as const;

export const AUTH_SIGNUP_ERROR = {
  email: "올바른 이메일 형식인지 확인해 주세요.",
  userId: {
    min: "아이디는 3자 이상 입력해 주세요",
    max: "아이디는 20자 이하로 입력해 주세요.",
    regex: "영문/숫자/._-만 사용해야 합니다.",
  },
  password: {
    min: "비밀번호는 8자 이상 입력해 주세요.",
    alpha: "영문이 포함되어야 합니다.",
    number: "숫자가 포함되어야 합니다.",
    special: "특수문자가 포함되어야 합니다.",
  },
  passwordConfirm: {
    required: "비밀번호 확인을 입력해 주세요.",
    notMatch: "비밀번호가 일치하지 않습니다.",
  },
  signupFail: "회원가입에 실패하였습니다.",
} as const;
