import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingHeader from "../components/header/header";
import LandingSubscription from "../components/footer/footer";
import FAQTitle from "./components/faq-title";
import FAQSearchTerm from "./components/faq-search";
import FAQList from "./components/faq-list";
import FAQForm from "./components/faq-form";
import { submitQuestion } from "../../../firebase/faq/faq-submit";
import { getApprovedQuestions } from "../../../firebase/faq/faq-grab";
import RiseLoader from "react-spinners/RiseLoader";

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<{ message: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 700, // Standardized duration for all animations
      easing: "ease-out-cubic", // Consistent easing for smoother animations
      offset: 0, // Offset for triggering animations
      once: true, // Animation will occur only once
    });
  }, []);

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
    <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100">
      {/* Header */}
      <div data-aos="fade-down">
        <LandingHeader />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* FAQ Title */}
          <div data-aos="fade-up">
            <FAQTitle />
          </div>

          {/* FAQ Search */}
          <div data-aos="fade-right" data-aos-delay="200">
            <FAQSearchTerm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* FAQ List */}
          {loading ? (
            <div
              data-aos="zoom-in"
              className="text-center text-gray-300 mt-32 mb-32"
            >
              <RiseLoader size={15} color="#2DD4BF" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div data-aos="">
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
              data-aos="zoom-in"
              className="text-gray-400 text-center mt-8"
            >
              No results found.
            </p>
          )}
        </div>

        {/* Divider */}
        <hr data-aos="fade-right" className="border-gray-500 border-1 mt-16 w-screen" />

        {/* FAQ Form */}
        <div data-aos="fade-up" data-aos-delay="200">
          <FAQForm
            error={error}
            successMessage={successMessage}
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            handleFormSubmit={handleFormSubmit}
          />
        </div>

        {/* Divider */}
        <hr data-aos="fade-left" className="border-gray-500 border-1 mt-24 mb-12 w-screen" />

        {/* Footer */}
        <div data-aos="zoom-in">
          <LandingSubscription />
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
