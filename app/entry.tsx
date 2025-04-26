import React from 'react';
import { View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';

const GradientBackground = () => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#f6ffec', '#e3ffb7']}
            style={styles.background}
        >
            <View style={styles.container}>
            <Image source={require('../assets/images/EnviGuide_primar.png')} style={styles.icon} />
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
                    style={[ styles.signupButton]}
                    onPress={() => router.push('./signup')}
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
        width: 300, // Adjust the width of the icon
        height: 200, // Adjust the height of the icon
        marginBottom: 200, // Add spacing below the icon
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
        borderColor: '#578c01'
    },
    signupButton: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#9dfc03', // Different color for the Sign Up button
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
});

export default GradientBackground;