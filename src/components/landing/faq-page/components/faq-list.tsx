import React from "react";

interface FAQListProps {
  faqs: { question: string; answer: string }[];
  openItem: number | null;
  setOpenItem: (index: number | null) => void;
}

const FAQList: React.FC<FAQListProps> = ({ faqs, openItem, setOpenItem }) => {
  return (
    <div className="mt-8 space-y-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl p-5 shadow-lg transition hover:shadow-xl"
          role="region"
          aria-labelledby={`faq-question-${index}`}
        >
          <button
            data-testid={`faq-question-${index}`}
            id={`faq-question-${index}`}
            className="flex justify-between w-full text-left text-xl font-semibold text-white"
            onClick={() => setOpenItem(openItem === index ? null : index)}
            aria-expanded={openItem === index}
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
            <p className="mt-3 text-gray-400 text-base" aria-live="polite">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQList;
