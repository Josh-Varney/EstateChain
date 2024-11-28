import React, { useState } from "react";
import LandingHeader from "./components/landing-header";

const FAQPage: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is Frank AI?",
      answer:
        "Frank AI is an autonomous artificial intelligence assistant tool focused on helping Human Recruitment, qualifying candidates or applicants, and managing the company.",
    },
    {
      question: "How does Frank AI work?",
      answer:
        "Frank AI uses machine learning algorithms to automate tasks in recruitment and HR management efficiently.",
    },
    {
      question: "Is Frank AI right for my company's HR?",
      answer:
        "Yes, if you're looking for a tool to streamline HR processes, Frank AI could be a great fit.",
    },
    {
      question: "What are the costs and fees to use Frank AI?",
      answer:
        "Frank AI offers flexible pricing options. Contact our sales team for more details.",
    },
    {
      question: "How can I set up my account for Frank AI?",
      answer:
        "You can set up your account by visiting our signup page and following the instructions provided.",
    },
    {
      question: "What industries can benefit from Frank AI?",
      answer:
        "Frank AI is ideal for industries such as technology, healthcare, finance, retail, and any business with active recruitment and HR needs.",
    },
    {
      question: "Does Frank AI integrate with existing HR tools?",
      answer:
        "Yes, Frank AI supports integration with popular HR platforms such as Workday, BambooHR, and Greenhouse, among others.",
    },
    {
      question: "What kind of customer support does Frank AI offer?",
      answer:
        "Frank AI provides 24/7 customer support through chat, email, and phone. We also offer extensive documentation and onboarding assistance.",
    },
    {
      question: "Can Frank AI ensure data privacy and security?",
      answer:
        "Absolutely. Frank AI is compliant with GDPR, CCPA, and other major data protection regulations. Your data is encrypted and secure.",
    },
    {
      question: "Does Frank AI provide reporting and analytics?",
      answer:
        "Yes, Frank AI includes advanced analytics and reporting tools to track recruitment performance and HR metrics in real time.",
    },
    {
      question: "Can I customize Frank AI for my company’s needs?",
      answer:
        "Yes, Frank AI offers customization options to align with your company's unique HR and recruitment workflows.",
    },
    {
      question: "Is there a trial version available for Frank AI?",
      answer:
        "Yes, you can request a free trial to explore Frank AI's features before committing to a subscription.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Bar */}
        <LandingHeader />

        {/* Main FAQ Content */}
        <main className="flex-1 px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-6 text-center">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-300 mb-10 text-center">
              Here are answers to some common queries.
            </p>

            {/* FAQ Items */}
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-5 shadow-lg transition hover:shadow-2xl"
                >
                  <button
                    className="flex justify-between w-full text-left text-xl font-semibold text-white"
                    onClick={() => toggleItem(index)}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`transform transition-transform ${
                        openItem === index ? "rotate-180" : ""
                      }`}
                    >
                      {openItem === index ? "−" : "+"}
                    </span>
                  </button>
                  {openItem === index && (
                    <p className="mt-3 text-gray-400 text-base">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 py-5">
          <div className="flex justify-center space-x-6">
            {["General", "Build", "Promote", "Manage", "Integrations", "Legal"].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-teal-300 transition"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FAQPage;
