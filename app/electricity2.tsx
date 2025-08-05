import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';


const { width } = Dimensions.get('window');

const ElectricityConsumptionScreen2 = () => {
    const router = useRouter(); // Initialize the router
    const [renewablePercentage, setRenewablePercentage] = useState('');
    const { updateCarbonData } = useCarbonFootprint(); 

    const handleNumericInput = (text: string) => {
        // This regex allows numbers and at most one decimal point.
        if (/^\d*\.?\d*$/.test(text)) {
            const numericValue = parseFloat(text);
            // Allow empty string for clearing, or numbers between 0 and 100
            if (text === '' || (numericValue >= 0 && numericValue <= 100)) {
                setRenewablePercentage(text);
            }
        }
    };

    const handleContinue = () => {
        if (
            !renewablePercentage ||
            isNaN(parseFloat(renewablePercentage)) ||
            parseFloat(renewablePercentage) < 0 ||
            parseFloat(renewablePercentage) > 100
        ) {
            alert('Please enter a valid percentage between 0 and 100.');
            return;
        }
    
        // Save the renewable energy percentage to the context
        updateCarbonData('renewableElectricity', parseFloat(renewablePercentage));
    
        // Navigate to the next page
        router.push('/fuel');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <Progress value={100} size="xs"    style={styles.progressBar}>
                        <ProgressFilledTrack className="bg-[#a4e22b]"/>
                    </Progress>
                </View>

                <View style={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                    What percentage of your electricity consumption is from renewable sources like rooftop solar?
                    </UiText>

                    <TextInput
                        style={styles.input}
                        placeholder="in %"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={renewablePercentage}
                        onChangeText={handleNumericInput}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/fuel')}
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
        width: '40%', // Retain the same size as the original progress bar
        height: 4,
        backgroundColor: '#e0e0e0', // Background color for the progress bar
        borderRadius: 2,
    },
    progressFilledTrack: {
        backgroundColor: '#a4e22b', // Green color for the filled track
        height: '100%',
        borderRadius: 2,
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
});

export default ElectricityConsumptionScreen2;