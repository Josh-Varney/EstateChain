import React from "react";

const AboutTimeline: React.FC = () => {
  const timelineEvents = [
    {
      year: "2022",
      title: "Founded EquiSpace",
      description:
        "Started with a vision to empower small businesses through innovative technology solutions.",
    },
    {
      year: "2023",
      title: "First Client Onboarded",
      description:
        "Collaborated with our first client, delivering a custom digital solution that exceeded expectations.",
    },
    {
      year: "2024",
      title: "Team Expansion",
      description:
        "Grew our passionate team of experts to scale operations and bring new ideas to life.",
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
