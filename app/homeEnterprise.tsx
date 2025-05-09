import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext'; // Import the context
import { calculateCorporateCarbonFootprint } from './coorpCFCalculator'; // Import the calculator
import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

const { width, height } = Dimensions.get('window');

const HomeEnterprise = () => {
  const router = useRouter();
  const { carbonData, resetCarbonData } = useCarbonFootprint(); // Access the context

  // Dynamically calculate the carbon footprint
  const totalFootprint = calculateCorporateCarbonFootprint(carbonData);

  const handleContinue = () => {
    // Reset the context data
    resetCarbonData?.();
     
    // Navigate to the starting point
    router.push('/');
  };

  const getBadgeText = () => {
    const footprint = totalFootprint || 0; // Default to 0 if undefined
    if (footprint < 5) return 'Low';
    if (footprint >= 5 && footprint <= 10) return 'Moderate';
    return 'High';
  };

  return (
    <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.webBackground}>
      <View style={styles.webContainer}>
        {/* Badge */}
        <Badge size="lg" variant="solid" action="warning" style={styles.webBadge}>
          <BadgeIcon as={AlertCircleIcon} className="ml-2" />
          <BadgeText>{getBadgeText()}</BadgeText>
        </Badge>

        {/* Carbon Footprint Data */}
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

        {/* Continue Button */}
        
          <TouchableOpacity style={styles.webButton} onPress={handleContinue}>
            <Text size="lg" style={styles.webButtonText}>
              Continue
            </Text>
          </TouchableOpacity>
      
      </View>
    </LinearGradient>
  );
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
  webDateText: {
    color: '#79879d',
    marginBottom: 30,
  },
  webSubText: {
    color: '#6f7d95',
    marginBottom: 20,
  },
  webButton: {
    backgroundColor: '#a4e22b',
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

export default HomeEnterprise;