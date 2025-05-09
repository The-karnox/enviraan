import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Center } from "@/components/ui/center";
import { AlertCircleIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import vector from "../assets/images/vector.png";
import Group from "../assets/images/Group.png";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Button } from "@/components/ui/button";
import { TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';
import { useCarbonFootprint } from './CarbonFootprintContext'; // Import the context
import { LinearGradient } from 'expo-linear-gradient';
import { calculateCarbonFootprint } from './indiFootprintcalculator';

const { width, height } = Dimensions.get('window');


const getCurrentDate = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
  };
  return date.toLocaleDateString('en-US', options);
};

const HomePage = () => {
  const router = useRouter();
  const { updateCarbonData, carbonData, resetCarbonData } = useCarbonFootprint(); // Access the context
  const totalFootprint = calculateCarbonFootprint(carbonData);

  const handleCalculate = () => {
       resetCarbonData?.(); 
      updateCarbonData('lastCalculatedFootprint', totalFootprint); // Save the value
      updateCarbonData('lastCalculatedDate', getCurrentDate()); // Save the date
      router.push('/');
      // Navigate to the next page
  };
  const getBadgeText = () => {
    const footprint = carbonData.lastCalculatedFootprint || 0; // Default to 0 if undefined
    if (footprint < 5) return 'Low';
    if (footprint >= 5 && footprint <= 10) return 'Moderate';
    return 'High';
  };

  if (Platform.OS === 'web') {
      return (
        <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.webBackground}>
        <View style={styles.webContainer}>
          <Badge size="lg" variant="solid" action="warning" style={styles.webBadge}>
            <BadgeIcon as={AlertCircleIcon} className="ml-2" />
            <BadgeText> {getBadgeText()}</BadgeText>
          </Badge>

          <Text style={styles.webText} size="lg">
            Your calculated carbon footprint
          </Text>

          <Heading size="5xl" style={styles.webHeading}>
            {(totalFootprint/1000).toFixed(2)}
          </Heading>

          <Text size="md" style={styles.webSubText}>
            tonnes CO2e
          </Text>

          <Text size="sm" style={styles.webDateText}>
            Last Calculated On: {carbonData.lastCalculatedDate || 'N/A'}
          </Text>

         

          {/* Calculate Button */}
         
            <TouchableOpacity style={styles.webButton} onPress={handleCalculate}>
              <Text size="lg" style={styles.webButtonText}>
                Calculate
              </Text>
            </TouchableOpacity>
        
        </View>
      </LinearGradient>
    );
  } else {
      return (
          <View style={styles.container}>
              <ImageBackground source={vector} style={styles.image} />
              <ImageBackground source={Group} style={styles.groupImage} />

              <Avatar size="lg" style={styles.avatar}>
                  <AvatarFallbackText />
                  <AvatarImage source={{
                      uri: "https://api.dicebear.com/9.x/avataaars-neutral/svg"
                  }} />
                  <AvatarBadge />
              </Avatar>
              <Center>
                  <VStack style={styles.Vstack}>
                      <Center>
                          <Badge size="lg" variant="solid" action="warning" style={styles.spacing}>
                              <BadgeIcon as={AlertCircleIcon} className="ml-2" />
                              <BadgeText> Moderate</BadgeText>
                          </Badge>
                      </Center>
                      <Center>
                          <Text style={styles.spacing2} size="lg">
                              Your last calculated carbon footprint
                          </Text>
                      </Center>
                      <Center>
                          <Heading size="5xl" style={{ color: "#2d4901" }}>
                              {carbonData.lastCalculatedFootprint || 'N/A'}
                          </Heading>
                      </Center>
                      <Center>
                          <Text style={styles.spacing2} size="md" style={{ color: "#6f7d95" }}>
                              Tons of CO2
                          </Text>
                      </Center>
                      <Center>
                          <Text style={{ color: "#79879d" }} size="sm">
                              Last Calculated On: {carbonData.lastCalculatedDate || 'N/A'}
                          </Text>
                      </Center>
                      <Center className="w-[300px] h-[150px]">
                          <Progress value={75} size="lg" orientation="horizontal" style={styles.spacing3}>
                              <ProgressFilledTrack style={styles.progressFilledTrack} />
                          </Progress>
                          <Button style={styles.button}>
                              <TouchableOpacity style={styles.button} onPress={handleCalculate}>
                                  <Center>
                                      <Text size='2xl' style={{ color: "#000000" }}>
                                          Calculate
                                      </Text>
                                  </Center>
                              </TouchableOpacity>
                          </Button>
                      </Center>
                  </VStack>
              </Center>
          </View>
      );
  }
};

const styles = StyleSheet.create({
  webBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webContainer: {
    width: '60%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    // Removed background color and shadow for transparency
    backgroundColor: 'transparent',
  },
  webBadge: {
    marginBottom: 20,
  },
  webText: {
    marginBottom: 10,
    color: '#6f7d95',
    textAlign: 'center',
  },
  webHeading: {
    color: '#2d4901',
    marginBottom: 10,
  },
  webSubText: {
    color: '#6f7d95',
    marginBottom: 20,
  },
  webDateText: {
    color: '#79879d',
    marginBottom: 30,
  },


  webButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a4e22b',
  },
  webButtonText: {
    color: '#000000',
    fontWeight: 'normal',
  },
});

export default HomePage;