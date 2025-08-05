import React, { createContext, useContext, useState } from 'react';

// Define the shape of the carbonData object
export interface CarbonData {
    nameOfOrg:string;
    email:string;
    activityType: string;
    Designation: string;
    revenue: number;
    reportingPeriod: number; 
    selectedFuelTypes: string[]; 
    usedRefrigerants?: boolean;
    selectedRefrigerants?: string[];
    refrigerantDetails?: { [refrigerant: string]: { quantity: string; metric: string } };
    fuelDetails: { [fuel: string]: { quantity: string; metric: string } };
    fuelAmount: number;
    ghgEmisssion: boolean;
    GHGtype: string[];
    GHGdetails: { [ghg: string]: { quantity: string; metric: string } };
    aquiredEnergy: number;
    aquiredRenewable: number;
    fuelUSedByCompanyVehicles: number;
    petrol:number;
    Diesel: number;
    Metric: string;
    ghgMetric: string;
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
    generatorFuelType: string; 
    TypeOfVehicle: string; 
    ghgemission:boolean;
    ghgType: string; 
    ghgAmount: number;
    enterpriseElectricityCOnsumption: number;
    fuElMetric:string; 
    renewableElectricityConsumption: number;
    renewableMetric: string;
    acquiredHeat: number;
    EnergyMetric:string; 
    renewableHeatConsumption: number;
    renewableHeatMetric: string;
    renewableElectricityPercentage:string;
    acquiredSteam: number;
    steamMetric: string;
    renewableSteamConsumption: number;
    renewableSteam:number;
    renewableSteamMetric: string;
    acquiredCooling:number;
    coolingMetric:string;
    coolingRenewable:number;
    renewableCoolingMetric:string;
    generatesRewnewable:boolean;
    capacityForRenewable:number;
    metricForRenewable:string;
    tempControl:boolean;
    consumptionForTempControl:number;
    lastCalculatedFootprint: number; 
    lastCalculatedDate: string; 
    tracksCF:boolean;
    keyTransportation:string[];
    trackEmissionsTransportation:boolean;
    estimatedEmissionsTransportation:number;
    businessTravel: {
        flights: number;
        trains: number;
        cars: number;
        cruiseShips: number;
    };
    primaryComumute:string[];
    commuteDetails: { [key: string]: { employees: string; distance: string } };
    numOfEmployees:number;
    recycledWaste:number;
    usesRecycledPlastics: boolean; // Add this field
    recyclePercentage: number; // Add this field
    managingWastePolicy:boolean;
    formalSustainabilityPolicy:false;
    assessmentsCF:boolean;
    ISOstd:string;
    cfOffsetProgram:boolean;
    hasCertificate: boolean;
    certificateName: string;
    procurementMechanism: string;
    serialId: string;
    generatorId: string;
    generatorName: string;
    generatorLocation: string;
    generationDate: string;
    issuanceDate: string;
    needsHelpToCalculate: boolean;
    supplyChainHelpText: string; // Add this field
}

// Define the shape of the context
interface CarbonFootprintContextType {
    carbonData: CarbonData;
    updateCarbonData: (key: keyof CarbonData, value: any) => void;
    resetCarbonData?: () => void; // Optional reset function
}

// Create the context
const CarbonFootprintContext = createContext<CarbonFootprintContextType | null>(null);

export const CarbonFootprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carbonData, setCarbonData] = useState<CarbonData>({
        nameOfOrg: '',
        email: '',
        activityType: '',
        Designation: '',
        revenue: 0,
        selectedFuelTypes: [], 
        fuelDetails: {},
        usedRefrigerants: false, 
        selectedRefrigerants: [], 
        refrigerantDetails: {}, 
        ghgEmisssion: false,
        GHGtype: [],
        GHGdetails: {},
        aquiredEnergy: 0,
        aquiredRenewable: 0,
        reportingPeriod: 0, // Optional, can be removed if not needed
        fuelAmount: 0,
        fuelUSedByCompanyVehicles: 0,
        petrol: 0,
        Diesel: 0,
        Metric: '',
        ghgMetric: '',
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
        generatorFuelType: '', 
        TypeOfVehicle: '',
        ghgemission: false,
        ghgType: '', 
        ghgAmount: 0,
        enterpriseElectricityCOnsumption: 0,
        fuElMetric:'',
        renewableElectricityConsumption: 0,
        renewableMetric: '',
        acquiredHeat: 0,
        EnergyMetric: '',
        renewableHeatConsumption: 0,
        renewableHeatMetric: '',
        renewableSteamConsumption: 0,
        renewableSteam:0,
        renewableSteamMetric: '',
        acquiredSteam: 0,
        steamMetric: '',
         acquiredCooling: 0,
    coolingMetric: '',
    coolingRenewable: 0,
    renewableCoolingMetric: '',
        renewableElectricityPercentage: '', 
        generatesRewnewable:false,
        capacityForRenewable:0,
        metricForRenewable:'',
        tempControl:false,
        consumptionForTempControl:0, 
        tracksCF:false,
        keyTransportation:[],
        trackEmissionsTransportation:false,
        estimatedEmissionsTransportation:0,
        businessTravel: {
            flights: 0,
            trains: 0,
            cars: 0,
            cruiseShips: 0,
        },
        primaryComumute:[],
        commuteDetails: {},
        numOfEmployees:0,
        recycledWaste:0,
        usesRecycledPlastics: false, // Add this field
        recyclePercentage: 0, // Add this field
        managingWastePolicy:false,
        formalSustainabilityPolicy:false,
        assessmentsCF:false,
        ISOstd:'',
        cfOffsetProgram:false,
        hasCertificate: false,
        certificateName: '',
        procurementMechanism: '',
        serialId: '',
        generatorId: '',
        generatorName: '',
        generatorLocation: '',
        generationDate: '',
        issuanceDate: '',
        needsHelpToCalculate: false,
        supplyChainHelpText: '', // Add this field
        lastCalculatedFootprint: 0, // Default value
        lastCalculatedDate: '', // Default value
    });

    const updateCarbonData = (key: keyof CarbonData, value: any) => {
        setCarbonData((prev) => ({ ...prev, [key]: value }));
    };

        const resetCarbonData = () => {
        setCarbonData((prev) => ({
            ...prev,
            nameOfOrg: '',  //have to be removed 
            email: '',       //have to be removed 
            activityType: '',     //have to be removed 
            Designation: '',  //have to be removed
            revenue: 0,
            reportingPeriod: 0, //have to be removed
            selectedFuelTypes: [], 
            fuelDetails: {},
            usedRefrigerants: false,
            selectedRefrigerants: [],
            refrigerantDetails: {},
            ghgEmisssion: false,
            GHGtype: [],
            GHGdetails: {},
            aquiredEnergy: 0,
            aquiredRenewable: 0,
            fuelAmount: 0,
            fuelUSedByCompanyVehicles: 0,
            petrol: 0,
            Diesel: 0,
            Metric: '',
            ghgMetric: '',
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
            generatorFuelType: '',
            TypeOfVehicle: '',
            ghgemission: false,
            ghgType: '',
            ghgAmount: 0,
            enterpriseElectricityCOnsumption: 0,
            fuElMetric:'',
            renewableElectricityConsumption: 0,
            renewableMetric: '',
            renewableElectricityPercentage: '', 
              acquiredHeat: 0,
              EnergyMetric: '',
                renewableHeatConsumption: 0,
                renewableHeatMetric: '',
            renewableSteamConsumption: 0,
            renewableSteam:0,
            renewableSteamMetric: '',
            acquiredSteam: 0,
            steamMetric: '', 
             acquiredCooling: 0,
    coolingMetric: '',
    coolingRenewable: 0,
    renewableCoolingMetric: '',
            generatesRewnewable:false,
           capacityForRenewable:0,
           metricForRenewable:'',
           tempControl:false,
           tracksCF:false,
        keyTransportation:[],
        trackEmissionsTransportation:false,
        estimatedEmissionsTransportation:0,
        businessTravel: {
            flights: 0,
            trains: 0,
            cars: 0,
            cruiseShips: 0,
        },
        primaryComumute:[], // Changed from '' to []
        commuteDetails: {},
        numOfEmployees:0,
        recycledWaste:0,
        usesRecycledPlastics: false, // Add this field
        recyclePercentage: 0, // Add this field
        managingWastePolicy:false,
        formalSustainabilityPolicy:false,
        assessmentsCF:false,
        ISOstd:'',
        cfOffsetProgram:false,
        hasCertificate: false,
        certificateName: '',
        procurementMechanism: '',
        serialId: '',
        generatorId: '',
        generatorName: '',
        generatorLocation: '',
        generationDate: '',
        issuanceDate: '',
           consumptionForTempControl:0,
           needsHelpToCalculate: false,
           supplyChainHelpText: '', // Add this field
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