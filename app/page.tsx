'use client';

import { useState } from 'react';

export default function Home() {
  const [launchingId, setLaunchingId] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const games = [
    { id: 1, title: "Cyberpunk Odyssey", genre: "RPG / Action", status: "Installed", size: "65 GB", color: "from-blue-600 to-indigo-600" },
    { id: 2, title: "Pixel Arena Legends", genre: "Battle Royale", status: "Update Available", size: "18 GB", color: "from-purple-600 to-pink-600" },
    { id: 3, title: "Starlight Tactics", genre: "Strategy", status: "Installed", size: "12 GB", color: "from-emerald-600 to-teal-600" },
  ];

  const handleLaunch = (id: number) => {
    setLaunchingId(id);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLaunchingId(null);
            setProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header / Player Profile Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-bold text-indigo-400">P1</span>
                </div>
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>

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

        {/* Game Library Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-wide">My Game Library</h2>
            <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">3 Games</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {games.map((game) => (
              <div key={game.id} className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex flex-col gap-3 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                      {game.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{game.title}</h3>
                      <p className="text-xs text-slate-400">{game.genre} • {game.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      game.status === 'Installed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {game.status}
                    </span>
                    <button 
                      onClick={() => handleLaunch(game.id)}
                      disabled={launchingId === game.id}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-lg ${
                        launchingId === game.id
                          ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                      }`}
                    >
                      {launchingId === game.id ? 'Launching...' : 'Play'}
                    </button>
                  </div>
                </div>

                {/* Progress bar when launching */}
                {launchingId === game.id && (
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden transition-all">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}