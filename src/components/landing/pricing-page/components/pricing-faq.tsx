import React from "react";

const faq = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade at any time.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial for all plans.",
  },
];

const PricingFAQ: React.FC = () => (
  <section className="py-16 bg-gray-900">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-100">
        Frequently Asked Questions
      </h2>
      <div className="mt-8 space-y-6">
        {faq.map((item, index) => (
          <details
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <summary className="cursor-pointer text-lg font-semibold text-gray-100">
              {item.question}
            </summary>
            <p className="mt-2 text-gray-400">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default PricingFAQ;
