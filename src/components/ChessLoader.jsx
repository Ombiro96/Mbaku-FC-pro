import React from 'react';
import { motion } from 'framer-motion';

const ChessLoader = () => {
  return (
    <div className="chess-loader">
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ♔
      </motion.div>
    </div>
  );
};

export default ChessLoader;