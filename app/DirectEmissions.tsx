import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    ScrollView,
    useWindowDimensions,
} from 'react-native';

import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox"
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectItem,
  } from "@/components/ui/select"
import { ChevronDownIcon } from "@/components/ui/icon"
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';
import LottieView from 'lottie-react-native';
import WindmillAnimation from '../assets/animations/Windmills Green.json';
const { width } = Dimensions.get('window');
const FUEL_TYPES = [
  "Motor Gasoline/Petrol",
  "On-Road Diesel Fuel",
  "Residual Fuel Oil",
  "Liquefied Petroleum Gases (LPG)",
  "Compressed Natural Gas (CNG)",
  "Aviation Gasoline",
  "Motor Gasoline",
  "Diesel Fuel",
  "Residual Fuel Oil²",
  "Liquefied Natural Gas (LNG)",
  "E85 Ethanol/Gasoline",
  "Natural gas (100% mineral blend)",
  "B20 Biodiesel/Diesel",
];
const METRIC_OPTIONS = [
    { label: 'Litres', value: 'litres' },
    { label: 'm³', value: 'm3' },
    { label: 'kg', value: 'kg' },
    { label: 'Gallons', value: 'gallons' },
];

const DirectEmissionsScreen = () => {
    const router = useRouter();
    const { carbonData, updateCarbonData } = useCarbonFootprint();
    const [selectedFuels, setSelectedFuels] = useState<string[]>(carbonData.selectedFuelTypes || []);
    // Fuel details: { [fuel]: { quantity, metric } }
    const [fuelDetails, setFuelDetails] = useState<{ [fuel: string]: { quantity: string; metric: string } }>(
        () =>
            carbonData.fuelDetails ||
            Object.fromEntries((carbonData.selectedFuelTypes || []).map(fuel => [fuel, { quantity: '', metric: '' }]))
    );

    // Keep fuelDetails in sync with selectedFuels
    useEffect(() => {
        setFuelDetails(prev => {
            const updated = { ...prev };
            // Add new fuels
            selectedFuels.forEach(fuel => {
                if (!updated[fuel]) updated[fuel] = { quantity: '', metric: '' };
            });
            // Remove unselected fuels
            Object.keys(updated).forEach(fuel => {
                if (!selectedFuels.includes(fuel)) delete updated[fuel];
            });
            return updated;
        });
    }, [selectedFuels]);

    const handleToggleFuel = (fuel: string) => {
        setSelectedFuels(prev =>
            prev.includes(fuel)
                ? prev.filter(f => f !== fuel)
                : [...prev, fuel]
        );
    };

    const handleQuantityChange = (fuel: string, value: string) => {
        setFuelDetails(prev => ({
            ...prev,
            [fuel]: { ...prev[fuel], quantity: value }
        }));
    };

    const handleMetricChange = (fuel: string, value: string) => {
        setFuelDetails(prev => ({
            ...prev,
            [fuel]: { ...prev[fuel], metric: value }
        }));
    };

    const handleContinue = () => {
        if (selectedFuels.length === 0) {
            alert('Please select at least one fuel type.');
            return;
        }
        // Validate all selected fuels have quantity and metric
        for (const fuel of selectedFuels) {
            const details = fuelDetails[fuel];
            if (!details || !details.quantity) {
                alert(`Please enter quantity for "${fuel}".`);
                return;
            }
            if (!details.metric) {
                alert(`Please select a metric for "${fuel}".`);
                return;
            }
        }
        updateCarbonData('selectedFuelTypes', selectedFuels);
        updateCarbonData('fuelDetails', fuelDetails);
        router.push('/DirectEmissions3');
    };

    const { width, height } = useWindowDimensions();

    return (
        
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1ffdc' }}>
            <LinearGradient colors={['#ffffff', '#f1ffdc']} style={{ flex: 1 }}>
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        { justifyContent: 'center', alignItems: 'center' }
                    ]}
                    pointerEvents="none"
                >
                    <LottieView
                        source={WindmillAnimation}
                        autoPlay
                        loop
                        style={{
                            width: Math.min(width * 0.8, 400),
                            height: Math.min(height * 0.3, 200),
                            maxWidth: '100%',
                            maxHeight: '100%',
                            opacity: 0.2
                        }}
                        resizeMode="contain"
                    />
                </View>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                 <View style={styles.progressWrapper}>
                <View style={styles.progressBarContainer}>
                    <Progress value={5} size="md" style={styles.progressBar}>
                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                    </Progress>
                </View>
                 <UiText style={styles.progressText}>1 of 18</UiText>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    
                    <UiText size="xl" bold style={styles.questionText}>
                        What type of fuels does your company use for energy generation?
                    </UiText>
                    <View style={{ width: '100%', marginBottom: 24 }}>
                        {FUEL_TYPES.map(fuel => (
                            <Checkbox
                                key={fuel}
                                value={fuel}
                                isChecked={selectedFuels.includes(fuel)}
                                onChange={() => handleToggleFuel(fuel)}
                                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                            >
                                <CheckboxIndicator
                                    style={{
                                        borderColor: '#4CAF50',
                                        backgroundColor: selectedFuels.includes(fuel) ? '#a4e22b' : '#fff',
                                        borderWidth: 2,
                                        width: 22,
                                        height: 22,
                                        borderRadius: 4,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {selectedFuels.includes(fuel) && (
                                        <UiText style={{ color: '#4CAF50', fontSize: 18, fontWeight: 'bold' }}>✓</UiText>
                                    )}
                                </CheckboxIndicator>
                                <CheckboxLabel style={{ marginLeft: 12 }}>
                                    <UiText size="md">{fuel}</UiText>
                                </CheckboxLabel>
                            </Checkbox>
                        ))}
                    </View>
                    {/* Show quantity/metric fields for each selected fuel */}
                    {selectedFuels.map(fuel => (
                        <View key={fuel} style={{ width: '100%', marginBottom: 20 }}>
                            <UiText size="md" bold style={{ marginBottom: 6 }}>{fuel}</UiText>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <TextInput
                                    style={[styles.input, { flex: 1, minWidth: 120 }]}
                                    placeholder="Quantity"
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    value={fuelDetails[fuel]?.quantity || ''}
                                    onChangeText={value => {
                                        // Only allow numeric input
                                        const numericValue = value.replace(/[^0-9.]/g, '');
                                        handleQuantityChange(fuel, numericValue);
                                    }}
                                    onSubmitEditing={handleContinue}
                                />
                                <View style={{ flex: 1 }}>
                                    <Select
                                        selectedValue={fuelDetails[fuel]?.metric || ''}
                                        onValueChange={value => handleMetricChange(fuel, value)}
                                    >
                                        <SelectTrigger variant="rounded" size="md" style={styles.selectBox}>
                                            <SelectInput placeholder="Metric" />
                                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectBackdrop />
                                            <SelectContent>
                                                <SelectDragIndicatorWrapper>
                                                    <SelectDragIndicator />
                                                </SelectDragIndicatorWrapper>
                                                {METRIC_OPTIONS.map(opt => (
                                                    <SelectItem key={opt.value} label={opt.label} value={opt.value} />
                                                ))}
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                </View>
                            </View>
                        </View>
                    ))}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/DirectEmissions3')}
                        >
                            <UiText size="lg" style={styles.skipButtonText}>
                                Skip
                            </UiText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.continueButton,
                                selectedFuels.length === 0 && { backgroundColor: '#d3e9a7', opacity: 0.6 }
                            ]}
                            onPress={handleContinue}
                            disabled={selectedFuels.length === 0}
                        >
                            <UiText size="lg" bold style={styles.continueButtonText}>
                                Continue
                            </UiText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    backgroundAnimation: 
    {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1, // Pushes it behind all other content
        opacity: 0.15, // Makes it faint so content is readable
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    progressBarContainer: {
        width: '40%',
        height: 4,
        backgroundColor: 'transparent',
        marginTop: 20,
        alignSelf: 'center',
        paddingBottom: 24,
    },
    progressBar: {
        width: '40%',
        height: 4,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
    },
    progressFilledTrack: {
        backgroundColor: '#a4e22b',
        height: '100%',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        color: '#000',
        opacity: 0.5,
    },
     progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 24,
        gap: 8,
    },
   
    contentContainer: {
        paddingHorizontal: 20,
        marginTop: 30,
        alignItems: 'center',
    },
    questionText: {
        maxWidth: '100%',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#15181e',
        textAlign: 'center',
        marginBottom: 20,
    },
    selectBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '40%',
        marginTop: 10,
        gap: 24,
    },
    skipButton: {
        width: 200,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#86B049',
        backgroundColor: 'transparent',
    },
    skipButtonText: {
        color: '#86B049',
    },
    continueButton: {
        width: 200,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a4e22b',
    },
    continueButtonText: {
        color: '#000',
    },
    input: {
        width: '40%',
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
        marginVertical: 20,
    },
});

export default DirectEmissionsScreen;