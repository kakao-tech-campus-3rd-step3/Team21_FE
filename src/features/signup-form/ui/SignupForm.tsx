import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type SignupInput, SignupSchema } from "@/features/signup-form/model/schema";
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
  } = useForm<SignupInput>({
    mode: "onChange",
    resolver: zodResolver(SignupSchema),
    defaultValues: { email: "", userId: "", password: "", passwordConfirm: "" },
  });

  const { mutate, isPending } = useSignup(onGoLogin);
  const onSubmit = (v: SignupInput) => {
    const { email, userId, password } = v;
    mutate({ email, userId, password });
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
          <button type="button" disabled className={actionBtn}>
            {AUTH_SIGNUP_TEXT.signup.sendCode}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-white/60">{AUTH_SIGNUP_TEXT.signup.note}</p>
      </Field>

      <Field label={AUTH_SIGNUP_TEXT.signup.code}>
        <div className="flex gap-2">
          <input
            name="code"
            placeholder={AUTH_SIGNUP_TEXT.signup.codePlaceholder}
            disabled
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3
                       text-white placeholder-white/60 outline-none
                       focus:border-white/60 focus:bg-white/15 transition"
          />
          <button type="button" disabled className={actionBtn}>
            {AUTH_SIGNUP_TEXT.signup.verify}
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
          <button type="button" disabled className={actionBtn}>
            {AUTH_SIGNUP_TEXT.signup.duplicateCheck}
          </button>
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
