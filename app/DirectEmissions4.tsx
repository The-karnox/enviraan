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

const GHG_TYPES = [
    "Carbon dioxide (CO₂)",
    "Methane (CH₄)",
    "Water vapor (H₂O)",
    "Perfluorocarbons (PFCs)",
    "Sulfur hexafluoride (SF₆)",
    "Hydrofluorocarbons (HFCs)",
    "Nitrous oxide (N₂O)",
    "Others"
];

const DirectEmissions3Screen = () => {
    const router = useRouter();
    const { updateCarbonData, carbonData } = useCarbonFootprint();
    const { width, height } = useWindowDimensions();

   const [ghgEmisssion, setEmitedGHG] = useState<string>(' ');
    // State for selected refrigerants
    const [GHGtype, setGHGtype] = useState<string[]>(carbonData.GHGtype || []);
    // State for GHG details (quantity/metric for each selected GHG)
    const [GHGdetails, setGHGDetails] = useState<{ [GHG: string]: { quantity: string; metric: string } }>(
        carbonData.GHGdetails || {}
    );

    // Metric options
    const METRIC_OPTIONS = [
        { label: 'kg', value: 'kg' },
        { label: 'g', value: 'g' },
        { label: 'lbs', value: 'lbs' },
    ];

    // Handle checkbox toggle
    const handleToggleRefrigerant = (GHG: string) => {
        setGHGtype(prev =>
            prev.includes(GHG)
                ? prev.filter(r => r !== GHG)
                : [...prev, GHG]
        );
        setGHGDetails(prev => {
            if (GHGtype.includes(GHG)) {
                // Remove details if unchecked
                const updated = { ...prev };
                delete updated[GHG];
                return updated;
            } else {
                // Add empty details if checked
                return {
                    ...prev,
                    [GHG]: { quantity: '', metric: '' }
                };
            }
        });
    };

    // Handle quantity change
    const handleQuantityChange = (GHG: string, value: string) => {
        setGHGDetails(prev => ({
            ...prev,
            [GHG]: { ...prev[GHG], quantity: value }
        }));
    };

    // Handle metric change
    const handleMetricChange = (GHG: string, value: string) => {
        setGHGDetails(prev => ({
            ...prev,
            [GHG]: { ...prev[GHG], metric: value }
        }));
    };

      const handleContinue = () => {
        // Add validation logic
        if (ghgEmisssion === 'Yes') {
            for (const gas of GHGtype) {
                const details = GHGdetails[gas];
                if (!details || !details.quantity) {
                    alert(`Please enter quantity for "${gas}".`);
                    return;
                }
                if (!details.metric) {
                    alert( `Please select a metric for "${gas}".`);
                    return;
                }
            }
        }
        updateCarbonData('ghgEmisssion', ghgEmisssion === 'Yes');
        updateCarbonData('GHGtype', ghgEmisssion === 'Yes' ? GHGtype : []);
        updateCarbonData('GHGdetails', ghgEmisssion === 'Yes' ? GHGdetails : {});
        router.push('/IndirectEmissions');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
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
                 <View style={styles.progressWrapper}>
                                                <View style={styles.progressBarContainer}>
                                                    <Progress value={15} size="md" style={styles.progressBar}>
                                                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                                                    </Progress>
                                                </View>
                                                 <UiText style={styles.progressText}>3 of 18</UiText>
                                                </View>
                <ScrollView>
                    <UiText size="xl" bold style={styles.questionText}>
                       Are there emissions from industrial processes?
                    </UiText>
<RadioGroup
  value={ghgEmisssion}
  onChange={setEmitedGHG}
  style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}
>
  {['Yes', 'No'].map((option) => (
    <TouchableOpacity
      key={option}
      style={[
        styles.radioBox,
        ghgEmisssion === option && styles.radioBoxSelected,
      ]}
      onPress={() => setEmitedGHG(option)}
    >
      <Radio value={option}>
        <RadioIndicator>
          <RadioIcon
            as={CircleIcon}
            style={[
              styles.radioIcon,
              ghgEmisssion === option && styles.radioIconSelected,
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
                    {ghgEmisssion === 'Yes' && (
                        <>
                            <UiText size="lg" bold style={styles.questionText}>
                                what are the types of gasses and quantity emmitted?
                            </UiText>
                            <View style={{ width: '100%', marginBottom: 24 }}>
                                {GHG_TYPES.map(GHG => (
                                    <Checkbox
                                        key={GHG}
                                        value={GHG}
                                        isChecked={GHGtype.includes(GHG)}
                                        onChange={() => handleToggleRefrigerant(GHG)}
                                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                                    >
                                        <CheckboxIndicator
                                            style={{
                                                borderColor: '#4CAF50',
                                                backgroundColor: GHGtype.includes(GHG) ? '#eaffea' : '#fff',
                                                borderWidth: 2,
                                                width: 22,
                                                height: 22,
                                                borderRadius: 4,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {GHGtype.includes(GHG) && (
                                                <UiText style={{ color: '#4CAF50', fontSize: 18, fontWeight: 'bold' }}>✓</UiText>
                                            )}
                                        </CheckboxIndicator>
                                        <CheckboxLabel style={{ marginLeft: 12 }}>
                                            <UiText size="md">{GHG}</UiText>
                                        </CheckboxLabel>
                                    </Checkbox>
                                ))}
                            </View>
                            {/* For each selected GHG, show quantity and metric */}
                            {GHGtype.map(GHG => (
                                <View key={GHG} style={{ marginBottom: 20 }}>
                                    <UiText size="md" bold style={{ marginBottom: 6 }}>{GHG} details</UiText>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                        <TextInput
                                            style={[styles.input, { flex: 1, minWidth: 120 }]}
                                            placeholder="Quantity"
                                            placeholderTextColor="#999"
                                            keyboardType="numeric"
                                            value={GHGdetails[GHG]?.quantity || ''}
                                            onChangeText={value => {
                                        // Only allow numeric input
                                        const numericValue = value.replace(/[^0-9.]/g, '');
                                        handleQuantityChange(GHG , numericValue);
                                    }}
                                            onSubmitEditing={handleContinue}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Select
                                                selectedValue={GHGdetails[GHG]?.metric || ''}
                                                onValueChange={value => handleMetricChange(GHG, value)}
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
                                              onPress={() => router.push('/IndirectEmissions')}
                                          >
                                              <UiText size="lg" style={styles.skipButtonText}>
                                                  Skip
                                              </UiText>
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                              style={[
                                                  styles.continueButton,
                                                  (ghgEmisssion === 'Yes' && GHGtype.length === 0) && { backgroundColor: '#d3e9a7', opacity: 0.6 }
                                              ]}
                                              onPress={handleContinue}
                                              disabled={ghgEmisssion === 'Yes' && GHGtype.length === 0}
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
    progressBarContainer: {
        width: '40%',
        height: 4,
        backgroundColor: 'transparent',
        marginTop: 20,
        alignSelf: 'center',
        paddingBottom: 24,
       
    },
         progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 24,
        gap: 8,
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

export default DirectEmissions3Screen;