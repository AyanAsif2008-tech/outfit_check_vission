import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
  }, []);

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
        <div className="absolute top-[-10%] left-[-10%] w-[80%] md:w-[40%] h-[40%] bg-indigo-600/10 blur-[80px] md:blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] md:w-[40%] h-[40%] bg-purple-600/10 blur-[80px] md:blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 pt-12 md:pt-28 pb-12 relative z-10"
      >
        {/* Responsive Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-8">
          <motion.div variants={itemVariants} className="space-y-4 w-full">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">System Online // v2.0.4</span>
            </div>
            {/* Header Text Responsive Fix */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight md:leading-[0.9]">
              Lab <span className="text-gray-500 font-light italic">Dashboard</span>
            </h1>
          </motion.div>
        </header>

        {/* Dashboard Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          
          {/* Main Module: AI Scanner */}
          <motion.div 
            variants={itemVariants}
            onClick={() => navigate('/analysis')}
            className="md:col-span-12 lg:col-span-8 group relative min-h-[300px] md:min-h-[450px] rounded-[2rem] md:rounded-[3.5rem] p-0.5 bg-gradient-to-b from-white/10 to-transparent cursor-pointer transition-all duration-500"
          >
            <div className="relative h-full w-full bg-[#080808] rounded-[1.9rem] md:rounded-[3.4rem] overflow-hidden p-6 md:p-12 flex flex-col justify-between border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col items-start gap-4 md:gap-8">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-white text-black rounded-xl md:rounded-[2rem] flex items-center justify-center shadow-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                  <svg className="w-6 h-6 md:w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                </div>
                <div className="space-y-2 md:space-y-4">
                  {/* Neural Fit-Scan Text Responsive Fix */}
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tighter italic uppercase leading-tight md:leading-none">
                    Initialize <br/><span className="text-indigo-500 not-italic">Neural Fit-Scan</span>
                  </h2>
                  <p className="text-gray-400 max-w-sm text-[11px] sm:text-base md:text-lg font-medium leading-relaxed">
                    Deploy AI vision to analyze silhouette architecture and color theory.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-4 mt-6 md:mt-8">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] group-hover:bg-white group-hover:text-black transition-all duration-500">
                  Execute Protocol
                </div>
                <span className="text-[9px] md:text-[10px] text-gray-600 font-mono italic">Ready_for_input.sys</span>
              </div>
            </div>
          </motion.div>

          {/* Experience & Rank Cards - Critical Responsive Fixes */}
          <div className="md:col-span-12 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
            <motion.div variants={itemVariants} className="p-6 md:p-10 bg-[#0a0a0a] border border-white/5 rounded-[2rem] md:rounded-[3.5rem] flex flex-col justify-between relative overflow-hidden group min-h-[160px] md:min-h-[220px]">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Global Influence</p>
              <div className="overflow-hidden">
                {/* Score Number Fix: Choti screen par text-4xl, badi par text-8xl */}
                <h3 className="text-4xl sm:text-6xl md:text-4xl font-black tracking-tighter italic text-white/90 leading-none">#249</h3>
                <div className="flex items-center gap-2 mt-2 md:mt-4 text-emerald-400 font-bold text-[9px] md:text-[10px]">
                  <span>TOP 2.4% THIS WEEK</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 md:p-10 bg-indigo-600 rounded-[2rem] md:rounded-[3.5rem] text-white shadow-xl min-h-[160px] md:min-h-[220px] flex flex-col justify-between">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Experience Level</p>
               <div>
                  <h4 className="text-lg md:text-3xl font-bold mb-4 md:mb-6 italic">Tier_02 Master</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="h-1.5 md:h-2 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
                      <motion.div initial={{width:0}} animate={{width:"75%"}} transition={{duration:2}} className="h-full bg-white rounded-full" />
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Neural Feed */}
          <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-4 p-6 md:p-10 bg-[#0a0a0a] border border-white/5 rounded-[2rem] md:rounded-[3.5rem]">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6 md:mb-8">Live Neural Feed</p>
            <div className="space-y-4 md:space-y-6">
              {['Aesthetic_V3', 'Silhouete_Scan', 'Palette_Sync'].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group/item cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/item:scale-150 transition-transform" />
                    <span className="text-xs md:text-sm font-bold text-gray-400 group-hover/item:text-white transition-colors">{item}</span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-600 italic">Active</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Engine Module */}
          <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-8 p-6 md:p-10 bg-[#0a0a0a] border border-white/5 rounded-[2rem] md:rounded-[3.5rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:gap-8">
             <div className="space-y-1">
                <h4 className="text-lg md:text-3xl font-bold uppercase tracking-tight">Accuracy Engine</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium italic">Quantum calibration active.</p>
             </div>
             <div className="flex gap-6 md:gap-12 w-full sm:w-auto justify-between sm:justify-end pr-0 sm:pr-4">
                <div className="text-center">
                  {/* Percent Text responsive fix */}
                  <p className="text-3xl md:text-5xl font-black italic">98<span className="text-lg text-indigo-500">%</span></p>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1">Precision</p>
                </div>
                <div className="text-center">
                  {/* Latency Text responsive fix */}
                  <p className="text-3xl md:text-5xl font-black italic">14<span className="text-lg text-indigo-500">ms</span></p>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1">Latency</p>
                </div>
             </div>
          </motion.div>

        </div>

        {/* Footer */}
        <footer className="mt-12 md:mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center opacity-30 text-[8px] md:text-[9px] font-mono tracking-[0.4em] uppercase gap-4 text-center sm:text-left">
          <p>© 2026 StyleLab Neural Network</p>
          <div className="flex gap-6 md:gap-8">
            <span>Privacy.exe</span>
            <span>Nodes.status</span>
          </div>
        </footer>

      </motion.div>
    </div>
  );
};

export default Dashboard;