import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Question0 = () => {
    return (
        <View>
        <LinearGradient
            colors={['#ffffff', '#ff1ffdb']}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.text}>Welcome to Question 0</Text>
            </View>
        </LinearGradient>
        </View>
    );
   
}

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
        fontSize: 24,
        color: '#000',
    },
});

export default Question0;