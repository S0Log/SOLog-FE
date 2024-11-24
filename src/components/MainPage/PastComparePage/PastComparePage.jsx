import React from 'react';
import PastPage from './PastPage';
import ComparePage from './ComparePage';

export default function PastComparePage() {
  return (
    <div className="pastcomparepage flex-grow w-[88vw] h-screen">
      <div className="m-2 h-[36vh]">
        <PastPage />
      </div>
      <div className="m-2  h-[36vh]">
        <ComparePage />
      </div>
    </div>
  );
}
