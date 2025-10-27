import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  useSendEmailCode,
  useVerifyEmailCode,
} from "@/features/signup-form/model/emailVerification";
import { type SignupInput, SignupSchema } from "@/features/signup-form/model/schema";
// import { useCheckUserId } from "@/features/signup-form/model/useCheckUserId";
import { useSignup } from "@/features/signup-form/model/useSignup";
import { Field } from "@/shared/ui/Field";

import { AUTH_SIGNUP_TEXT } from "../text";

const actionBtn =
  "min-w-[100px] rounded-lg py-3 text-sm font-semibold text-white " +
  "bg-indigo-500 hover:bg-indigo-500/90 " +
  "shadow-[0_6px_18px_rgba(79,70,229,0.45)] disabled:opacity-50 disabled:cursor-not-allowed";

export function SignupForm({ onGoLogin }: { onGoLogin: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<SignupInput>({
    mode: "onChange",
    resolver: zodResolver(SignupSchema),
    defaultValues: { email: "", userId: "", password: "", passwordConfirm: "" },
  });

  const { mutate: signupMutate, isPending } = useSignup(onGoLogin);
  const { mutate: sendCode, isPending: sendingCode } = useSendEmailCode();
  const { mutate: verifyCode, isPending: verifying } = useVerifyEmailCode();
  // const { mutate: checkId, isPending: checkingId } = useCheckUserId();

  const [emailVerified, setEmailVerified] = useState(false);
  // const [idChecked, setIdChecked] = useState(false);

  const email = watch("email");
  // const userId = watch("userId");

  const handleSendCode = () => {
    sendCode(email, {
      onSuccess: () => alert(AUTH_SIGNUP_TEXT.signup.sendCodeSuccess),
      onError: () => alert(AUTH_SIGNUP_TEXT.signup.sendCodeError),
    });
  };

  const handleVerifyCode = () => {
    const codeInput = (document.querySelector('input[name="code"]') as HTMLInputElement)?.value;
    verifyCode(
      { email, code: codeInput },
      {
        onSuccess: () => {
          alert(AUTH_SIGNUP_TEXT.signup.verifySuccess);
          setEmailVerified(true);
        },
        onError: () => alert(AUTH_SIGNUP_TEXT.signup.verifyError),
      },
    );
  };

  // const handleCheckId = () => {
  //   checkId(userId, {
  //     onSuccess: () => {
  //       alert(AUTH_SIGNUP_TEXT.signup.duplicateCheckSuccess);
  //       setIdChecked(true);
  //     },
  //     onError: (err: any) => {
  //       const status = err?.response?.status;
  //       if (status === 400 || status === 409) {
  //         alert(AUTH_SIGNUP_TEXT.signup.duplicateCheckError);
  //       } else if (status === 403) {
  //         alert("아이디 확인 요청이 차단되었습니다. (403) 메서드/CSRF 정책을 확인해주세요.");
  //       } else {
  //         alert("아이디 확인 중 오류가 발생했습니다.");
  //       }
  //       setIdChecked(false);
  //     },
  //   });
  // };

  const onSubmit = (v: SignupInput) => {
    if (!emailVerified) return alert(AUTH_SIGNUP_TEXT.signup.verifyError);
    // if (!idChecked) return alert(AUTH_SIGNUP_TEXT.signup.duplicateCheckError);
    signupMutate({ userEmail: v.email, userId: v.userId, userPwd: v.password });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label={AUTH_SIGNUP_TEXT.signup.email} error={errors.email?.message}>
        <div className="flex gap-2">
          <input
            {...register("email")}
            type="email"
            placeholder={AUTH_SIGNUP_TEXT.signup.emailPlaceholder}
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3
                       text-white placeholder-white/60 outline-none
                       focus:border-white/60 focus:bg-white/15 transition"
          />
          <button
            type="button"
            onClick={handleSendCode}
            disabled={!email || sendingCode}
            className={actionBtn}
          >
            {sendingCode
              ? AUTH_SIGNUP_TEXT.signup.sendCodePending
              : AUTH_SIGNUP_TEXT.signup.sendCode}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-white/60">{AUTH_SIGNUP_TEXT.signup.note}</p>
      </Field>

      <Field label={AUTH_SIGNUP_TEXT.signup.code}>
        <div className="flex gap-2">
          <input
            name="code"
            placeholder={AUTH_SIGNUP_TEXT.signup.codePlaceholder}
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3
                       text-white placeholder-white/60 outline-none
                       focus:border-white/60 focus:bg-white/15 transition"
          />
          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={!email || verifying}
            className={actionBtn}
          >
            {verifying ? AUTH_SIGNUP_TEXT.signup.verifyPending : AUTH_SIGNUP_TEXT.signup.verify}
          </button>
        </div>
      </Field>

      <Field label={AUTH_SIGNUP_TEXT.signup.id} error={errors.userId?.message}>
        <div className="flex gap-2">
          <input
            {...register("userId")}
            placeholder={AUTH_SIGNUP_TEXT.signup.idPlaceholder}
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3
                       text-white placeholder-white/60 outline-none
                       focus:border-white/60 focus:bg-white/15 transition"
          />
          {/* <button
            type="button"
            onClick={handleCheckId}
            disabled={!userId || checkingId}
            className={actionBtn}
          >
            {checkingId ? "확인 중..." : AUTH_SIGNUP_TEXT.signup.duplicateCheck}
          </button> */}
        </div>
      </Field>

      <Field label={AUTH_SIGNUP_TEXT.signup.password} error={errors.password?.message}>
        <input
          {...register("password")}
          type="password"
          placeholder={AUTH_SIGNUP_TEXT.signup.passwordPlaceholder}
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-3
                     text-white placeholder-white/60 outline-none
                     focus:border-white/60 focus:bg-white/15 transition"
        />
      </Field>

      <Field
        label={AUTH_SIGNUP_TEXT.signup.passwordConfirm}
        error={errors.passwordConfirm?.message}
      >
        <input
          {...register("passwordConfirm")}
          type="password"
          placeholder={AUTH_SIGNUP_TEXT.signup.passwordConfirmPlaceholder}
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-3
                     text-white placeholder-white/60 outline-none
                     focus:border-white/60 focus:bg-white/15 transition"
        />
      </Field>

      <button
        type="submit"
        disabled={!isValid || isSubmitting || isPending}
        className="w-full rounded-lg py-3 text-sm font-semibold text-white
                   bg-indigo-500 hover:bg-indigo-500/90
                   shadow-[0_6px_18px_rgba(79,70,229,0.45)]
                   disabled:opacity-60"
      >
        {AUTH_SIGNUP_TEXT.signup.submit}
      </button>

      <div className="mt-2 text-right text-xs">
        <button type="button" className="text-white/80 hover:text-white" onClick={onGoLogin}>
          {AUTH_SIGNUP_TEXT.signup.toLogin}
        </button>
      </div>
    </form>
  );
}
