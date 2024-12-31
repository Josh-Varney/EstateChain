import React, { useState, useRef, useEffect } from 'react';
import { FaSort } from 'react-icons/fa';

const KeywordDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [keywords, setKeywords] = useState<string>("");
    const [savedKeywords, setSavedKeywords] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown if the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setKeywords(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && keywords.trim()) {
            saveKeyword();
        }
    };

    const saveKeyword = (): void => {
        if (keywords.trim()) {
            setSavedKeywords((prevKeywords) => 
                [...prevKeywords, keywords.trim()].sort((a, b) => a.localeCompare(b))
            );
            setKeywords("");
            setDropdownOpen(false);
        }
    };

    const removeKeyword = (index: number): void => {
        setSavedKeywords(savedKeywords.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center space-x-1 text-sm">
                <div className="w-4 h-4">
                    <FaSort />
                </div>
                <div>
                    <h1>Prioritise Properties with...</h1>
                </div>
                <div className="flex flex-row flex-wrap items-center p-3">
                    {savedKeywords.map((keyword, index) => (
                        <span
                            key={index}
                            className="flex items-center bg-gray-200 p-2 text-gray-800 border rounded text-sm mr-2"
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
                <div className="flex flex-row">
                    <div>
                        {!dropdownOpen && (
                            <div
                                className="ml-2 font-semibold cursor-pointer"
                                onClick={() => setDropdownOpen(true)}
                            >
                                + Keyword
                            </div>
                        )}
                    </div>
                    <div>
                        {dropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="mt-2 w-full bg-gray-800 shadow-3xl border border-gray-500 text-gray-500 rounded"
                            >
                                <div className="p-2 flex items-center space-x-4">
                                    <label
                                        htmlFor="keywords"
                                        className="text-sm px-3 font-medium text-white whitespace-nowrap"
                                    >
                                        Enter Keyword:
                                    </label>
                                    <div className="relative flex flex-row w-full">
                                        <input
                                            id="keywords"
                                            type="text"
                                            value={keywords}
                                            onChange={handleKeywordChange}
                                            onKeyDown={handleKeyDown} // Handle Enter Key
                                            placeholder="e.g. utility, pool"
                                            className="w-full rounded-lg p-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeywordDropdown;
