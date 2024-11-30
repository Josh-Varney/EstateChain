import React from "react";

interface FAQFormProps {
  error: string | null;
  successMessage: string | null;
  newQuestion: string;
  setNewQuestion: (value: string) => void;
  newAnswer: string;
  setNewAnswer: (value: string) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const FAQForm: React.FC<FAQFormProps> = ({
  error,
  successMessage,
  newQuestion,
  setNewQuestion,
  newAnswer,
  setNewAnswer,
  handleFormSubmit,
}) => (
  <div className="mt-20 mb-16 px-4 sm:px-8 md:px-20 lg:px-40">
    <h2 className="text-2xl font-bold text-teal-400 mb-4">
      Submit Your Own Question
    </h2>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
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
);

export default FAQForm;
