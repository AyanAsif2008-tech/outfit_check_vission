import React from 'react';
import { motion } from 'framer-motion';

const Winter = () => {
  const cards = [
    { 
      id: 'W-01', 
      title: 'Overcoat Command', 
      desc: 'Heavy wool in Charcoal or Camel. It is the only thing people see, make it count.', 
      tag: 'Outerwear',
      img: '../winter1.png'
    },
    { 
      id: 'W-02', 
      title: 'Turtleneck Filter', 
      desc: 'Hides the neck, sharpens the jawline. The ultimate intellectual silhouette.', 
      tag: 'Torso',
      img: '../winter2.jpg'
    },
    { 
      id: 'W-03', 
      title: 'Thermal Knit', 
      desc: 'Waffle textures for heat retention. Function meets futuristic aesthetics.', 
      tag: 'Mid-Layer',
      img: '../winter3.jpg'
    },
    { 
      id: 'W-04', 
      title: 'Chelsea Deployment', 
      desc: 'Suede or Leather. Keep the profile slim from the ground up. Stealth footwear.', 
      tag: 'Footwear',
      img: '../winter4.png'
    },
    { 
      id: 'W-05', 
      title: 'Beanie Buffer', 
      desc: 'Cover the ears, but keep it high-fashion. Protect your neural link from the cold.', 
      tag: 'Accessory',
      img: '../winter5.png'
    },
    { 
      id: 'W-06', 
      title: '14oz Raw Denim', 
      desc: 'Bulletproof rigidity. Cold-proof shielding for your lower frame. Minimal wash.', 
      tag: 'Lower',
      img: '../winter6.png'
    },
    { 
      id: 'W-07', 
      title: 'Puffer Shield', 
      desc: 'Cropped tech-wear. You are a human, not a balloon. High-density down fill.', 
      tag: 'Utility',
      img: '../winter7.png'
    },
    { 
      id: 'W-08', 
      title: 'Shearling Vibe', 
      desc: 'The luxury of warmth. Adds texture and weight to a weak silhouette. Alpha layer.', 
      tag: 'Premium',
      img: '../winter8.png'
    },
    { 
      id: 'W-09', 
      title: 'Scarf Protocol', 
      desc: 'The final knot. Adds 20% more sophistication to any neural scan instantly.', 
      tag: 'Accessory',
      img: '../winter9.jpg'
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12 pb-20 px-4 md:px-0">
      <div className="relative">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-blue-400 font-mono text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase block"
        >
          Active_Season: Glacial_Shield
        </motion.span>
        {/* Adjusted text size for mobile (text-4xl) to desktop (text-7xl) */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter mt-2 text-white leading-none">
          Winter <span className="text-white/10 italic">Protocol</span>
        </h1>
      </div>

      {/* Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div 
            key={card.id} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }} 
            className="group bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl flex flex-col"
          >
            {/* Image Section */}
            <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-transform duration-700" 
              />
              <span className="absolute top-4 left-4 z-20 text-[8px] font-mono text-blue-400 border border-blue-400/30 px-2 py-1 rounded-full uppercase bg-black/50 tracking-widest">
                {card.id}
              </span>
            </div>

            {/* Content Section */}
            <div className="p-5 md:p-6 relative z-20 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-base md:text-lg font-black uppercase italic tracking-tight">{card.title}</h3>
                  <span className="text-[8px] text-white/20 font-bold uppercase border border-white/10 px-2 py-1 rounded shrink-0">{card.tag}</span>
                </div>
                <p className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-mono">{card.desc}</p>
              </div>
              <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-blue-500/50 transition-all duration-500 shadow-[0_0_15px_#3b82f6]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Winter;