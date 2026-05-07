import React from 'react';
import { motion } from 'framer-motion';

const Autumn = () => {
  const cards = [
    { id: 'A-01', title: 'Trench Tech', desc: 'Water-resistant, classic, and essentially a vibe-multiplier for the rain.', tag: 'Outerwear' },
    { id: 'A-02', title: 'Cardigan Core', desc: 'The cozy critic. Layer it over a white tee for effortless dominance.', tag: 'Mid-Layer' },
    { id: 'A-03', title: 'Earth Frequency', desc: 'Rust, Olive, and Brown. Match the dying leaves to win the aesthetic game.', tag: 'Tones' },
    { id: 'A-04', title: 'Flannel Grid', desc: 'Heavy cotton patterns. Not for woodcutting, just for looking sharp.', tag: 'Torso' },
    { id: 'A-05', title: 'Leather Shell', desc: 'The transition king. Perfect for when the wind starts biting at dusk.', tag: 'Premium' },
    { id: 'A-06', title: 'Chukka Boots', desc: 'The middle ground between a sneaker and a boot. Versatility 100.', tag: 'Footwear' },
    { id: 'A-07', title: 'Suede Finish', desc: 'Texture is everything in autumn. Keep it soft, keep it rich.', tag: 'Texture' },
    { id: 'A-08', title: 'Utility Vest', desc: 'Protect the core without the bulk. High-tech layering protocol.', tag: 'Mid-Layer' },
    { id: 'A-09', title: 'Corduroy Wave', desc: 'Vintage texture, modern cut. It is time for a textured comeback.', tag: 'Lower' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="relative">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-600 font-mono text-[10px] tracking-[0.8em] uppercase">Active_Season: Amber_Transition</motion.span>
        <h1 className="text-7xl font-black italic uppercase tracking-tighter mt-2 text-white">Autumn <span className="text-white/10">Layering</span></h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden hover:border-amber-600/50 transition-all duration-500">
            <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
              <div className="absolute inset-0 bg-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=500" alt={card.title} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
              <span className="absolute top-4 left-4 z-20 text-[8px] font-mono text-amber-600 border border-amber-600/30 px-2 py-1 rounded-full uppercase bg-black/50 tracking-widest">{card.id}</span>
            </div>
            <div className="p-6 relative z-20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-black uppercase italic tracking-tight">{card.title}</h3>
                <span className="text-[8px] text-white/20 font-bold uppercase border border-white/10 px-2 py-1 rounded">{card.tag}</span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed font-mono">{card.desc}</p>
              <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-amber-600/50 transition-all duration-500 shadow-[0_0_10px_#d97706]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Autumn;