import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    name: 'Guest',
    initial: 'G'
  });

  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(
    location.pathname.includes('/suggestions')
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedName = localStorage.getItem('userName') || 'Agent';

    if (!isLoggedIn) {
      navigate('/signin');
    } else {
      setUser({
        name: storedName,
        initial: storedName.charAt(0).toUpperCase(),
      });
    }
  }, [navigate]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // UPDATED LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

    navigate('/signin');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon:
        'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    },
    {
      name: 'Neural Scan',
      path: '/analysis',
      icon:
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
  ];

  const seasonalItems = [
    {
      name: 'Summer Edit',
      path: '/suggestions/summer',
      color: 'text-orange-500',
    },
    {
      name: 'Winter Protocol',
      path: '/suggestions/winter',
      color: 'text-blue-400',
    },
    {
      name: 'Autumn Layer',
      path: '/suggestions/autumn',
      color: 'text-amber-600',
    },
    {
      name: 'Monsoon Gear',
      path: '/suggestions/monsoon',
      color: 'text-cyan-400',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed h-full z-[60] flex flex-col shadow-2xl overflow-y-auto custom-scrollbar transition-transform duration-500
          w-80 bg-[#080808]/90 backdrop-blur-2xl border-r border-white/5
          ${
            isMobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >

        {/* LOGO */}
        <div className="p-10 flex justify-between items-center">
          <div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-indigo-600 rounded-full blur-xl opacity-10 group-hover:opacity-30 transition duration-500" />

              <img
                src="../logo.png"
                alt="Logo"
                className="relative w-12 h-12 md:w-14 md:h-14 object-contain brightness-0 invert-[0.9] transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div>
              <span className="text-xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
                OUTFITCHECK
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-gray-500 p-2"
          >
            ✕
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.name} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group mb-1 ${
                    isActive
                      ? 'bg-indigo-600/10 text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_15px_#4f46e5]"
                    />
                  )}

                  <svg
                    className={`w-5 h-5 ${
                      isActive
                        ? 'text-indigo-500'
                        : 'text-gray-600 group-hover:text-gray-400'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d={item.icon}
                    />
                  </svg>

                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}

          {/* SUGGESTIONS */}
          <div className="pt-4">
            <button
              onClick={() =>
                setIsSuggestionsOpen(!isSuggestionsOpen)
              }
              className="w-full flex items-center justify-between px-6 py-4 text-gray-600 hover:text-gray-400 transition-colors"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.4em]">
                System Suggestions
              </span>

              <motion.span
                animate={{ rotate: isSuggestionsOpen ? 180 : 0 }}
                className="text-[10px]"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {isSuggestionsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden ml-4 border-l border-white/5 pl-4 space-y-1"
                >
                  {seasonalItems.map((s) => (
                    <Link key={s.name} to={s.path}>
                      <motion.div
                        className={`py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                          location.pathname === s.path
                            ? 'text-white bg-white/5'
                            : 'text-gray-600'
                        }`}
                      >
                        <span className={`mr-2 ${s.color}`}>•</span>
                        {s.name}
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="p-8 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center justify-between px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-red-500/10 hover:border-red-500/50 transition-all"
          >
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-red-500">
              Log Out
            </span>

            <svg
              className="w-4 h-4 text-gray-700 group-hover:text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 lg:ml-80 min-h-screen relative flex flex-col">

        {/* HEADER */}
        <header className="h-20 md:h-24 border-b border-white/5 flex items-center justify-between px-6 md:px-12 bg-[#050505]/60 backdrop-blur-xl sticky top-0 z-40">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 bg-white/5 rounded-xl border border-white/10 text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>

            <div className="hidden xs:block">
              <p className="text-[10px] font-black text-white tracking-widest uppercase italic">
                Neural Uplink Stable
              </p>

              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.3em]">
                Sector:{' '}
                {location.pathname
                  .split('/')
                  .pop()
                  ?.toUpperCase() || 'HQ'}
              </p>
            </div>
          </div>

          {/* USER */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black text-white uppercase tracking-tighter">
                {user.name}
              </p>

              <p className="text-[8px] text-indigo-500 font-bold uppercase tracking-[0.2em]">
                Verified Agent
              </p>
            </div>

            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rotate-45 rounded-xl opacity-20" />

              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-[#0d0d0d] border border-white/10 rounded-xl rotate-45 flex items-center justify-center">
                <span className="text-xs font-black text-white -rotate-45">
                  {user.initial}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-4 md:p-12 max-w-[1600px] mx-auto w-full relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.05),transparent)] pointer-events-none" />

          {children}
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;