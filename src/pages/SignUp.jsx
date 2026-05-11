import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- Cyber-Alert Configuration ---
  const Toast = Swal.mixin({
    background: '#0d0d0d',
    color: '#fff',
    confirmButtonColor: '#9333ea',
    customClass: {
      popup: 'border border-purple-500/30 rounded-[2rem] backdrop-blur-xl max-w-[90%]', // Responsive width for Swal
      title: 'text-lg md:text-xl font-black italic tracking-tighter uppercase',
      htmlContainer: 'text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400'
    }
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Toast.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'System requires data to initialize. Full entry is mandatory.'
      });
      return;
    }

    if (fullName.trim().length < 3) {
      Toast.fire({
        icon: 'error',
        title: 'Invalid Identity',
        text: 'Your Name must contain at least 3 characters.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.fire({
        icon: 'error',
        title: 'Invalid Neural Link',
        text: 'The provided email identity does not match standard protocols.'
      });
      return;
    }

    if (password.length < 6) {
      Toast.fire({
        icon: 'error',
        title: 'Weak Encryption',
        text: 'Security protocol requires at least 6 characters.'
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', fullName);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPass', password); 

      setFullName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      
      Toast.fire({
        icon: 'success',
        title: 'Profile Initialized',
        text: `Welcome Agent ${fullName}. Link Established.`,
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate('/signIn'), 1600);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-600/5 blur-[80px] md:blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm md:max-w-md"
      >
        <div className="p-6 md:p-10 bg-[#0d0d0d] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
          
          <header className="text-center mb-8 md:mb-10">
            <div className="inline-block p-3 md:p-4 rounded-2xl bg-purple-600/10 border border-purple-500/20 mb-4">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white">SIGN UP</h2>
            <p className="text-purple-500 text-[8px] md:text-[9px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase mt-1">Network Registration Core</p>
          </header>

          <form className="space-y-3 md:space-y-4" onSubmit={handleFormSubmit}>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="IDENTIFY: FULL NAME" 
              className="w-full bg-[#111] border border-white/5 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-purple-500/50 text-white text-[9px] md:text-[10px] font-bold tracking-widest transition-all placeholder:opacity-30" 
            />
            
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="NEURAL LINK: EMAIL" 
              className="w-full bg-[#111] border border-white/5 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-purple-500/50 text-white text-[9px] md:text-[10px] font-bold tracking-widest transition-all placeholder:opacity-30" 
            />
            
            <input 
              type="password" 
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENCRYPT: PASSWORD" 
              className="w-full bg-[#111] border border-white/5 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-purple-500/50 text-white text-[9px] md:text-[10px] font-bold tracking-widest transition-all placeholder:opacity-30" 
            />
            
            <motion.button 
              disabled={loading}
              whileHover={{ scale: 1.02, backgroundColor: '#9333ea' }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] mt-4 md:mt-6 transition-all disabled:opacity-20 flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                   <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                   </svg>
                   Establishing Link...
                </span>
              ) : "Deploy Profile"}
            </motion.button>
          </form>

          <footer className="text-center mt-8 md:mt-10">
            <p className="text-[8px] md:text-[9px] font-bold text-gray-700 tracking-widest uppercase">
              Existing Node? <Link to="/signin" className="text-purple-500 hover:text-purple-400 ml-1 transition-colors">Login</Link>
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;