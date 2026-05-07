import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  // --- Initialize Session Data ---
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
  }, []);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-indigo-500/40 overflow-x-hidden">
      
      {/* Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-12 relative z-10"
      >
        {/* Dynamic Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">System Online // v2.0.4</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9]">
              Lab <span className="text-gray-500 font-light italic">Dashboard</span>
            </h1>
          </motion.div>
        </header>

        {/* Dashboard Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Module: AI Scanner */}
          <motion.div 
            variants={itemVariants}
            onClick={() => navigate('/analysis')}
            className="md:col-span-8 group relative h-[500px] rounded-[3.5rem] p-1 bg-gradient-to-b from-white/10 to-transparent cursor-pointer transition-all duration-500"
          >
            <div className="relative h-full w-full bg-[#080808] rounded-[3.4rem] overflow-hidden p-12 flex flex-col justify-between border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col items-start gap-8">
                <div className="w-20 h-20 bg-white text-black rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                </div>
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tighter italic uppercase">
                    Initialize <br/><span className="text-indigo-500 not-italic">Neural Fit-Scan</span>
                  </h2>
                  <p className="text-gray-400 max-w-sm text-lg font-medium leading-relaxed">
                    Deploy AI vision to analyze silhouette architecture and color theory.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] group-hover:bg-white group-hover:text-black transition-all duration-500">
                  Execute Protocol
                </div>
                <span className="text-[10px] text-gray-600 font-mono italic">Ready_for_input.sys</span>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-white/5 rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 border border-white/5 rounded-full" />
            </div>
          </motion.div>

          {/* Side Modules: Data & Experience */}
          <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-8">
            {/* Rank Card */}
            <div className="flex-1 p-10 bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20"/></svg>
              </div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Global Influence</p>
              <div>
                <h3 className="text-8xl font-black tracking-tighter italic text-white/90">#249</h3>
                <div className="flex items-center gap-2 mt-4 text-emerald-400 font-bold text-xs">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 15l-6-6-6 6"/></svg>
                  <span>TOP 2.4% THIS WEEK</span>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="p-10 bg-indigo-600 rounded-[3.5rem] text-white shadow-[0_0_60px_rgba(79,70,229,0.2)]">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Experience Level</p>
               <h4 className="text-3xl font-bold mb-6 italic">Tier_02 Master</h4>
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Progress</span>
                    <span>750 / 1000 XP</span>
                  </div>
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
                    <motion.div initial={{width:0}} animate={{width:"75%"}} transition={{duration:2}} className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Footer Modules: Feed & Engine */}
          <motion.div variants={itemVariants} className="md:col-span-4 p-10 bg-[#0a0a0a] border border-white/5 rounded-[3.5rem]">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8">Live Neural Feed</p>
            <div className="space-y-6">
              {['Aesthetic_V3', 'Silhouete_Scan', 'Palette_Sync'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group/item cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover/item:scale-150 transition-transform" />
                  <span className="text-sm font-bold text-gray-400 group-hover/item:text-white transition-colors">{item}</span>
                  <span className="ml-auto text-[9px] font-mono text-gray-600 italic">0.0{idx+1}s</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-8 p-10 bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] flex items-center justify-between overflow-hidden relative">
             <div className="absolute right-[-5%] top-[-10%] opacity-5">
               <svg width="400" height="400" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
             </div>
             <div className="relative z-10 space-y-2">
               <h4 className="text-3xl font-bold tracking-tight uppercase">Accuracy Engine</h4>
               <p className="text-sm text-gray-500 font-medium italic leading-relaxed">Quantum calibration active for precise results.</p>
             </div>
             <div className="relative z-10 flex gap-8 pr-4">
                <div className="text-center">
                  <p className="text-5xl font-black italic">98<span className="text-lg text-indigo-500">%</span></p>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-2">Precision</p>
                </div>
                <div className="w-[1px] h-16 bg-white/5" />
                <div className="text-center">
                  <p className="text-5xl font-black italic">14<span className="text-lg text-indigo-500">ms</span></p>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-2">Latency</p>
                </div>
             </div>
          </motion.div>

        </div>

        {/* Minimalist Page Footer */}
        <motion.footer 
          variants={itemVariants}
          className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-30 text-[9px] font-mono tracking-[0.4em] uppercase"
        >
          <p>© 2026 StyleLab Neural Network // Core_Module_Init</p>
          <div className="flex gap-12 mt-6 md:mt-0">
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">Privacy.exe</span>
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">Nodes.status</span>
          </div>
        </motion.footer>

      </motion.div>
    </div>
  );
};

export default Dashboard;