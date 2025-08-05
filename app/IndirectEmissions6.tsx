import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    useWindowDimensions,
    ScrollView, // Import ScrollView
    Alert,
} from 'react-native';
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
  } from "@/components/ui/select"
  import { ChevronDownIcon } from "@/components/ui/icon"
import { LinearGradient } from 'expo-linear-gradient';
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Text as UiText } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';
import LottieView from 'lottie-react-native';
import city from '../assets/animations/Wind turbines and solar panels energy.json';

const busiElectricityConsumption = () => {
    const router = useRouter();
    const { updateCarbonData } = useCarbonFootprint();
    const { width, height } = useWindowDimensions();

    const [hasCertificate, setHasCertificate] = useState<string>(''); // Renamed for clarity

    // Create separate state for each certificate field
    const [certificateName, setCertificateName] = useState('');
    const [procurementMechanism, setProcurementMechanism] = useState('');
    const [serialId, setSerialId] = useState('');
    const [generatorId, setGeneratorId] = useState('');
    const [generatorName, setGeneratorName] = useState('');
    const [generatorLocation, setGeneratorLocation] = useState('');
    const [generationDate, setGenerationDate] = useState('');
    const [issuanceDate, setIssuanceDate] = useState('');

    const handleContinue = () => {
        if (hasCertificate === 'Yes') {
            // Validate all the new fields
            if (!certificateName.trim()) { Alert.alert('Input Required', 'Please enter the certificate name.'); return; }
            if (!procurementMechanism.trim()) { Alert.alert('Input Required', 'Please enter the procurement mechanism.'); return; }
            if (!serialId.trim()) { Alert.alert('Input Required', 'Please enter the Serial ID.'); return; }
            if (!generatorId.trim()) { Alert.alert('Input Required', 'Please enter the Generator ID.'); return; }
            if (!generatorName.trim()) { Alert.alert('Input Required', 'Please enter the Generator Name.'); return; }
            if (!generatorLocation.trim()) { Alert.alert('Input Required', 'Please enter the Generator Location.'); return; }
            if (!generationDate.trim()) { Alert.alert('Input Required', 'Please enter the Date of Generation.'); return; }
            if (!issuanceDate.trim()) { Alert.alert('Input Required', 'Please enter the Issuance Date.'); return; }
        }

        // Save the data to the context
        updateCarbonData('hasCertificate', hasCertificate === 'Yes');
        updateCarbonData('certificateName', certificateName);
        updateCarbonData('procurementMechanism', procurementMechanism);
        updateCarbonData('serialId', serialId);
        updateCarbonData('generatorId', generatorId);
        updateCarbonData('generatorName', generatorName);
        updateCarbonData('generatorLocation', generatorLocation);
        updateCarbonData('generationDate', generationDate);
        updateCarbonData('issuanceDate', issuanceDate);

        router.push('/others');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                 <View
                    style={[
                        StyleSheet.absoluteFill,
                        { justifyContent: 'center', paddingTop:200, alignItems: 'center', opacity: 0.5}
                    ]}
                    pointerEvents="none"
                >
                    <LottieView
                        source={city}
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

               <View style={styles.progressWrapper}>
                                <View style={styles.progressBarContainer}>
                                    <Progress value={45} size="md" style={styles.progressBar}>
                                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                                    </Progress>
                                </View>
                                 <UiText style={styles.progressText}>9 of 18</UiText>
                                </View>

                {/* Replace View with ScrollView to make content scrollable */}
                <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                        Do you acquire any standardized certificate related to RE?
                    </UiText>
                    <RadioGroup
                        value={hasCertificate}
                        onChange={setHasCertificate}
                        style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}
                    >
                        {['Yes', 'No'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.radioBox,
                                    hasCertificate === option && styles.radioBoxSelected,
                                ]}
                                onPress={() => setHasCertificate(option)}
                            >
                                <Radio value={option}>
                                    <RadioIndicator>
                                        <RadioIcon as={CircleIcon} style={[styles.radioIcon, hasCertificate === option && styles.radioIconSelected]} />
                                    </RadioIndicator>
                                </Radio>
                                <UiText size="md" style={styles.radioLabel}>{option}</UiText>
                            </TouchableOpacity>
                        ))}
                    </RadioGroup>

                    {hasCertificate === 'Yes' && (
                        <>
                            <UiText size="2xl" style={{ marginTop: 10, color: '#15181e' }}>
                                Provide the details of standardized Certificate below:
                            </UiText>
                            <TextInput style={styles.input} placeholder="Name of the certificate" placeholderTextColor="#999" value={certificateName} onChangeText={setCertificateName} />
                            <TextInput style={styles.input} placeholder="RE Procurement mechanism" placeholderTextColor="#999" value={procurementMechanism} onChangeText={setProcurementMechanism} />
                            <TextInput style={styles.input} placeholder="Serial Identity (ID)" placeholderTextColor="#999" value={serialId} onChangeText={setSerialId} />
                            <TextInput style={styles.input} placeholder="Generator ID" placeholderTextColor="#999" value={generatorId} onChangeText={setGeneratorId} />
                            <TextInput style={styles.input} placeholder="Generator Name" placeholderTextColor="#999" value={generatorName} onChangeText={setGeneratorName} />
                            <TextInput style={styles.input} placeholder="Generator Location" placeholderTextColor="#999" value={generatorLocation} onChangeText={setGeneratorLocation} />
                            <TextInput style={styles.input} placeholder="Date of Generation" placeholderTextColor="#999" value={generationDate} onChangeText={setGenerationDate} />
                            <TextInput style={styles.input} placeholder="Issuance Date" placeholderTextColor="#999" value={issuanceDate} onChangeText={setIssuanceDate} />
                        </>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/others')}>
                            <UiText size="lg" style={styles.skipButtonText}>Skip</UiText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                            <UiText size="lg" bold style={styles.continueButtonText}>Continue</UiText>
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
        backgroundColor: 'transparent',
    },
    scrollContainer: {
        flex: 1, // This makes the ScrollView take up the available space
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
        width: '100%',
        height: 4,
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
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50, // Add padding to the bottom to ensure scrolling space
        alignItems: 'center',
    },
    questionText: {
        maxWidth: '80%',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#15181e',
        textAlign: 'center',
        marginBottom: 20,
    },
    radioBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginHorizontal: 5,
        width: '40%',
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
    input: {
        width: '80%',
        maxWidth: 400,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
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
        backgroundColor: 'transparent',
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

export default busiElectricityConsumption;