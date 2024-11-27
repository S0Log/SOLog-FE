import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import DonutChart from './DonutChart';

export default function PastInfos(isBarClick) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (isBarClick) {
      const fetchData = async () => {
        const daumNewsUrl = `/daumreq/search?w=news&nil_search=btn&DA=STC&enc=utf8&cluster=y&cluster_page=1&q=삼성전자주가&sd=20241101000000&ed=20241101235959&period=u`;
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
              title: '   증권가, 삼성전자 목표주가 줄하향 "HBM 계획보다 실적으로 증명해야"   ',
              desc: '  언어에는 분명 아직 간극이 있어 보인다"며 "다음에는 계획서가 아닌 증명서를 보여주기를…따른 체질 개선이 기대된다는 낙관적 전망도 있다. 박유악 키움증권 연구원은 "4...  ',
              date: ' 2024.11.01 ',
              url: 'http://v.daum.net/v/20241101092800341',
            },
          ];
          console.log(result);
          setArticles(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [isBarClick]); // 의존성 배열에 isBarClick 추가

  return (
    <div className="h-full p-2">
      <div>
        <p className="font-semibold">Articles</p>
        <ul className="p-0 mb-0">
          {articles.map((article, idx) => {
            return (
              <li key={idx} className={`${idx !== articles.length - 1 ? 'border-b border-gray-300' : ''} pb-2`}>
                <a href={article.url} className="text-sm text-black no-underline">
                  {article.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="font-semibold">투자의견</p>
      </div>
    </div>
  );
}