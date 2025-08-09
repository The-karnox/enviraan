import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCarbonFootprint } from './CarbonFootprintContext';
import { calculateCorporateCarbonFootprint } from './coorpCFCalculator';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

const HomeEnterprise = () => {
  const router = useRouter();
  const { carbonData, resetCarbonData } = useCarbonFootprint();

  const { scope1, scope2, scope3, total } = calculateCorporateCarbonFootprint(carbonData);

  // This effect runs when the component mounts, sending data to the backend
  useEffect(() => {
    const saveFootprintData = async () => {
      const payload = {
        calculatedOn: new Date().toISOString(),
        scope1,
        scope2,
        scope3,
        total,
        fullData: carbonData, // Send the complete raw data as well
      };

      try {
        // IMPORTANT: Replace <YOUR_LOCAL_IP> with your computer's actual IP address
        const response = await fetch('http://<YOUR_LOCAL_IP>:3001/api/footprint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Backend response:', result.message);

      } catch (error) {
        console.error('Failed to send data to server:', error);
        Alert.alert('Save Error', 'Could not save footprint data to the server.');
      }
    };

    saveFootprintData();
  }, []); // The empty array ensures this runs only once

  const handleContinue = () => {
    resetCarbonData?.();
    router.push('/');
  };

  return (
    <LinearGradient colors={['#ffffff', '#f1ffdc']} style={styles.background}>
      <View style={styles.container}>
        <Heading style={styles.mainTitle}>Emission Summary</Heading>

        <View style={styles.scopesContainer}>
          {/* Scope 1 Card */}
          <View style={styles.scopeCard}>
            <Text style={styles.scopeTitle}>Direct Emissions</Text>
            <Heading style={styles.scopeValue}>{(scope1 * 1000).toFixed(3)} kg CO₂e</Heading>
            <Text style={styles.scopeSubValue}>{scope1.toFixed(6)} tonnes CO₂e</Text>
          </View>

          {/* Scope 2 Card */}
          <View style={styles.scopeCard}>
            <Text style={styles.scopeTitle}>Indirect Emissions</Text>
            <Heading style={styles.scopeValue}>{(scope2 * 1000).toFixed(3)} kg CO₂e</Heading>
            <Text style={styles.scopeSubValue}>{scope2.toFixed(6)} tonnes CO₂e</Text>
          </View>

          {/* Scope 3 Card */}
          <View style={[styles.scopeCard, styles.scope3Card]}>
            <Text style={styles.scopeTitle}>Other Indirect Emissions</Text>
            <Heading style={styles.scopeValue}>{(scope3 * 1000).toFixed(3)} kg CO₂e</Heading>
            <Text style={styles.scopeSubValue}>{scope3.toFixed(6)} tonnes CO₂e</Text>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Total Carbon Footprint</Text>
          <Heading style={styles.totalValue}>{total.toFixed(2)}</Heading>
          <Text style={styles.totalUnit}>tonnes CO₂e</Text>
          <Text style={styles.dateText}>
            Last Calculated On: {new Date().toLocaleDateString()}
          </Text>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 800,
    alignItems: 'center',
    padding: 20,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2d4901',
    marginBottom: 30,
  },
  scopesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  scopeCard: {
    backgroundColor: '#f6ffec',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0f0c9',
    padding: 20,
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  scope3Card: {
    width: '100%',
  },
  scopeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d4901',
    marginBottom: 8,
  },
  scopeValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d4901',
    marginBottom: 4,
  },
  scopeSubValue: {
    fontSize: 14,
    color: '#6f7d95',
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  totalTitle: {
    fontSize: 18,
    color: '#6f7d95',
    marginBottom: 10,
  },
  totalValue: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#2d4901',
  },
  totalUnit: {
    fontSize: 16,
    color: '#6f7d95',
    marginTop: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#79879d',
  },
  continueButton: {
    backgroundColor: '#a4e22b',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeEnterprise;