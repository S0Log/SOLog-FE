import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CompanyContext } from '../../../contexts/CompanyContext';
import * as cheerio from 'cheerio';
import Hanwha from '../../../../public/img/Hanwha.png';
import Mirae from '../../../../public/img/Mirae.png';
import Samsung from '../../../../public/img/Samsung.png';
import KB from '../../../../public/img/KB.png';
import NH from '../../../../public/img/NH.png';
import Korea from '../../../../public/img/Korea.png';
import Hana from '../../../../public/img/Hana.png';
import Shinhan from '../../../../public/img/Shinhan.jpg';
import Meritz from '../../../../public/img/Meritz.png';
import Kiwoom from '../../../../public/img/Kiwoom.png';
import Daishin from '../../../../public/img/Daishin.jpg';
import Hyundai from '../../../../public/img/Hyundai.png';
import eBest from '../../../../public/img/eBest.png';
import Yuanta from '../../../../public/img/Yuanta.png';
import Hi from '../../../../public/img/Hi.png';
import SK from '../../../../public/img/SK.png';
import DB from '../../../../public/img/DB.png';
import Shinyoung from '../../../../public/img/Shinyoung.jpg';
import IBK from '../../../../public/img/IBK.png';
import Toss from '../../../../public/img/Toss.png';
import KakaoPay from '../../../../public/img/KakaoPay.png';
import Leading from '../../../../public/img/Leading.png';
import CAPE from '../../../../public/img/CAPE.png';
import KoreaAsset from '../../../../public/img/KoreaAsset.png';
import KR from '../../../../public/img/KR.jpg';
import Yuhwa from '../../../../public/img/Yuhwa.jpg';
import Heungkuk from '../../../../public/img/Heungkuk.png';
import DS from '../../../../public/img/DS.jpeg';
import Eugene from '../../../../public/img/Eugene.png';
import Kyobo from '../../../../public/img/Kyobo.png';
import IM from '../../../../public/img/IM.jpeg';

export default function PastInfos({ isBarClick, date }) {
  const [articles, setArticles] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null); // 모달에 표시할 URL
  const { userInputCompany } = useContext(CompanyContext);

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
          //   .slice(0, 5)
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
              press: '한국경제TV',
              title: "   기대치 밑돈 실적에 삼성전자 목표주가 '줄하향'   ",
              desc: '  주가 탄력성이 예상보다 강할 수 있다"고 밝혔다. 김동원 KB증권 리서치센터장도 "P/…진입 여부가 중장기 상승 모멘텀으로 작용할 것"이라고 내다봤다. (사진=연합뉴스...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101094350956',
            },
            {
              press: '한국경제TV',
              title: "   기대치 밑돈 실적에 삼성전자 목표주가 '줄하향'   ",
              desc: '  주가 탄력성이 예상보다 강할 수 있다"고 밝혔다. 김동원 KB증권 리서치센터장도 "P/…진입 여부가 중장기 상승 모멘텀으로 작용할 것"이라고 내다봤다. (사진=연합뉴스...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101094350956',
            },
            {
              press: '한국경제TV',
              title: "   기대치 밑돈 실적에 삼성전자 목표주가 '줄하향'   ",
              desc: '  주가 탄력성이 예상보다 강할 수 있다"고 밝혔다. 김동원 KB증권 리서치센터장도 "P/…진입 여부가 중장기 상승 모멘텀으로 작용할 것"이라고 내다봤다. (사진=연합뉴스...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101094350956',
            },
            {
              press: '한국경제TV',
              title: "   기대치 밑돈 실적에 삼성전자 목표주가 '줄하향'   ",
              desc: '  주가 탄력성이 예상보다 강할 수 있다"고 밝혔다. 김동원 KB증권 리서치센터장도 "P/…진입 여부가 중장기 상승 모멘텀으로 작용할 것"이라고 내다봤다. (사진=연합뉴스...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101094350956',
            },
            {
              press: '한국경제TV',
              title: "   기대치 밑돈 실적에 삼성전자 목표주가 '줄하향'   ",
              desc: '  주가 탄력성이 예상보다 강할 수 있다"고 밝혔다. 김동원 KB증권 리서치센터장도 "P/…진입 여부가 중장기 상승 모멘텀으로 작용할 것"이라고 내다봤다. (사진=연합뉴스...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101094350956',
            },
          ];

          setArticles(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const fetchReport = async () => {
        const securitiesData = {
          미래에셋증권: Mirae,
          삼성증권: Samsung,
          KB증권: KB,
          NH투자증권: NH,
          한국투자증권: Korea,
          신한투자증권: Shinhan,
          하나증권: Hana,
          메리츠증권: Meritz,
          키움증권: Kiwoom,
          대신증권: Daishin,
          한화투자증권: Hanwha,
          현대차증권: Hyundai,
          이베스트증권: eBest,
          이베스트투자증권: eBest,
          유안타증권: Yuanta,
          하이투자증권: Hi,
          SK증권: SK,
          DB금융투자: DB,
          신영증권: Shinyoung,
          IBK투자증권: IBK,
          토스증권: Toss,
          카카오페이증권: KakaoPay,
          리딩투자증권: Leading,
          케이프투자증권: CAPE,
          코리아에셋투자증권: KoreaAsset,
          KR투자증권: KR,
          유화증권: Yuhwa,
          흥국증권: Heungkuk,
          DS투자증권: DS,
          유진투자증권: Eugene,
          교보증권: Kyobo,
          iM증권: IM,
        };

        const url = `/api/stock-insight/reports/${userInputCompany}`;
        const params = {
          companyName: userInputCompany,
          date: date,
        };
        try {
          const res = await axios.get(url, { params });
          console.log(res);
          const data = res.data;
          const result = data.map((item) => ({
            logo: securitiesData[item.writer],
            title: item.title,
            url: item.url,
          }));

          setReports(result.slice(0, 5));
        } catch (error) {
          console.error('Error fetching report data:', error);
        }
      };

      fetchData();
      fetchReport();
    }
  }, [isBarClick, date]);

  const closeModal = () => {
    setSelectedUrl(null);
  };

  return (
    <div
      className="h-full p-2 overflow-auto 
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div>
        <p className="font-semibold p-0 m-0">Articles</p>
        <ul className="p-0 mb-0">
          {articles.map((article, idx) => (
            <li key={idx} className={`${idx !== articles.length - 1 ? 'border-b border-gray-300' : ''} py-2`}>
              <a
                href="#"
                className="text-sm text-black no-underline block overflow-hidden w-full text-ellipsis whitespace-nowrap font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedUrl(article.url);
                }}
              >
                {article.title}
              </a>
              <p className="text-xs p-0 m-0">{article.desc}</p>
            </li>
          ))}
        </ul>
      </div>
      {reports?.length > 0 ? (
        <div>
          <p className="font-semibold p-0 m-0">Reports</p>
          <ul className="p-0 mb-0">
            {reports.map((report, idx) => (
              <li
                key={idx}
                className={`flex items-center ${idx !== reports.length - 1 ? 'border-b border-gray-300' : ''} py-2 gap-2`}
              >
                <img src={report.logo} alt="logo" className="h-auto max-h-[1em]" style={{ height: '1em' }} />
                <a
                  href="#"
                  className="text-sm text-black no-underline inline-block font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedUrl(report.url);
                  }}
                >
                  {report.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

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
}
