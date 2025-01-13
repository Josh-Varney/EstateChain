import React, { useState } from "react";
import { FaLuggageCart } from "react-icons/fa";

const PropertyNotesWritten = ({ title }) => {
  const [isEditing, setIsEditing] = useState(false); // Toggle between editing and viewing
  const [notes, setNotes] = useState(""); // Stores the saved notes
  const [tempNotes, setTempNotes] = useState(""); // Temporary state for editing notes

  const saveNotes = () => {
    setNotes(tempNotes);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTempNotes(notes);
    setIsEditing(false);
  };

  return (
    <div className="w-full p-6 border rounded-lg shadow-lg bg-gray-800 border-gray-700">
      {/* Header Section */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-gray-700 text-blue-400 rounded-full">
          <FaLuggageCart size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-200">{title}</h2>
      </div>

      {/* Notes Section */}
      <div className="bg-gray-700 p-4 rounded-lg">
        {isEditing ? (
          <div>
            <textarea
              className="w-full p-3 border rounded-md bg-gray-800 border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              placeholder="Write your notes here..."
            ></textarea>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveNotes}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p
              className={`${
                notes ? "text-gray-200" : "text-gray-500"
              } whitespace-pre-line`}
            >
              {notes || "No notes yet. Click 'Edit' to add your notes."}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setTempNotes(notes);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyNotesWritten;
