import {Slot, Stack, Tabs } from "expo-router";

import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout(){
    
    return <GluestackUIProvider>
        <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>;
}