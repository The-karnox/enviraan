import React from 'react';
import {  View,StyleSheet,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
 import { Button } from "@/components/ui/button";
 import { TouchableOpacity } from "react-native";
 import { Center } from "@/components/ui/center";
 import { useRouter } from 'expo-router';
 import LottieView from 'lottie-react-native';
 import tw from 'twrnc';


const Question0 = () => {
    const router = useRouter();
    return (
        <><LinearGradient
            colors={['#ffffff', '#f1ffdc']}
            style={styles.background}
        ><Box style={styles.box}>
        <Text size='4xl' bold = {true}  style={styles.text}>Let's Calculate Your Carbon Footprint</Text>
        <Text size='lg' style={styles.text2}>Answer a few simple questions about your lifestyle
and activities to see your impact on the
environment. It only takes a few minutes to get
insights and start making a difference!</Text>

    </Box>
    <View style={styles.container}>
    <LottieView
      source={require('../assets/animations/calculator.json')}
      autoPlay
      loop
      style={styles.image}/>
    <Button
      style={styles.button}>
        <TouchableOpacity onPress={() => router.push('./modules')}>   
        <Center>
      <Text size='2xl' style={{color :"#000000"}}>
           Start Calculation
      </Text>
      </Center>
     
      </TouchableOpacity>
    </Button>
    </View>
        </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        
        color: '#000',
        paddingTop: 40,
    },
    text2: {
           color: '#000',
        paddingTop: 20,
    },
    box:{
        backgroundColor: 'transparent',
         padding: 20,
    },
    image: {
        marginTop: 0, 
        width: 350,
        height: 350, 
        marginBottom: 80,
    },
     button: {
        backgroundColor: "#9dfc03",
        width: "90%",
       marginTop: 20,
        borderRadius: 20,
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        
      },
    
});

export default Question0;