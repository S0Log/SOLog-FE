import React from 'react';
import CompanyDetailChart from './CompanyDetailChart';
import CompanyDetail from './CompanyDetail';
import { motion } from 'framer-motion';

export default function CompanyDetailPage() {
  return (
    <div className="flex-grow items-center justify-center w-[88vw] h-[88vh]">
      <CompanyDetailChart />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1 }}
      >
        <CompanyDetail />
      </motion.div>
    </div>
  );
}
