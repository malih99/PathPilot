// src/pages/Register.jsx
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate, Link } from "react-router-dom";

/** آیکن چشم برای نمایش/مخفی کردن رمز */
function EyeIcon({ open = false, className = "w-5 h-5" }) {
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

/** دکمه با حالت لودینگ */
function Button({ loading, children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "relative inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold transition " +
        (props.disabled
          ? "bg-violet-400/60 text-white cursor-not-allowed "
          : "bg-violet-600 text-white hover:bg-violet-700 ") +
        className
      }
    >
      {loading && (
        <span className="absolute right-3 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
      )}
      <span>{children}</span>
    </button>
  );
}

export default function Register() {
  const nav = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [agree, setAgree] = useState(true);

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // اگر لاگین است، ریدایرکت
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav("/dashboard", { replace: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validate() {
    if (!fullName.trim()) return "نام و نام خانوادگی را وارد کنید.";
    if (!email.trim()) return "ایمیل را وارد کنید.";
    if (pass.length < 6) return "رمز عبور باید حداقل ۶ کاراکتر باشد.";
    if (pass !== pass2) return "تکرار رمز با رمز عبور مطابقت ندارد.";
    if (!agree) return "برای ادامه باید شرایط استفاده را بپذیرید.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    const v = validate();
    if (v) return setErr(v);

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    setLoading(false);

    if (error) return setErr(error.message);

    // بسته به تنظیمات Supabase، ممکنه نیاز به تایید ایمیل باشه:
    if (!data.session) {
      setOk("ثبت‌نام انجام شد. لطفاً ایمیل خود را برای تأیید حساب بررسی کنید.");
    } else {
      setOk("ثبت‌نام موفق! در حال انتقال…");
      nav("/dashboard", { replace: true });
    }
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
    if (error) setErr(error.message);
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0c0f18] via-[#17142a] to-[#241032]">
      {/* افکت پس‌زمینه */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.03)_1px)] bg-[size:16px_16px]" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* پنل برند/توضیح */}
        <section className="hidden lg:flex flex-col justify-between p-12 text-white/90">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur border border-white/15 grid place-items-center">
                <span className="text-xl font-black">P</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                PathPilot
              </h1>
            </div>
            <p className="mt-6 max-w-lg text-white/80 leading-7">
              همین امروز مسیر یادگیری‌ات را بساز؛ با مایل‌استون‌های واضح،
              تسک‌های قابل پیگیری و گزارش‌های تمیز.
            </p>
          </div>

          <ul className="grid gap-3 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              ثبت‌نام سریع با ایمیل یا گوگل
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              مدیریت مسیرهای یادگیری و منابع
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              آنالیتیکس مطالعه و ریمایندرها
            </li>
          </ul>

          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} PathPilot
          </p>
        </section>

        {/* کارت ثبت‌نام */}
        <section className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/80 backdrop-blur-xl shadow-2xl">
            <div className="p-7 md:p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                ایجاد حساب کاربری
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                اطلاعات خود را وارد کنید و سفر یادگیری‌تان را شروع کنید.
              </p>

              {(err || ok) && (
                <div
                  className={
                    "mt-4 rounded-xl px-3 py-2 text-sm " +
                    (err
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200")
                  }
                >
                  {err || ok}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-5 grid gap-4">
                {/* نام */}
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    نام و نام خانوادگی
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-violet-500 focus:ring-2"
                    type="text"
                    placeholder="مثلاً: علی رضایی"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>

                {/* ایمیل */}
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    ایمیل
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-violet-500 focus:ring-2"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* رمز عبور */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm text-slate-700 mb-1">
                      رمز عبور
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
                    >
                      <EyeIcon open={showPass} />
                      {showPass ? "مخفی کن" : "نمایش"}
                    </button>
                  </div>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-violet-500 focus:ring-2"
                    type={showPass ? "text" : "password"}
                    placeholder="حداقل ۶ کاراکتر"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>

                {/* تکرار رمز */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm text-slate-700 mb-1">
                      تکرار رمز عبور
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPass2((s) => !s)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
                    >
                      <EyeIcon open={showPass2} />
                      {showPass2 ? "مخفی کن" : "نمایش"}
                    </button>
                  </div>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-violet-500 focus:ring-2"
                    type={showPass2 ? "text" : "password"}
                    placeholder="دوباره وارد کنید"
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>

                {/* قوانین */}
                <label className="inline-flex items-center gap-2 text-sm text-slate-600 select-none">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  شرایط استفاده و سیاست حریم خصوصی را می‌پذیرم.
                </label>

                <Button type="submit" loading={loading} disabled={loading}>
                  ایجاد حساب
                </Button>

                <div className="relative py-2 text-center text-xs text-slate-500">
                  <span className="bg-white/80 px-2 relative z-10">یا</span>
                  <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-200" />
                </div>

                {/* گوگل */}
                <button
                  type="button"
                  onClick={onGoogle}
                  disabled={oauthLoading}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50 transition"
                >
                  {oauthLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M21.35 11.1H12v2.9h5.35c-.25 1.5-1.6 4.4-5.35 4.4a5.9 5.9 0 0 1 0-11.8 5.3 5.3 0 0 1 3.75 1.45l2.6-2.5A9.31 9.31 0 0 0 12 3a9 9 0 1 0 0 18c5.2 0 8.65-3.65 8.65-8.8 0-.6-.05-1.05-.3-1.6Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  ادامه با Google
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                حساب دارید؟{" "}
                <Link
                  to="/login"
                  className="text-violet-700 hover:text-violet-900"
                >
                  وارد شوید
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
