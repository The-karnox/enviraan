import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectItem,
  } from "@/components/ui/select"
  import { ChevronDownIcon } from "@/components/ui/icon"
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import{ useCarbonFootprint } from './CarbonFootprintContext';

const { width } = Dimensions.get('window');

const DirectEmissions7Screen = () => {
    const router = useRouter(); // Initialize the router
    const [Quantity , setQuantity]  = useState('');
    const { updateCarbonData } = useCarbonFootprint(); 
    const [metric, setMetric] = useState(''); 
    const handleContinue = () => {
        updateCarbonData('ghgAmount', Quantity); // Save Quantity as fuelAmount
        updateCarbonData('ghgMetric', metric); // Save Metric

        // Navigate to the next screen
        router.push('/DirectEmissions8');
        
    }

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <Progress value={87.5} size="xs"    style={styles.progressBar}>
                        <ProgressFilledTrack className="bg-[#a4e22b]"/>
                    </Progress>
                </View>

                <View style={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                    What is the total amount of refrigerant leakage recorded in the past year?
                    </UiText>
                       <TextInput
                                            style={styles.input}
                                            placeholder="Quantity"
                                            placeholderTextColor="#999"
                                            keyboardType="numeric"
                                            value={Quantity}
                                            onChangeText={setQuantity}
                                        />
                                           <Select
                                         selectedValue={metric} // Use `selectedValue` instead of `value`
                                         onValueChange={(value) => setMetric(value)}>
      <SelectTrigger variant="rounded" size="md" style={styles.selectBox}>
        <SelectInput placeholder="Select option" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="Metric Tonnes" value="Metric Tonnes" />
          <SelectItem label="Quintals" value="Quintals" />
            <SelectItem label="KG" value="KG" />
        </SelectContent>
      </SelectPortal>
    </Select>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/DirectEmissions3')}
                        >
                            <UiText size="lg" style={styles.skipButtonText}>
                                Skip
                            </UiText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={handleContinue} 
                        >
                            <UiText size="lg" bold style={styles.continueButtonText}>
                                Continue
                            </UiText>
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
        width: '40%',
        height: 4,
        backgroundColor: 'transparent',
        marginTop: 20,
        alignSelf: 'center',
        paddingBottom: 24,
    },
    progressBar: {
        width: '40%', // Retain the same size as the original progress bar
        height: 4,
        backgroundColor: '#e0e0e0', // Background color for the progress bar
        borderRadius: 2,
    },
    progressFilledTrack: {
        backgroundColor: '#a4e22b', // Green color for the filled track
        height: '100%',
        borderRadius: 2,
    },
    contentContainer: {
        paddingHorizontal: 20,
        marginTop: 30,
        alignItems: 'center',
    },
    questionText: {
        maxWidth: '40%',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#15181e',
        textAlign: 'center',
        marginBottom: 20,
    },
    selectBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        width: '102%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '40%',
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
    input: {
        width: '40%',
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
        marginVertical: 20,
    },
    skipButtonText: {
        color: '#86B049',
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
    },
});

export default DirectEmissions7Screen;