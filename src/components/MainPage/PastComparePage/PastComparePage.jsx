import React from 'react';
import PastPage from './PastPage';
import ComparePage from './ComparePage';

export default function PastComparePage() {
  return (
    <div className="pastcomparepage flex-grow w-[88vw] h-screen">
      <div className="ml-10 mr-10 mb-16 h-[250px]">
        <PastPage className="shadow-md" />
      </div>
      <div className="ml-10 mr-10 h-[250px]">
        <ComparePage />
      </div>
    </div>
  );
}
