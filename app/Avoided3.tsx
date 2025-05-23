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
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Text as UiText } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const ElectricityConsumptionScreen = () => {
    const router = useRouter(); // Initialize the router
    const [text, setText] = useState(''); // State to store the text

    const handleContinue = () => {
        if (text.length > 500) {
            alert('Text exceeds the 500-character limit.');
            return;
        }
        router.push({
            pathname: './Avoided2',
            params: { avoidedEmissionsText: text }, // Pass the text to the next screen
        });
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <Progress value={100} size="xs" style={styles.progressBar}>
                        <ProgressFilledTrack className="bg-[#a4e22b]"/>
                    </Progress>
                </View>

                <View style={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                    Have you invested in carbon offset projects? (e.g., renewable energy, reforestation, or similar initiatives)
                    </UiText>

                    <Textarea
                        style={styles.textarea}
                        size="md"
                        isReadOnly={false}
                        isInvalid={false}
                        isDisabled={false}
                        className="w-64 h-50">
                    <TextareaInput
                            placeholder="Your text goes here..."
                            value={text}
                            onChangeText={(value) => {
                                if (value.length <= 500) {
                                    setText(value); // Update the text only if it's within the limit
                                }
                            }}
                        />
                    </Textarea>
                    <UiText size="xs"  style={styles.footerText}>
                    {text.length}/ 500 characters
                    </UiText>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('./homeEnterprise')}
                        >
                            <UiText size="lg" style={styles.skipButtonText}>
                                Skip
                            </UiText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={() => router.push({ pathname: './homeEnterprise', params: { avoidedEmissionsText: text }})} 
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
        paddingHorizontal: 20,
        marginTop: 30,
        alignSelf: 'center',
    },
    progressBar:{
        width: '40%', // Retain the same size as the original progress bar
        height: 4,
        backgroundColor: '#e0e0e0', // Background color for the progress bar
        borderRadius: 2,
    },
    textarea: {
        width: '190%', // Adjust the width to 90% of the container
        height: 150, // Increase the height to 150 pixels
        borderRadius: 10, // Optional: Adjust the border radius
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'Transparent',
        marginVertical: 20,
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
    footerText: {
        maxWidth: '40%',
        fontWeight: 'normal',
        fontSize: 16,
        color: 'grey',
        textAlign: 'left',
        marginBottom: 20,
    },
    input: {
        width: '90%',
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

export default ElectricityConsumptionScreen;