import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Active Link Styling Function (to keep it consistent)
  const linkStyle = ({ isActive }) => 
    isActive 
      ? "text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" 
      : "text-gray-500 hover:text-white transition-all";

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center pt-4 md:pt-8 z-[100] px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2.5rem] py-3 md:py-4 px-6 md:px-10 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <img 
              src="../logo.png" 
              alt="Outfit Check Logo" 
              className="w-full h-full object-contain brightness-0 invert-[0.9] sepia-[1] saturate-[5] hue-rotate-[200deg] drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
              OUTFITCHECK
            </span>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-indigo-300 transition-colors">
              Your Style Assistant
            </span>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 font-bold text-[10px] uppercase tracking-[0.3em]">
          <NavLink to="/" className={linkStyle}>Home</NavLink>
          <NavLink to="/signin" className={linkStyle}>Sign In</NavLink>
          <NavLink to="/signup" className="group relative px-6 py-2 overflow-hidden rounded-full border border-indigo-500/50 text-white">
            <div className="absolute inset-0 bg-indigo-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Sign Up</span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white p-2 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full mt-4 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden md:hidden shadow-2xl"
            >
              <div className="flex flex-col p-8 gap-6 text-center font-bold text-[10px] uppercase tracking-[0.3em]">
                {/* Ab Mobile par Sign Up bhi Sign In ki tarah hi text-only dikhega */}
                <NavLink to="/" onClick={toggleMenu} className={linkStyle}>Home</NavLink>
                <NavLink to="/signin" onClick={toggleMenu} className={linkStyle}>Sign In</NavLink>
                <NavLink to="/signup" onClick={toggleMenu} className={linkStyle}>Sign Up</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;