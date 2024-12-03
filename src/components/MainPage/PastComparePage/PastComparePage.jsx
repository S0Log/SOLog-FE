import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import PastPage from './PastPage';
import ComparePage from './ComparePage';
import { CompanyContext } from '../../../contexts/CompanyContext';

export default function PastComparePage() {
  const [baseData, setBaseData] = useState([]); //차트 위에 데이터
  const [compareDatas, setCompareDatas] = useState([]); //차트 아래 데이터
  const [compareMarkingDatas, setCompareMarkingDatas] = useState([]); //차트 아래 데이터의 끝 날짜
  const [compareDataIdx, setCompareDataIdx] = useState(0); //compareDatas에서 몇번째 데이터를 렌더징할지 idx
  const { userInputCompany } = useContext(CompanyContext); //사용자가 선택한 기업
  const [userSelectDt, setUserSelectDt] = useState(new Date().toISOString().split('T')[0]); //사용자가 선택한 날짜 (초기값은 현재날짜)
  //5일을 빼려면 : useState(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [userSelectTerm, setUserSelectTerm] = useState('one'); //사용자가 선택한 기간('one', 'two', 'else)
  const [periodCnt, setPeriodCnt] = useState(5); //하이라이트할 데이터 개수

  /** Backend에다가 요청 보내기 */
  const getData = async () => {
    const url = `/api/chart/trend-match?companyName=${userInputCompany}&period=${userSelectTerm}&baseDate=${userSelectDt}`;

    try {
      const res = await axios.get(url);

      setBaseData(res.data.baseData);
      setCompareDatas(res.data.similarDataList);
      setCompareMarkingDatas(res.data.markingDateList);
      setCompareDataIdx(0);
      setPeriodCnt(res.data.highlightNum);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (location.pathname === '/main/pastCompare') {
      getData();
    }
  }, [location]);

  return (
    <div className="flex flex-col w-[88vw] h-[88vh] px-[51.356px] py-3 gap-3">
      <div className="w-full h-1/2">
        <PastPage
          className="shadow-md"
          baseData={baseData}
          userSelectDt={userSelectDt}
          setUserSelectDt={setUserSelectDt}
          userSelectTerm={userSelectTerm}
          setUserSelectTerm={setUserSelectTerm}
          periodCnt={periodCnt}
          getData={getData}
        />
      </div>

      <div className="w-full h-1/2">
        <motion.div
          className="w-full h-full"
          initial={{ y: 0, opacity: 0.85 }} // -315
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'ease', duration: 6, delay: 2 }}
        >
          <ComparePage
            compareDatas={compareDatas}
            compareMarkingDatas={compareMarkingDatas}
            periodCnt={periodCnt}
            compareDataIdx={compareDataIdx}
            setCompareDataIdx={setCompareDataIdx}
          />
        </motion.div>
      </div>
    </div>
  );
}
