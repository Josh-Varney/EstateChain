import React from "react";


interface TestimonialCardProps {
    name: string;
    feedback: string;
  }
  
  const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, feedback }) => (
    <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
      <p className="text-gray-300 italic">"{feedback}"</p>
      <p className="mt-4 text-teal-400 font-semibold">- {name}</p>
    </div>
);

const TestimonialsSection: React.FC = () => (
  <section className="py-16 px-6 bg-gradient-to-t from-gray-800 to-gray-900">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl text-white md:text-5xl lg:text-5xl">What Our Users Say</h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <TestimonialCard
          name="John Doe"
          feedback="This platform has completely changed the way I invest in real estate. The tokenization process is seamless and secure!"
        />
        <TestimonialCard
          name="Jane Smith"
          feedback="Fractional ownership is a game-changer. I can now invest in multiple properties without huge capital!"
        />
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
