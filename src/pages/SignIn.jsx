import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- Professional Cyber-Alert Config ---
  const Toast = Swal.mixin({
    background: '#0d0d0d',
    color: '#fff',
    confirmButtonColor: '#4f46e5',
    customClass: {
      popup: 'border border-indigo-500/30 rounded-[2rem] backdrop-blur-xl',
      title: 'text-xl font-black italic tracking-tighter uppercase',
      htmlContainer: 'text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400'
    }
  });

  useEffect(() => {
    // Reset fields on mount
    setEmail("");
    setPassword("");
  }, []);

  // --- Validation & Authentication Logic ---
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const inputEmail = email.trim();
    const inputPassword = password;

    if (!inputEmail || !inputPassword) {
      Toast.fire({
        icon: 'warning',
        title: 'Empty Protocols',
        text: 'All identity fields must be populated before authorization.'
      });
      return;
    }

    const registeredEmail = localStorage.getItem('userEmail')?.trim().toLowerCase();
    const registeredPass = localStorage.getItem('userPass');
    const registeredName = localStorage.getItem('userName');

    if (!registeredEmail) {
      Toast.fire({
        icon: 'question',
        title: 'Node Not Found',
        text: 'No account detected on this system. Please Request ID first.'
      });
      return;
    }

    if (inputEmail.toLowerCase() !== registeredEmail) {
      Toast.fire({
        icon: 'error',
        title: 'Identity Mismatch',
        text: 'Provided email does not match our encrypted records.'
      });
      return;
    }

    if (inputPassword !== registeredPass) {
      Toast.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Incorrect encryption key.'
      });
      setPassword(""); 
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      setLoading(false);
      Toast.fire({
        icon: 'success',
        title: 'Access Granted',
        text: `Identity Verified. Welcome back, Agent ${registeredName}.`,
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => navigate('/dashboard'), 1600);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Container (3D Logic Removed) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="p-10 bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Access Portal</h2>
            <p className="text-indigo-500 text-[9px] font-black tracking-[0.4em] uppercase mt-1">Security Clearance Required</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4" autoComplete="off">
            <input 
              type="email" 
              name="email_node"
              autoComplete="one-time-code"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="IDENTITY: EMAIL" 
              className="w-full bg-[#111] border border-white/5 p-4 rounded-2xl outline-none focus:border-indigo-500/50 text-white text-[10px] font-bold tracking-widest transition-all" 
            />
            <input 
              type="password" 
              name="password_node"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="KEY: PASSWORD" 
              className="w-full bg-[#111] border border-white/5 p-4 rounded-2xl outline-none focus:border-indigo-500/50 text-white text-[10px] font-bold tracking-widest transition-all" 
            />

            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: '#4f46e5' }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-indigo-600 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] text-white mt-6 transition-all disabled:opacity-20"
            >
              {loading ? "Authorizing..." : "Unlock Dashboard"}
            </motion.button>
          </form>

          <p className="text-center mt-10 text-[9px] font-bold text-gray-700 tracking-widest uppercase">
            New Agent? <Link to="/signup" className="text-indigo-500 underline ml-1">Request ID</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;