import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    useWindowDimensions,
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
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Text as UiText } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';
import LottieView from 'lottie-react-native';
import city from '../assets/animations/Wind turbines and solar panels energy.json';

const { width } = Dimensions.get('window');

const busiElectricityConsumption = () => {
    const router = useRouter(); // Initialize the router
    const { updateCarbonData } = useCarbonFootprint(); // Access the context
    const [Quantity, setQuantity] = useState(''); // State for electricity quantity
    const [metric, setMetric] = useState(''); // State for the selected metric
    const [renewableQuantity, setRenewableQuantity] = useState(''); // New state for renewable energy quantity
    const [renewableMetric, setRenewableMetric] = useState(''); // New state for renewable metric
    const [hasElectricity, setHasElectricity] = useState<string>(''); 

    const handleNumericInput = (text: string, setter: (value: string) => void) => {
        // This regex allows numbers and at most one decimal point.
        if (text === '' || /^\d*\.?\d*$/.test(text)) {
            setter(text);
        }
    };

    const handleContinue = () => {
        if (hasElectricity === 'Yes') {
            if (!Quantity.trim()) {
                alert( 'Please enter the quantity for acquired heat energy.');
                return;
            }
            if (!metric) {
                alert( 'Please select a metric for acquired heat energy.');
                return;
            }
        }

        // Save electricity consumption to the context
        updateCarbonData('capacityForRenewable', hasElectricity === 'Yes' ? parseFloat(Quantity) : 0);
        updateCarbonData('metricForRenewable', hasElectricity === 'Yes' ? metric : '');

        // Navigate to the next screen
        router.push('/IndirectEmissions6');
    };
     const { width, height } = useWindowDimensions();

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                 <View
                    style={[
                        StyleSheet.absoluteFill,
                        { justifyContent: 'center', paddingTop:200  ,alignItems: 'center', opacity: 0.5}
                    ]}
                    pointerEvents="none"
                >
                    <LottieView
                        source={city}
                        autoPlay
                        loop
                        style={{
                            width: Math.min(width * 0.8, 400),
                            height: Math.min(height * 0.3, 200),
                            maxWidth: '100%',
                            maxHeight: '100%',
                           
                        }}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.progressWrapper}>
                                <View style={styles.progressBarContainer}>
                                    <Progress value={40} size="md" style={styles.progressBar}>
                                        <ProgressFilledTrack className="bg-[#a4e22b]" />
                                    </Progress>
                                </View>
                                 <UiText style={styles.progressText}>8 of 18</UiText>
                                </View>

                <View style={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                  Does your company have consumption of self-generated non-fuel renewable energy?
                    </UiText>
 <RadioGroup
  value={hasElectricity}
  onChange={setHasElectricity}
  style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}
>
  {['Yes', 'No'].map((option) => (
    <TouchableOpacity
      key={option}
      style={[
        styles.radioBox,
        hasElectricity === option && styles.radioBoxSelected,
      ]}
      onPress={() => setHasElectricity(option)}
    >
      <Radio value={option}>
        <RadioIndicator>
          <RadioIcon
            as={CircleIcon}
            style={[
              styles.radioIcon,
              hasElectricity === option && styles.radioIconSelected,
            ]}
          />
        </RadioIndicator>
      </Radio>
      <UiText size="md" style={styles.radioLabel}>
        {option}
      </UiText>
    </TouchableOpacity>
  ))}
</RadioGroup>

{hasElectricity === 'Yes' && (
  <>
  <UiText size="2xl" style={{ marginTop: 10, color: '#15181e' }}>
     Please write the consumption of self-generated non-fuel renewable energy.
    </UiText>
    <TextInput
      style={styles.input}
      placeholder="Quantity"
      placeholderTextColor="#999"
      keyboardType="numeric"
      value={Quantity}
      onChangeText={(text) => handleNumericInput(text, setQuantity)}
    />
    <Select
      selectedValue={metric}
      onValueChange={(value) => setMetric(value)}
    >
      
      <SelectTrigger variant="rounded" size="md" style={styles.selectBox}>
        <SelectInput placeholder="metric" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="KWh" value="KWh" />
          <SelectItem label="MWh" value="MWh" />
        </SelectContent>
      </SelectPortal>
    </Select>
   
  
  </>
)}

<View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.skipButton}
    onPress={() => router.push('/IndirectEmissions6')}
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
    progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 24,
        gap: 8,
    },
     progressText: {
        fontSize: 12,
        color: '#000',
        opacity: 0.5,
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
     radioGroup: {
        marginTop: 20,
        alignItems: 'center',
    },
    radioBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f6ffec',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d4e8c2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 10,
        width: '50%',
    },
    radioBoxSelected: {
        borderColor: '#86B049', // Highlight selected option
    },
    radioLabel: {
        marginLeft: 10,
        color: '#15181e',
    },
    radioIcon: {
        color: '#d4e8c2', // Default color for the icon
    },
    radioIconSelected: {
        color: '#a4e22b', // Green color for the selected icon
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
        height: 40,
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

export default busiElectricityConsumption;