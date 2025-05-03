import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
  import { Slider,SliderThumb, SliderTrack, SliderFilledTrack } from '@/components/ui/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Text as UiText } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const others7 = () => {
    const router = useRouter(); // Initialize the router
    const [sliderValue, setSliderValue] = useState(0);

    return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <Progress value={8} size="xs"    style={styles.progressBar}>
                        <ProgressFilledTrack className="bg-[#a4e22b]"/>
                    </Progress>
                </View>

                <View style={styles.contentContainer}>
                    <UiText size="xl" bold style={styles.questionText}>
                    What percentage of waste is recyled, reused, or diverted from landfill?
                    </UiText>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '40%' }}>

                    <UiText style={{ marginRight: 10, fontSize: 18, fontWeight: "bold" }}>{sliderValue}</UiText>

{/* Slider Component */}
<Slider
  defaultValue={0}
  minValue={0}
  maxValue={100}
  step={1}
  onChange={(val) => setSliderValue(val)}
  sliderTrackHeight={10}
  style={{  flex: 1, marginHorizontal: 10, }}
>
  <SliderTrack style={{ backgroundColor: "#d3d3d3" }}>
    <SliderFilledTrack style={{ backgroundColor: "#a4e22b" }} /> {/* Green Track */}
  </SliderTrack>
  <SliderThumb style={{ backgroundColor: "#a4e22b", width: 20, height: 20 }} /> {/* Green Thumb */}
</Slider>

{/* Right Max Value Display */}
<UiText style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>100</UiText>
</View>
                   

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => router.push('/others8')}
                        >
                            <UiText size="lg" style={styles.skipButtonText}>
                                Skip
                            </UiText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={() => router.push({ pathname: '/others8', params: {sliderValue} })} 
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
        width: '110%',
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

export default others7; 