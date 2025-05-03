import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    StatusBar,
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
  } from "@/components/ui/select";
  import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
  import { ChevronDownIcon } from "@/components/ui/icon"
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Radio, RadioGroup, RadioIndicator, RadioIcon } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';

const ghgEmissions = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ghgTypes] = useState(['CO₂', 'CH₄', 'N₂O', 'HFCs', 'PFCs', 'SF₆', 'NF₃']);
    const [type, setType] = useState(''); 

    const options = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'no' },
    ];
    

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.progressBarContainer}>
                    <Progress value={42} size="xs"    style={styles.progressBar}>
                        <ProgressFilledTrack className="bg-[#a4e22b]"/>
                    </Progress>
                </View>

                {/* Question */}
                <UiText size="xl" bold style={styles.questionText}>
                    Do you use backup generators?
                </UiText>

                {/* Radio Options */}
                <RadioGroup
                    value={selectedOption}
                    onChange={(value) => setSelectedOption(value)}
                    style={styles.radioGroup}
                >
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.radioBox,
                                selectedOption === option.value && styles.radioBoxSelected,
                            ]}
                            onPress={() => setSelectedOption(option.value)}
                        >
                            <Radio value={option.value}>
                                <RadioIndicator>
                                    <RadioIcon as={CircleIcon} style={[styles.radioIcon, selectedOption === option.value && styles.radioIconSelected]}/>
                                </RadioIndicator>
                            </Radio>
                            <UiText size="md" style={styles.radioLabel}>
                                {option.label}
                            </UiText>
                        </TouchableOpacity>
                    ))}
                </RadioGroup>
                {selectedOption === 'Yes' &&(
                    <View style={styles.additionalQuestionContainer}>
                         <UiText size="xl" bold style={styles.questionText}>
                    Please specify the fuel type and your consumption?
                </UiText>
                <Select
                value={ghgTypes } 
                onValueChange={(value) => setType(value)}
                >
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
          <SelectItem label="Carbon Dioxide (CO₂)" value="CO₂" />
          <SelectItem label="Methane (CH₄) " value="CH₄" />
          <SelectItem label="Nitrous Oxide (N₂O)" value="N₂O" />
          <SelectItem label="Hydrofluorocarbons (HFCs)" value="HFCs" />
          <SelectItem label="Perfluorocarbons (PFCs)" value="PFCs" />
          <SelectItem label="Sulfur Hexafluoride (SF₆)" value="SF₆" />
          <SelectItem label="Nitrogen Trifluoride (NF₃)" value="NF₃" />
        </SelectContent>
      </SelectPortal>
    </Select>
                   <TextInput
                                             style={styles.input}
                                             placeholder="Quantity"
                                             placeholderTextColor="#999"
                                             keyboardType="numeric"
                                             value={quantity}
                                             onChangeText={setQuantity}
                                         />
                    </View>
                )}

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => router.push('/IndirectEmissions')} // Navigate without saving
                    >
                        <UiText size="lg" style={styles.skipButtonText}>
                            Skip
                        </UiText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() =>
                            router.push({ pathname: '/IndirectEmissions',
                                params: {
                                    ghgEmissions: selectedOption, 
                                    ghgType: type, 
                                    Quantity: quantity, // Pass the entered quantity
                                },
                             })
                        } 
                    >
                        <UiText size="lg" bold style={styles.continueButtonText}>
                            Continue
                        </UiText>
                    </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingVertical: 30,
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
    questionText: {
        color: '#15181e',
        textAlign: 'center',
        fontWeight: 'bold',
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
        width: '30%',
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
    additionalQuestionContainer: {
        marginTop: 20,
        alignItems: 'center',
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
        width: '110%',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        gap: 24,
    },
    skipButton: {
        width: 150,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#86B049',
        backgroundColor: 'transparent',
    },
    skipButtonText: {
        color: '#86B049',
    },
    continueButton: {
        width: 150,
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

export default ghgEmissions;