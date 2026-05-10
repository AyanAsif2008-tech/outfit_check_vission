import React from 'react';
import { motion } from 'framer-motion';

const Monsoon = () => {
  const cards = [
    { 
      id: 'M-01', 
      title: 'Gore-Tex Shell', 
      desc: 'The ultimate rain shield. Water beads off like your haters’ opinions.', 
      tag: 'Outerwear',
      img: '../monsoon1.jpg' 
    },
    { 
      id: 'M-02', 
      title: 'Technical Cargo', 
      desc: 'Water-repellent fabrics. Deep pockets for dry hardware storage.', 
      tag: 'Lower',
      img: '../monsoon2.jpg'
    },
    { 
      id: 'M-03', 
      title: 'Rubberized Sole', 
      desc: 'Maximum grip for wet pavements. Slip-resistance is high-fashion.', 
      tag: 'Footwear',
      img: '../monsoon3.jpg'
    },
    { 
      id: 'M-04', 
      title: 'Bucket Protocol', 
      desc: '360-degree rain protection. The streetwear approach to storms.', 
      tag: 'Accessory',
      img: '../monsoon4.jpg'
    },
    { 
      id: 'M-05', 
      title: 'Quick-Dry Base', 
      desc: 'Synthetic blends that don’t hold moisture. Stay light, stay dry.', 
      tag: 'Torso',
      img: '../monsoon5.jpg'
    },
    { 
      id: 'M-06', 
      title: 'Neon Accents', 
      desc: 'Low visibility demands high-vis colors. Stand out in the grey.', 
      tag: 'Visual',
      img: '../monsoon6.jpg'
    },
    { 
      id: 'M-07', 
      title: 'Dry-Bag Tech', 
      desc: 'Keep your tech safe. A backpack that’s essentially a submarine.', 
      tag: 'Utility',
      img: '../monsoon7.jpg'
    },
    { 
      id: 'M-08', 
      title: 'Cropped Hem', 
      desc: 'Stop your trousers from soaking up puddles. Higher cuts only.', 
      tag: 'Lower',
      img: '../monsoon8.jpg'
    },
    { 
      id: 'M-09', 
      title: 'Ripstop Shield', 
      desc: 'Tear-resistant fabric for harsh conditions. Rugged but aesthetic.', 
      tag: 'Material',
      img: '../monsoon9.jpg'
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12 pb-20 px-4 md:px-0">
      {/* Header Section */}
      <div className="relative">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-cyan-400 font-mono text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase block"
        >
          Active_Season: Humidity_Protocol
        </motion.span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter mt-2 text-white leading-none">
          Monsoon <span className="text-white/10">Shield</span>
        </h1>
      </div>

      {/* Grid Layout (Same as Summer) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div 
            key={card.id} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }} 
            className="group bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 shadow-2xl flex flex-col"
          >
            {/* Image Section */}
            <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-transform duration-700" 
              />
              <span className="absolute top-4 left-4 z-20 text-[8px] font-mono text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded-full uppercase bg-black/50 tracking-widest">
                {card.id}
              </span>
            </div>

            {/* Content Section */}
            <div className="p-5 md:p-6 relative z-20 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-base md:text-lg font-black uppercase italic tracking-tight leading-tight">{card.title}</h3>
                  <span className="text-[8px] text-white/20 font-bold uppercase border border-white/10 px-2 py-1 rounded shrink-0">{card.tag}</span>
                </div>
                <p className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-mono">{card.desc}</p>
              </div>
              
              {/* Bottom Glow Line */}
              <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-cyan-400/50 transition-all duration-500 shadow-[0_0_10px_#22d3ee]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Monsoon;