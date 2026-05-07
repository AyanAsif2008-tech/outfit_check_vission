import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Analysis = () => {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(""); 
  const [status, setStatus] = useState("idle"); 
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const fileInputRef = useRef(null);

  // --- CONFIGURATION ---
  const API_KEY = "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"; 

  // --- DYNAMIC THEME COLOR ---
  const getThemeColor = () => {
    if (score === 0) return "#6366f1"; // Default Indigo
    if (score >= 80) return "#10b981"; // Emerald Green
    if (score >= 50) return "#f59e0b"; // Amber/Orange
    return "#ef4444"; // Ruby Red
  };

  const themeColor = getThemeColor();

  // --- 3D INTERACTION ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { damping: 25, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { damping: 25, stiffness: 100 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // Keeps prefix for easy rendering
      };
      reader.readAsDataURL(file);
      setStatus("idle");
      setResult("");
      setScore(0);
    }
  };

  const analyzeWithAI = async () => {
    if (!base64Image) return;
    setStatus("analyzing");
    setResult("");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.origin || "http://localhost:3000", 
          'X-Title': 'StyleScanner.AI'
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                { 
                  type: "text", 
                  text: "Act as a luxury fashion critic. Start your response with 'SCORE: [number]'. Then give a concise silhouette analysis and 3 sharp tips. Be brutal." 
                },
                {
                  type: "image_url",
                  image_url: { url: base64Image }, // Send full data URI
                },
              ],
            },
          ],
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0].message.content) {
        const content = data.choices[0].message.content;
        const scoreMatch = content.match(/SCORE:\s*(\d+)/i);
        
        if (scoreMatch) {
          setScore(parseInt(scoreMatch[1]));
          setResult(content.replace(/SCORE:\s*\d+/i, "").trim());
        } else {
          setResult(content);
        }
        setStatus("success");
      } else {
        throw new Error(data.error?.message || "Check API Credits/Key");
      }
    } catch (err) {
      setStatus("error");
      setResult(`CONNECTION ERROR: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] -z-10" />

      <header className="mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-indigo-500 font-black text-[10px] tracking-[0.7em] uppercase">Neural.Fashion_Core v3.0</span>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mt-2">
            Aesthetic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">Report</span>
          </h1>
        </motion.div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* LEFT: IMAGE VIEWPORT (Removed Grayscale) */}
        <div className="lg:col-span-5">
          <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{ rotateX, rotateY, perspective: 1500 }}
            className="relative aspect-[3/4]"
          >
            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-full h-full bg-[#0d0d0d] rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl cursor-pointer"
            >
              {image ? (
                <img src={image} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Subject" />
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4 text-2xl font-light">+</div>
                  <p className="text-[10px] font-bold tracking-widest uppercase">Upload Subject</p>
                </div>
              )}

              <AnimatePresence>
                {status === "analyzing" && (
                  <motion.div 
                    initial={{ top: "0%" }} animate={{ top: "100%" }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[2px] z-50 shadow-[0_0_15px_#6366f1]"
                    style={{ background: themeColor }}
                  />
                )}
              </AnimatePresence>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
          </motion.div>
        </div>

        {/* RIGHT: DASHBOARD */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
            
            {/* LARGE DYNAMIC GAUGE */}
            <div className="relative w-52 h-52 flex-shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle cx="104" cy="104" r="94" stroke="rgba(255,255,255,0.03)" strokeWidth="14" fill="transparent" />
                <motion.circle 
                  cx="104" cy="104" r="94" stroke={themeColor} strokeWidth="14" fill="transparent" 
                  strokeDasharray="591"
                  initial={{ strokeDashoffset: 591 }}
                  animate={{ strokeDashoffset: 591 - (591 * score) / 100 }}
                  transition={{ duration: 2.5, ease: "circOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  animate={{ color: themeColor }} 
                  className="text-7xl font-black italic tracking-tighter transition-colors duration-1000"
                >
                  {score}
                </motion.span>
                <span className="text-[9px] font-bold tracking-widest opacity-40 uppercase">Rating Index</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">System Parameters</h3>
              {[
                { label: "Silhouette Flow", val: score > 0 ? Math.min(100, score + 4) : 0 },
                { label: "Color Cohesion", val: score > 0 ? Math.max(0, score - 8) : 0 }
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="opacity-50">{m.label}</span>
                    <span style={{ color: themeColor }}>{m.val}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${m.val}%` }} 
                      className="h-full transition-colors duration-1000"
                      style={{ backgroundColor: themeColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CRITIQUE TERMINAL */}
          <div className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 opacity-30">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Critical_Analysis.log</span>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div className="font-mono text-sm leading-relaxed italic text-white/70 min-h-[150px]">
              {result ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{result}</motion.p>
              ) : (
                <p className="opacity-20 uppercase tracking-tighter">Awaiting Signal... Deploy subject visuals for biometric grading.</p>
              )}
            </div>

            <button 
              onClick={analyzeWithAI}
              disabled={!image || status === "analyzing"}
              className="mt-10 w-full py-7 rounded-2xl font-black text-xs tracking-[0.6em] uppercase transition-all active:scale-95 disabled:opacity-20 shadow-2xl relative overflow-hidden group"
              style={{ backgroundColor: themeColor }}
            >
              <span className="relative z-10 text-black">
                {status === "analyzing" ? "Processing..." : "Initiate Neural Scan"}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;