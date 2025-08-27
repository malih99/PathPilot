import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

function EyeIcon({ open = false, className = "w-4 h-4" }) {
  return open ? (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M2 12s3.5-7 10-7c2.1 0 3.9.6 5.4 1.5M22 12s-3.5 7-10 7c-2.1 0-3.9-.6-5.4-1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M15 12a3 3 0 0 1-3 3M12 9a3 3 0 0 1 3 3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Button({ loading, children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "relative inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition " +
        (props.disabled
          ? "bg-violet-400/60 text-white cursor-not-allowed "
          : "bg-violet-600 text-white hover:bg-violet-700 ") +
        className
      }
    >
      {loading && (
        <span className="absolute right-3 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
      )}
      <span>{children}</span>
    </button>
  );
}

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav("/dashboard", { replace: true });
    });
    // eslint-disable-next-line
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    setLoading(false);
    if (error) return setErr(mapSupabaseError(error));
    setOk("خوش آمدید!");
    nav("/dashboard", { replace: true });
  }

  async function onGoogle() {
    setErr("");
    setOk("");
    setOauthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    setOauthLoading(false);
    if (error) setErr(mapSupabaseError(error));
  }

  async function onForgotPassword() {
    if (!email) return setErr("ابتدا ایمیل را وارد کنید.");
    setErr("");
    setOk("");
    setMagicLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setMagicLoading(false);
    if (error) setErr(mapSupabaseError(error));
    else setOk("لینک بازیابی رمز ارسال شد.");
  }

  async function onMagicLink() {
    if (!email) return setErr("برای لینک ورود، ایمیل لازم است.");
    setErr("");
    setOk("");
    setMagicLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMagicLoading(false);
    if (error) setErr(mapSupabaseError(error));
    else setOk("لینک ورود جادویی به ایمیل شما ارسال شد.");
  }

  return (
    <AuthLayout
      title="ورود به حساب"
      subtitle="با ایمیل و رمز عبور وارد شوید یا از روش‌های دیگر استفاده کنید."
      rightPanel={
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-white/10 backdrop-blur border border-white/15 grid place-items-center">
              <span className="text-lg font-black">P</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">PathPilot</h1>
          </div>
          <p className="mt-5 max-w-md text-white/80 text-sm leading-6">
            یادگیری‌ات را مثل یک پرواز هدایت کن؛ مسیرهای شفاف، مایل‌استون‌های
            مشخص و تمرکز روزانه.
          </p>
          <ul className="mt-6 grid gap-2 text-xs">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Progress
              لحظه‌ای
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300" /> تایمر
              تمرین و گزارش هفتگی
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{" "}
              نوت‌های Markdown
            </li>
          </ul>
        </div>
      }
    >
      {(err || ok) && (
        <div
          className={
            "mt-4 rounded-xl px-3 py-2 text-xs " +
            (err
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200")
          }
        >
          {err || ok}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-4 grid gap-3">
        <div>
          <label className="block text-xs text-slate-700 mb-1">ایمیل</label>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-violet-500 focus:ring-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs text-slate-700 mb-1">
              رمز عبور
            </label>
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700"
            >
              <EyeIcon open={showPass} /> {showPass ? "مخفی کن" : "نمایش"}
            </button>
          </div>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-violet-500 focus:ring-2"
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <label className="inline-flex items-center gap-2 text-slate-600 select-none">
            <input
              type="checkbox"
              className="rounded border-slate-300"
              defaultChecked
            />{" "}
            مرا وارد نگه‌دار
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={magicLoading}
            className="text-violet-700 hover:text-violet-900"
          >
            فراموشی رمز؟
          </button>
        </div>

        <Button type="submit" loading={loading} disabled={loading}>
          ورود
        </Button>

        <div className="relative py-1 text-center text-[11px] text-slate-500">
          <span className="bg-white/85 px-2 relative z-10">یا</span>
          <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={oauthLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
        >
          {oauthLoading ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
          ) : (
            <span className="text-base">G</span>
          )}
          ادامه با Google
        </button>

        <button
          type="button"
          onClick={onMagicLink}
          disabled={magicLoading}
          className="rounded-xl px-3 py-2 text-xs text-violet-700 hover:text-violet-900"
        >
          ارسال لینک ورود به ایمیل
        </button>
      </form>

      <p className="mt-4 text-center text-[11px] text-slate-600">
        حساب ندارید؟{" "}
        <Link
          to="/register"
          className="text-violet-700 hover:text-violet-900 font-bold"
        >
          ثبت‌نام
        </Link>
      </p>
    </AuthLayout>
  );
}

function mapSupabaseError(error) {
  if (!error?.message) return "خطای ناشناخته.";
  if (error.message.includes("Failed to fetch"))
    return "اتصال به سرور برقرار نشد. تنظیمات SUPABASE_URL/KEY و مجوزهای CORS را بررسی کنید.";
  return error.message;
}
