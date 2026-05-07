import React from 'react';
import { motion } from 'framer-motion';

const Winter = () => {
  const cards = [
    { id: 'W-01', title: 'Overcoat Command', desc: 'Heavy wool in Camel or Charcoal. It is the only thing people see, make it count.', tag: 'Outerwear' },
    { id: 'W-02', title: 'Turtleneck Filter', desc: 'Hides the neck, sharpens the jawline. The ultimate intellectual silhouette.', tag: 'Torso' },
    { id: 'W-03', title: 'Thermal Knit', desc: 'Waffle textures for heat retention. Function meets futuristic aesthetics.', tag: 'Mid-Layer' },
    { id: 'W-04', title: 'Chelsea Deployment', desc: 'Suede or Leather. Keep the profile slim from the ground up.', tag: 'Footwear' },
    { id: 'W-05', title: 'Beanie Buffer', desc: 'Cover the ears, but keep it high-fashion. Watch the fit, don’t look sloppy.', tag: 'Accessory' },
    { id: 'W-06', title: '14oz Raw Denim', desc: 'Bulletproof rigidity. Cold-proof shielding for your lower frame.', tag: 'Lower' },
    { id: 'W-07', title: 'Puffer Shield', desc: 'Cropped tech-wear. You are a human, not a balloon. Keep it matte.', tag: 'Utility' },
    { id: 'W-08', title: 'Shearling Vibe', desc: 'The luxury of warmth. Adds texture and weight to a weak silhouette.', tag: 'Premium' },
    { id: 'W-09', title: 'Scarf Protocol', desc: 'The final knot. Adds 20% more sophistication to any neural scan.', tag: 'Accessory' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="relative">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400 font-mono text-[10px] tracking-[0.8em] uppercase">Active_Season: Glacial_Shield</motion.span>
        <h1 className="text-7xl font-black italic uppercase tracking-tighter mt-2 text-white">Winter <span className="text-white/10">Protocol</span></h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500">
            <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500" alt={card.title} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
              <span className="absolute top-4 left-4 z-20 text-[8px] font-mono text-blue-400 border border-blue-400/30 px-2 py-1 rounded-full uppercase bg-black/50 tracking-widest">{card.id}</span>
            </div>
            <div className="p-6 relative z-20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-black uppercase italic tracking-tight">{card.title}</h3>
                <span className="text-[8px] text-white/20 font-bold uppercase border border-white/10 px-2 py-1 rounded">{card.tag}</span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed font-mono">{card.desc}</p>
              <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-blue-500/50 transition-all duration-500 shadow-[0_0_10px_#3b82f6]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Winter;