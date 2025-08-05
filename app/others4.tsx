import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
  import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext'; 
import LottieView from 'lottie-react-native';
import shiping from '../assets/animations/cold chain logistics.json';

const trackEmissions = () => {
    const router = useRouter();
    const { updateCarbonData } = useCarbonFootprint(); 
    const [selectedOption, setSelectedOption] = useState('');
    const [quantity, setQuantity] = useState('');
    const [needsHelp, setNeedsHelp] = useState('');
    const [text, setText] = useState(''); // Add this line
    const { width, height } = useWindowDimensions();
    const handleNumericInput = (text: string) => {
        // This regex allows numbers and at most one decimal point.
        if (text === '' || /^\d*\.?\d*$/.test(text)) {
            setQuantity(text);
        }
    };

    const options = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'no' },
    ];
    const handleContinue = () => {
        updateCarbonData('trackEmissionsTransportation', selectedOption === 'Yes');
        updateCarbonData('estimatedEmissionsTransportation', selectedOption === 'Yes' ? parseFloat(quantity) || 0 : 0);
        updateCarbonData('needsHelpToCalculate', needsHelp === 'Yes');
        updateCarbonData('supplyChainHelpText', needsHelp === 'Yes' ? text : ''); // Save the text

        // Navigate to the next screen
        router.push('/others5');
    }

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                  <View style={styles.progressWrapper}>
                        <View style={styles.progressBarContainer}>
                            <Progress value={60} size="md" style={styles.progressBar}>
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
                {/* Question */}
                <UiText size="xl" bold style={styles.questionText}>
                    Do you track emissions from transporting raw materials to your facilities?
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
                {selectedOption === 'Yes' &&(
                    <View style={styles.additionalQuestionContainer}>
                         <UiText size="xl" bold style={styles.questionText}>
                    Please provide the estimated CO₂ emissions?
                </UiText>
                   <TextInput
                                             style={styles.input}
                                             placeholder="in Metric tonnes CO₂e"
                                             placeholderTextColor="#999"
                                             keyboardType="numeric"
                                             value={quantity}
                                             onChangeText={handleNumericInput}
                                         />
                    <UiText size="xl" bold style={styles.questionText}>
                   Do you need our team help to calculate your supply chain emissions?
                </UiText>

                {/* Radio Options */}
                 <RadioGroup
                    value={needsHelp}
                    onChange={(value) => setNeedsHelp(value)}
                    style={styles.radioGroup}
                >
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.radioBox,
                                needsHelp === option.value && styles.radioBoxSelected,
                            ]}
                            onPress={() => setNeedsHelp(option.value)}
                        >
                            <Radio value={option.value}>
                                <RadioIndicator>
                                    <RadioIcon as={CircleIcon} style={[styles.radioIcon, needsHelp === option.value && styles.radioIconSelected]}/>
                                </RadioIndicator>
                            </Radio>
                            <UiText size="md" style={styles.radioLabel}>
                                {option.label}
                            </UiText>
                        </TouchableOpacity>
                    ))}
                </RadioGroup>
                    </View>
                )}

                {/* This block was nested incorrectly. It should be outside the block above. */}
                {needsHelp === 'Yes' && (
                    <View style={styles.additionalQuestionContainer}>
                        <UiText size="xl" bold style={styles.questionText}>
                            Please specify or explain your requirement below:
                        </UiText>
                        <Textarea
                            style={styles.textarea}
                            size="md"
                            isReadOnly={false}
                            isInvalid={false}
                            isDisabled={false}
                        >
                            <TextareaInput
                                placeholder="Your text goes here..."
                                value={text}
                                onChangeText={(value) => {
                                    if (value.length <= 500) {
                                        setText(value);
                                    }
                                }}
                            />
                        </Textarea>
                        <UiText size="xs" style={styles.footerText}>
                            {text.length}/ 500 characters
                        </UiText>
                    </View>
                )}

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => router.push('/others5')} // Navigate without saving
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
        fontWeight: 'bold',
        marginBottom: 20,
        maxWidth: '90%',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16, // Use gap for spacing
        width: '90%', // Set a max width for the group
        maxWidth: 400, // Ensure it doesn't get too wide on large screens
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
    additionalQuestionContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
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
        marginVertical: 20,
    },
   textarea: {
        width: '90%', // Keep width responsive
        maxWidth: 350, // Set a max width for consistency
        height: 350, // Set height to match max width for a square shape
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15, // Use padding for all sides
        fontSize: 16,
        backgroundColor: 'transparent',
        marginVertical: 20,
    },
     footerText: {
        width: '90%', // Match the textarea width
        maxWidth: 350, // Match the textarea max width
        fontWeight: 'normal',
        fontSize: 16,
        color: 'grey',
        textAlign: 'left',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        maxWidth: 450,
        marginTop: 40, // Changed from 'auto' to a fixed margin
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

export default trackEmissions;