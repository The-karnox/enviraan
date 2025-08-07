import { CarbonData } from './CarbonFootprintContext';

export const calculateCorporateCarbonFootprint = (carbonData: CarbonData) => {
    const EF = {
        fuelType: {
            'Petrol': 2.29 / 1000, 'Diesel': 2.91 / 1000, 'CNG': 1.88 / 1000, 'LPG': 1.47 / 1000,
            'Coal': 2667.72 / 1000, 'Charcoal': 3304.00 / 1000,
        },
        refrigerants: {
            'R-134a': 1530, 'R-410A': 2088, 'R-22': 1810, 'R-404A': 3922, 'R-32': 675, 'CO₂': 1, 'Other': 2000,
        },
        ghg: {
            'CO2': 1, 'CH4': 30, 'N2O': 273, 'HFCs': 1530, 'PFCs': 7380, 'SF6': 25200, 'NF3': 17400,
        },
        purchasedEnergy: 0.708, // metric tonnes CO₂e per MWh for electricity, heat, steam, cooling
        renewableEnergy: -0.708,
        transportModes: {
            'Road(Truck)': 0.2, 'Rail': 0.05, 'Air Freight': 0.5, 'Sea Freight': 0.02, 'Inland Waterways': 0.03,
        },
        employeeCommute: {
            'Car': 0.2, 'Carpooling': 0.1, 'Public Transport': 0.05, 'Cycling': 0.0, 'Walking': 0.0, 'Electric Vehicles': 0.0,
        },
        businessTravel: {
            flights: 0.00015, trains: 0.00004, cars: 0.00017, cruiseShips: 0.0004,
        },
    };

    const normalizeMetric = (value: number, metric: string): number => {
        switch (metric.toLowerCase()) {
            case 'kwh': return value / 1000;
            case 'mwh': return value;
            case 'kg': return value / 1000;
            case 'quintals': return value / 10;
            case 'metric tonnes': return value;
            case 'litres': return value;
            case 'm3':
            case 'cubic meters': return value * 1000;
            default: return value;
        }
    };

    // Scope 1: Direct Emissions
    const fuelEmissions = (carbonData.selectedFuelTypes || []).reduce((total, fuel) => {
        const details = carbonData.fuelDetails[fuel];
        if (!details || !details.quantity) return total;
        const ef = EF.fuelType[fuel as keyof typeof EF.fuelType] || 0;
        return total + (parseFloat(details.quantity) * ef);
    }, 0);

    const refrigerantEmissions = (carbonData.selectedRefrigerants || []).reduce((total, ref) => {
        const details = carbonData.refrigerantDetails?.[ref];
        if (!details || !details.quantity) return total;
        const gwp = EF.refrigerants[ref as keyof typeof EF.refrigerants] || EF.refrigerants['Other'];
        const normQty = normalizeMetric(parseFloat(details.quantity), details.metric);
        return total + (normQty * gwp);
    }, 0);

    const ghgEmissions = (carbonData.GHGtype || []).reduce((total, ghg) => {
        const details = carbonData.GHGdetails?.[ghg];
        if (!details || !details.quantity) return total;
        const gwp = EF.ghg[ghg as keyof typeof EF.ghg] || 1;
        const normQty = normalizeMetric(parseFloat(details.quantity), details.metric);
        return total + (normQty * gwp);
    }, 0);

    const scope1 = fuelEmissions + refrigerantEmissions + ghgEmissions;

    // Scope 2: Indirect Emissions from Purchased Energy
    const electricityEmissions = normalizeMetric(carbonData.enterpriseElectricityCOnsumption, carbonData.fuElMetric) * EF.purchasedEnergy;
    const heatEmissions = normalizeMetric(carbonData.acquiredHeat, carbonData.EnergyMetric) * EF.purchasedEnergy;
    const steamEmissions = normalizeMetric(carbonData.acquiredSteam, carbonData.steamMetric) * EF.purchasedEnergy;
    const coolingEmissions = normalizeMetric(carbonData.acquiredCooling, carbonData.coolingMetric) * EF.purchasedEnergy;
    
    const onsiteRenewableEmissions = carbonData.generatesRewnewable
        ? normalizeMetric(carbonData.capacityForRenewable, carbonData.metricForRenewable) * EF.renewableEnergy
        : 0;

    const scope2 = electricityEmissions + heatEmissions + steamEmissions + coolingEmissions + onsiteRenewableEmissions;

    // Scope 3: Other Indirect Emissions
    const transportEmissions = (carbonData.keyTransportation || []).reduce((total, mode) => {
        const ef = EF.transportModes[mode as keyof typeof EF.transportModes] || 0;
        return total + (carbonData.estimatedEmissionsTransportation * ef);
    }, 0);

    const employeeCommuteEmissions = (carbonData.primaryComumute || []).reduce((total, type) => {
        const details = carbonData.commuteDetails?.[type];
        if (!details || !details.employees || !details.distance) return total;
        const ef = EF.employeeCommute[type as keyof typeof EF.employeeCommute] || 0;
        const annualDistance = parseFloat(details.distance) * 2 * 230;
        return total + (parseFloat(details.employees) * annualDistance * ef);
    }, 0);

    const businessTravelEmissions =
        (carbonData.businessTravel.flights * EF.businessTravel.flights) +
        (carbonData.businessTravel.trains * EF.businessTravel.trains) +
        (carbonData.businessTravel.cars * EF.businessTravel.cars) +
        (carbonData.businessTravel.cruiseShips * EF.businessTravel.cruiseShips);

    const wasteEmissions = normalizeMetric(carbonData.recycledWaste, 'Metric Tonnes') * 0.05;

    const scope3 = transportEmissions + employeeCommuteEmissions + businessTravelEmissions + wasteEmissions;

    const totalFootprint = scope1 + scope2 + scope3;

    return {
        scope1,
        scope2,
        scope3,
        total: totalFootprint,
    };
};