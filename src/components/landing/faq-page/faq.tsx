import React, { useState, useEffect } from "react";
import LandingHeader from "../components/header";
import LandingSubscription from "../components/footer";
import FAQTitle from "./components/faq-title";
import FAQSearchTerm from "./components/faq-search";
import FAQList from "./components/faq-list";
import FAQForm from "./components/faq-form";
import { submitQuestion } from "../../../firebase/faq/faq-submit";
import { getApprovedQuestions } from "../../../firebase/faq/faq-grab";

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<{ message: string; answer: string }[]>([]); // Use dynamic data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newEmail, setNewEmail] = useState(""); // Email state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch FAQ data dynamically on component mount
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true); // Start loading
        const data = await getApprovedQuestions(); // Fetch data
        setFaqData(data); // Update state with fetched data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError("Failed to load FAQs. Please try again later.");
        setLoading(false); // Stop loading
      }
    };

    fetchFAQs();
  }, []);

  // Filter FAQs based on search query
  const filteredFAQs = faqData.filter((faq) =>
    faq.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Limit the number of FAQs displayed to 8 if no search query
  const visibleFAQs = searchQuery ? filteredFAQs : filteredFAQs.slice(0, 8);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Input validation
    if (!newQuestion.trim() || !newEmail.trim()) {
      setError("Both fields (email and question) are required.");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check for duplicate question
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
      // Submit the question to Firebase
      await submitQuestion(newEmail, newQuestion.trim());

      // Reload FAQs after submission
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
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100">
      <LandingHeader />

      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <FAQTitle />

          {/* Search Input */}
          <FAQSearchTerm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* FAQ Items */}
          {loading ? (
            <p className="text-center text-gray-300">Loading FAQs...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <FAQList
              faqs={visibleFAQs.map((faq, index) => ({
                question: faq.message,
                answer: faq.answer,
              }))}
              openItem={openItem}
              setOpenItem={setOpenItem}
            />
          )}

          {/* No Results Message */}
          {!loading && filteredFAQs.length === 0 && !error && (
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
          newEmail={newEmail} // Pass email state
          setNewEmail={setNewEmail} // Pass email setter
          handleFormSubmit={handleFormSubmit}
        />

        <hr className="border-gray-500 border-1 mt-16 mb-8 w-screen" />
        <LandingSubscription />
      </main>
    </div>
  );
};

export default FAQPage;
