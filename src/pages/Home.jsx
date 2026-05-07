import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { label: "Aesthetic Flow", value: 95, color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" },
    { label: "Color Harmony", value: 88, color: "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" },
    { label: "Style Index", value: 92, color: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center py-20 overflow-x-hidden relative selection:bg-indigo-500">
      
   
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 border border-indigo-500/10" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-600/5 border border-purple-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] opacity-50" />
      </div>

      {/* 2. Hero Section (Unchanged) */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 px-6 py-2 border border-white/10 rounded-full bg-[#0d0d0d] flex items-center gap-3 shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/50">System Status: Neural Online</p>
        </motion.div>

        <h1 className="text-[13vw] font-black leading-[0.8] tracking-tighter uppercase italic text-white">
          Outfit <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-600 not-italic">Check</span>
        </h1>

        <p className="mt-10 text-gray-500 text-sm md:text-lg uppercase tracking-[0.5em] font-medium max-w-2xl">
          Rate your drip with <span className="text-white font-bold">Mathematical Precision.</span>
        </p>
      </div>

      {/* 3. ENHANCED: Preview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mt-20 w-full max-w-4xl px-6"
      >
        <div className="bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
          
          {/* Image Side with Scan Effect */}
          <div className="relative h-[450px] bg-[#151515] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800" 
              alt="Style Preview" 
              className="w-full h-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
            />
            
            {/* Animated Scan Line */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-indigo-500/50 shadow-[0_0_15px_#4f46e5] z-20 pointer-events-none"
            />

            {/* Corner Accents */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-indigo-500 opacity-50" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-indigo-500 opacity-50" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
            <div className="absolute top-6 right-6 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 px-3 py-1 rounded-md text-[8px] font-black tracking-[0.2em] uppercase text-indigo-300">
              Live Neural Analysis
            </div>
          </div>

          {/* Graphical Rating Data */}
          <div className="p-10 md:p-14 flex flex-col justify-center bg-gradient-to-br from-transparent to-indigo-500/5">
            <div className="mb-8">
              <span className="text-indigo-500 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Neural Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black italic tracking-tighter text-white">9.4</span>
                <span className="text-xl font-bold text-gray-600">/10</span>
              </div>
            </div>

            <div className="space-y-8">
              {stats.map((stat, i) => (
                <div key={i} className="relative">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-gray-400">
                    <span>{stat.label}</span>
                    <span className="text-indigo-400 font-mono">{stat.value}%</span>
                  </div>
                  <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2, ease: "circOut" }}
                      className={`h-full ${stat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500/50" />
              <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wide">
                <span className="text-indigo-400 font-black mr-2">Verdict:</span> 
                Elite-tier silhouette composition detected. Subject exhibits optimal color-blocking consistency.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Action Buttons (Unchanged) */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-8 justify-center mt-16 w-full max-w-md px-6">
        <Link to="/signup" className="relative group flex-1">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-20 group-hover:opacity-100 transition duration-500"></div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full bg-white text-black py-5 rounded-full font-black uppercase text-xs tracking-[0.2em]"
          >
            Initialize Scan
          </motion.button>
        </Link>
        
        <Link to="/signin" className="flex-1">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-white/10 bg-[#0d0d0d] text-white py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all"
          >
            Access Archive
          </motion.button>
        </Link>
      </div>

      {/* 5. Decorative Background Rings (Unchanged) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-white/[0.05] rounded-full" 
        />
      </div>
    </div>
  );
};

export default Home;