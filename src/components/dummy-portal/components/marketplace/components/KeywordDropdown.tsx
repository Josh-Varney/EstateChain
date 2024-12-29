import React, { useState } from 'react';

const KeywordDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [keywords, setKeywords] = useState<string>("");
    const [savedKeywords, setSavedKeywords] = useState<string[]>([]);

    const toggleDropdown = (): void => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setKeywords(e.target.value);
    };

    const saveKeyword = (): void => {
        if (keywords.trim()) {
            setSavedKeywords([...savedKeywords, keywords.trim()]);
            setKeywords("");
            setDropdownOpen(false);
        }
    };

    const removeKeyword = (index: number): void => {
        setSavedKeywords(savedKeywords.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center">
                <div>
                    <h1>Hello Test</h1>
                </div>
                <div className="flex flex-row flex-wrap">
                    {savedKeywords.map((keyword, index) => (
                        <span
                            key={index}
                            className="flex items-center px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm mr-2 mb-2"
                        >
                            {keyword}
                            <button
                                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                                onClick={() => removeKeyword(index)}
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>

                <button 
                    className="ml-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600" 
                    onClick={toggleDropdown}
                >
                    + Keyword
                </button>
            </div>

            {dropdownOpen && (
                <div className="mt-4 w-full bg-white border border-gray-300 rounded shadow-lg">
                    <div className="p-4">
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Keywords:
                        </label>
                        <input
                            id="keywords"
                            type="text"
                            value={keywords}
                            onChange={handleKeywordChange}
                            placeholder="e.g. pool, utility"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <button
                            onClick={saveKeyword}
                            className="mt-3 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:ring focus:ring-green-400"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeywordDropdown;
