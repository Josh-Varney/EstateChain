import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn-components/ui/tabs";
import PortalHero from "./components/portal-hero";
import SimulationSection from "./components/portal-simulation-section";
import LiveSystemSection from "./components/portal-live-system-selection";
import SystemStatus from "./components/portal-status";
import LandingHeader from "./components/portal-header";

const Selector: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: "ease-in-out", // Easing for animations
            once: true, // Whether animation should happen only once
            mirror: false, // Whether elements should animate out while scrolling past them
        });
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
            {/* Header spanning across the top */}
            <div className="w-full" data-aos="fade-down">
                <LandingHeader />
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center w-full mt-10" data-aos="fade-up">
                <PortalHero />
            </div>
            
            {/* Tabs Section */}
            <div className="w-full max-w-4xl mt-8 mx-auto">
                <Tabs defaultValue="simulation" className="rounded-lg shadow-lg bg-gray-800" data-aos="fade-up">
                    {/* Tab List */}
                    <TabsList
                        className="grid w-full grid-cols-2 rounded-t-lg bg-gray-800 border-gray-700"
                    >
                        <TabsTrigger
                            value="simulation"
                            className="font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white 
                            data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 
                            data-[state=active]:to-green-700 data-[state=active]:text-white
                            rounded-t-lg border-r border-gray-700 p-2"
                        >
                            Simulation
                        </TabsTrigger>
                        <TabsTrigger
                            value="live-system"
                            className="font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white 
                            data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 
                            data-[state=active]:to-blue-700 data-[state=active]:text-white 
                            rounded-t-lg p-2"
                        >
                            Live System
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab Content */}
                    <TabsContent value="simulation" className="p-0 text-gray-300 bg-gray-800 rounded-b-lg">
                        <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
                            <SimulationSection />
                        </div>
                    </TabsContent>
                    <TabsContent value="live-system" className="p-0 text-gray-300 bg-gray-800 rounded-b-lg">
                        <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
                            <LiveSystemSection />
                        </div>
                    </TabsContent>
                </Tabs>
                <div className="mt-6 mb-6" data-aos="fade-in">
                    <SystemStatus />
                </div>
            </div>
        </div>
    );
};

export default Selector;