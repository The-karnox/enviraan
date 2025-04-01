import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/text';

const GradientBackground = () => {
    return (
        <LinearGradient
            colors={['#ffffff', '#f1ffdc']}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text size='4xl' bold={true} style={styles.text}>
                    Welcome to the Gradient Screen
                </Text>
                <Text size='lg' style={styles.text2}>
                    This is a replicated gradient background.
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
    },
    text: {
        color: '#000',
        paddingTop: 40,
    },
    text2: {
        color: '#000',
        paddingTop: 20,
    },
});

export default GradientBackground;