import React from "react";

const testimonials = [
  {
    message: "Amazing service!",
    name: "John Doe",
    role: "CEO at TechCo",
  },
  {
    message: "Helped us scale our business.",
    name: "Jane Smith",
    role: "Manager at BuildCo",
  },
];

const PricingTestimonials: React.FC = () => (
  <section className="py-16 bg-gray-800">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-100">What People Say</h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-lg text-left"
          >
            <p className="italic text-gray-400">“{testimonial.message}”</p>
            <div className="mt-4">
              <span className="block font-bold text-gray-100">
                {testimonial.name}
              </span>
              <span className="block text-sm text-gray-400">
                {testimonial.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingTestimonials;
