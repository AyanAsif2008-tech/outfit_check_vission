import React from 'react';
import { motion } from 'framer-motion';

const Monsoon = () => {
  const cards = [
    { id: 'M-01', title: 'Gore-Tex Shell', desc: 'The ultimate rain shield. Water beads off like your haters’ opinions.', tag: 'Outerwear' },
    { id: 'M-02', title: 'Technical Cargo', desc: 'Water-repellent fabrics. Deep pockets for dry hardware storage.', tag: 'Lower' },
    { id: 'M-03', title: 'Rubberized Sole', desc: 'Maximum grip for wet pavements. Slip-resistance is high-fashion.', tag: 'Footwear' },
    { id: 'M-04', title: 'Bucket Protocol', desc: '360-degree rain protection. The streetwear approach to storms.', tag: 'Accessory' },
    { id: 'M-05', title: 'Quick-Dry Base', desc: 'Synthetic blends that don’t hold moisture. Stay light, stay dry.', tag: 'Torso' },
    { id: 'M-06', title: 'Neon Accents', desc: 'Low visibility demands high-vis colors. Stand out in the grey.', tag: 'Visual' },
    { id: 'M-07', title: 'Dry-Bag Tech', desc: 'Keep your tech safe. A backpack that’s essentially a submarine.', tag: 'Utility' },
    { id: 'M-08', title: 'Cropped Hem', desc: 'Stop your trousers from soaking up puddles. Higher cuts only.', tag: 'Lower' },
    { id: 'M-09', title: 'Ripstop Shield', desc: 'Tear-resistant fabric for harsh conditions. Rugged but aesthetic.', tag: 'Material' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="relative">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400 font-mono text-[10px] tracking-[0.8em] uppercase">Active_Season: Humidity_Protocol</motion.span>
        <h1 className="text-7xl font-black italic uppercase tracking-tighter mt-2 text-white">Monsoon <span className="text-white/10">Shield</span></h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500">
            <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
              <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?q=80&w=500" alt={card.title} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
              <span className="absolute top-4 left-4 z-20 text-[8px] font-mono text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded-full uppercase bg-black/50 tracking-widest">{card.id}</span>
            </div>
            <div className="p-6 relative z-20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-black uppercase italic tracking-tight">{card.title}</h3>
                <span className="text-[8px] text-white/20 font-bold uppercase border border-white/10 px-2 py-1 rounded">{card.tag}</span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed font-mono">{card.desc}</p>
              <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-cyan-400/50 transition-all duration-500 shadow-[0_0_10px_#22d3ee]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Monsoon;