import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    useWindowDimensions,
    Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';

import WindyAnimation from '../assets/animations/Weather-windy.json';

function useForceUpdateOnResize() {
  const [, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
}

const OrgName = () => {
    const router = useRouter();
    const [organizationName, setOrganizationName] = useState('');
    const { updateCarbonData } = useCarbonFootprint();
    const { width, height } = useWindowDimensions();

    useForceUpdateOnResize();

    const handleContinue = () => {
        if (!organizationName.trim()) {
            Alert.alert('Input Required', 'Please enter the name of your organization before continuing.');
            return;
        }
        updateCarbonData('nameOfOrg', organizationName);
        router.push('/activity');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* The background animation. It's pulled out of the layout and sent to the back. */}
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
                            width: Math.min(width * 0.8, 400),
                            height: Math.min(height * 0.3, 200),
                            maxWidth: '100%',
                            maxHeight: '100%',
                            opacity: 0.2
                        }}
                        resizeMode="contain"
                    />
                </View>

                {/* The content, wrapped in a ScrollView. It's a sibling to the animation. */}
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                        What is the name of your organization?
                    </UiText>

                    <TextInput
                        style={styles.input}
                        placeholder="Organization Name"
                        placeholderTextColor="#999"
                        value={organizationName}
                        onChangeText={setOrganizationName}
                        onSubmitEditing={handleContinue}
                    />

                    <View style={styles.buttonContainer}>
                        {/* Removed Skip button */}
                        <TouchableOpacity
                            style={[styles.continueButton]}
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
    backgroundAnimation: {
        position: 'absolute', // This is essential
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1, // This is essential to send it to the back
        opacity: 0.2,
    },
    contentContainer: {
        // This styles the content *inside* the ScrollView
        alignItems: 'center',
        paddingTop: 100, // Space from the top
        paddingBottom: 50, // Space at the bottom
    },
    questionText: {
        maxWidth: '80%',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#15181e',
        textAlign: 'center',
        marginBottom: 20,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        maxWidth: 450,
        marginTop: 10,
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
        width:250,
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

export default OrgName;