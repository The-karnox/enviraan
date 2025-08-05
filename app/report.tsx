import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import WindyAnimation from '../assets/animations/Weather-windy.json';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';

const { width } = Dimensions.get('window');

const reportingPeriod = () => {
    const router = useRouter();
    const [reportingPrd, setReportingPrd] = useState(''); // State for organization name
    const { updateCarbonData } = useCarbonFootprint();

    const handleContinue = () => {
        if (!reportingPrd.trim()) {
            Alert.alert('Input Required', 'Please enter the organizational annual reporting period before continuing.');
            return;
        }
        // Save the organization name to the context
        updateCarbonData('reportingPeriod', reportingPrd);
        // Navigate to the next screen
        router.push('/eligibility');
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
                <View style={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                       Please enter the organizational annual reporting period?
                    </UiText>
                    <TextInput
                        style={styles.input}
                         placeholder="Number"
                         placeholderTextColor="#999"
                          value={reportingPrd}
                           keyboardType="numeric"
                         maxLength={4}
                               onChangeText={text => {
        // Only allow up to 4 digits
                               const numeric = text.replace(/[^0-9]/g, '').slice(0, 4);
                                    setReportingPrd(numeric);
                                  }}
                                  onSubmitEditing={handleContinue}
                    />
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
        width: '10%',
        height: 1,
        backgroundColor: 'transparent',
        marginTop: 40,
        alignSelf: 'center',
        paddingBottom: 4,
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
        maxWidth: '40%',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#15181e',
        textAlign: 'center',
        marginBottom: 20,
    },
     cloudContainer: {
        height: 300,
        position: 'absolute',
        bottom: 10, // Adjust as needed
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
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

export default reportingPeriod;