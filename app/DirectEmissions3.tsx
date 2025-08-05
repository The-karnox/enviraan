import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import {
    Checkbox,
    CheckboxIndicator,
    CheckboxLabel,
} from "@/components/ui/checkbox";
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
} from "@/components/ui/select";
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { ChevronDownIcon } from "@/components/ui/icon";
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';
import LottieView from 'lottie-react-native';
import WindmillsAnimation from '../assets/animations/Windmills Green.json';

const REFRIGERANT_TYPES = [
    "R-134a",
    "R-404A",
    "R-410A",
    "R-125",
    "R-32",
    "R-22",
    "CO₂",
    "Others"
];

const DirectEmissions2Screen = () => {
    const router = useRouter();
    const { updateCarbonData, carbonData } = useCarbonFootprint();
    const { width, height } = useWindowDimensions();


   const [usedRefrigerants, setUsedRefrigerants] = useState<string>(' ');
    // State for selected refrigerants
    const [selectedRefrigerants, setSelectedRefrigerants] = useState<string[]>(carbonData.selectedRefrigerants || []);
    // State for refrigerant details (quantity/metric for each selected refrigerant)
    const [refrigerantDetails, setRefrigerantDetails] = useState<{ [refrigerant: string]: { quantity: string; metric: string } }>(
        carbonData.refrigerantDetails || {}
    );

    // Metric options
    const METRIC_OPTIONS = [
        { label: 'kg', value: 'kg' },
        { label: 'g', value: 'g' },
        { label: 'lbs', value: 'lbs' },
    ];

    // Handle checkbox toggle
    const handleToggleRefrigerant = (refrigerant: string) => {
        setSelectedRefrigerants(prev =>
            prev.includes(refrigerant)
                ? prev.filter(r => r !== refrigerant)
                : [...prev, refrigerant]
        );
        setRefrigerantDetails(prev => {
            if (selectedRefrigerants.includes(refrigerant)) {
                // Remove details if unchecked
                const updated = { ...prev };
                delete updated[refrigerant];
                return updated;
            } else {
                // Add empty details if checked
                return {
                    ...prev,
                    [refrigerant]: { quantity: '', metric: '' }
                };
            }
        });
    };

    // Handle quantity change
    const handleQuantityChange = (refrigerant: string, value: string) => {
        setRefrigerantDetails(prev => ({
            ...prev,
            [refrigerant]: { ...prev[refrigerant], quantity: value }
        }));
    };

    // Handle metric change
    const handleMetricChange = (refrigerant: string, value: string) => {
        setRefrigerantDetails(prev => ({
            ...prev,
            [refrigerant]: { ...prev[refrigerant], metric: value }
        }));
    };

    const handleContinue = () => {
        if (usedRefrigerants === 'Yes') {
            for (const refrigerant of selectedRefrigerants) {
                const details = refrigerantDetails[refrigerant];
                if (!details || !details.quantity) {
                    alert(`Please enter quantity for "${refrigerant}".`);
                    return;
                }
                if (!details.metric) {
                    alert(`Please select a metric for "${refrigerant}".`);
                    return;
                }
            }
        }
        updateCarbonData('usedRefrigerants', usedRefrigerants ?? false);
        updateCarbonData('selectedRefrigerants', usedRefrigerants ? selectedRefrigerants : []);
        updateCarbonData('refrigerantDetails', usedRefrigerants ? refrigerantDetails : {});
        router.push('/DirectEmissions4');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                {/* Background Lottie Animation */}
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        { justifyContent: 'center', alignItems: 'center' }
                    ]}
                    pointerEvents="none"
                >
                    <LottieView
                        source={WindmillsAnimation}
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
                                    <Progress value={10} size="md" style={styles.progressBar}>
                                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                                    </Progress>
                                </View>
                                 <UiText style={styles.progressText}>2 of 18</UiText>
                                </View>
                
                <ScrollView>
                    <UiText size="xl" bold style={styles.questionText}>
                        Have you used any refrigerants for air conditioning, refrigeration, or fire suppression systems?
                    </UiText>
<RadioGroup
  value={usedRefrigerants}
  onChange={setUsedRefrigerants}
  style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}
>
  {['Yes', 'No'].map((option) => (
    <TouchableOpacity
      key={option}
      style={[
        styles.radioBox,
        usedRefrigerants === option && styles.radioBoxSelected,
      ]}
      onPress={() => setUsedRefrigerants(option)}
    >
      <Radio value={option}>
        <RadioIndicator>
          <RadioIcon
            as={CircleIcon}
            style={[
              styles.radioIcon,
              usedRefrigerants === option && styles.radioIconSelected,
            ]}
          />
        </RadioIndicator>
      </Radio>
      <UiText size="md" style={styles.radioLabel}>
        {option}
      </UiText>
    </TouchableOpacity>
  ))}
</RadioGroup>
                    {usedRefrigerants === 'Yes' && (
                        <>
                            <UiText size="lg" bold style={styles.questionText}>
                                Select the refrigerants used:
                            </UiText>
                            <View style={{ width: '100%', marginBottom: 24 }}>
                                {REFRIGERANT_TYPES.map(refrigerant => (
                                    <Checkbox
                                        key={refrigerant}
                                        value={refrigerant}
                                        isChecked={selectedRefrigerants.includes(refrigerant)}
                                        onChange={() => handleToggleRefrigerant(refrigerant)}
                                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                                    >
                                        <CheckboxIndicator
                                            style={{
                                                borderColor: '#4CAF50',
                                                backgroundColor: selectedRefrigerants.includes(refrigerant) ? '#eaffea' : '#fff',
                                                borderWidth: 2,
                                                width: 22,
                                                height: 22,
                                                borderRadius: 4,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {selectedRefrigerants.includes(refrigerant) && (
                                                <UiText style={{ color: '#4CAF50', fontSize: 18, fontWeight: 'bold' }}>✓</UiText>
                                            )}
                                        </CheckboxIndicator>
                                        <CheckboxLabel style={{ marginLeft: 12 }}>
                                            <UiText size="md">{refrigerant}</UiText>
                                        </CheckboxLabel>
                                    </Checkbox>
                                ))}
                            </View>
                            {/* For each selected refrigerant, show quantity and metric */}
                            {selectedRefrigerants.map(refrigerant => (
                                <View key={refrigerant} style={{ marginBottom: 20 }}>
                                    <UiText size="md" bold style={{ marginBottom: 6 }}>{refrigerant} details</UiText>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                        <TextInput
                                            style={[styles.input, { flex: 1, minWidth: 120 }]}
                                            placeholder="Quantity"
                                            placeholderTextColor="#999"
                                            keyboardType="numeric"
                                            value={refrigerantDetails[refrigerant]?.quantity || ''}
                                            onChangeText={value => {
                                        // Only allow numeric input
                                        const numericValue = value.replace(/[^0-9.]/g, '');
                                        handleQuantityChange(refrigerant, numericValue);
                                    }}
                                            onSubmitEditing={handleContinue}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Select
                                                selectedValue={refrigerantDetails[refrigerant]?.metric || ''}
                                                onValueChange={value => handleMetricChange(refrigerant, value)}
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
                        </>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/DirectEmissions4')}
                        >
                            <UiText size="lg" style={styles.skipButtonText}>
                                Skip
                            </UiText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.continueButton,
                                (usedRefrigerants === 'Yes' && selectedRefrigerants.length === 0) && { backgroundColor: '#d3e9a7', opacity: 0.6 }
                            ]}
                            onPress={handleContinue}
                            disabled={usedRefrigerants === 'Yes' && selectedRefrigerants.length === 0}
                        >
                            <UiText size="lg" bold style={styles.continueButtonText}>
                                Continue
                            </UiText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
         paddingLeft: 20,
        paddingRight: 20,
    },
     progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 24,
        gap: 8,
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
    progressText: {
        fontSize: 12,
        color: '#000',
        opacity: 0.5,
    },
    questionText: {
        color: '#15181e',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    radioBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 24,
        paddingVertical: 10,
        marginHorizontal: 8,
        backgroundColor: '#f6ffec',
    },
    radioLabel: {
        marginLeft: 10,
        color: '#15181e',
    },
    radioIcon: {
        color: '#d4e8c2', // Default color for the icon
    },
    radioBoxSelected: {
        borderColor: '#4CAF50',
        backgroundColor: '#eaffea',
    },
    radioIconSelected: {
        color: '#a4e22b', // Green color for the selected icon
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
        marginTop: 20,
        gap: 24,
    },
    skipButton: {
        width: 150,
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
        width: 150,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a4e22b',
    },
    continueButtonText: {
        color: '#000',
    },
});

export default DirectEmissions2Screen;