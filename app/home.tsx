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

const { width, height } = Dimensions.get('window');

const getCurrentDate = () => {
  const date = new Date();
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const HomePage = () => {
  const router = useRouter();
  const { updateCarbonData, carbonData } = useCarbonFootprint(); // Access the context

  const handleCalculate = () => {
      // Example: Save the last calculated carbon footprint to the context
      updateCarbonData('lastCalculatedFootprint', 7.5); // Save the value
      updateCarbonData('lastCalculatedDate', getCurrentDate()); // Save the date
      router.push('/'); // Navigate to the next page
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
            Your last calculated carbon footprint
          </Text>

          <Heading size="5xl" style={styles.webHeading}>
            {carbonData.lastCalculatedFootprint || 'N/A'}
          </Heading>

          <Text size="md" style={styles.webSubText}>
            tonnes CO2e
          </Text>

          <Text size="sm" style={styles.webDateText}>
            Last Calculated On: {carbonData.lastCalculatedDate || 'N/A'}
          </Text>

          {/* Progress Bars */}
          <View style={styles.webProgressContainer}>
            <View style={styles.webProgressRow}>
              <Text size="sm" style={styles.webProgressLabel}>
                Avg. India
              </Text>
              <Progress value={80} size="sm" style={styles.webProgressBar}>
                <ProgressFilledTrack style={styles.webProgressFilledIndia} />
              </Progress>
              <Text size="sm" style={styles.webProgressValue}>
                13.50 tons
              </Text>
            </View>

            <View style={styles.webProgressRow}>
              <Text size="sm" style={styles.webProgressLabel}>
                Avg. World
              </Text>
              <Progress value={30} size="sm" style={styles.webProgressBar}>
                <ProgressFilledTrack style={styles.webProgressFilledWorld} />
              </Progress>
              <Text size="sm" style={styles.webProgressValue}>
                4.50 tons
              </Text>
            </View>
          </View>

          {/* Calculate Button */}
          <Button style={styles.webButton}>
            <TouchableOpacity onPress={handleCalculate}>
              <Text size="lg" style={styles.webButtonText}>
                Calculate
              </Text>
            </TouchableOpacity>
          </Button>
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
  webProgressContainer: {
    width: '40%',
    marginBottom: 30,
    backgroundColor: 'ffffff',
    borderRadius: 10,
  },
  webProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  webProgressLabel: {
    flex: 1,
    color: '#6f7d95',
  },
  webProgressBar: {
    flex: 3,
    marginHorizontal: 10,
  },
  webProgressFilledIndia: {
    backgroundColor: '#62ffcb',
  },
  webProgressFilledWorld: {
    backgroundColor: "#6267ff", 
  },
  webProgressValue: {
    flex: 1,
    textAlign: 'right',
    color: '#6f7d95',
  },
  webButton: {
    backgroundColor: '#9dfc03',
    paddingVertical: 15,
    paddingHorizontal: 200,
    marginBottom: 20,
    borderRadius: 35,
    alignItems: 'center',
  },
  webButtonText: {
    color: '#000000',
    fontWeight: 'normal',
  },
});

export default HomePage;