"use client";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-indigo-600 mb-10">
          SkillAI
        </h2>

        <nav className="space-y-4">
          <p className="text-gray-700 font-medium">Dashboard</p>
          <p className="text-gray-500 hover:text-indigo-600 cursor-pointer">Trending Skills</p>
          <p className="text-gray-500 hover:text-indigo-600 cursor-pointer">Obsolete Skills</p>
          <p className="text-gray-500 hover:text-indigo-600 cursor-pointer">Analytics</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}