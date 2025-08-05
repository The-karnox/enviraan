import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';

const BusinessTravelScreen = () => {
    const router = useRouter();
    const { updateCarbonData } = useCarbonFootprint();

    const [flightsDist, setFlightsDist] = useState('');
    const [trainsDist, setTrainsDist] = useState('');
    const [carsDist, setCarsDist] = useState('');
    const [cruiseShipsDist, setCruiseShipsDist] = useState('');

    const handleNumericInput = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        // This regex allows numbers and at most one decimal point.
        if (/^\d*\.?\d*$/.test(text)) {
            setter(text);
        }
    };

    const handleContinue = () => {
        const businessTravelData = {
            flights: parseFloat(flightsDist) || 0,
            trains: parseFloat(trainsDist) || 0,
            cars: parseFloat(carsDist) || 0,
            cruiseShips: parseFloat(cruiseShipsDist) || 0,
        };
        updateCarbonData('businessTravel', businessTravelData);
        router.push('/others8');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                 <View style={styles.progressWrapper}>
                                                <View style={styles.progressBarContainer}>
                                                    <Progress value={70} size="md" style={styles.progressBar}>
                                                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                                                    </Progress>
                                                </View>
                                                 <UiText style={styles.progressText}>13 of 18</UiText>
                                                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    <UiText size="xl" bold style={styles.questionText}>
                        What is the total distance (in km) covered by your company’s business travel in the past year?
                    </UiText>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="by Flights (km)"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={flightsDist}
                            onChangeText={(text) => handleNumericInput(text, setFlightsDist)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="by Trains (km)"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={trainsDist}
                            onChangeText={(text) => handleNumericInput(text, setTrainsDist)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="by Cars (km)"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={carsDist}
                            onChangeText={(text) => handleNumericInput(text, setCarsDist)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="by Cruise Ships (km)"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={cruiseShipsDist}
                            onChangeText={(text) => handleNumericInput(text, setCruiseShipsDist)}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/others8')}
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
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
      progressBarContainer: {
        width: '40%',
        backgroundColor: 'transparent',
        marginTop: 20,
        alignSelf: 'center',
        paddingBottom: 10,
    },
    progressBar: {
        width: '100%',
        backgroundColor: '#e0e0e0',
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
        maxWidth: '90%',
    },
    inputContainer: {
        width: '90%',
        maxWidth: 500,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: 'white',
        marginVertical: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        maxWidth: 450,
        marginTop: 20,
        gap: 24,
    },
    skipButton: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#86B049',
    },
    skipButtonText: {
        color: '#86B049',
    },
    continueButton: {
        flex: 1,
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

export default BusinessTravelScreen;