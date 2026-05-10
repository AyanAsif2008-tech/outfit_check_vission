import React from 'react';
import { motion } from 'framer-motion';

const Summer = () => {
  const cards = [
    { 
      id: 'S-01', 
      title: 'Linen Armor', 
      desc: 'Breathable, lightweight, and actually makes you look like you own a yacht.', 
      tag: 'Upper',
      img: '../summer1.jpg' 
    },
    { 
      id: 'S-02', 
      title: 'Cuban Cut', 
      desc: 'Open collar for airflow. If it’s not patterned, don’t even bother.', 
      tag: 'Torso',
      img: '../summer2.jpg'
    },
    { 
      id: 'S-03', 
      title: 'Technical Shorts', 
      desc: 'Above the knee or nothing. Stop wearing cargo pants in 40°C.', 
      tag: 'Lower',
      img: '../summer3.png'
    },
    { 
      id: 'S-04', 
      title: 'Solar Shades', 
      desc: 'UV protection with a sharp edge. Hide your tired eyes from the sun.', 
      tag: 'Accessory',
      img: '../summer4.png'
    },
    { 
      id: 'S-05', 
      title: 'Canvas Kicks', 
      desc: 'Ditch the heavy leather. Your feet need to breathe, not suffocate.', 
      tag: 'Footwear',
      img: '../summer5.jpg'
    },
    { 
      id: 'S-06', 
      title: 'Pastel Matrix', 
      desc: 'Wash out the dark tones. High-noon sun demands lighter frequencies.', 
      tag: 'Tone',
      img: '../summer6.png'
    },
    { 
      id: 'S-07', 
      title: 'Silk Flow', 
      desc: 'Luxury friction-less fabric. Expensive, but so is your reputation.', 
      tag: 'Premium',
      img: '../summer7.png'
    },
    { 
      id: 'S-08', 
      title: 'Hydro Mesh', 
      desc: 'Athletic tech for the humidity. Stay dry while everyone else melts.', 
      tag: 'Utility',
      img: '../summer8.png'
    },
    { 
      id: 'S-09', 
      title: 'Sandals Protocol', 
      desc: 'No socks. Ever. Unless you want a permanent ban from fashion.', 
      tag: 'Warning',
      img: '../summer9.jpg'
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12 pb-20 px-4 md:px-0">
      <div className="relative">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-orange-500 font-mono text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase block"
        >
          Active_Season: Solar_Flare
        </motion.span>
        {/* Responsive font size: 4xl on mobile, 7xl on desktop */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter mt-2 text-white leading-none">
          Summer <span className="text-white/10">Protocol</span>
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
            className="group bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 shadow-2xl flex flex-col"
          >
            {/* Image Section */}
            <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-transform duration-700" 
              />
              <span className="absolute top-4 left-4 z-20 text-[8px] font-mono text-orange-500 border border-orange-500/30 px-2 py-1 rounded-full uppercase bg-black/50 tracking-widest">
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
              <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-orange-500/50 transition-all duration-500 shadow-[0_0_10px_#f97316]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Summer;