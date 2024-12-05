import React from 'react';
import LandingSubscription from '../../../components/footer/footer';

const FooterSection: React.FC = () => (
    <>
        <hr className="border-gray-500 border-1 mt-12 mb-16 w-screen" data-aos="fade-up" />
        <section data-aos="fade-in">
            <LandingSubscription />
            <div className="pb-12 dark:bg-gray-900"></div>
        </section>
    </>
);

export default FooterSection;
