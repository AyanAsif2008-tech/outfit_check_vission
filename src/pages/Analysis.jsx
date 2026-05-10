import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Analysis = () => {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(""); 
  const [status, setStatus] = useState("idle"); 
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const fileInputRef = useRef(null);

  const API_KEY = "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"; 

  const getThemeColor = () => {
    if (score === 0) return "#6366f1";
    if (score >= 80) return "#10b981";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const themeColor = getThemeColor();

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
        setBase64Image(reader.result);
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
                { type: "text", text: "Act as a luxury fashion critic. Start your response with 'SCORE: [number]'. Then give a concise silhouette analysis and 3 sharp tips. Be brutal." },
                { type: "image_url", image_url: { url: base64Image } },
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
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 lg:p-12 font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/5 blur-[80px] md:blur-[120px] -z-10" />

      <header className="mb-8 md:mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-indigo-500 font-black text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[0.7em] uppercase">Neural.Fashion_Core v3.0</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mt-2">
            Aesthetic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">Report</span>
          </h1>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* LEFT: IMAGE VIEWPORT */}
        <div className="lg:col-span-5 order-1 lg:order-1">
          <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{ rotateX, rotateY, perspective: 1500 }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none"
          >
            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-full h-full bg-[#0d0d0d] rounded-[2rem] md:rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl cursor-pointer"
            >
              {image ? (
                <img src={image} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Subject" />
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30 p-4 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center mb-4 text-xl md:text-2xl font-light">+</div>
                  <p className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase">Upload Subject</p>
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
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-2">
          {/* RATING SECTION */}
          <div className="bg-[#0d0d0d] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col sm:flex-row items-center gap-8 md:gap-10 shadow-2xl">
            
            <div className="relative w-40 h-40 md:w-52 md:h-52 flex-shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.03)" strokeWidth="12" fill="transparent" />
                <motion.circle 
                  cx="50%" cy="50%" r="45%" stroke={themeColor} strokeWidth="12" fill="transparent" 
                  strokeDasharray="283%"
                  initial={{ strokeDashoffset: "283%" }}
                  animate={{ strokeDashoffset: `${283 - (283 * score) / 100}%` }}
                  transition={{ duration: 2.5, ease: "circOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  animate={{ color: themeColor }} 
                  className="text-5xl md:text-7xl font-black italic tracking-tighter"
                >
                  {score}
                </motion.span>
                <span className="text-[8px] md:text-[9px] font-bold tracking-widest opacity-40 uppercase">Rating Index</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-4 md:space-y-5">
              <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/30 text-center sm:text-left">System Parameters</h3>
              {[
                { label: "Silhouette Flow", val: score > 0 ? Math.min(100, score + 4) : 0 },
                { label: "Color Cohesion", val: score > 0 ? Math.max(0, score - 8) : 0 }
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
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
          <div className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6 opacity-30">
              <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.3em]">Critical_Analysis.log</span>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div className="font-mono text-xs md:text-sm leading-relaxed italic text-white/70 min-h-[120px] md:min-h-[150px]">
              {result ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{result}</motion.p>
              ) : (
                <p className="opacity-20 uppercase tracking-tighter">Awaiting Signal... Deploy subject visuals for biometric grading.</p>
              )}
            </div>

            <button 
              onClick={analyzeWithAI}
              disabled={!image || status === "analyzing"}
              className="mt-8 md:mt-10 w-full py-5 md:py-7 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase transition-all active:scale-95 disabled:opacity-20 shadow-2xl relative overflow-hidden group"
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