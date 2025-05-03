import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';

const keyTransport = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('');

    const options = [
        { label: 'Road(Truck) ', value: 'Road(Truck) ' },
        { label: 'Rail ', value: 'Rail ' },
        { label: 'Air Freight ', value: 'Air freight ' },
        { label: 'Sea Freight ', value: 'sea Freight ' },
        { label: 'Inland Waterways ', value: 'Inland Waterways ' },

    ];

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.progressBarContainer}>
                    <Progress value={24} size="xs"    style={styles.progressBar}>
                        <ProgressFilledTrack className="bg-[#a4e22b]"/>
                    </Progress>
                </View>


                {/* Question */}
                <UiText size="xl" bold style={styles.questionText}>
                    What are the key transportation mode used in your supply chain?
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
                                    <RadioIcon as={CircleIcon}
                                     style={[
                                        styles.radioIcon,
                                        selectedOption === option.value && styles.radioIconSelected,
                                    ]}/>
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
                        onPress={() =>
                            router.push({ pathname: '/others4', params: { keyTransport : selectedOption } })
                        } // Navigate with selected option
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
        width: '30%',
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