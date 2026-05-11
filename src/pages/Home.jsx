import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

/* ---------------- PARTICLES ---------------- */

const particles = Array.from({ length: 140 }, (_, i) => ({
  id: i,
  position: [
    (Math.random() - 0.5) * 18,
    (Math.random() - 0.5) * 18,
    (Math.random() - 0.5) * 18,
  ],
}));

const ParticleField = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group ref={ref}>
      {particles.map((particle) => (
        <Sphere
          key={particle.id}
          position={particle.position}
          args={[0.06, 10, 10]}
        >
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#6366f1"
            emissiveIntensity={2}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={3} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

/* ---------------- HOME ---------------- */

const Home = () => {
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;

    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;

    heroRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const stats = [
    {
      label: "Aesthetic Flow",
      value: 95,
      color:
        "bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]",
    },
    {
      label: "Color Harmony",
      value: 88,
      color:
        "bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]",
    },
    {
      label: "Style Index",
      value: 92,
      color:
        "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]",
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white flex flex-col items-center py-12 md:py-20"
    >

      {/* 3D Background */}
      <ParticleBackground />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Gradient Blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-indigo-500/20 rounded-full blur-[140px]" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-purple-500/20 rounded-full blur-[140px]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-0" />

      {/* HERO */}
      <div
        ref={heroRef}
        className="relative z-10 flex flex-col items-center text-center px-6 mt-10 transition-transform duration-300"
      >

        {/* Status */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8 px-6 py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl flex items-center gap-3 shadow-2xl"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>

            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>

          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/50">
            System Status: Neural Online
          </p>
        </motion.div>

        {/* Glow */}
        <div className="absolute w-[450px] h-[450px] bg-indigo-500/20 blur-[160px] rounded-full animate-pulse" />

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
          relative
          text-[16vw]
          md:text-[13vw]
          font-black
          leading-[0.8]
          tracking-tighter
          uppercase
          italic
          text-white
          drop-shadow-[0_0_80px_rgba(99,102,241,0.35)]
          "
        >
          Outfit <br />

          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500 not-italic">
            Check
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="
          mt-8
          text-gray-400
          text-[10px]
          md:text-lg
          uppercase
          tracking-[0.4em]
          font-medium
          max-w-2xl
          "
        >
          Rate your drip with{" "}
          <span className="text-white font-bold">
            Mathematical Precision.
          </span>
        </motion.p>
      </div>

      {/* PREVIEW CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
          rotateX: 4,
          rotateY: -4,
          scale: 1.02,
        }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10 mt-20 w-full max-w-5xl px-6"
      >
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 shadow-[0_0_100px_rgba(0,0,0,0.9)]">

          {/* IMAGE */}
          <div className="relative h-[350px] md:h-[500px] overflow-hidden group">

            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1200"
              alt="Fashion"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
            />

            {/* Scanner */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_20px_#6366f1]"
            />

            {/* Corners */}
            <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-indigo-500" />

            <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-indigo-500" />

            {/* Label */}
            <div className="absolute top-6 right-6 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-lg text-[10px] uppercase tracking-[0.3em] text-indigo-300 font-black">
              Live Neural Analysis
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-10 md:p-14 flex flex-col justify-center">

            {/* Score */}
            <div className="mb-10">
              <span className="text-indigo-400 text-[10px] tracking-[0.4em] uppercase font-black">
                Neural Score
              </span>

              <div className="flex items-end gap-3 mt-3">
                <span className="text-7xl md:text-8xl font-black italic">
                  9.4
                </span>

                <span className="text-2xl text-gray-500 font-bold mb-2">
                  /10
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] mb-3 text-gray-400 font-black">
                    <span>{stat.label}</span>

                    <span className="text-indigo-400">
                      {stat.value}%
                    </span>
                  </div>

                  <div className="h-[5px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                      }}
                      className={`h-full ${stat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Verdict */}
            <div className="mt-10 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-lg relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500" />

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 leading-relaxed">
                <span className="text-indigo-400 font-black mr-2">
                  Verdict:
                </span>

                Elite-tier silhouette composition detected.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* BUTTONS */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center mt-16 w-full max-w-md px-6">

        <Link to="/signup" className="flex-1 relative group">

          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-md group-hover:opacity-100 transition duration-500"></div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative w-full py-5 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs"
          >
            Initialize Scan
          </motion.button>
        </Link>

        <Link to="/signin" className="flex-1">
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fff",
              color: "#000",
            }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white font-black uppercase tracking-[0.2em] text-xs transition-all"
          >
            Access Archive
          </motion.button>
        </Link>
      </div>

      {/* BIG RING */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[900px]
        h-[900px]
        border
        border-white/[0.04]
        rounded-full
        z-0
        "
      />
    </div>
  );
};

export default Home;