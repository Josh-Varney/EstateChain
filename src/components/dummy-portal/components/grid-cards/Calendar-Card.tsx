import React, { FC, useState } from "react";
import { Calendar } from "../../../../shadcn-components/ui/calendar";

interface CalendarCardProps {
  darkMode: boolean;
}

const CalendarCard: FC<CalendarCardProps> = ({ darkMode }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-lg mx-auto">
      <div
        className={`flex flex-col rounded-lg shadow-lg p-8 w-full max-w-md transition-colors ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <header className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-lg font-semibold">Rental Overview</h1>
          <h2 className="text-sm font-medium">{formatDate(date)}</h2>
        </header>
        <hr className=" border-gray-700" />

        {/* Stats Section */}
        <section className="flex justify-between items-center text-center gap-6">
          <div className="flex flex-col">
            <h2 className="text-sm font-medium">Transactions</h2>
            <p className="text-2xl font-bold text-blue-500">40</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-medium">Assets</h2>
            <p className="text-2xl font-bold text-green-500">30</p>
          </div>
        </section>
        <hr className=" border-gray-700" />

        {/* Calendar Section */}
        <section className="mt-4 justify-items-center">
          <div className="rounded-lg overflow-hidden shadow-sm border border-gray-300 dark:border-gray-700">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full p-6"
              aria-label="Select a date"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CalendarCard;
