export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header / Player Profile Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-bold text-indigo-400">P1</span>
                </div>
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>

            {/* Profile Details */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">PixelMaster_99</h1>
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full w-fit mx-auto sm:mx-0">
                  Pro Gamer
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Ready for the next match. Building awesome gaming launcher experiences!
              </p>
            </div>
          </div>
        </section>

        {/* Player Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Level</span>
            <div className="text-3xl font-extrabold text-indigo-400 mt-1">42</div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-indigo-500 h-full w-[70%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Achievements</span>
            <div className="text-3xl font-extrabold text-amber-400 mt-1">128 / 150</div>
            <p className="text-xs text-slate-500 mt-2">85% Unlocked</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Win Rate</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">68.4%</div>
            <p className="text-xs text-slate-500 mt-2">Last 50 Matches</p>
          </div>
        </section>
      </div>
    </main>
  );
}