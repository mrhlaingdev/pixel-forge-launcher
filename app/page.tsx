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
      </div>
    </main>
  );
}