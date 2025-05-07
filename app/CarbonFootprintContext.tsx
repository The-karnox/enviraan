import React, { createContext, useContext, useState } from 'react';

// Define the shape of the carbonData object
interface CarbonData {
    fuelAmount: number;
    Metric: string;
    familyMembers: number;
    coal: number;
    charcoal: number;
    electricityConsumption: number;
    renewableElectricity: number;
    airTravel: number;
    railTravel: number;
    mealPreference: string;
    numOfMembers: number;
    fuelType: string;
    refrigerantType: string;
    refrigerantAmount: number;
    GeneratorFuel: number;
    vehicleFuel: number;
    cabTravel: number;
    electricCabTravel: number;
    busTravel: number;
    electricBusTravel: number;
    trainTravel: number;
    metroTravel: number;
    flightTravel: number;
    useOfGenerator: boolean;
    lastCalculatedFootprint: number; // Added property
    lastCalculatedDate: string; // Added property
}

// Define the shape of the context
interface CarbonFootprintContextType {
    carbonData: CarbonData;
    updateCarbonData: (key: keyof CarbonData, value: number | string | boolean) => void;
    resetCarbonData?: () => void; // Optional reset function
}

// Create the context
const CarbonFootprintContext = createContext<CarbonFootprintContextType | null>(null);

export const CarbonFootprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carbonData, setCarbonData] = useState<CarbonData>({
        fuelAmount: 0,
        Metric: '',
        familyMembers: 0,
        coal: 0,
        charcoal: 0,
        electricityConsumption: 0,
        airTravel: 0,
        railTravel: 0,
        mealPreference: '',
        numOfMembers: 0,
        fuelType: '',
        refrigerantType: '',
        refrigerantAmount: 0,
        GeneratorFuel: 0,
        vehicleFuel: 0,
        cabTravel: 0,
        electricCabTravel: 0,
        busTravel: 0,
        electricBusTravel: 0,
        trainTravel: 0,
        metroTravel: 0,
        flightTravel: 0,
        renewableElectricity: 0,
        useOfGenerator: false,
        lastCalculatedFootprint: 0, // Default value
        lastCalculatedDate: '', // Default value
    });

    const updateCarbonData = (key: keyof CarbonData, value: number | string | boolean) => {
        setCarbonData((prev) => ({ ...prev, [key]: value }));
    };

    const resetCarbonData = () => {
        setCarbonData((prev) => ({
            ...prev,
        
            fuelAmount: 0,
            Metric: '',
            familyMembers: 0,
            coal: 0,
            charcoal: 0,
            electricityConsumption: 0,
            airTravel: 0,
            railTravel: 0,
            mealPreference: '',
            numOfMembers: 0,
            fuelType: '',
            refrigerantType: '',
            refrigerantAmount: 0,
            GeneratorFuel: 0,
            vehicleFuel: 0,
            cabTravel: 0,
            electricCabTravel: 0,
            busTravel: 0,
            electricBusTravel: 0,
            trainTravel: 0,
            metroTravel: 0,
            flightTravel: 0,
            renewableElectricity: 0,
            useOfGenerator: false,
            lastCalculatedFootprint: prev.lastCalculatedFootprint,
        lastCalculatedDate: prev.lastCalculatedDate,
        }));
    };

    return (
        <CarbonFootprintContext.Provider value={{ carbonData, updateCarbonData, resetCarbonData }}>
            {children}
        </CarbonFootprintContext.Provider>
    );
};

// Custom hook to use the context
export const useCarbonFootprint = () => {
    const context = useContext(CarbonFootprintContext);
    if (!context) {
        throw new Error('useCarbonFootprint must be used within a CarbonFootprintProvider');
    }
    return context;
};