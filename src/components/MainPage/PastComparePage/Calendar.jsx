import React, { useState } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const Calendar = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="날짜 선택"
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          <CalendarComponent className="rounded-xl" onChange={handleDateChange} value={selectedDate} />
        </div>
      )}
    </div>
  );
};

export default Calendar;
