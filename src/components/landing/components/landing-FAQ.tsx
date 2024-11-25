import React from "react";

const LandingFAQ:React.FC = () => {
    return (
        <div>
            <div className="mt-16">
                    <div className="flex flex-row w-screen justify-between pl-20 pr-20">
                        <div>
                            <h1 className="text-4xl text-white md:text-4xl lg:text-4xl justify-center">
                                    Have a Question? <br/> We've Got Your Answers
                            </h1>
                        </div>
                        <div>
                            <p className="text-white"> Confused or curios? Don't worry-we've got you covered. Our comprehensive <br /> FAQ section is here to provide clear, straightforward answers to all your questions</p>
                            <button className="text-white">Read More</button>
                        </div>
                </div>
            </div>
            <div>
                <div className="flex flex-row mt-20 pl-20 pr-20">
                    <div className="flex flex-col">
                        <p className='text-white'>What is Webtrix?</p>
                        <p className='text-white'>Webtrix is a blockchain platform designed to offer secure, transparent, and efficient solutions for decentralized finance (DeFi) applications. It enables users to participate in various blockchain activities, such as providing liquidity, staking, and trading, all with a seamless and user-friendly environment.</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='text-white'>How do I start using Webtrix?</p>
                        <p className='text-white'>To strat using Webtrix, you'll need to create an account on our platform. Once registered, you can connect your cryptocurrency wallet, such as MetaMask, to interact with our services. From there, you can explore various features like provided liquidity to pools, staking tokens and more.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingFAQ;