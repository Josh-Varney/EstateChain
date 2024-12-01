import React from "react";
import SubscriptionForm from "./components/footer-form";
import LinksCard from "./components/footer-card";
import Footer from "./components/footer-info";

const LandingSubscription: React.FC = () => {
    return (
        <div className="w-full px-4 sm:px-8 lg:px-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <SubscriptionForm />
                <LinksCard />
            </div>
            <Footer />
        </div>
    );
};

export default LandingSubscription;
