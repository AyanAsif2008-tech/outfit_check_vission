import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Existing Imports
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import SidebarLayout from './components/SidebarLayout';
import Archives from './pages/Archives';

// --- UPDATED IMPORTS (Components folder se) ---
import Summer from './components/suggestions/Summer';
import Winter from './components/suggestions/Winter';
import Autumn from './components/suggestions/Autumn';
import Monsoon from './components/suggestions/Monsoon';

const AppContent = () => {
  const location = useLocation();
  
  // Navbar hide karne ke liye
  const hideNavbarPaths = ['/dashboard', '/analysis', '/archives', '/suggestions'];
  
  const isAppArea = hideNavbarPaths.some(path => 
    location.pathname.toLowerCase().startsWith(path)
  );

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]" />
      </div>

      {!isAppArea && <Navbar />}
      
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard" element={<SidebarLayout><Dashboard /></SidebarLayout>} />
          <Route path="/analysis" element={<SidebarLayout><Analysis /></SidebarLayout>} />
          <Route path="/archives" element={<SidebarLayout><Archives /></SidebarLayout>} />

          {/* --- ROUTES CONNECTED TO YOUR COMPONENTS --- */}
          <Route path="/suggestions/summer" element={<SidebarLayout><Summer /></SidebarLayout>} />
          <Route path="/suggestions/winter" element={<SidebarLayout><Winter /></SidebarLayout>} />
          <Route path="/suggestions/autumn" element={<SidebarLayout><Autumn /></SidebarLayout>} />
          <Route path="/suggestions/monsoon" element={<SidebarLayout><Monsoon /></SidebarLayout>} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;