// filepath: c:\Users\swaga\enviraan\utils\carbonFootprintCalculator.ts

import { CarbonData } from './CarbonFootprintContext';

export const calculateCarbonFootprint = (carbonData: CarbonData) => {
    const EF = {
        electricity: 0.708,
        fuel: 2.07,
        coal: 2.5,
        charcoal: 2.8,
        airTravel: 0.121,
        railTravel: 0.0078,
        metroTravel: 0.0139,
        busTravel: 0.054,
        electricBusTravel: 0.03782,
        cabTravel: 0.1431,
        electricCabTravel: 0.1035,
        petrol: 2.34,
        diesel: 2.71,
        veganMeal: 2019,
        vegetarianMeal: 2176,
        nonVegetarianMostMeals: 3781,
        nonVegetarianSomeMeals: 3017,
        nonVegetarianRareMeals: 2412,
    };

    const electricityFootprint = carbonData.electricityConsumption * EF.electricity;
    const fuelFootprint = carbonData.fuelAmount * EF.fuel;
    const coalFootprint = carbonData.coal * EF.coal;
    const charcoalFootprint = carbonData.charcoal * EF.charcoal;
    const airTravelFootprint = carbonData.airTravel * EF.airTravel;
    const railTravelFootprint = carbonData.railTravel * EF.railTravel;
    const metroTravelFootprint = carbonData.metroTravel * EF.metroTravel;
    const busTravelFootprint = carbonData.busTravel * EF.busTravel;
    const electricBusTravelFootprint = carbonData.electricBusTravel * EF.electricBusTravel;
    const cabTravelFootprint = carbonData.cabTravel * EF.cabTravel;
    const electricCabTravelFootprint = carbonData.electricCabTravel * EF.electricCabTravel;
    const petrolFootprint = carbonData.petrol * EF.petrol;
    const dieselFootprint = carbonData.Diesel * EF.diesel;

    let mealFootprint = 0;
    switch (carbonData.mealPreference) {
        case 'vegan':
            mealFootprint = EF.veganMeal * carbonData.numOfMembers;
            break;
        case 'vegetarian':
            mealFootprint = EF.vegetarianMeal  * carbonData.numOfMembers;
            break;
        case 'nonVegetarianMostMeals':
            mealFootprint = EF.nonVegetarianMostMeals * carbonData.numOfMembers;
            break;
        case 'nonVegetarianSomeMeals':
            mealFootprint = EF.nonVegetarianSomeMeals * carbonData.numOfMembers;
            break;
        case 'nonVegetarianRareMeals':
            mealFootprint = EF.nonVegetarianRareMeals * carbonData.numOfMembers;
            break;
        default:
            mealFootprint = 0;
    }

    return (
        electricityFootprint +
        fuelFootprint +
        coalFootprint +
        charcoalFootprint +
        airTravelFootprint +
        railTravelFootprint +
        metroTravelFootprint +
        busTravelFootprint +
        electricBusTravelFootprint +
        cabTravelFootprint +
        electricCabTravelFootprint +
        petrolFootprint +
        dieselFootprint +
        mealFootprint
    );
};