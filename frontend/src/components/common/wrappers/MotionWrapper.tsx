// src/components/common/wrappers/MotionWrapper.tsx
import React from 'react';
import { motion } from 'framer-motion';

const MotionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    {children}
  </motion.div>
);

export default MotionWrapper;
