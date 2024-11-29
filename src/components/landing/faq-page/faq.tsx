import React, { useState } from "react";
import LandingHeader from "./components/header";
import LandingSubscription from "./components/footer";

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [faqData, setFaqData] = useState([
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
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filter FAQs based on search query
  const filteredFAQs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Limit the number of FAQs displayed to 8 if no search query
  const visibleFAQs = searchQuery ? filteredFAQs : filteredFAQs.slice(0, 8);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!newQuestion.trim() || !newAnswer.trim()) {
      setError("Both fields are required.");
      return;
    }

    if (
      faqData.some(
        (faq) =>
          faq.question.toLowerCase() === newQuestion.trim().toLowerCase()
      )
    ) {
      setError("This question already exists.");
      return;
    }

    setFaqData((prev) => [
      ...prev,
      { question: newQuestion.trim(), answer: newAnswer.trim() },
    ]);
    setNewQuestion("");
    setNewAnswer("");
    setSuccessMessage("Your question has been successfully submitted!");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100">
      <LandingHeader />

      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <h1 className="text-4xl font-extrabold text-center text-teal-400">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-300 text-center">
            Find answers to common queries or submit your own question below.
          </p>

          {/* Search Input */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search for a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              aria-label="Search FAQs"
            />
          </div>

          {/* FAQ Items */}
          <div className="mt-8 space-y-6">
            {visibleFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-5 shadow-lg transition hover:shadow-xl"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <button
                  id={`faq-question-${index}`}
                  className="flex justify-between w-full text-left text-xl font-semibold text-white"
                  onClick={() => toggleItem(index)}
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
            {filteredFAQs.length === 0 && (
              <p className="text-gray-400 text-center">No results found.</p>
            )}
          </div>

          {/* Submit New Question */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-teal-400 mb-4">
              Submit Your Own Question
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter your question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  maxLength={150}
                  aria-label="New question"
                  required
                />
                <p className="text-sm text-gray-400 mt-2">
                  {newQuestion.length}/150 characters
                </p>
              </div>
              <div>
                <textarea
                  placeholder="Enter the answer to your question"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  rows={4}
                  maxLength={300}
                  aria-label="New answer"
                  required
                />
                <p className="text-sm text-gray-400 mt-2">
                  {newAnswer.length}/300 characters
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
                aria-label="Submit question"
              >
                Submit Question
              </button>
            </form>
          </div>
        </div>
      </main>

      <LandingSubscription />
    </div>
  );
};

export default FAQPage;
