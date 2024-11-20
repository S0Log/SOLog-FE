import React from 'react';

export default function StockPriceImg() {
  const Card = ({ children, className = '' }) => (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
  );
  return (
    <div>
      <Card className="p-6">
        <div className="aspect-[2/1] bg-gradient-to-b from-green-100 to-green-50 rounded-lg relative">
          {/* Placeholder for actual chart implementation */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Stock Price Chart
          </div>
        </div>
      </Card>
    </div>
  );
}
