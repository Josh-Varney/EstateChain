import React from "react";

const AboutTimeline: React.FC = () => {
  const timelineEvents = [
    {
      year: "2020",
      title: "Founded Webtrix",
      description:
        "A small startup with a big vision to bridge the gap between people and technology.",
    },
    {
      year: "2021",
      title: "First Product Launch",
      description:
        "Introduced our flagship AI-powered tool, which received accolades from industry experts.",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description:
        "Expanded operations to 20+ countries, delivering solutions to healthcare, finance, and more.",
    },
  ];

  return (
    <section className="relative bg-gray-800 rounded-lg p-10 shadow-lg">
      <h2 className="text-3xl font-bold text-teal-400 text-center">
        Our Journey
      </h2>
      <div className="mt-10 space-y-8">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex items-center space-x-6">
            <div className="text-teal-400 text-4xl font-bold">{event.year}</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{event.title}</h3>
              <p className="text-gray-300 mt-2">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutTimeline;
