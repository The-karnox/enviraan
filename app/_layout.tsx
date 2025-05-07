import {Slot, Stack, Tabs } from "expo-router";

import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { CarbonFootprintProvider } from "./CarbonFootprintContext";

export default function RootLayout(){
    
    return(
    <CarbonFootprintProvider>
         <GluestackUIProvider>
        <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>;
    </CarbonFootprintProvider>
    );
}