import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type LoginInput, LoginSchema } from "@/features/login-form/model/schema";
import { useLogin } from "@/features/login-form/model/useLogin";
import { AUTH_LOGIN_TEXT } from "@/features/login-form/text";
import { Field } from "@/shared/ui/Field";

export function LoginForm({
  onGoSignup,
  onClose,
}: {
  onGoSignup: () => void;
  onClose?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginInput>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: { id: "", password: "" },
  });

  const { mutate, isPending } = useLogin(onClose);
  const onSubmit = (v: LoginInput) => mutate({ userId: v.id, userPwd: v.password });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label={AUTH_LOGIN_TEXT.login.id} error={errors.id?.message}>
        <input
          {...register("id")}
          placeholder={AUTH_LOGIN_TEXT.login.idPlaceholder}
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-3
                     text-white placeholder-white/60 outline-none
                     focus:border-white/60 focus:bg-white/15 transition
                     shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
        />
      </Field>

      <Field label={AUTH_LOGIN_TEXT.login.password} error={errors.password?.message}>
        <input
          {...register("password")}
          type="password"
          placeholder={AUTH_LOGIN_TEXT.login.passwordPlaceholder}
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-3
                     text-white placeholder-white/60 outline-none
                     focus:border-white/60 focus:bg-white/15 transition
                     shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
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
        {AUTH_LOGIN_TEXT.login.submit}
      </button>

      <div className="mt-2 flex items-center justify-between text-xs">
        <button type="button" disabled className="text-white/70">
          {AUTH_LOGIN_TEXT.login.forgot}
        </button>
        <button type="button" className="text-white/80 hover:text-white" onClick={onGoSignup}>
          {AUTH_LOGIN_TEXT.login.toSignup}
        </button>
      </div>
    </form>
  );
}
