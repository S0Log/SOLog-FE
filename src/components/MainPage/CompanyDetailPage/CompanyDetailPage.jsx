import React from 'react';
import CompanyDetailChart from './CompanyDetailChart';
import CompanyDetail from './CompanyDetail';
import { motion } from 'framer-motion';

export default function CompanyDetailPage() {
  return (
    <div className="flex flex-col w-[88vw] h-[88vh] px-[51.356px] py-3 gap-3 justify-center">
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
