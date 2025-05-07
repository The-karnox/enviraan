import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { CarbonFootprintProvider } from './CarbonFootprintContext'; // Import the provider

const GradientBackground = () => {
    const router = useRouter();

    const renderContent = () => {
        if (Platform.OS === 'web') {
            // Web-specific design
            return (
                <View style={styles.webContainer}>
                    <Text size="4xl" bold={true} style={styles.webTitle}>
                        Let's Calculate Your Carbon Footprint
                    </Text>
                    <Text size="lg" style={styles.webSubtitle} numberOfLines={3}>
                        Answer a few simple questions about your lifestyle and activities to see your impact on the environment. It only takes a few minutes to get insights and start making a difference!
                    </Text>
                    <TouchableOpacity
                        style={styles.webButton}
                        onPress={() => (window.location.href = '/modules')}
                    >
                        <Text size="lg" style={styles.webButtonText}>
                            I'm an Individual
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.webButton}
                        onPress={() => (window.location.href = '/scope')}
                    >
                        <Text size="lg" style={styles.webButtonText}>
                            for Businesses
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            // Mobile-specific design
            return (
                <LinearGradient
                    colors={['#f6ffec', '#e3ffb7']}
                    style={styles.background}
                >
                    <View style={styles.container}>
                        <Image
                            source={require('../assets/images/EnviGuide_primar.png')}
                            style={styles.icon}
                        />
                        <Text size="4xl" bold={true} style={styles.title}>
                            Collaborate with us in creating green choices simple and significant.
                        </Text>
                        <TouchableOpacity
                            style={styles.loginbutton}
                            onPress={() => router.push('./login')}
                        >
                            <Text size="lg" style={styles.buttonTextlogin}>
                                Log In
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={() => router.push('./entry')}
                        >
                            <Text size="lg" style={styles.buttonText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.footerText}>
                            Your data is safe with us. We respect your privacy.
                        </Text>
                    </View>
                </LinearGradient>
            );
        }
    };

    // Return the rendered content
    return renderContent();
};

// Wrap the GradientBackground component with the CarbonFootprintProvider
const App = () => {
    return (
        <CarbonFootprintProvider>
            <GradientBackground />
        </CarbonFootprintProvider>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    icon: {
        width: 300,
        height: 200,
        marginBottom: 200,
    },
    title: {
        color: '#2d4901',
        textAlign: 'center',
        marginBottom: 40,
    },
    loginbutton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        width: '100%',
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
        borderColor: '#578c01',
    },
    signupButton: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#9dfc03',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'normal',
    },
    buttonTextlogin: {
        color: '#578c01',
        fontWeight: 'normal',
    },
    footerText: {
        color: '#2d4901',
        fontWeight: 'normal',
    },
    webContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#f6ffec',
    },
    webTitle: {
        color: '#2d4901',
        textAlign: 'center',
        marginBottom: 20,
    },
    webSubtitle: {
        color: '#000',
        maxWidth: 800,
        textAlign: 'justify', // Align text like a paragraph
        marginBottom: 30,
        paddingHorizontal: 40,
        paddingVertical: 10, // Reduce padding for better readability
        lineHeight: 1, // Add line height for better spacing between lines
    },
    webButton: {
        backgroundColor: '#9dfc03',
        paddingVertical: 15,
        paddingHorizontal: 200,
        marginBottom: 20,
        borderRadius: 35,
        alignItems: 'center',
    },
    webButtonText: {
        color: '#000',
        fontWeight: 'normal',
    },
});

export default App;