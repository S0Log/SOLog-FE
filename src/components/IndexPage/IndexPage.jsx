import React from "react";
import SOLog from "../../assets/img/SOLog.png";
import logotext from "../../assets/img/logotext.png";
import shinhanfriends from "../../assets/img/shinhanfriends.png"

export default function IndexPage() {
  return (
    <div>
      <div>
        <img src={SOLog} />
      </div>
      <div>
        <img src={logotext} />
      </div>
      <div>
        <input type="text" placeholder="종목을 입력해주세요." />
      </div>
      <div>

        <span>추천종목</span>
        <ul>
          <li>
            삼성전자
          </li>
          <li>
            SK하이닉스
          </li>
          <li>
            에너지솔루션
          </li>
          <li>
            엔비디아
          </li>
        </ul>
      </div>
      <div>
<img src={shinhanfriends} />
      </div>
    </div>
  );
}
