import React from "react";

const LandingFAQ: React.FC = () => {
    return (
        <div>
            {/* Header Section */}
            <div className="mt-16 px-4 sm:px-10 md:px-20">
                <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-10">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl text-white md:text-4xl lg:text-4xl">
                            Have a Question?
                        </h1>
                        <h1 className="text-4xl text-white md:text-4xl lg:text-4xl whitespace-nowrap">
                            We've Got Your Answers.
                        </h1>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-gray-500 text-sm break-words text-balance">
                            Confused or curious? Don't worry—we've got you covered. Our comprehensive FAQ section is here to provide clear, straightforward answers to all your questions.
                        </p>
                        <button className="text-black mt-4 text-sm bg-white rounded-3xl w-fit px-10 py-3">
                            Read More
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20 px-4 sm:px-10 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-white text-3xl whitespace-nowrap">What is Webtrix?</h1>
                        <p className="text-gray-500 text-sm text-balance">
                            Webtrix is a blockchain platform designed to offer secure, transparent, and efficient solutions for decentralized finance (DeFi) applications. It enables users to participate in various blockchain activities, such as providing liquidity, staking, and trading, all with a seamless and user-friendly environment.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-white text-3xl whitespace-nowrap">How do I start using Webtrix?</h1>
                        <p className="text-gray-500 text-sm text-balance">
                            To start using Webtrix, you'll need to create an account on our platform. Once registered, you can connect your cryptocurrency wallet, such as MetaMask, to interact with our services. From there, you can explore various features like providing liquidity to pools, staking tokens, and more.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingFAQ;
