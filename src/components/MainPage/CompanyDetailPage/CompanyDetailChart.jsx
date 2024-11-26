import React from 'react';

export default function CompanyDetailChart() {
  return (
    <div className="flex space-between items-center justify-center w-full h-[60%]">
      <button
        type="button"
        className="text-gray-500 p-2 mr-3 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-200"
      >
        &lt;
      </button>

      <div className="text-center">Stock Chart Image</div>

      <button
        type="button"
        className="text-gray-500 p-2 ml-3 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-200"
      >
        &gt;
      </button>
    </div>
  );
}
