import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
  } from '@/components/ui/avatar';
  import { Badge, BadgeIcon, BadgeText  } from "@/components/ui/badge";
  import { Center } from "@/components/ui/center";
  import { AlertCircleIcon } from "@/components/ui/icon";
  import { VStack } from "@/components/ui/vstack";
  import { View, StyleSheet, ImageBackground,Dimensions } from "react-native";
  import vector from "../assets/images/vector.png";
  import Group from "../assets/images/Group.png";
  import { Text } from "@/components/ui/text";
  import { Heading } from "@/components/ui/heading";
  import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
  import { Button } from "@/components/ui/button"
  import { TouchableOpacity } from "react-native";
  import { useRouter } from 'expo-router';




  const { width, height } = Dimensions.get('window');
  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};
  const App = () => {
    const router = useRouter();
    return(
        <View style={styles.container}>
            <ImageBackground source={vector} style={styles.image} />
            <ImageBackground source={Group} style={styles.groupImage} />

        <Avatar  size="lg" style={styles.avatar}>
          <AvatarFallbackText />
          <AvatarImage source={{
          uri:"https://api.dicebear.com/9.x/avataaars-neutral/svg"}} />
            
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
      <Text style={{color :"#313840"}} style={styles.spacing2} size="lg">Your last calculated carbon footprint</Text>
      </Center>
      <Center>
      <Heading size="5xl" style={{color :"#2d4901"}}>7.50</Heading>
      </Center>
      <Center>
      <Text style={{color :"#6f7d95"}} size="md" style={styles.spacing2}>Tons of CO2</Text>
      </Center>
      <Center>
      <Text style={{color :"#79879d"}} size="sm">Last Calculated On: {getCurrentDate()} </Text>
      </Center>
      <Center className="w-[300px] h-[150px]">
      <Progress value={75} size="lg" orientation="horizontal" style={styles.spacing3}>
        <ProgressFilledTrack style={styles.progressFilledTrack}/>
      </Progress>
      <Button
      style={styles.button}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./app/Question0')}>   
          <Center>
      <Text size='2xl' style={{color :"#000000"}}>
           Continue
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
      const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FDFFFB',
        },
        image: {
           position: 'absolute',
           left: 0,
           top: height*0.27,
           width: '100%',
           height: '100%', 
        },
        groupImage: {
          position: 'absolute',
          left: -1,
          top: 80,
          width: 380,  
          height: 210,
        },
        avatar: {
          position: 'relative',
          top: 45, 
          left: 310, 
      },
      // badge:{
      //   position: 'absolute',
      //   top: '50%',
      //   left: '50%',
        // transform: [{ translateX: -50 }, { translateY: -50 }],
      
      Vstack:{
        marginTop:230,
      },
      spacing: {
        marginBottom: 6,
      },
      spacing2: {
        marginBottom: 14,
      },
      spacing3: {
        marginBottom: 48,
      },
      progressFilledTrack: {
        backgroundColor: "#62ffcb", 
      },
      button: {
        backgroundColor: "#9dfc03",
        width: "100%",
        borderRadius: 20,
        textAlign: "center",
      },
   } );
  
export default App;