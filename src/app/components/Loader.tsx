import React from 'react';
import { motion } from 'motion/react';
import logoImg from 'figma:asset/31186f88f34539b6048c57361bd1b32bea0f6290.png';

export const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
    >
      <div className="relative">
        {/* Pulsing Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="relative z-10"
        >
          <img 
            src={logoImg} 
            alt="Loading..." 
            className="h-32 md:h-48 invert opacity-90" 
          />
        </motion.div>

        {/* Decorative loading line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-[1px] bg-[#d4af37] mt-8 mx-auto"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] text-center mt-4 font-light"
        >
          Loading Luxury
        </motion.p>
      </div>
    </motion.div>
  );
};
