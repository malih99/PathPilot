export default function AuthLayout({ children, title, subtitle, rightPanel }) {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0c0f18] via-[#17142a] to-[#241032]">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.03)_1px)] bg-[size:16px_16px]" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Right panel (متن برند) */}
        <section className="hidden lg:flex flex-col justify-between p-10 text-white/90">
          {rightPanel}
          <p className="text-xs text-white/60 mt-6">
            © {new Date().getFullYear()} PathPilot
          </p>
        </section>

        {/* Card */}
        <section className="flex items-center justify-center p-5 lg:p-10">
          <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/85 backdrop-blur-xl shadow-2xl">
            <div className="p-6">
              {title && (
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
              )}
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
