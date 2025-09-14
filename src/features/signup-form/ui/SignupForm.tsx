import * as React from "react";

import { AUTH_SIGNUP_TEXT } from "../text";

export function SignupForm({ onGoLogin }: { onGoLogin: () => void }) {
  // 회원가입시 이메일 인증용 (아직 적용 X)
  // const [emailSent] = React.useState(false);
  // const [verified] = React.useState(false);

  return (
    <form className="space-y-4">
      <label className="block text-left">
        <span className="mb-1 block text-xs font-medium text-white/80">
          {AUTH_SIGNUP_TEXT.signup.email}
        </span>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="ex) user@example.com"
            disabled
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3 text-white placeholder-white/60 focus:border-white/60 focus:bg-white/15 outline-none transition"
          />
          <button
            type="button"
            disabled
            className="rounded-lg border border-white/30 bg-white/15 px-3 text-xs text-white hover:bg-white/25"
          >
            {AUTH_SIGNUP_TEXT.signup.sendCode}
          </button>
        </div>
      </label>

      <label className="block text-left">
        <span className="mb-1 block text-xs font-medium text-white/80">
          {AUTH_SIGNUP_TEXT.signup.code}
        </span>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={AUTH_SIGNUP_TEXT.signup.codePlaceholder}
            disabled
            className="flex-1 rounded-lg border border-white/30 bg-white/10 px-3 py-3 text-white placeholder-white/60 focus:border-white/60 focus:bg-white/15 outline-none transition"
          />
          <button
            type="button"
            disabled
            className="rounded-lg border border-white/30 bg-white/15 px-3 text-xs text-white hover:bg-white/25"
          >
            {AUTH_SIGNUP_TEXT.signup.verify}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-white/60">{AUTH_SIGNUP_TEXT.signup.note}</p>
      </label>

      <TwoCols>
        <Field
          label={AUTH_SIGNUP_TEXT.signup.id}
          name="userId"
          placeholder={AUTH_SIGNUP_TEXT.signup.idPlaceholder}
        />
        <Field
          label={AUTH_SIGNUP_TEXT.signup.password}
          name="password"
          type="password"
          placeholder={AUTH_SIGNUP_TEXT.signup.passwordPlaceholder}
        />
      </TwoCols>
      <Field
        label={AUTH_SIGNUP_TEXT.signup.passwordConfirm}
        name="passwordConfirm"
        type="password"
        placeholder={AUTH_SIGNUP_TEXT.signup.passwordConfirmPlaceholder}
      />

      <button
        type="button"
        disabled
        className={[
          "w-full rounded-lg py-3 text-sm font-semibold text-white",
          "bg-indigo-500 hover:bg-indigo-500/90",
          "shadow-[0_6px_18px_rgba(79,70,229,0.45)]",
        ].join(" ")}
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

function TwoCols({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-xs font-medium text-white/80">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        disabled
        className={[
          "w-full rounded-lg",
          "border border-white/30 bg-white/10 px-3 py-3",
          "text-white placeholder-white/60 outline-none",
          "focus:border-white/60 focus:bg-white/15 transition",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
        ].join(" ")}
      />
    </label>
  );
}
