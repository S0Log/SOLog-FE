import React from 'react';
import SOLog from '/img/SOLog.png?url';
import logotext from '/img/logotext.png?url';
import shinhanfriends from '/img/shinhanfriends.png?url';
import Search from '../Search';
import RecommendedStocks from './RecommendedStocks';
import { motion } from 'framer-motion';

export default function IndexPage() {
  return (
    <div className="h-screen bg-mainColor pt-20 flex justify-center items-center">
      <div className="transform scale-75">
        <div className="mt-8 pb-8 flex flex-col items-center">
          <img src={SOLog} alt="SOLog" />
          <img src={logotext} alt="logotext" />
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 1 }}
        >
          <Search />
          <RecommendedStocks />
        </motion.div>
        <div className="flex justify-center mt-8">
          <img src={shinhanfriends} alt="shinhanfriends" />
        </div>
      </div>
    </div>
  );
}
