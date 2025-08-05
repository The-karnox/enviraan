import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    useWindowDimensions,
} from 'react-native';
  import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';
import LottieView from 'lottie-react-native';
import shiping from '../assets/animations/cold chain logistics.json';
const others8 = () => {
    const router = useRouter();
    const { updateCarbonData } = useCarbonFootprint(); // Use the context
    const [selectedOption, setSelectedOption] = useState('');
    const [recyclePercentage, setRecyclePercentage] = useState('');
    const options = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'no' },
    ];
     const handleNumericInput = (text: string) => {
        // This regex allows numbers and at most one decimal point.
        if (text === '' || /^\d*\.?\d*$/.test(text)) {
            setRecyclePercentage(text);
        }
    };
      const { width, height } = useWindowDimensions();
    const handleContinue = () => {
        const usesPlastics = selectedOption === 'Yes';
        if (usesPlastics) {
            if (!recyclePercentage.trim()) {
                alert( 'Please enter the percentage of recycled plastics.');
                return;
            }
            const percentage = parseFloat(recyclePercentage);
            if (isNaN(percentage) || percentage < 0 || percentage > 100) {
                alert( 'Please enter a percentage between 0 and 100.');
                return;
            }
        }

        updateCarbonData('usesRecycledPlastics', usesPlastics);
        updateCarbonData('recyclePercentage', usesPlastics ? parseFloat(recyclePercentage) || 0 : 0);

        router.push('/others9');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                 <View style={styles.progressWrapper}>
                                <View style={styles.progressBarContainer}>
                                    <Progress value={75} size="md" style={styles.progressBar}>
                                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                                    </Progress>
                                </View>
                                 <UiText style={styles.progressText}>14 of 18</UiText>
                                </View>
                <View
                                                                                    style={[
                                                                                        StyleSheet.absoluteFill,
                                                                                        { justifyContent: 'center', paddingTop:200  ,alignItems: 'center', opacity: 0.5}
                                                                                    ]}
                                                                                    pointerEvents="none"
                                                                                >
                                                                                    <LottieView
                                                                                        source={shiping}
                                                                                        autoPlay
                                                                                        loop
                                                                                        style={{
                                                                                            width: Math.min(width * 0.8, 400),
                                                                                            height: Math.min(height * 0.3, 200),
                                                                                            maxWidth: '100%',
                                                                                            maxHeight: '100%',
                                                                                           
                                                                                        }}
                                                                                        resizeMode="contain"
                                                                                    />
                                                                                </View>
                {/* Question */}
                
                <UiText size="xl" bold style={styles.questionText}>
                   Does your company have consumption of recycled plastics (thermoplastic, filler and fiber) used in your products?
                </UiText>

                {/* Radio Options */}
                <RadioGroup
                    value={selectedOption}
                    onChange={(value) => setSelectedOption(value)}
                    style={styles.radioGroup}
                >
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.radioBox,
                                selectedOption === option.value && styles.radioBoxSelected,
                            ]}
                            onPress={() => setSelectedOption(option.value)}
                        >
                            <Radio value={option.value}>
                                <RadioIndicator>
                                    <RadioIcon as={CircleIcon} style={[styles.radioIcon, selectedOption === option.value && styles.radioIconSelected]}/>
                                </RadioIndicator>
                            </Radio>
                            <UiText size="md" style={styles.radioLabel}>
                                {option.label}
                            </UiText>
                        </TouchableOpacity>
                    ))}
                </RadioGroup>

                 {selectedOption === 'Yes' && (
                    <View style={styles.additionalQuestionContainer}>
                        <UiText size="lg" style={styles.questionText}>
                            Please write the percentage of total recycled plastics content used into your production process?
                        </UiText>
                        <TextInput
                            style={styles.input}
                            placeholder="Percentage (%)"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={recyclePercentage}
                            onChangeText={handleNumericInput}
                        />
                    </View>
                )}

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => router.push('/others9')} // Navigate without saving
                    >
                        <UiText size="lg" style={styles.skipButtonText}>
                            Skip
                        </UiText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue} 
                    >
                        <UiText size="lg" bold style={styles.continueButtonText}>
                            Continue
                        </UiText>
                    </TouchableOpacity>
                </View>
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
    },
     scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
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
        width: '40%', // Retain the same size as the original progress bar
        height: 4,
        backgroundColor: '#e0e0e0', // Background color for the progress bar
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
    questionText: {
        color: '#15181e',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
     radioGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16, // Adds space between the 'Yes' and 'No' boxes
        marginBottom: 20,
    },
    radioBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    radioBoxSelected: {
        borderColor: '#86B049', // Highlight selected option
    },
    radioLabel: {
        marginLeft: 10,
        color: '#15181e',
    },
    radioIcon: {
        color: '#d4e8c2', // Default color for the icon
    },
    radioIconSelected: {
        color: '#a4e22b', // Green color for the selected icon
    },
    additionalQuestionContainer: {
        marginTop: 20,
        alignItems: 'center',
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
        width: '110%',
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

export default others8;