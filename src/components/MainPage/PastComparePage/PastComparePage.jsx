import React from 'react';
import PastPage from './PastPage';
import ComparePage from './ComparePage';
import { motion } from 'framer-motion';

export default function PastComparePage() {
  return (
    <div className="pastcomparepage flex-grow w-[88vw] h-screen">
      <div className="ml-10 mr-10 mb-16 h-[250px]">
        <PastPage className="shadow-md" />
      </div>

      <div className="ml-10 mr-10 h-[250px]">
        <motion.div
          initial={{ y: -315, opacity: 0.85 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 12, delay: 1 }}
        >
          <ComparePage />
        </motion.div>
      </div>
    </div>
  );
}
