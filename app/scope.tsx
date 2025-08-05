import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Platform, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Checkbox, CheckboxIndicator, CheckboxIcon } from '@/components/ui/checkbox';
import { useRouter } from 'expo-router';
import { CheckIcon } from '@/components/ui/icon';

const Scopes = () => {
    const router = useRouter();
    const [selectedScopes, setSelectedScopes] = useState([]);

    const scopes = [
        {
            title: 'Scope 1: Direct Emissions',
            description: 'Emissions from sources owned or controlled by the organization.',
            route: './DirectEmissions',
        },
        {
            title: 'Scope 2: Indirect Emissions',
            description: 'Emissions from purchased electricity, steam, heating, and cooling.',
            route: './IndirectEmissions',
        },
        {
            title: 'Scope 3: Other Indirect Emissions',
            description: 'Emissions from sources not owned or controlled by the company but part of the value chain.',
            route: './others',
        },
        {
            title: 'Scope 4: Avoided Emissions',
            description: 'Emissions avoided by products, services, or initiatives that contribute to emission reductions.',
            route: './AvoidedEmissions',
        },
    ];

    const renderContent = () => {
        if (Platform.OS === 'web') {
            // Web-specific design
            return (
                <View style={styles.webContainer}>
                    <Text size="5xl" bold={true} style={styles.webTitle}>
                        Scopes
                    </Text>
                    <Text size="lg" style={styles.webSubtitle}>
                        Go through each scope and address the questionnaire in order to get your carbon footprint.
                    </Text>
                    <ScrollView>
                    <View style={styles.webGrid}>
                        {scopes.map((scope, index) => (
                            <View key={index} style={styles.webCard}>
                                <Text size="lg" bold={true} style={styles.webCardTitle}>
                                    {scope.title}
                                </Text>
                                <Text size="sm" style={styles.webCardDescription}>
                                    {scope.description}
                                </Text>
                                <TouchableOpacity
                                    style={styles.webButton}
                                    onPress={() => router.push(scope.route)}
                                >
                                    <Text size="lg" style={styles.webButtonText}>
                                        Continue
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    </ScrollView>
                </View>
            );
        } else {
            // Mobile-specific design
            return (
                <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
                    <Box style={styles.container}>
                        <Text size="5xl" bold={true} style={styles.title}>
                            Scopes
                        </Text>
                        <Text size="lg" style={styles.subtitle}>
                            Go through each scope and address the questionnaire in order to get your carbon footprint.
                        </Text>
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                            <VStack space="md" style={styles.scopeList}>
                                {scopes.map((scope, index) => (
                                    <Card
                                        key={index}
                                        size="md"
                                        variant="elevated"
                                        style={styles.card}
                                    >
                                        <Box style={styles.cardContent}>
                                            <Checkbox style={styles.checkbox} size="md">
                                                <CheckboxIndicator className="data-[checked=true]:bg-[#9dfc03]">
                                                    <CheckboxIcon as={CheckIcon} style={styles.checkboxIcon} />
                                                </CheckboxIndicator>
                                            </Checkbox>
                                            <Box style={styles.textContainer}>
                                                <Text size="lg" bold={true} style={styles.cardTitle}>
                                                    {scope.title}
                                                </Text>
                                                <Text size="sm" style={styles.cardDescription}>
                                                    {scope.description}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </VStack>
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={() => router.push('./next')}
                        >
                            <Text size="lg" style={styles.nextButtonText}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </Box>
                </LinearGradient>
            );
        }
    };

    return renderContent();
};

const styles = StyleSheet.create({
    // Common styles
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        color: '#000',
        marginBottom: 20,
    },
    scopeList: {
        flex: 1,
    },
    card: {
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#a8b3c4',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        position: 'absolute',
        top: 5,
        left: 5,
    },
    checkboxIcon: {
        color: '#15181e',
    },
    textContainer: {
        marginLeft: 40,
        marginRight: 10,
    },
    cardTitle: {
        color: '#15181e',
        marginBottom: 5,
    },
    cardDescription: {
        color: '#a8b3c4',
    },
    nextButton: {
        backgroundColor: '#9dfc03',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    nextButtonText: {
        color: '#000000',
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: 18,
    },

    // Web-specific styles
    webContainer: {
        flex: 1,
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
        textAlign: 'center',
        marginBottom: 30,
    },
    webGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    webCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        width: '45%',
        borderWidth: 1,
        borderColor: '#d4e8c2',
        alignItems: 'center',
    },
    webCardTitle: {
        color: '#15181e',
        marginBottom: 10,
        textAlign: 'center',
    },
    webCardDescription: {
        color: '#a8b3c4',
        marginBottom: 20,
        textAlign: 'center',
    },
    webButton: {
        backgroundColor: '#9dfc03',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    webButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default Scopes;