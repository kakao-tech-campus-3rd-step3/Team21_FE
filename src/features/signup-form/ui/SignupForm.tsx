import { Field } from "@/shared/ui/Field";

import { AUTH_SIGNUP_TEXT } from "../text";

export function SignupForm({ onGoLogin }: { onGoLogin: () => void }) {
  return (
    <form className="space-y-4">
      <Field label={AUTH_SIGNUP_TEXT.signup.email}>
        <div className="flex gap-2">
          <input
            name="email"
            type="email"
            placeholder={AUTH_SIGNUP_TEXT.signup.emailPlaceholder}
            disabled
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3
                       text-white placeholder-white/60 outline-none
                       focus:border-white/60 focus:bg-white/15 transition"
          />
          <button
            type="button"
            disabled
            className="min-w-[100px] rounded-lg py-3 text-sm font-semibold text-white
                   bg-indigo-500 hover:bg-indigo-500/90
                   shadow-[0_6px_18px_rgba(79,70,229,0.45)]"
          >
            {AUTH_SIGNUP_TEXT.signup.sendCode}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-white/60">{AUTH_SIGNUP_TEXT.signup.note}</p>
      </Field>

      <Field label={AUTH_SIGNUP_TEXT.signup.code}>
        <div className="flex gap-2">
          <input
            name="code"
            type="text"
            placeholder={AUTH_SIGNUP_TEXT.signup.codePlaceholder}
            disabled
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3
                       text-white placeholder-white/60 outline-none
                       focus:border-white/60 focus:bg-white/15 transition"
          />
          <button
            type="button"
            disabled
            className="min-w-[100px] rounded-lg py-3 text-sm font-semibold text-white
                   bg-indigo-500 hover:bg-indigo-500/90
                   shadow-[0_6px_18px_rgba(79,70,229,0.45)]"
          >
            {AUTH_SIGNUP_TEXT.signup.verify}
          </button>
        </div>
      </Field>

      <Field label={AUTH_SIGNUP_TEXT.signup.id}>
        <div className="flex gap-2">
          <input
            name="userId"
            placeholder={AUTH_SIGNUP_TEXT.signup.idPlaceholder}
            disabled
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3
                       text-white placeholder-white/60 outline-none
                       focus:border-white/60 focus:bg-white/15 transition"
          />
          <button
            type="button"
            disabled
            className="min-w-[100px] rounded-lg py-3 text-sm font-semibold text-white
                   bg-indigo-500 hover:bg-indigo-500/90
                   shadow-[0_6px_18px_rgba(79,70,229,0.45)]"
          >
            {AUTH_SIGNUP_TEXT.signup.duplicateCheck}
          </button>
        </div>
      </Field>

      <Field label={AUTH_SIGNUP_TEXT.signup.password}>
        <input
          name="password"
          type="password"
          placeholder={AUTH_SIGNUP_TEXT.signup.passwordPlaceholder}
          disabled
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-3
                     text-white placeholder-white/60 outline-none
                     focus:border-white/60 focus:bg-white/15 transition
                     shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
        />
      </Field>

      <Field label={AUTH_SIGNUP_TEXT.signup.passwordConfirm}>
        <input
          name="passwordConfirm"
          type="password"
          placeholder={AUTH_SIGNUP_TEXT.signup.passwordConfirmPlaceholder}
          disabled
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-3
                     text-white placeholder-white/60 outline-none
                     focus:border-white/60 focus:bg-white/15 transition
                     shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
        />
      </Field>

      <button
        type="button"
        disabled
        className="w-full rounded-lg py-3 text-sm font-semibold text-white
                   bg-indigo-500 hover:bg-indigo-500/90
                   shadow-[0_6px_18px_rgba(79,70,229,0.45)]"
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
