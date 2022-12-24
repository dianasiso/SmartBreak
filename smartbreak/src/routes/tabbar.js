// Screens
import { Dashboard } from '../screens/dashboard';
import { Goals } from '../screens/goals';
import { Stats } from '../screens/stats';
import { Profile } from '../screens/profile';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Screen, Navigator } = createBottomTabNavigator();

export function Tabbar() {
    return (
        <Navigator>
            <Screen
                name='Painel'
                component={ Dashboard }
            />
            <Screen
                name='Objetivos'
                component={ Goals }
            />
            <Screen
                name='Estatísticas'
                component={ Stats }
            />
            <Screen
                name='Profile '
                component={ Perfil }
            />
        </Navigator>
    )
}