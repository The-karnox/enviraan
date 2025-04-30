import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
            title: 'Scope 1: Direct Emissions',
            description: 'Emissions from sources owned or controlled by the organization',
            route: './household',
        },
        {
            title: 'Scope 2: Inirect Emissions',
            description: 'Emissions from purchased electricity, steam, heating, and cooling',
            route: './electricity',
        },
        {
            title: 'Scope 3: Other Inirect Emissions',
            description: 'Emissions from sources not owned or controlled by the company but part of the value chain',
            route: './fuel',
        },
        {
            title: 'Scope 4: Avoided Emissions',
            description: "Emissions avoided by products, services, or initiatives that contribute to emission reductions beyond the organization's direct and indirect footprint.",
            route: './travel',
        },
      
    ];

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
});

export default Modules;