// src/components/Navbar.jsx
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-center pt-8 z-[100] px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] py-4 px-10 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Logo Image with Theme Filter */}
            <img 
              src="../logo.png" // Apne logo ka sahi path yahan dalein
              alt="Outfit Check Logo" 
              className="w-full h-full object-contain brightness-0 invert-[0.9] sepia-[1] saturate-[5] hue-rotate-[200deg] drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
              OUTFITCHECK
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-indigo-300 transition-colors">
              Your Style Assistant
            </span>
          </div>
        </NavLink>

        {/* Links */}
        <div className="hidden md:flex items-center gap-12 font-bold text-[10px] uppercase tracking-[0.3em]">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" : "text-gray-500 hover:text-white transition-all"}>Home</NavLink>
          <NavLink to="/signin" className={({ isActive }) => isActive ? "text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" : "text-gray-500 hover:text-white transition-all"}>Sign In</NavLink>
          <NavLink to="/signup" className="group relative px-6 py-2 overflow-hidden rounded-full border border-indigo-500/50 text-white">
            <div className="absolute inset-0 bg-indigo-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Sign Up</span>
          </NavLink>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;