import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';

const { width } = Dimensions.get('window');

const HouseholdScreen = () => {
    const router = useRouter(); // Initialize the router
    const { updateCarbonData } = useCarbonFootprint(); 
    const [count, setCount] = useState(0);

    const increment = () => {
        if (count < 6) {
            setCount(count + 1);
        }
    };
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    
    const handleContinue = () => {
        updateCarbonData('numOfMembers', count); // Save the count to the context
        router.push('/electricity'); // Navigate to the next page
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar} />
                </View>

                {/* Question */}
                <View style={styles.contentContainer}>
                    <Text style={styles.questionText}>
                        How many people live in your household?
                    </Text>

                    {/* Counter */}
                    <View style={styles.counterContainer}>
                        <TouchableOpacity style={styles.circleButton} onPress={decrement}>
                            <Ionicons name="remove" size={24} color="#fff" />
                        </TouchableOpacity>

                        <Text style={styles.countText}>{count}</Text>

                        <TouchableOpacity style={styles.circleButton} onPress={increment}>
                            <Ionicons name="add" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/electricity')}                        >
                            <Text style={styles.skipButtonText}>Skip</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={handleContinue}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
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
        width: '100%',
        height: 4,
        backgroundColor: 'transparent',
        marginTop: 20,
        alignItems: 'center',
        paddingBottom: 24,
    },
    progressBar: {
        width: '40%',
        height: 4,
        backgroundColor: '#a4e22b',
        marginTop: 20,
        alignItems: 'center',
    },
    contentContainer: {
        paddingHorizontal: 20,
        marginTop: 30,
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
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        marginVertical: 32,
    },
    circleButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    countText: {
        fontSize: 32,
        color: '#000',
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
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
        fontSize: 16,
        fontWeight: '500',
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
        fontSize: 16,
        fontWeight: '500',
    },
});

export default HouseholdScreen;