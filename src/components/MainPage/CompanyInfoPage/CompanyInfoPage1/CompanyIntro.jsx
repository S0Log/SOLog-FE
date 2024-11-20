import React from 'react';

export default function CompanyIntro() {
  const Card = ({ children, className = '' }) => (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
  );

  return (
    <div>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">기업개요</h2>
            <span className="text-sm text-muted-foreground">기준: 2024.09.05</span>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed">
            <li>
              • 동사와 종속기업의 주요사업부문은 Home Appliance & Air 솔루션, Home Entertainment, Mobile Communications,
              Vehicle component 솔루션 등 6개로 구분
            </li>
            <li>
              • OLED TV는 초슬림, 웰페이퍼, 롤러블 TV 등 지속적인 혁신 제품 출시로 프리미엄 시장을 지속 선도하고 있음
            </li>
            <li>
              • 디스플레이 오디오와 네비게이션 영역에서는 동사의 디스플레이 및 소프트웨어 역량을 활용하여 제품 차별화 중
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
