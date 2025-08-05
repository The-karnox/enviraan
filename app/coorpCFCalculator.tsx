import { CarbonData } from './CarbonFootprintContext';

export const calculateCorporateCarbonFootprint = (carbonData: CarbonData) => {
    // Emission factors (in metric tonnes CO₂e per unit) based on provided images
    const EF = {
        fuelType: {
            // From "Fossil CO2 EF" table (kg/L or kg/m3) -> converted to tonnes/unit
            'Petrol': 2.29 / 1000, // kg/L to tonnes/L
            'Diesel': 2.91 / 1000, // kg/L to tonnes/L
            'CNG': 1.88 / 1000, // kg/m3 to tonnes/m3
            'LPG': 1.47 / 1000, // kg/L to tonnes/L
            // From "Mass basis" table (kg/tonne) -> converted to tonnes/tonne
            'Coal': 2667.72 / 1000,
            'Charcoal': 3304.00 / 1000,
        },
        refrigerants: {
            // From GWP (100-year) table
            'R-134a': 1530,
            'R-410A': 2088, // Not in image, keeping old value
            'R-22': 1810,   // Not in image, keeping old value
            'R-404A': 3922, // Not in image, keeping old value
            'R-32': 675,    // Not in image, keeping old value
            'CO₂': 1,
            'Other': 2000, // Default for other refrigerants
        },
        ghg: {
            // From GWP (100-year) table
            'CO2': 1,
            'CH4': 30,
            'N2O': 273,
            'HFCs': 1530,
            'PFCs': 7380, // Using CF4 value
            'SF6': 25200,
            'NF3': 17400,
        },
        electricity: 0.708, // metric tonnes CO₂e per MWh
        renewableEnergy: -0.708, // Negative emissions for renewable energy
        transportModes: {
            'Road(Truck)': 0.2,
            'Rail': 0.05,
            'Air Freight': 0.5,
            'Sea Freight': 0.02,
            'Inland Waterways': 0.03,
        },
        employeeCommute: {
            'Car': 0.2,
            'Carpooling': 0.1,
            'Public Transport': 0.05,
            'Cycling': 0.0,
            'Walking': 0.0,
            'Electric Vehicles': 0.0,
        },
        businessTravel: {
            flights: 0.00015, // tonnes CO2e/km
            trains: 0.00004,
            cars: 0.00017,
            cruiseShips: 0.0004,
        },
    };

    // Helper function to normalize metrics to a base unit for calculation
    const normalizeMetric = (value: number, metric: string): number => {
        switch (metric) {
            // Energy to MWh
            case 'KWh': return value / 1000;
            case 'MWh': return value;
            // Mass to Metric Tonnes
            case 'KG': return value / 1000;
            case 'Quintals': return value / 10;
            case 'Metric Tonnes': return value;
            // Volume to Litres
            case 'Litres': return value;
            case 'Cubic Meters': return value * 1000; // Convert m³ to Litres
            default: return value;
        }
    };

    // 1. Fuel Emissions (from selected fuel types)
    const fuelEmissions = carbonData.selectedFuelTypes.reduce((total, fuel) => {
        const details = carbonData.fuelDetails[fuel];
        if (!details || !details.quantity) return total;

        const ef = EF.fuelType[fuel as keyof typeof EF.fuelType] || 0;
        const quantity = parseFloat(details.quantity);
        // Note: This assumes the EF unit matches the input metric.
        // A more robust solution would normalize based on metric.
        return total + (quantity * ef);
    }, 0);

    // 2. Refrigerant Emissions (from selected refrigerants)
    const refrigerantEmissions = (carbonData.selectedRefrigerants || []).reduce((total, refrigerant) => {
        const details = carbonData.refrigerantDetails?.[refrigerant];
        if (!details || !details.quantity) return total;

        const gwp = EF.refrigerants[refrigerant as keyof typeof EF.refrigerants] || EF.refrigerants['Other'];
        const quantity = parseFloat(details.quantity);
        const normalizedQuantity = normalizeMetric(quantity, details.metric); // Normalize to tonnes
        return total + (normalizedQuantity * gwp);
    }, 0);

    // 3. GHG Emissions (from selected GHGs)
    const ghgEmissions = (carbonData.GHGtype || []).reduce((total, ghg) => {
        const details = carbonData.GHGdetails?.[ghg];
        if (!details || !details.quantity) return total;

        const gwp = EF.ghg[ghg as keyof typeof EF.ghg] || 1;
        const quantity = parseFloat(details.quantity);
        const normalizedQuantity = normalizeMetric(quantity, details.metric); // Normalize to tonnes
        return total + (normalizedQuantity * gwp);
    }, 0);

    // 4. Electricity Consumption
    const electricityEmissions = normalizeMetric(carbonData.enterpriseElectricityCOnsumption, carbonData.fuElMetric) * EF.electricity;

    // 5. Renewable Energy Offset
    const renewableEnergyOffset = carbonData.renewableElectricityPercentage
        ? normalizeMetric(carbonData.enterpriseElectricityCOnsumption, carbonData.fuElMetric) *
          (parseFloat(carbonData.renewableElectricityPercentage) / 100) *
          EF.renewableEnergy
        : 0;

    // 6. Onsite Renewable Energy Generation
    const onsiteRenewableEmissions = carbonData.generatesRewnewable
        ? normalizeMetric(carbonData.capacityForRenewable, carbonData.metricForRenewable) * EF.renewableEnergy
        : 0;

    // 7. Transportation Emissions (from selected modes)
    const transportEmissions = (carbonData.keyTransportation || []).reduce((total, transportMode) => {
        const ef = EF.transportModes[transportMode as keyof typeof EF.transportModes] || 0;
        // Assuming estimatedEmissionsTransportation is the total value to be multiplied by the EF of each mode.
        // This might need clarification. If the estimate is per mode, the logic would differ.
        return total + (carbonData.estimatedEmissionsTransportation * ef);
    }, 0);

    // 8. Employee Commute Emissions (detailed calculation)
    const employeeCommuteEmissions = (carbonData.primaryComumute || []).reduce((total, commuteType) => {
        const details = carbonData.commuteDetails?.[commuteType];
        if (!details || !details.employees || !details.distance) return total;

        const ef = EF.employeeCommute[commuteType as keyof typeof EF.employeeCommute] || 0;
        const employees = parseFloat(details.employees);
        const distance = parseFloat(details.distance); // Assuming distance is per employee
        
        // Assuming distance is one-way daily commute, multiply by 2 (round trip) and ~230 working days/year
        const annualDistance = distance * 2 * 230;
        
        return total + (employees * annualDistance * ef);
    }, 0);

    // 9. Business Travel Emissions
    const businessTravelEmissions =
        (carbonData.businessTravel.flights * EF.businessTravel.flights) +
        (carbonData.businessTravel.trains * EF.businessTravel.trains) +
        (carbonData.businessTravel.cars * EF.businessTravel.cars) +
        (carbonData.businessTravel.cruiseShips * EF.businessTravel.cruiseShips);

    // 10. Waste Management
    const wasteEmissions = normalizeMetric(carbonData.recycledWaste, 'Metric Tonnes') * 0.05; // Using a placeholder EF

    // Total Carbon Footprint
    const totalFootprint =
        fuelEmissions +
        refrigerantEmissions +
        ghgEmissions +
        electricityEmissions +
        renewableEnergyOffset +
        onsiteRenewableEmissions +
        transportEmissions +
        employeeCommuteEmissions +
        businessTravelEmissions +
        wasteEmissions;

    return totalFootprint;
};