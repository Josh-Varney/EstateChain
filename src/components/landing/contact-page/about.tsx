import React from "react";
import LandingHeader from "../components/header";
import LandingSubscription from "../components/footer";

const AboutUsPage: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900  text-gray-100">
      <LandingHeader />

      <main className="flex-1 px-6 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="relative text-center">
            <h1 className="text-5xl font-extrabold text-teal-400">
              About Us
            </h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              From humble beginnings to pioneering innovation, Webtrix is your
              trusted partner in technology. Join us as we shape the future.
            </p>
            <div className="mt-8">
              <img
                src="/assets/about-hero.jpg"
                alt="Webtrix Team"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Interactive Timeline */}
          <section className="relative bg-gray-800 rounded-lg p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-teal-400 text-center">
              Our Journey
            </h2>
            <div className="mt-10 space-y-8">
              {[
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
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-6"
                >
                  <div className="text-teal-400 text-4xl font-bold">
                    {event.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Client Testimonials */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-teal-400">What Our Clients Say</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
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
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  <h3 className="mt-4 text-teal-400 font-bold">
                    {testimonial.client}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Statistics Section */}
          <section className="bg-gray-800 rounded-lg p-10 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-4xl font-extrabold text-teal-400">500+</h3>
                <p className="text-gray-300 mt-2">Clients Served</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-teal-400">20+</h3>
                <p className="text-gray-300 mt-2">Countries Reached</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-teal-400">1000+</h3>
                <p className="text-gray-300 mt-2">Projects Completed</p>
              </div>
            </div>
          </section>

          {/* Awards Section */}
          <section>
            <h2 className="text-3xl font-bold text-teal-400 text-center">
              Awards & Recognitions
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {[
                "/assets/award1.png",
                "/assets/award2.png",
                "/assets/award3.png",
              ].map((award, index) => (
                <img
                  key={index}
                  src={award}
                  alt={`Award ${index + 1}`}
                  className="w-32 h-32 object-contain"
                />
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-teal-500 text-white rounded-lg p-10 shadow-lg text-center">
            <h2 className="text-3xl font-bold">Let’s Build the Future Together</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              Ready to explore the possibilities with Webtrix? Contact us today
              and let’s create something extraordinary.
            </p>
            <button className="mt-6 px-8 py-3 bg-gray-800 text-teal-400 font-semibold rounded-lg hover:bg-gray-700 shadow-lg hover:shadow-xl transition">
              Get in Touch
            </button>
          </section>
        </div>

        <hr className="border-gray-500 border-1 mt-16 w-screen" />
        
        <section className="mt-8">
          <LandingSubscription />
        </section>
      </main> 
    </div>
  );
};

export default AboutUsPage;
