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
        {/* Logo with Glow */}
        <div className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg rotate-12 flex items-center justify-center text-xs not-italic shadow-[0_0_20px_rgba(79,70,229,0.6)]">O</div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">OUTFITCHECK</span>
        </div>

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