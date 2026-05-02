import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, LayoutGrid, Heart, History, TrendingUp, Menu, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

const games = gamesData;

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = Array.from(new Set(games.map((g) => g.category)));

  return (
    <div className="min-h-screen bg-vegas-dark text-zinc-100 font-sans selection:bg-vegas-gold selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div 
            className="flex flex-col cursor-pointer group" 
            onClick={() => { setSelectedGame(null); setSelectedCategory(null); }}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-vegas-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Gamepad2 className="w-6 h-6 text-black" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-vegas-gold tracking-widest uppercase">United Sites</span>
                <span className="text-xl font-display font-black tracking-tighter text-glow-purple italic">LAS VEGAS</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xl hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-vegas-gold/50 transition-all group">
            <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-vegas-gold transition-colors" />
            <input
              type="text"
              placeholder="Search premium games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-zinc-600 font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-vegas-gold hover:text-white transition-colors">
              <TrendingUp className="w-3.5 h-3.5" />
              VIP Trending
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors md:hidden text-vegas-gold"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 flex max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-vegas-dark md:relative md:block transform transition-transform duration-500 ease-out border-r border-white/5 shadow-2xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-8 space-y-10">
            <div>
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6">Lounge</div>
              <ul className="space-y-2">
                {[
                  { icon: LayoutGrid, label: 'All Games', active: !selectedCategory },
                  { icon: Heart, label: 'Favorites' },
                  { icon: History, label: 'History' },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => item.label === 'All Games' && setSelectedCategory(null)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs transition-all tracking-wider uppercase font-bold ${item.active ? 'bg-vegas-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-zinc-500 hover:text-vegas-gold hover:bg-white/5'}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6">Floors</div>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs transition-all tracking-wider uppercase font-bold ${selectedCategory === cat ? 'bg-vegas-neon/20 text-vegas-neon border border-vegas-neon/30 text-glow-purple' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12">
          <AnimatePresence mode="wait">
            {!selectedGame ? (
              <motion.div
                key="browser"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-12">
                  <div>
                    <h1 className="text-5xl font-display font-black tracking-tight mb-4 text-glow-gold uppercase italic">
                      {selectedCategory || 'High Stakes'}
                    </h1>
                    <p className="text-zinc-500 text-sm max-w-lg font-medium leading-relaxed">
                      Experience the finest unblocked entertainment. Curated, smooth, and always unblocked for the high-rollers.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                    <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-vegas-gold text-black rounded-xl transition-all shadow-lg shadow-vegas-gold/20">Featured</button>
                    <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Popular</button>
                    <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Latest</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                      onClick={() => setSelectedGame(game)}
                      className="group relative cursor-pointer"
                    >
                      <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-4 border border-white/5 group-hover:border-vegas-gold/30 transition-all group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        
                        <div className="absolute inset-0 flex items-center justify-center translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="w-16 h-16 bg-vegas-gold rounded-full flex items-center justify-center shadow-2xl shadow-vegas-gold/50">
                            <Play className="w-6 h-6 text-black fill-current ml-1" />
                          </div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex items-center gap-2 mb-2">
                             <span className="px-2.5 py-1 bg-vegas-neon/20 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-vegas-neon border border-vegas-neon/20">
                               {game.category}
                             </span>
                          </div>
                          <h3 className="font-display font-black text-white group-hover:text-vegas-gold transition-colors uppercase tracking-tight text-xl leading-none">
                            {game.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredGames.length === 0 && (
                  <div className="text-center py-32">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                      <Search className="w-12 h-12 text-zinc-700" />
                    </div>
                    <h2 className="text-2xl font-display font-black text-zinc-400 uppercase italic">Empty Deck</h2>
                    <p className="text-zinc-600 mt-3 font-medium uppercase tracking-widest text-[10px]">No games match your current filters</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(20px)' }}
                className="flex flex-col gap-10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setSelectedGame(null)}
                      className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-vegas-gold hover:text-black rounded-2xl text-zinc-500 transition-all shadow-lg hover:shadow-vegas-gold/20"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div>
                      <h2 className="text-4xl font-display font-black tracking-tight uppercase italic text-glow-gold">
                        {selectedGame.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-vegas-neon animate-pulse" />
                        <p className="text-vegas-neon text-[10px] font-black uppercase tracking-[0.2em]">{selectedGame.category} Room</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest rounded-xl text-zinc-400 transition-all border border-white/5">
                      Fullscreen
                    </button>
                    <button className="px-8 py-3 bg-vegas-gold hover:bg-yellow-400 text-[10px] font-black uppercase tracking-widest rounded-xl text-black shadow-xl shadow-vegas-gold/30 transition-all">
                      Add to Collection
                    </button>
                  </div>
                </div>

                <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                  <iframe
                    src={selectedGame.iframeUrl}
                    className="w-full h-full border-none"
                    title={selectedGame.title}
                    allow="autoplay; fullscreen"
                  />
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[3rem]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                      <h3 className="text-xs font-black mb-6 uppercase tracking-[0.4em] text-vegas-gold flex items-center gap-4">
                        <div className="h-0.5 w-8 bg-vegas-gold" />
                        Game Brief
                      </h3>
                      <p className="text-zinc-400 leading-relaxed font-medium">
                        {selectedGame.description} Immerse yourself in the ultimate unblocked experience within our Las Vegas collection. Every title is hand-selected for optimal performance and pure entertainment value.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-black mb-6 uppercase tracking-[0.4em] text-vegas-neon flex items-center gap-4">
                        <div className="h-0.5 w-8 bg-vegas-neon" />
                        Controls
                      </h3>
                      <div className="space-y-3">
                        {[
                          { key: 'Arrows / WASD', action: 'Move' },
                          { key: 'Space', action: 'Action' },
                          { key: 'R', action: 'Reset' },
                        ].map((ctrl) => (
                          <div key={ctrl.key} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{ctrl.action}</span>
                            <span className="text-[9px] font-mono bg-vegas-dark px-3 py-1 rounded-lg text-vegas-gold border border-vegas-gold/20 leading-none">{ctrl.key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
