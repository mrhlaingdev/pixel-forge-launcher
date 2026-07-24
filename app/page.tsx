"use client";

import { useState } from "react";

interface Game {
  id: string;
  title: string;
  genre: string;
  size: string;
  status: "Installed" | "Update Available" | "Not Installed";
  color: string;
  initials: string;
}

const INITIAL_GAMES: Game[] = [
  { id: "1", title: "Cyberpunk Odyssey", genre: "RPG / Action", size: "65 GB", status: "Installed", color: "bg-blue-600", initials: "C" },
  { id: "2", title: "Pixel Arena Legends", genre: "Battle Royale", size: "18 GB", status: "Update Available", color: "bg-purple-600", initials: "P" },
  { id: "3", title: "Starlight Tactics", genre: "Strategy", size: "12 GB", status: "Installed", color: "bg-emerald-600", initials: "S" },
];

export default function Home() {
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [activeTab, setActiveTab] = useState<"overview" | "library" | "stats" | "history">("overview");
  const [launchingId, setLaunchingId] = useState<string | null>(null);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Play / Launch Game Function
  const handleLaunch = (id: string, title: string) => {
    if (launchingId || updatingId || activeGame === id) return;
    setLaunchingId(id);
    setLaunchProgress(0);

    const interval = setInterval(() => {
      setLaunchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLaunchingId(null);
          setActiveGame(id);
          showToast(`🚀 ${title} launched successfully!`);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  // Update Game Function
  const handleUpdate = (id: string, title: string) => {
    if (updatingId || launchingId) return;
    setUpdatingId(id);
    setUpdateProgress(0);

    const interval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUpdatingId(null);
          setGames((prevGames) =>
            prevGames.map((g) => (g.id === id ? { ...g, status: "Installed" } : g))
          );
          showToast(`✅ ${title} updated to the latest version!`);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleStopGame = (title: string) => {
    setActiveGame(null);
    showToast(`🛑 ${title} has been closed.`);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredGames = games.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-5 right-5 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-xl border border-indigo-400 transition-all z-50 animate-bounce">
            {notification}
          </div>
        )}

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold border-2 border-indigo-400 shadow-lg">
                P1
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">PixelMaster_99</h1>
                <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-medium border border-indigo-500/30">
                  Pro Gamer
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Ready for the next match. Building awesome gaming launcher experiences!
              </p>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {(["overview", "library", "stats", "history"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {tab === "overview" && "🎮 Overview"}
              {tab === "library" && "📚 Game Library"}
              {tab === "stats" && "📊 Player Stats"}
              {tab === "history" && "📜 Match History"}
            </button>
          ))}
        </nav>

        {/* Tab Content: OVERVIEW / LIBRARY */}
        {(activeTab === "overview" || activeTab === "library") && (
          <section className="space-y-6">

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Level</span>
                <div className="text-3xl font-extrabold text-indigo-400 mt-1">42</div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[70%]" />
                </div>
              </div>

              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Achievements</span>
                <div className="text-3xl font-extrabold text-amber-400 mt-1">128 <span className="text-sm font-normal text-slate-400">/ 150</span></div>
                <p className="text-xs text-slate-500 mt-2">85% Unlocked</p>
              </div>

              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Win Rate</span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1">68.4%</div>
                <p className="text-xs text-slate-500 mt-2">Last 50 Matches</p>
              </div>
            </div>

            {/* Game Library Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-200">My Game Library</h2>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-200 w-full sm:w-64"
                />
              </div>

              <div className="space-y-3">
                {filteredGames.map((game) => {
                  const isLaunching = launchingId === game.id;
                  const isUpdating = updatingId === game.id;
                  const isPlaying = activeGame === game.id;

                  return (
                    <div
                      key={game.id}
                      className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${game.color} rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-md`}>
                          {game.initials}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-100">{game.title}</h3>
                          <p className="text-xs text-slate-400">{game.genre} • {game.size}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Interactive Status & Update Button */}
                        {game.status === "Update Available" ? (
                          isUpdating ? (
                            <div className="w-28 bg-slate-800 h-7 rounded-full overflow-hidden border border-amber-500/40 relative flex items-center justify-center">
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-amber-600 transition-all duration-200"
                                style={{ width: `${updateProgress}%` }}
                              />
                              <span className="relative z-10 text-[10px] font-bold text-white">
                                Updating {updateProgress}%
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleUpdate(game.id, game.title)}
                              className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full font-medium transition cursor-pointer flex items-center gap-1"
                              title="Click to update game"
                            >
                              <span>Update Available</span> 🔄
                            </button>
                          )
                        ) : (
                          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-medium">
                            ✓ Installed
                          </span>
                        )}

                        {/* Action Buttons */}
                        {isPlaying ? (
                          <button
                            onClick={() => handleStopGame(game.title)}
                            className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all shadow-md animate-pulse"
                          >
                            Stop Playing
                          </button>
                        ) : isLaunching ? (
                          <div className="w-32 bg-slate-800 h-9 rounded-lg overflow-hidden border border-indigo-500/40 relative flex items-center justify-center">
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-indigo-600 transition-all duration-300"
                              style={{ width: `${launchProgress}%` }}
                            />
                            <span className="relative z-10 text-xs font-semibold text-white">
                              Launching {launchProgress}%
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleLaunch(game.id, game.title)}
                            disabled={game.status === "Update Available" && !isUpdating}
                            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all shadow-md ${
                              game.status === "Update Available"
                                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-95"
                            }`}
                          >
                            Play
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Tab Content: PLAYER STATS */}
        {activeTab === "stats" && (
          <section className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-100">Detailed Player Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Total Hours Played</p>
                <p className="text-2xl font-bold text-indigo-400 mt-1">342 hrs</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">K/D Ratio</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">2.45</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Current Streak</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">7 Wins</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Global Rank</p>
                <p className="text-2xl font-bold text-purple-400 mt-1">#1,204</p>
              </div>
            </div>
          </section>
        )}

        {/* Tab Content: MATCH HISTORY */}
        {activeTab === "history" && (
          <section className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-100">Recent Match History</h2>
            <div className="space-y-3">
              {[
                { game: "Cyberpunk Odyssey", result: "Victory", score: "+45 LP", time: "2 hours ago" },
                { game: "Pixel Arena Legends", result: "Defeat", score: "-12 LP", time: "5 hours ago" },
                { game: "Starlight Tactics", result: "Victory", score: "+30 LP", time: "1 day ago" },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-800/30 rounded-xl border border-slate-800/80">
                  <div>
                    <p className="font-semibold text-slate-200">{m.game}</p>
                    <p className="text-xs text-slate-500">{m.time}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${m.result === "Victory" ? "text-emerald-400" : "text-rose-400"}`}>
                      {m.result}
                    </span>
                    <p className="text-xs text-slate-400">{m.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}