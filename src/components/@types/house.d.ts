type House = {
    id: number;
    propertyAddress: string;
    propertySettlement: string;
    propertyDescription: string;
    propertyAdded: string; // ISO string format
    propertyAddedBy: string;
    propertyAgent: {
        agentName: string;
        agentAddress: string;
        agentIcon: string;
        agentNumber: string;
        agentEmail: string;
        agentWhyDescription: string;
        agentSoldRecentlyDescription: string;
    };
    propertyKeywords: string[]; // split(",")
    propertyPrice: number;
    propertyLocation: {
        latitude: number;
        longitude: number;
    };
    propertyCountry: string;
    propertySize: string;
    propertyBedrooms: number;
    propertyBathrooms: number;
    propertyTokenPrice: number;
    propertyTokensLeft: number;
    propertyType: string;
    propertyPostcode: string;
    propertyRental: boolean;
    propertyImage: string;
    propertyFeatured: boolean;
    propertyTenure: string;
    propertyGarden: boolean;
    propertyAcessibility: boolean;
    propertyKeyFeatures: string[]; // split(",")
};