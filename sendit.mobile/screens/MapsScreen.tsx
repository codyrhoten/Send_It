import * as React from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import MapView, { Camera, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location";
import { BlurView } from 'expo-blur';

import { Text, View } from '../components/Themed';
import MenuIcon from '../components/MenuIcon';
import navigationSizes from '../constants/navigationSizes';

export default function MapsScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [initialRegion, setInitialRegion] = React.useState(null);

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            title: 'Send It!',
            headerBackground: () => (
                <BlurView tint="light" intensity={30} style={StyleSheet.absoluteFill} />
            ),
            headerLeft: (props: StackHeaderProps) => (<MenuIcon />)
        } as DrawerNavigationOptions);

        getLocation();
    }, []);

    const map: React.LegacyRef<MapView> = React.useRef(null);

    const onZoomInPress = () => {
        map?.current?.getCamera().then((cam: Camera) => {
            cam.zoom += 1;
            map?.current?.animateCamera(cam);
        });
    };
    const onZoomOutPress = () => {
        map?.current?.getCamera().then((cam: Camera) => {
            cam.zoom -= 1;
            map?.current?.animateCamera(cam);
        });
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);

        setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });
    };

    return (
        <View style={styles.centered}>
            {initialRegion && (
                <>
                    <MapView
                        ref={map}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={initialRegion}>
                        {currentLocation && (
                            <Marker
                                coordinate={{
                                    latitude: currentLocation.latitude,
                                    longitude: currentLocation.longitude,
                                }}
                                title="Your Location" />
                        )}
                    </MapView>
                    <BlurView style={{ ...styles.actions, bottom: navigationSizes.TAB_BAR_HEIGHT + insets.bottom }} tint="light" intensity={70} >
                        <Text>bkbkkbkvk</Text>
                        <Button
                            title='Zoom In'
                            onPress={onZoomInPress}
                        />
                        <Button
                            title='Zoom Out'
                            onPress={onZoomOutPress}
                        />
                    </BlurView>

                </>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    centered: {
        position: 'relative',
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%',
    },
    actions: {
        position: 'absolute',
        width: '100%',
    }
});
