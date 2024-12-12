import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn-components/ui/tabs";
import PortalHero from "./components/portal-hero";
import SimulationSection from "./components/portal-simulation-section";
import LiveSystemSection from "./components/portal-live-system-selection";
import SystemStatus from "./components/portal-status";

const Selector: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white px-4">
            <PortalHero />
            <div className="w-full max-w-3xl">
                <Tabs defaultValue="simulation" className="rounded-lg bg-white shadow-lg">
                    <TabsList className="grid w-full grid-cols-2 rounded-t-lg bg-gray-200">
                        <TabsTrigger
                            value="simulation"
                            className="font-medium text-gray-700 py-3 transition hover:bg-gray-300 hover:text-gray-900 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-green-600 data-[state=active]:text-white">
                            Simulation
                        </TabsTrigger>
                        <TabsTrigger
                            value="live-system"
                            className="font-medium text-gray-700 py-3 transition hover:bg-gray-300 hover:text-gray-900 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                            Live System
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="simulation" className="p-6 text-gray-700 bg-gray-800 rounded-b-lg">
                        <SimulationSection />
                    </TabsContent>
                    <TabsContent value="live-system" className="p-6 text-gray-700 bg-gray-800 rounded-b-lg">
                        <LiveSystemSection />
                    </TabsContent>
                </Tabs>
                <SystemStatus />
            </div>
        </div>
    );
};

export default Selector;
