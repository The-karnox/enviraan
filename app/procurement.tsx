import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native';
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
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox"
import { Heading } from "@/components/ui/heading"
import { CheckIcon } from "@/components/ui/icon"
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';

const { width } = Dimensions.get('window');

const OrgName = () => {
      const [acknowledged, setAcknowledged] = useState(false); 
    const router = useRouter();
   

    const handleContinue = () => {
      

        // Navigate to the next screen
        router.push('/scope');
    };

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
             <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

           
               

                <View style={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                       Please read following Procurement mechanisms and acknowledge them.
                    </UiText>
                    <UiText size="md" style={ styles.container}>
                        Electricity will be regarded as renewable electricity if provided using one of the mechanisms stated below and respecting the requirements regarding double counting. Please select which ones apply to your processes. If none apply in the country carbon emissions occur, at the end an alternative locally accepted at the time of production type of proof:{'\n'}
                        a. Onsite generation: EACs generated{'\n'}
b. Onsite generation: No EACs generated{'\n'}
c. Off-Site generation: PPA / sleeved PPA (Proof of delivery necessary){'\n'}
d. Off-Site generation: Virtual PPA (Proof via EAC necessary){'\n'}
e. Off-Site generation: Green Power Tariff / Green Power Product{'\n'}
f. Power supplied by an electricity provider where the provider takes over the responsibility to provide the electricity either directly from renewable sources (e.g. through PPAs) or procures and deletes unbundled EACs for the supplied electricity.{'\n'}
g. Unbundled EACs{'\n'}
h. Unbundled REC’s / I-REC’s{'\n'}
                    </UiText>
                    <UiText size="xl" bold style={styles.questionText}>
                       Acronyms used:
                    </UiText>
                    <UiText size="md" style={ styles.container}>
                        PPA: Power Purchase Agreements{'\n'}
                        EAC: Energy Attribute Certificates{'\n'}
                        I-REC: International Green Energy Certificates{'\n'}
                        GOO: Guarantee of Origin{'\n'}
                    </UiText>
                     <Checkbox
                        size="md"
                        isChecked={acknowledged}
                        onChange={setAcknowledged}
                        isInvalid={false}
                        isDisabled={false} value={''}                >
                    <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                        I have read and acknowledge the eligible and excluded technologies.
                    </CheckboxLabel>
                  </Checkbox>
                    <View style={styles.buttonContainer}>
                      

                        <TouchableOpacity
    style={[
        styles.continueButton,
        !acknowledged && { backgroundColor: '#d3e9a7', opacity: 0.6 }, // faded color and opacity when disabled
    ]}
    onPress={handleContinue}
    disabled={!acknowledged} // disables the button
>
    <UiText size="lg" bold style={styles.continueButtonText}>
        Continue
    </UiText>
</TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
            
             {/* <View style={styles.cloudContainer}>
                 <View
                    style={{
                        width: width * 3, // 40% of screen width, adjust as needed
                        aspectRatio: 1920 / 1080, // Keep original aspect ratio
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
            <LottieView
                source={require('../assets/animations/cloud.json')}
                autoPlay
                loop
                resizeMode='contain'
                style={{ width:200, height: 200 }}
            />
        </View>
         </View> */}
  
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
        width: '10%',
        height: 1,
        backgroundColor: 'transparent',
        marginTop: 40,
        alignSelf: 'center',
        paddingBottom: 4,
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
        maxWidth: '100%',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#15181e',
        textAlign: 'center',
        marginBottom: 20,
    },
     cloudContainer: {
        height: 300,
        position: 'absolute',
        bottom: 10, // Adjust as needed
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
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

export default OrgName;