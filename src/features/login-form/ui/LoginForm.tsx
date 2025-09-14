import { AUTH_LOGIN_TEXT } from "@/features/login-form/text";

export function LoginForm({ onGoSignup }: { onGoSignup: () => void }) {
  return (
    <form className="space-y-4">
      <Field
        label={AUTH_LOGIN_TEXT.login.id}
        name="id"
        placeholder={AUTH_LOGIN_TEXT.login.idPlaceholder}
      />
      <Field
        label={AUTH_LOGIN_TEXT.login.password}
        name="password"
        type="password"
        placeholder={AUTH_LOGIN_TEXT.login.passwordPlaceholder}
      />

      <button
        type="button"
        disabled
        className="w-full rounded-lg py-3 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-500/90 shadow-[0_6px_18px_rgba(79,70,229,0.45)]"
      >
        {AUTH_LOGIN_TEXT.login.submit}
      </button>

      <div className="mt-2 flex items-center justify-between text-xs">
        <button type="button" disabled className="text-white/70 hover:text-white/90">
          {AUTH_LOGIN_TEXT.login.forgot}
        </button>
        <button type="button" className="text-white/80 hover:text-white" onClick={onGoSignup}>
          {AUTH_LOGIN_TEXT.login.toSignup}
        </button>
      </div>
    </form>
  );
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
        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-3 text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/15 transition shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      />
    </label>
  );
}
