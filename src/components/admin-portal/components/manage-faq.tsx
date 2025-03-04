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
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getFAQs = async () => {
      const fetchedFAQs = await fetchFAQs(); // Fetch updated FAQs
      setFaqs(fetchedFAQs);
    };
    getFAQs();
  }, [reload]);

  const submitAdminResponse = async (createdAt: string) => {
    const answer = adminResponses[createdAt];
    if (!answer) return; // Prevent empty responses

    const success = await addAnswerToFAQ(createdAt, answer); // Pass createdAt instead of id
    if (success) {
        setReload((prev) => !prev);
    }
  };

  const handleAdminResponseChange = (createdAt: string, response: string) => {
    setAdminResponses({ ...adminResponses, [createdAt]: response });
  };

  const rejectFAQ = async (createdAt: string) => {
    const success = await rejectFAQInFirestore(createdAt); // Pass createdAt instead of id
    if (success) {
      setReload((prev) => !prev);
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage FAQs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <Card key={faq.createdAt || index} className="p-4 shadow-lg border rounded-lg w-full">
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
                  onClick={() => submitAdminResponse(faq.createdAt)} // Use createdAt instead of id
                  className="flex-1 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Approve & Respond
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => rejectFAQ(faq.createdAt)} // Use createdAt instead of id
                  className="flex-1 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No pending FAQs.</p>
        )}
      </div>
    </div>
  );
}
