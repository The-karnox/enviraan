import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';
import LottieView from 'lottie-react-native';
import WindyAnimation from '../assets/animations/Weather-windy.json';

const numOfEmplyee = () => {
    const router = useRouter();
    const { updateCarbonData } = useCarbonFootprint();
    const [selectedOption, setSelectedOption] = useState<string>('');

    const options = [
        { label: '1 - 100', value: 50 },
        { label: '101 - 500', value: 300 },
        { label: '501 - 1000', value: 800 },
        { label: '1001 - 5000', value: 3000 },
        { label: '5001 - 10000', value: 8000 },
        { label: '10000+', value: 10000 },
       
    ];

    const handleContinue = () => {
        if (!selectedOption) {
            Alert.alert('Selection Required', 'Please select the number of employees before continuing.');
            return;
        }
        updateCarbonData('numOfEmployees', Number(selectedOption));
        // Navigate to the next screen
        router.push('/revenue');
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
                        source={WindyAnimation}
                        autoPlay
                        loop
                        style={{
                            width: 400,
                            height: 200,
                            maxWidth: '100%',
                            maxHeight: '100%',
                            opacity: 0.2
                        }}
                        resizeMode="contain"
                    />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Question */}
                    <UiText size="xl" bold style={styles.questionText}>
                       How many employees does your organization have?
                    </UiText>
                    {/* Radio Options */}
                    <RadioGroup
                        value={selectedOption}
                        onChange={(value:string) => setSelectedOption(value)}
                        style={styles.radioGroup}
                    >
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.radioBox,
                                    selectedOption === String(option.value) && styles.radioBoxSelected,
                                ]}
                                onPress={() => setSelectedOption(String(option.value))}
                            >
                                <Radio value={String(option.value)}>
                                    <RadioIndicator>
                                        <RadioIcon
                                            as={CircleIcon}
                                            style={[
                                                styles.radioIcon,
                                                selectedOption === String(option.value) && styles.radioIconSelected,
                                            ]}
                                        />
                                    </RadioIndicator>
                                </Radio>
                                <UiText size="md" style={styles.radioLabel}>
                                    {option.label}
                                </UiText>
                            </TouchableOpacity>
                        ))}
                    </RadioGroup>
                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        {/* Removed Skip button */}
                        <TouchableOpacity
                            style={[styles.continueButton, { width: 250 }]}
                            onPress={handleContinue}
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
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
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
    questionText: {
        color: '#15181e',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    radioGroup: {
        marginTop: 20,
        alignItems: 'center',
    },
    radioBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 10,
        width: '150%',
    },
    radioBoxSelected: {
        borderColor: '#86B049',
    },
    radioLabel: {
        marginLeft: 10,
        color: '#15181e',
    },
    radioIcon: {
        color: '#d4e8c2',
    },
    radioIconSelected: {
        color: '#a4e22b',
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

export default numOfEmplyee;