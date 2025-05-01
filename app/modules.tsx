import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Platform, View } from 'react-native';
import { House, GasPump, Car, BowlFood, Lightning } from 'phosphor-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { useRouter } from 'expo-router';

const Modules = () => {
    const router = useRouter();

    const modules = [
        {
            title: 'Household Information',
            description: 'Basic details about your household size and structure.',
            route: './household',
            icon: <House size={32} color="#578c01" weight="bold" />, // Icon for Household
        },
        {
            title: 'Electricity Usage',
            description: 'Track your annual electricity consumption and renewable energy use.',
            route: './electricity',
            icon: <Lightning size={32} color="#578c01" weight="bold" />, // Icon for Electricity
        },
        {
            title: 'Fuel Consumption',
            description: 'Log your fuel usage to estimate related carbon emissions.',
            route: './fuel',
            icon: <GasPump size={32} color="#578c01" weight="bold" />, // Icon for Fuel
        },
        {
            title: 'Travel Information',
            description: 'Provide your yearly travel data across various modes of transport.',
            route: './travel',
            icon: <Car size={32} color="#578c01" weight="bold" />, // Icon for Travel
        },
        {
            title: 'Meal Preferences',
            description: 'Share your dietary habits to evaluate your food-related carbon footprint.',
            route: './meal',
            icon: <BowlFood size={32} color="#578c01" weight="bold" />, // Icon for Meal
        },
    ];

    const renderContent = () => {
        if (Platform.OS === 'web') {
            // Web-specific design
            return (
                <View style={styles.webContainer}>
                    <Text size="5xl" bold={true} style={styles.webTitle}>
                        Modules
                    </Text>
                    <Text size="lg" style={styles.webSubtitle}>
                        Go through each module and address the questionnaire in order to get your carbon footprint.
                    </Text>
                    <View style={styles.webGrid}>
                        {modules.map((module, index) => (
                            <View key={index} style={styles.webCard}>
                                <View style={styles.iconContainer}>{module.icon}</View>
                                <Text size="lg" bold={true} style={styles.webCardTitle}>
                                    {module.title}
                                </Text>
                                <Text size="sm" style={styles.webCardDescription}>
                                    {module.description}
                                </Text>
                                <TouchableOpacity
                                    style={styles.webButton}
                                    onPress={() => router.push(module.route)}
                                >
                                    <Text size="lg" style={styles.webButtonText}>
                                        Continue
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            );
        } else {
            // Mobile-specific design
            return (
                <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
                    <Box style={styles.container}>
                        <Text size="5xl" bold={true} style={styles.title}>
                            Modules
                        </Text>
                        <Text size="lg" style={styles.subtitle}>
                            Go through each module and address the questionnaire in order to get your carbon footprint.
                        </Text>
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                            <VStack space="md" style={styles.moduleList}>
                                {modules.map((module, index) => (
                                    <Card
                                        key={index}
                                        size="md"
                                        variant="elevated"
                                        style={styles.card}
                                    >
                                        <Box style={styles.cardContent}>
                                            <Box style={styles.textContainer}>
                                                <Text size="lg" bold={true} style={styles.cardTitle}>
                                                    {module.title}
                                                </Text>
                                                <Text size="sm" style={styles.cardDescription}>
                                                    {module.description}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </VStack>
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={() => router.push('./scope')}
                        >
                            <Text size="lg" style={styles.nextButtonText}>
                                Calculate Footprint
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
    moduleList: {
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
    iconContainer: {
        marginBottom: 10,
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

export default Modules;