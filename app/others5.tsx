import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Alert,
    TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Checkbox, CheckboxIndicator } from '@/components/ui/checkbox';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';

const empTransport = () => {
    const router = useRouter();
    const { carbonData, updateCarbonData } = useCarbonFootprint();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(carbonData.primaryComumute || []);
    
    // State to hold details for each selected commute type
    const [commuteDetails, setCommuteDetails] = useState<{ [key: string]: { employees: string; distance: string } }>(
        carbonData.commuteDetails || {}
    );

    // Keep commuteDetails in sync with selectedOptions
    useEffect(() => {
        const newDetails = { ...commuteDetails };
        selectedOptions.forEach(option => {
            if (!newDetails[option]) {
                newDetails[option] = { employees: '', distance: '' };
            }
        });
        // Optional: remove details for unselected options
        Object.keys(newDetails).forEach(option => {
            if (!selectedOptions.includes(option)) {
                delete newDetails[option];
            }
        });
        setCommuteDetails(newDetails);
    }, [selectedOptions]);

    const options = [
        { label: 'Personal Car', value: 'Car' },
        { label: 'Carpooling', value: 'Carpooling' },
        { label: 'Public Transport', value: 'Public Transport' },
        { label: 'Cycling', value: 'Cycling' },
        { label: 'Walking', value: 'Walking' },
        { label: 'Electric Vehicles', value: 'Electric Vehicles' },
    ];

    const handleToggleOption = (value: string) => {
        setSelectedOptions(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    const handleDetailChange = (option: string, field: 'employees' | 'distance', value: string) => {
        // Allow only numeric input
        const numericValue = value.replace(/[^0-9]/g, '');
        setCommuteDetails(prev => ({
            ...prev,
            [option]: { ...prev[option], [field]: numericValue }
        }));
    };

    const handleContinue = () => {
        if (selectedOptions.length === 0) {
            alert('Please select at least one commute option.');
            return;
        }
        // Validate that all fields for selected options are filled
        for (const option of selectedOptions) {
            const details = commuteDetails[option];
            if (!details || !details.employees) {
                alert( `Please enter the number of employees for "${option}".`);
                return;
            }
            if (!details.distance) {
              alert( `Please enter the average distance for "${option}".`);
                return;
            }
        }
        updateCarbonData('primaryComumute', selectedOptions);
        updateCarbonData('commuteDetails', commuteDetails);
        router.push('/others6');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                 <View style={styles.progressWrapper}>
                                <View style={styles.progressBarContainer}>
                                    <Progress value={65} size="md" style={styles.progressBar}>
                                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                                    </Progress>
                                </View>
                                 <UiText style={styles.progressText}>12 of 18</UiText>
                                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                     

                    <UiText size="xl" bold style={styles.questionText}>
                        How do employees primarily commute to work?
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
                                            width: 22,
                                            height: 22,
                                            borderRadius: 4,
                                            borderWidth: 2,
                                            borderColor: '#86B049',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: selectedOptions.includes(option.value) ? '#a4e22b' : '#fff',
                                        }}
                                    >
                                        {selectedOptions.includes(option.value) && (
                                            <UiText style={{ color: '#4CAF50', fontSize: 16, fontWeight: 'bold' }}>✓</UiText>
                                        )}
                                    </CheckboxIndicator>
                                </Checkbox>
                                <UiText size="md" style={styles.checkboxLabel}>
                                    {option.label}
                                </UiText>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Dynamically render input fields for selected options */}
                    {selectedOptions.map(option => (
                        <View key={option} style={styles.detailsContainer}>
                            <UiText size="lg" bold style={styles.detailsHeader}>{option}</UiText>
                            <TextInput
                                style={styles.input}
                                placeholder="No. of employees"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                value={commuteDetails[option]?.employees || ''}
                                onChangeText={(value) => handleDetailChange(option, 'employees', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Average distance travelled (km)"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                value={commuteDetails[option]?.distance || ''}
                                onChangeText={(value) => handleDetailChange(option, 'distance', value)}
                            />
                        </View>
                    ))}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/others6')}
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
    background: { flex: 1 },
    container: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    progressBarContainer: {
        width: '40%',
        // Removed marginBottom to allow proper vertical alignment
    },
    progressBar: { width: '100%', height: 4, backgroundColor: '#e0e0e0', borderRadius: 2 },
       progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 24,
        gap: 8,
    },
    progressText: { fontSize: 12, color: '#000', opacity: 0.5 },
    questionText: { color: '#15181e', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
    checkboxContainer: { width: '90%', maxWidth: 500 },
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
    checkboxWrapperSelected: { borderColor: '#86B049', backgroundColor: '#eff8e7' },
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
    checkboxCheckmark: { color: '#86B049', fontSize: 16, fontWeight: 'bold' },
    checkboxLabel: { marginLeft: 12, color: '#15181e' },
    detailsContainer: {
        width: '90%',
        maxWidth: 500,
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#transparent',
        borderWidth: 1,
        borderColor: '#d4e8c2',
    },
    detailsHeader: {
        marginBottom: 10,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
        marginBottom: 10,
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
    skipButtonText: { color: '#86B049' },
    continueButton: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a4e22b',
    },
    continueButtonText: { color: '#000' },
});

export default empTransport;