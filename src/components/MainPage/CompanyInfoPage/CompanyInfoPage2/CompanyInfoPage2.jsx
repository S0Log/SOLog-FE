import React, { useState } from 'react';
import CardLeft from './CardLeft';
import CardRight from './CardRight';

export default function CompanyInfoPage2() {
  const [isRightCardEmpty, setIsRightCardEmpty] = useState(false);

  return (
    <div
      className={`grid gap-7 ${isRightCardEmpty ? 'grid-cols-1 justify-center items-center h-full' : 'md:gridnp-cols-2'}`}
    >
      <CardLeft />

      {!isRightCardEmpty && <CardRight onNoData={(isEmpty) => setIsRightCardEmpty(isEmpty)} />}
    </div>
  );
}
