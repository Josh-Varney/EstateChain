import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhitePapersPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All Topics');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const whitePapers = [
        {
            title: 'The Future of Tokenization',
            summary: 'Explores the latest advancements in tokenization and its impact on industries.',
            link: '/path-to-tokenization-paper.pdf',
            topic: 'Tokenization',
            year: 2023,
        },
        {
            title: 'Blockchain Security Best Practices',
            summary: 'A comprehensive guide to securing blockchain applications and infrastructure.',
            link: '/path-to-security-paper.pdf',
            topic: 'Security',
            year: 2022,
        },
        {
            title: 'Decentralized Finance: The Next Frontier',
            summary: 'An in-depth look at DeFi, its opportunities, and its risks.',
            link: '/path-to-defi-paper.pdf',
            topic: 'Finance',
            year: 2021,
        },
    ];

    const topics = ['All Topics', 'Tokenization', 'Security', 'Finance'];

    const filteredPapers = whitePapers.filter(
        (paper) =>
            (selectedTopic === 'All Topics' || paper.topic === selectedTopic) &&
            paper.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
            {/* Hero Section */}
            <header
                className="relative bg-gradient-to-b from-blue-600 to-blue-400 text-white py-16 px-8 text-center"
                data-aos="fade-down"
            >
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Explore Our White Papers
                </h1>
                <p className="mt-4 text-lg">
                    Gain insights into cutting-edge research on blockchain, tokenization, and emerging technologies.
                </p>
                <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-10"
                    style={{ zIndex: -1 }}
                >
                    <img
                        src="/path-to-hero-animation.svg"
                        alt="Decorative Background"
                        className="w-full max-w-lg"
                    />
                </div>
            </header>

            {/* Filters Section */}
            <div
                className="max-w-7xl mx-auto mt-8 px-6"
                data-aos="fade-up"
            >
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search white papers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {topics.map((topic, index) => (
                            <option key={index} value={topic}>
                                {topic}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            setSearch('');
                            setSelectedTopic('All Topics');
                        }}
                        className="p-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Featured Papers */}
            <main
                className="max-w-7xl mx-auto py-12 px-6"
                data-aos="fade-up"
            >
                <section>
                    <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                        Featured Papers
                    </h2>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                        Discover detailed analyses and reports crafted by our experts.
                    </p>
                    {filteredPapers.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {filteredPapers.map((paper, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition"
                                    data-aos="zoom-in"
                                >
                                    <div className="absolute top-4 right-4 text-sm text-gray-500">
                                        {paper.year}
                                    </div>
                                    <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {paper.title}
                                    </h3>
                                    <p className="mt-4 text-gray-700 dark:text-gray-300">{paper.summary}</p>
                                    <div className="mt-6 flex justify-between items-center">
                                        <a
                                            href={paper.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 dark:text-blue-300 font-semibold hover:underline"
                                        >
                                            View Paper →
                                        </a>
                                        <button
                                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                            onClick={() => window.open(paper.link, '_blank')}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-8 text-gray-500 text-center">
                            No white papers found. Try a different search or topic.
                        </p>
                    )}
                </section>
            </main>

            {/* Call-to-Action */}
            <section
                className="bg-blue-600 text-white text-center py-16 px-8"
                data-aos="fade-up"
            >
                <h2 className="text-4xl font-semibold">Stay Informed</h2>
                <p className="mt-4 text-lg">
                    Subscribe to receive the latest white papers, insights, and reports.
                </p>
                <form className="mt-8 max-w-md mx-auto flex">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 p-3 rounded-l-lg border-none focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold shadow hover:bg-gray-200 transition"
                    >
                        Subscribe
                    </button>
                </form>
            </section>
        </div>
    );
};

export default WhitePapersPage;
