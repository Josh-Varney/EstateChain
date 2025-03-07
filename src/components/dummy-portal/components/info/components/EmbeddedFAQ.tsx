import React, { useState, useEffect } from "react";
import FAQSearchTerm from "../../../../landing/faq-page/components/faq-search";
import FAQList from "../../../../landing/faq-page/components/faq-list";
import FAQForm from "../../../../landing/faq-page/components/faq-form";
import { submitQuestion } from "../../../../../firebase/faq/faq-submit";
import { getApprovedQuestions } from "../../../../../firebase/faq/faq-grab";
import RiseLoader from "react-spinners/RiseLoader";

const EmbeddedFAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<{ message: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const data = await getApprovedQuestions();
        setFaqData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError("Failed to load FAQs. Please try again later.");
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const filteredFAQs = faqData.filter((faq) =>
    faq.message.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visibleFAQs = searchQuery ? filteredFAQs : filteredFAQs.slice(0, 8);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!newQuestion.trim() || !newEmail.trim()) {
      setError("Both fields (email and question) are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (
      faqData.some(
        (faq) =>
          faq.message.toLowerCase() === newQuestion.trim().toLowerCase()
      )
    ) {
      setError("This question already exists.");
      return;
    }

    try {
      await submitQuestion(newEmail, newQuestion.trim());
      const updatedFAQs = await getApprovedQuestions();
      setFaqData(updatedFAQs);
      setNewQuestion("");
      setNewEmail("");
      setSuccessMessage("Your question has been successfully submitted!");
    } catch (error) {
      console.error("Error submitting question:", error);
      setError("An error occurred while submitting your question. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 flex flex-col">

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-4 lg:px-4 py-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          {/* FAQ Search */}
          <div className="mb-6">
            <FAQSearchTerm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* FAQ List */}
          {loading ? (
            <div className="flex justify-center items-center mt-20">
              <RiseLoader size={15} color="#2DD4BF" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div>
              <FAQList
                faqs={visibleFAQs.map((faq, _) => ({
                  question: faq.message,
                  answer: faq.answer,
                }))}
                openItem={openItem}
                setOpenItem={setOpenItem}
              />
            </div>
          )}

          {!loading && filteredFAQs.length === 0 && !error && (
            <p
              className="text-gray-400 text-center mt-8"
            >
              No results found.
            </p>
          )}
        </div>

        {/* Divider */}
        <hr
          className="border-gray-500 border-1 my-12 mx-auto w-full max-w-6xl"
        />

        {/* FAQ Form */}
          <FAQForm
            error={error}
            successMessage={successMessage}
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            handleFormSubmit={handleFormSubmit}
          />
      </main>
    </div>
  );
};

export default EmbeddedFAQPage;
