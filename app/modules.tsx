import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Checkbox, CheckboxIndicator, CheckboxLabel, CheckboxIcon } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { CheckIcon } from '@/components/ui/icon';
import { useState } from 'react';

const Modules = () => {
    const router = useRouter();
    const [selectedModules, setSelectedModules] = useState([]);

    const modules = [
        {
            title: 'Household Information',
            description: 'Basic details about your household size and structure.',
            route: './household',
        },
        {
            title: 'Electricity Usage',
            description: 'Track your annual electricity consumption and renewable energy use.',
            route: './electricity',
        },
        {
            title: 'Fuel Consumption',
            description: 'Log your fuel usage to estimate related carbon emissions.',
            route: './fuel',
        },
        {
            title: 'Travel Information',
            description: 'Provide your yearly travel data across various modes of transport.',
            route: './travel',
        },
        {
            title: 'Meal Preferences',
            description: 'Share your dietary habits to evaluate your food-related carbon footprint.',
            route: './meal',
        },
    ];

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
                                <Checkbox style={styles.checkbox} size="md">
                                    <CheckboxIndicator className="data-[checked=true]:bg-[#9dfc03]">
                                        <CheckboxIcon as={CheckIcon} style={styles.checkboxIcon} />
                                    </CheckboxIndicator>
                                </Checkbox>
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
                <Button
                    style={styles.nextButton}
                    onPress={() => router.push('./next')}
                >
                    <Text size="lg" style={styles.nextButtonText}>
                        Next
                    </Text>
                </Button>
            </Box>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    scrollContainer: {
        paddingBottom: 20, // Add padding to avoid content being cut off
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
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default Modules;