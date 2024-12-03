import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

import { CompanyContext } from '../../../contexts/CompanyContext';

const PastCompareInfos = ({ isBarClick, date }) => {
  const { userInputCompany } = useContext(CompanyContext);
  const [renderedData, setRenderedData] = useState({
    companyName: userInputCompany,
    date: date,
    open: null,
    close: null,
    volume: null,
  });
  const [articles, setArticles] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null); // 모달에 표시할 URL

  /** 기업 정보 가져오기 */
  useEffect(() => {
    if (isBarClick === true && date) {
      const fetchSummary = async () => {
        const url = `/api/${userInputCompany}/companySummary`;
        const params = { companyName: userInputCompany, date: date, durationType: 'day' };
        try {
          const res = await axios.get(url, { params });
          const data = res.data;
          setRenderedData({
            companyName: userInputCompany,
            date: data.date,
            open: data.openPrice,
            close: data.closePrice,
            volume: data.volume,
          });
        } catch (error) {
          if (error.response) {
            if (error.response.status === 500) {
              setRenderedData({
                companyName: userInputCompany,
                date: date,
                open: null,
                close: null,
                volume: null,
              });
            } else {
              console.error('Error:', error.message);
            }
          } else {
            console.error('Network Error:', error.message);
          }
        }
      };
      fetchSummary();
    }
  }, [isBarClick, date]);

  if (renderedData.volume === undefined || renderedData.volume === 0) {
    return <div>Loading...</div>;
  }

  /** 뉴스 기사 크롤링 */
  useEffect(() => {
    if (isBarClick) {
      const fetchData = async () => {
        const formatDate = (date) => {
          const dateObj = new Date(date);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');

          const start = `${year}${month}${day}000000`;
          const end = `${year}${month}${day}235959`;

          return { start, end };
        };

        const { start, end } = formatDate(date);
        const daumNewsUrl = `/daumreq/search?w=news&nil_search=btn&DA=STC&enc=utf8&cluster=y&cluster_page=1&q=${userInputCompany}&sd=${start}&ed=${end}&period=u`;

        try {
          // const res = await axios.get(daumNewsUrl);
          // const $ = cheerio.load(res.data);
          // const $contentTagArray = $('#dnsColl .c-list-basic > li');

          // const result = $contentTagArray
          //   .slice(0, 3)
          //   .map((i, el) => {
          //     const press = $(el).find('.tit_item').prop('title');
          //     const title = $(el).find('.item-title').text();
          //     const desc = $(el).find('p.conts-desc.clamp-g2').text();
          //     const date = $(el).find('span.gem-subinfo').text();
          //     const url = $(el).find('.item-title a').prop('href');
          //     return {
          //       press,
          //       title,
          //       desc,
          //       date,
          //       url,
          //     };
          //   })
          //   .get();

          const result = [
            {
              press: '한겨레',
              title: '   증권사들, 삼성전자 목표주가 줄줄이 내려…“5세대 메모리 불확실”   ',
              desc: '  이유로 줄줄이 목표 주가를 내렸다. 증권사들은 단기간에 주가가 오르긴 어려울 것으로 내…리면서 회사가 고대역폭메모리 5세대 개선 제품을 추가로 준비하겠다고 언급한 것과...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101133504896',
            },
            {
              press: '한국경제TV',
              title: "   기대치 밑돈 실적에 삼성전자 목표주가 '줄하향'   ",
              desc: '  주가 탄력성이 예상보다 강할 수 있다"고 밝혔다. 김동원 KB증권 리서치센터장도 "P/…진입 여부가 중장기 상승 모멘텀으로 작용할 것"이라고 내다봤다. (사진=연합뉴스...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101094350956',
            },
            {
              press: '연합뉴스',
              title: '   증권가, 삼성전자 목표주가 줄하향 "HBM 계획보다 실적으로 증명해야"',
              desc: '  언어에는 분명 아직 간극이 있어 보인다"며 "다음에는 계획서가 아닌 증명서를 보여주기를…따른 체질 개선이 기대된다는 낙관적 전망도 있다. 박유악 키움증권 연구원은 "4...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101092800341',
            },
          ];
          // console.log(result);
          setArticles(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [isBarClick, date]); // 의존성 배열에 isBarClick 추가

  const closeModal = () => {
    setSelectedUrl(null);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className={`shadow-md rounded-3xl p-2 h-2/5 w-full flex flex-col justify-between bg-white`}>
        <div className="flex flex-row justify-between">
          <p className="m-0 font-semibold text-sm">{userInputCompany}</p>
          <p className="m-0 text-sm">{renderedData.date}</p>
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <p className="m-0 text-sm">시가</p>
            <p className="m-0 text-sm">{renderedData.open != null ? `${renderedData.open.toLocaleString()}원` : '-'}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="m-0 text-sm">종가</p>
            <p className="m-0 text-sm">
              {renderedData.close != null ? `${renderedData.close.toLocaleString()}원` : '-'}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="m-0 text-sm">거래량</p>
            <p className="m-0 text-sm">
              {renderedData.volume != null ? `${renderedData.volume.toLocaleString()}` : '-'}
            </p>
          </div>
        </div>
      </div>
      <div
        className="shadow-md rounded-3xl p-2 h-3/5 w-full flex flex-col bg-white overflow-auto
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        <p className="font-semibold p-0 m-0">Articles</p>
        <ul className="p-0 mb-0">
          {articles.map((article, idx) => {
            return (
              <li key={idx} className={`${idx !== articles.length - 1 ? 'border-b border-gray-300' : ''} py-2`}>
                <a
                  href={article.url}
                  className="text-sm text-black no-underline font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedUrl(article.url);
                  }}
                >
                  {article.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {selectedUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-2xl bg-white w-[80%] h-3/4 relative overflow-auto ">
            <button
              onClick={closeModal}
              className="font-extrabold text-sm text-white absolute top-4 right-6 bg-black bg-opacity-40 rounded-lg px-2 py-2"
            >
              닫기
            </button>
            <iframe src={selectedUrl} title="Content" className="w-full h-full border-0"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastCompareInfos;
