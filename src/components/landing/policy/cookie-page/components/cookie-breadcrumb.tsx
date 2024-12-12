import React from 'react';

const Breadcrumb: React.FC = () => (
    <nav
        className="text-sm text-gray-500 dark:text-gray-400 py-4 px-6 max-w-7xl mx-auto"
        data-aos="fade-down"
    >
        <a href="/" className="hover:underline">Home</a> / <span>Cookie Policy</span>
    </nav>
);

export default Breadcrumb;
