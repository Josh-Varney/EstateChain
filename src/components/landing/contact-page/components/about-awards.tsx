import React from "react";

const AboutAwards: React.FC = () => {
  const awards = [
    "/assets/award1.png",
    "/assets/award2.png",
    "/assets/award3.png",
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-teal-400 text-center">
        Awards & Recognitions
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {awards.map((award, index) => (
          <img
            key={index}
            src={award}
            alt={`Award ${index + 1}`}
            className="w-32 h-32 object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export default AboutAwards;
