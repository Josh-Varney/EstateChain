import React from "react";

const AboutTestimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Webtrix transformed how we do business. Their innovative tools are a game-changer!",
      client: "Jane Doe, CEO of TechCorp",
    },
    {
      quote:
        "Working with Webtrix has been an incredible experience. Their team is top-notch.",
      client: "John Smith, Founder of StartUp Hub",
    },
    {
      quote:
        "Webtrix's solutions are reliable, efficient, and easy to use. Highly recommended!",
      client: "Emily Davis, COO of InnovateCo",
    },
  ];

  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold text-teal-400">What Our Clients Say</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            <h3 className="mt-4 text-teal-400 font-bold">{testimonial.client}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutTestimonials;
