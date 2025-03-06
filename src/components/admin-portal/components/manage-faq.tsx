import { useEffect, useState } from "react";
import { Button } from "../../../shadcn-components/ui/button";
import { Textarea } from "../../../shadcn-components/ui/textarea";
import { Card } from "../../../shadcn-components/ui/card";
import { Send, XCircle } from "lucide-react";
import React from "react";
import { addAnswerToFAQ, fetchFAQs, rejectFAQInFirestore } from "../admin-manager/get";

interface FAQ {
  createdAt: string; // Use createdAt or any unique identifier
  message: string;
  answer: string;
  email: string;
}

export default function ManageFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [adminResponses, setAdminResponses] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Fetch FAQs when the component mounts and on every reload
  useEffect(() => {
    const getFAQs = async () => {
      setLoading(true); // Show loading state

      const fetchedFAQs = await fetchFAQs();
      setFaqs(fetchedFAQs);

      // Add a small delay before hiding the loading state
      setTimeout(() => {
        setLoading(false);
      }, 500); // Adjust delay time as needed
    };

    getFAQs(); // Fetch FAQs initially

    // Set an interval to fetch FAQs every 5 seconds
    const interval = setInterval(() => {
      getFAQs(); // Re-fetch FAQs periodically
    }, 5000); // Fetch every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs once on mount

  const submitAdminResponse = async (createdAt: string) => {
    const answer = adminResponses[createdAt];
    if (!answer) return; // Prevent empty responses

    const success = await addAnswerToFAQ(createdAt, answer); // Pass createdAt instead of id
    if (success) {
      setFaqs((prev) => prev.map((faq) => (faq.createdAt === createdAt ? { ...faq, answer } : faq))); // Update answer
    }
  };

  const handleAdminResponseChange = (createdAt: string, response: string) => {
    setAdminResponses({ ...adminResponses, [createdAt]: response });
  };

  const rejectFAQ = async (createdAt: string) => {
    const success = await rejectFAQInFirestore(createdAt); // Pass createdAt instead of id
    if (success) {
      setFaqs((prev) => prev.filter((faq) => faq.createdAt !== createdAt)); // Remove rejected FAQ from the list
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage FAQs</h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <svg className="animate-spin h-5 w-5 text-gray-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p className="text-sm text-gray-500 ml-2">Refreshing...</p>
        </div>
      )}

      {/* FAQ List */}
      {faqs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {faqs.map((faq) => (
            <Card key={faq.createdAt} className="p-4 shadow-lg border rounded-lg w-full">
              <h2 className="font-semibold text-lg mb-2">{faq.message}</h2>
              <p className="text-gray-600 mb-1">{faq.answer || "No answer yet."}</p>
              <p className="text-sm text-gray-500 mb-3">Submitted by: {faq.email}</p>

              <Textarea
                placeholder="Add your response..."
                value={adminResponses[faq.createdAt] || ""}
                onChange={(e) => handleAdminResponseChange(faq.createdAt, e.target.value)}
                className="mt-2"
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => submitAdminResponse(faq.createdAt)}
                  className="flex-1 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Approve & Respond
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => rejectFAQ(faq.createdAt)}
                  className="flex-1 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh] w-full">
          <p className="text-xl font-bold text-green-400 text-center">No pending FAQs.</p>
        </div>
      )}
    </div>
  );
}
