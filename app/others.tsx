import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Alert,
    useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';
import LottieView from 'lottie-react-native';
import shiping from '../assets/animations/cold chain logistics.json';

const KeyTransportScreen = () => {
    const router = useRouter();
    const { carbonData, updateCarbonData } = useCarbonFootprint();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(carbonData.keyTransportation || []);
    const { width, height } = useWindowDimensions();
    const options = [
        { label: 'Road (Truck)', value: 'Road (Truck)' },
        { label: 'Rail', value: 'Rail' },
        { label: 'Air Freight', value: 'Air Freight' },
        { label: 'Sea Freight', value: 'Sea Freight' },
        { label: 'Inland Waterways', value: 'Inland Waterways' },
    ];

    const handleToggleOption = (value: string) => {
        setSelectedOptions(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    const handleContinue = () => {
        if (selectedOptions.length === 0) {
            Alert.alert('Selection Required', 'Please select at least one transportation mode.');
            return;
        }
        updateCarbonData('keyTransportation', selectedOptions);
        router.push('/others4');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                 <View style={styles.progressWrapper}>
                                <View style={styles.progressBarContainer}>
                                    <Progress value={33} size="md" style={styles.progressBar}>
                                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                                    </Progress>
                                </View>
                                 <UiText style={styles.progressText}>10 of 18</UiText>
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
                <ScrollView contentContainerStyle={styles.scrollContent}>
                   
                    <UiText size="xl" bold style={styles.questionText}>
                        What are the key transportation modes used in your supply chain?
                    </UiText>

                    <View style={styles.checkboxContainer}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.checkboxWrapper,
                                    selectedOptions.includes(option.value) && styles.checkboxWrapperSelected,
                                ]}
                                onPress={() => handleToggleOption(option.value)}
                            >
                                <Checkbox
                                    value={option.value}
                                    isChecked={selectedOptions.includes(option.value)}
                                    aria-label={option.label}
                                >
                                    <CheckboxIndicator
                                        style={{
                                            borderColor: '#4CAF50',
                                            backgroundColor: selectedOptions.includes(option.value) ? '#a4e22b' : '#fff',
                                            borderWidth: 2,
                                            width: 22,
                                            height: 22,
                                            borderRadius: 4,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {selectedOptions.includes(option.value) && (
                                            <UiText style={{ color: '#4CAF50', fontSize: 18, fontWeight: 'bold' }}>✓</UiText>
                                        )}
                                    </CheckboxIndicator>
                                </Checkbox>
                                <UiText size="md" style={styles.checkboxLabel}>
                                    {option.label}
                                </UiText>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/others4')}
                        >
                            <UiText size="lg" style={styles.skipButtonText}>
                                Skip
                            </UiText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.continueButton,
                                selectedOptions.length === 0 && { backgroundColor: '#d3e9a7', opacity: 0.6 }
                            ]}
                            onPress={handleContinue}
                            disabled={selectedOptions.length === 0}
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
        paddingBottom: 20,
        alignItems: 'center',
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
        marginBottom: 20,
    },
    checkboxContainer: {
        width: '90%',
        maxWidth: 500,
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 10,
        width: '100%',
    },
    checkboxWrapperSelected: {
        borderColor: '#86B049',
        backgroundColor: '#eff8e7',
    },
    checkboxIndicator: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#86B049',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    checkboxCheckmark: {
        color: '#86B049',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        marginLeft: 12,
        color: '#15181e',
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

export default KeyTransportScreen;