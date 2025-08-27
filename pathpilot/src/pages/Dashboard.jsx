import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="w-full space-y-8 font-sans">
        <h1 className="text-3xl font-bold text-[#2c3e50]">خوش برگشتی!</h1>

        {/* اهداف یادگیری */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#2c3e50]">
            🎯 اهداف یادگیری
          </h2>

          {[
            { title: "React", done: 2, total: 5 },
            { title: "TypeScript", done: 1, total: 4 },
            { title: "Testing", done: 3, total: 3 },
          ].map((goal) => {
            const progress = (goal.done / goal.total) * 100;
            return (
              <div key={goal.title}>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>{goal.title}</span>
                  <span>{`${goal.done} از ${goal.total} کامل شده`}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="h-2 rounded-full bg-[#6ca0dc]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        {/* تازه‌ترین‌ها */}
        <section className="bg-white rounded-xl shadow p-6 space-y-2">
          <h2 className="text-lg font-semibold text-[#2c3e50]">
            ✅ تازه‌ترین‌ها
          </h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ درک JSX</li>
            <li>✅ آشنایی با TypeScript</li>
          </ul>
        </section>
      </div>
    </DashboardLayout>
  );
}
