import React from 'react';

const CaseStudiesPage: React.FC = () => {
    return (
        <div>
            <h1>Case Studies</h1>
            <section>
                <h2>Real-World Applications</h2>
                <p>Learn how our solutions have helped businesses succeed through innovative applications of technology.</p>
            </section>
            <section>
                <h2>Success Stories</h2>
                <ul>
                    <li>
                        <strong>Company:</strong> FinTech Corp <br />
                        <strong>Challenge:</strong> Improving payment security <br />
                        <strong>Solution:</strong> Implemented tokenization for end-to-end security.
                    </li>
                    <li>
                        <strong>Company:</strong> HealthSecure <br />
                        <strong>Challenge:</strong> Protecting patient data <br />
                        <strong>Solution:</strong> Deployed blockchain-based identity management systems.
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default CaseStudiesPage;
