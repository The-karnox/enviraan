import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';

const keyTransport = () => {
    const router = useRouter();
    const { updateCarbonData } = useCarbonFootprint();
    const [selectedOption, setSelectedOption] = useState('');

    const options = [
        { label: 'Road(Truck) ', value: 'Road(Truck) ' },
        { label: 'Rail ', value: 'Rail ' },
        { label: 'Air Freight ', value: 'Air freight ' },
        { label: 'Sea Freight ', value: 'sea Freight ' },
        { label: 'Inland Waterways ', value: 'Inland Waterways ' },
    ];

    const handleContinue = () => {
        // Save transportation mode to the context
        updateCarbonData('keyTransportation', selectedOption);

        // Navigate to the next screen
        router.push('/others4');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.progressBarContainer}>
                        <Progress value={24} size="xs" style={styles.progressBar}>
                            <ProgressFilledTrack className="bg-[#a4e22b]" />
                        </Progress>
                    </View>

                    {/* Question */}
                    <UiText size="xl" bold style={styles.questionText}>
                        What are the key transportation modes used in your supply chain?
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
                                        <RadioIcon
                                            as={CircleIcon}
                                            style={[
                                                styles.radioIcon,
                                                selectedOption === option.value && styles.radioIconSelected,
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
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/others4')} // Navigate without saving
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

export default keyTransport;