import React from 'react';
import Calendar from './Calendar';
import TermSelect from './TermSelect';
import MyChart from '../Chart';
import PastArticle from './PastArticle';
import PastCompareInfos from './PastCompareInfos';

const PastPage = () => {
  return (
    <div className="flex">
      <div className="p-2 rounded-xl bg-white w-[55vw]">
        <div className="flex justify-between">
          <div>
            <Calendar />
          </div>
          <div>
            <TermSelect />
          </div>
        </div>
        <div className="bg-white mt-1 h-[35vh]">Stock Chart Image</div>
      </div>
      <PastCompareInfos />
    </div>
  );
};

export default PastPage;
