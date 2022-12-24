import { NavigationContainer } from "@react-navigation/native";

import { Tabbar } from './tabbar';

export function Routes() {
    return (
        <NavigationContainer>
           <Tabbar /> 
        </NavigationContainer>
    )
}