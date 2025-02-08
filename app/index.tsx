import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
  } from '@/components/ui/avatar';
  import { View, Text,Image, StyleSheet } from "react-native";
  import vector from "../assets/images/vector.png";

export default function avatar(){
    return(
        <View style={styles.container}>
            <Image source={vector} style={styles.Image} />
        <Avatar  size="lg">
          <AvatarFallbackText />
          <AvatarImage source={{
          uri:"https://api.dicebear.com/9.x/avataaars-neutral/svg"}} />
            
          <AvatarBadge />
        </Avatar>
        </View>
        );
    }
      const styles = StyleSheet.create({
        container: {
            flex: 1,
            position: 'absolute',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            paddingTop: 50,
            paddingBottom: 500,
            paddingRight: 20,
        },
        Image: {
            width: '100%',
            height: '100%',
            marginTop:50,
        }
    });
