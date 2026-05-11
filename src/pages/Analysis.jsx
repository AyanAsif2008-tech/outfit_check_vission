import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Analysis = () => {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(""); 
  const [status, setStatus] = useState("idle"); 
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const fileInputRef = useRef(null);

  const API_KEY = "jXMVCaFtneeAn6x18FnLDepXnqGhXk05"; 

  const getThemeColor = () => {
    if (score === 0) return "#8b5cf6"; 
    if (score >= 8) return "#d8b4fe";  
    if (score >= 5) return "#a855f7";  
    return "#6366f1";                 
  };

  const themeColor = getThemeColor();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { damping: 25, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { damping: 25, stiffness: 100 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(null);
      setBase64Image(""); 
      setResult("");
      setScore(0);
      setStatus("idle");
      setImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = (event) => setBase64Image(event.target.result);
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const analyzeWithAI = async () => {
    if (!base64Image || status === "analyzing") return;
    setStatus("analyzing");
    setResult("");

    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "pixtral-12b-2409",
          messages: [
            {
              role: "user",
              content: [
                { 
                  type: "text", 
                  text: "You are a critical fashion judge. Give a specific score (decimals allowed). Start with 'SCORE: [number/10]'. Then one sharp, witty critique sentence."
                },
                { type: "image_url", image_url: base64Image },
              ],
            },
          ],
          temperature: 0.9,
          max_tokens: 100
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0].message.content) {
        const content = data.choices[0].message.content;
        const scoreMatch = content.match(/SCORE:\s*\[?(\d+(\.\d+)?)/i);
        if (scoreMatch) {
          setScore(parseFloat(scoreMatch[1])); 
          setResult(content.replace(/SCORE:.*10\]?/i, "").trim());
        } else {
          setResult(content);
        }
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setResult(`SYSTEM ERROR: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 sm:p-8 md:p-12 font-sans flex flex-col items-center relative overflow-x-hidden">
      
      {/* GLOWING AMBIENCE - Responsive Sizes */}
      <div className="absolute top-[-5%] left-[-5%] w-[60%] sm:w-[40%] h-[40%] bg-purple-900/20 blur-[80px] sm:blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[60%] sm:w-[40%] h-[40%] bg-indigo-900/20 blur-[80px] sm:blur-[120px] rounded-full -z-10" />
      
      <header className="w-full max-w-5xl mb-8 sm:mb-16 text-center relative">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase leading-none inline-block bg-gradient-to-b from-white to-purple-500 bg-clip-text text-transparent px-2">
            Outfit <span className="text-purple-600/50">Rating</span>
          </h1>
          <div className="h-1 w-20 sm:w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_#a855f7]" />
        </motion.div>
      </header>

      {/* Main Grid: Stacked on mobile, 2 cols on lg screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-5xl w-full items-center z-10">
        
        {/* LEFT: IMAGE VIEWPORT */}
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          style={{ rotateX, rotateY, perspective: 1500 }}
          className="relative aspect-[3/4] w-full max-w-[320px] sm:max-w-md mx-auto lg:mx-0 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[2.6rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div 
            onClick={() => fileInputRef.current.click()}
            className="relative w-full h-full bg-[#08080c] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl cursor-pointer"
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="Subject" />
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 gap-3 p-4 text-center">
                <div className="w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.2)]">+</div>
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-purple-200">Neural Input</p>
              </div>
            )}
            <AnimatePresence>
              {status === "analyzing" && (
                <motion.div 
                  initial={{ top: "0%" }} animate={{ top: "100%" }} 
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-[2px] z-50 shadow-[0_0_20px_white]"
                  style={{ background: `linear-gradient(to right, transparent, ${themeColor}, transparent)` }}
                />
              )}
            </AnimatePresence>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
        </motion.div>

        {/* RIGHT: INFO SIDE */}
        <div className="flex flex-col gap-8 sm:gap-12 w-full max-w-md mx-auto lg:max-w-none">
          
          {/* PURPLE RATING BAR CARD */}
          <div className="bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/5 relative">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-6 gap-4 sm:gap-0">
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-purple-400/60 order-2 sm:order-1">Style Metric</span>
                <div className="flex items-baseline gap-1 order-1 sm:order-2">
                    <motion.span animate={{ color: themeColor }} className="text-6xl sm:text-8xl font-black italic leading-none drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                      {score}
                    </motion.span>
                    <span className="text-xl font-bold opacity-10">/10</span>
                </div>
            </div>
            
            <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-white/5 relative">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score * 10}%` }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full relative"
                    style={{ 
                      background: `linear-gradient(90deg, #6366f1, ${themeColor})`,
                      boxShadow: `0 0 20px ${themeColor}60`
                    }}
                />
            </div>
          </div>

          {/* MINIMAL VERDICT BOX */}
          <div className="min-h-[60px] flex items-center border-l-2 border-purple-500/40 pl-6 sm:pl-8 bg-gradient-to-r from-purple-500/5 to-transparent py-4">
            <p className="text-base sm:text-lg font-medium italic text-purple-50/80 leading-relaxed tracking-tight">
              {result || "System online. Awaiting neural link..."}
            </p>
          </div>

          {/* SCAN BUTTON - Full width on mobile */}
          <button 
            onClick={analyzeWithAI}
            disabled={!image || status === "analyzing"}
            className="w-full py-5 sm:py-6 rounded-2xl font-black text-[10px] sm:text-[11px] tracking-[0.6em] uppercase shadow-2xl relative overflow-hidden transition-all active:scale-95 disabled:opacity-20 group"
            style={{ 
                background: '#0a0a0f',
                border: `1px solid ${themeColor}50`,
                color: themeColor
            }}
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              {status === "analyzing" ? "Analyzing..." : "Execute Scan"}
            </span>
            <div 
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-tr from-purple-600 to-indigo-600"
            />
          </button>
        </div>

      </div>

      <footer className="mt-auto py-8 opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center w-full">
        Neural.Style_Scan © 2026
      </footer>
    </div>
  );
};

export default Analysis;