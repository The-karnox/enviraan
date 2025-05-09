import { CarbonData } from './CarbonFootprintContext';

export const calculateCorporateCarbonFootprint = (carbonData: CarbonData) => {
    const EF = {
        // Emission factors (in metric tonnes CO₂e per unit)
        fuelType:{
        petrol: 2.31,
        diesel: 2.68,
        cng: 2.75,
        lpg: 1.51,
        coal: 2.86,
        charcoal: 3.1,
        },
      // Assuming zero emissions for EVs
        refrigerants: {
            'R-134a': 1430,
            'R-410A': 2088,
            'R-22': 1810,
            'R-404A': 3922,
            'R-32': 675,
            'CO₂': 1,
            'Other': 2000, // Default value for unknown refrigerants
        },
        ghg: {
            CO2: 1,
            CH4: 25,
            N2O: 298,
            HFCs: 1430,
            PFCs: 7390,
            SF6: 22800,
            NF3: 17200,
        },
        electricity: 0.708, // Emission factor for electricity (metric tonnes CO₂e per MWh)
        renewableEnergy: -0.708, // Negative emissions for renewable energy
        transportModes: {
            'Road(Truck)': 0.2,
            'Rail': 0.05,
            'Air Freight': 0.5,
            'Sea Freight': 0.02,
            'Inland Waterways': 0.03,
        } as const,
        employeeCommute: {
            Car: 0.2,
            Carpooling: 0.1,
            'Public Transport': 0.05,
            Cycling: 0.0,
            Walking: 0.0,
            'Electric Vehicles': 0.0,
        },
    };

    // 1. Vehicle Emissions
    const vehicleEmissions = (() => {
        switch (carbonData.TypeOfVehicle) {
            case 'Petrol Vehicles':
                return carbonData.vehicleFuel * EF.fuelType.petrol;
            case 'Diesel Vehicles':
                return carbonData.vehicleFuel * EF.fuelType.diesel;
            case 'CNG Vehicles':
                return carbonData.vehicleFuel * EF.fuelType.cng;
            case 'Electric Vehicles':
                return 0; // No emissions for EVs
            default:
                return 0;
        }
    })();

    // 2. Generator Emissions
    const generatorEmissions = (() => {
        if (!carbonData.useOfGenerator) return 0; // No emissions if generators are not used
        const ef = EF[carbonData.generatorFuelType.toLowerCase() as keyof typeof EF] || 0;
        return carbonData.GeneratorFuel * EF.fuelType[carbonData.generatorFuelType as keyof typeof EF.fuelType] || 0;
    })();

    // 3. Refrigerant Emissions
    const refrigerantEmissions = (() => {
        const gwp = EF.refrigerants[carbonData.refrigerantType as keyof typeof EF.refrigerants] || EF.refrigerants['Other'];
        return carbonData.refrigerantAmount * gwp / 1000; // Convert to metric tonnes
    })();

    // 4. GHG Emissions
    const ghgEmissions = (() => {
        const gwp = EF.ghg[carbonData.ghgType as keyof typeof EF.ghg] || 1; // Default to CO₂ if unknown
        return carbonData.ghgAmount * gwp;
    })();

    // 5. Electricity Consumption
    const electricityEmissions = carbonData.enterpriseElectricityCOnsumption * EF.electricity;

    // 6. Renewable Energy Offset
    const renewableEnergyOffset = carbonData.renewableElectricityPercentage
        ? (carbonData.enterpriseElectricityCOnsumption * (parseFloat(carbonData.renewableElectricityPercentage) / 100)) * EF.renewableEnergy
        : 0;

    // 7. Onsite Renewable Energy Generation
    const onsiteRenewableEmissions = carbonData.generatesRewnewable
        ? carbonData.capacityForRenewable * EF.renewableEnergy
        : 0;

    // 8. Transportation Modes
    const transportEmissions = (() => {
        const ef = EF.transportModes[carbonData.keyTransportation as keyof typeof EF.transportModes] || 0;
        return carbonData.estimatedEmissionsTransportation * ef;
    })();

    // 9. Employee Commute
    const employeeCommuteEmissions = (() => {
        const ef = EF.employeeCommute[carbonData.primaryComumute as keyof typeof EF.employeeCommute] || 0;
        return carbonData.distanceTravelledByEmployees * ef * carbonData.numOfEmployees;
    })();

    // 10. Waste Management (if applicable)
    const wasteEmissions = carbonData.recycledWaste * 0.05; // Example: 0.05 metric tonnes CO₂e per tonne of waste

    // 11. Temperature Control (District Heating/Cooling)
    const tempControlEmissions = (() => {
        if (!carbonData.tempControl) return 0; // No emissions if district heating/cooling is not used
        return carbonData.consumptionForTempControl * EF.electricity; // Assuming electricity is used for heating/cooling
    })();

    // Total Carbon Footprint
    const totalFootprint =
        vehicleEmissions +
        generatorEmissions +
        refrigerantEmissions +
        ghgEmissions +
        electricityEmissions +
        renewableEnergyOffset +
        onsiteRenewableEmissions +
        transportEmissions +
        employeeCommuteEmissions +
        wasteEmissions +
        tempControlEmissions;

    return totalFootprint;
};