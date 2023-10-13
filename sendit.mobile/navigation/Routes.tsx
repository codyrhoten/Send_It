import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import navigationNames from '../constants/navigationNames';
import ProductDetails from "../screens/ProductDetails";
import TabRoutes from './TabRoutes';

const Drawer = createDrawerNavigator();

function Routes({ colorScheme }) {
    return (
        <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Drawer.Navigator screenOptions={{ headerShown: false }} >
                <Drawer.Screen component={TabRoutes} name={'DrawerHome'} />
                <Drawer.Screen component={ProductDetails} name={navigationNames.PRODUCT_DETAILS} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
