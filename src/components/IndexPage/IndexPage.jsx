import React from "react";
import SOLog from "../../../public/img/SOLog.png";
import logotext from "../../../public/img/logotext.png";
import shinhanfriends from "../../../public/img/shinhanfriends.png";
import Search from "../Search";
import RecommendedStocks from "./RecommendedStocks";

export default function IndexPage() {
  return (
    <div className="h-screen bg-mainColor pt-20 flex justify-center items-center">
      <div className="transform scale-75">
        <div className="mt-8 pb-8 flex flex-col items-center">
          <img src={SOLog} alt="SOLog" />
          <img src={logotext} alt="logotext" />
        </div>
        <Search />
        <RecommendedStocks />
        <div className="flex justify-center mt-8">
          <img src={shinhanfriends} alt="shinhanfriends" />
        </div>
      </div>
    </div>
  );
}
