import React, { FC, useState } from "react";
import { Calendar } from "../../../../shadcn-components/ui/calendar";

interface CalendarCardProps {
  darkMode: boolean;
}

const CalendarCard: FC<CalendarCardProps> = ({ darkMode }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div
      className={`flex flex-col rounded-lg shadow-lg p-4 w-full max-w-sm transition-colors ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Overview</h1>
        <h2 className="text-lg">
          {date?.toLocaleString("default", { month: "long" })} {date?.getFullYear()}
        </h2>
      </header>
      <hr className="my-2 border-gray-300 dark:border-gray-600" />

      {/* Stats Section */}
      <section className="flex justify-between items-center mt-2">
        <div className="flex flex-col text-center">
          <h2 className="text-sm font-medium">Transactions</h2>
          <p className="text-xl font-bold">40</p>
        </div>
        <div className="flex flex-col text-center">
          <h2 className="text-sm font-medium">Assets</h2>
          <p className="text-xl font-bold">30</p>
        </div>
      </section>
      <hr className="my-2 border-gray-300 dark:border-gray-600" />

      {/* Calendar Section */}
      <section className="mt-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full max-w-xs"
          aria-label="Select a date"
        />
      </section>
    </div>
  );
};

export default CalendarCard;
