import React, { useState } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = ({ userSelectDt, setUserSelectDt }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    setUserSelectDt(date.toISOString().split('T')[0]);
    setIsCalendarOpen(false);
  };

  return (
    <div className="relative h-full">
      <input
        type="text"
        placeholder="날짜 선택"
        value={userSelectDt ? userSelectDt : ''}
        className="h-full w-full px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        readOnly
        onClick={toggleCalendar}
      />
      <div
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        onClick={toggleCalendar}
      >
        📅
      </div>

      {isCalendarOpen && (
        <div className="absolute text-sm w-[150%] top-full mt-1 left-0 z-10 border-none rounded-lg shadow-lg">
          <CalendarComponent
            className="rounded-xl"
            onChange={handleDateChange}
            value={new Date(userSelectDt)}
            formatDay={(locale, date) => `${date.getDate()}`}
            navigationLabel={({ date }) => (
              <div>
                <div>{date.getFullYear()}년</div>
                <div>{date.toLocaleString('default', { month: 'long' })}</div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
