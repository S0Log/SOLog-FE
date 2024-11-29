import React from 'react';
import PastPage from './PastPage';
import ComparePage from './ComparePage';
import { motion } from 'framer-motion';

export default function PastComparePage() {
  return (
    <div className="flex flex-col w-[88vw] h-[88vh] px-[51.356px] py-3 gap-3">
      <div className="w-full h-1/2">
        <PastPage className="shadow-md" />
      </div>

      <div className="w-full h-1/2">
        <motion.div
          className="w-full h-full"
          initial={{ y: 0, opacity: 0.85 }} // -315
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'ease', duration: 6, delay: 2 }}
        >
          <ComparePage />
        </motion.div>
      </div>
    </div>
  );
}
