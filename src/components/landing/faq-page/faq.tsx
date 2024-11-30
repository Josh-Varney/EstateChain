import React, { useState } from "react";
import LandingHeader from "../components/header";
import LandingSubscription from "../components/footer";
import FAQTitle from "./components/faq-title";
import FAQSearchTerm from "./components/faq-search";
import FAQList from "./components/faq-list";
import FAQForm from "./components/faq-form";

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

  // const toggleItem = (index: number) => {
  //   setOpenItem(openItem === index ? null : index);
  // };

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
          <FAQTitle />

          {/* Search Input */}
          <FAQSearchTerm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* FAQ Items */}
          <FAQList
            faqs={visibleFAQs}
            openItem={openItem}
            setOpenItem={setOpenItem}
          />

          {/* No Results Message */}
          {filteredFAQs.length === 0 && (
            <p className="text-gray-400 text-center mt-8">No results found.</p>
          )}
        </div>

        <hr className="border-gray-500 border-1 mt-16 w-screen" />

        {/* Submit New Question */}
        <FAQForm
          error={error}
          successMessage={successMessage}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          newAnswer={newAnswer}
          setNewAnswer={setNewAnswer}
          handleFormSubmit={handleFormSubmit}
        />

        <hr className="border-gray-500 border-1 mt-16 mb-8 w-screen" />
        <LandingSubscription />
      </main>
    </div>
  );
};

export default FAQPage;
