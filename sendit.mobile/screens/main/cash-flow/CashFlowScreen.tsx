import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Pressable, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import MapView, { Camera, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from "expo-location";
import { BlurView } from 'expo-blur';

import { useKeyboardHeight } from '@/hooks';
import MenuIcon from '@/components/MenuIcon';
import { MainConstants } from '../MainConstants';
import { BottomModalComponent } from '@/components';
import { CashFlowPicker } from './components';

export function CashFlowScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const keyboardHeight = useKeyboardHeight();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: 'Send It!',
            headerBackground: () => (
                <BlurView tint="light" intensity={10} style={StyleSheet.absoluteFill} />
            ),
            headerLeft: (props: StackHeaderProps) => (<MenuIcon />)
        } as DrawerNavigationOptions);

        getLocation();
    }, []);

    const map: React.LegacyRef<MapView> = useRef(null);

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
                    <BottomModalComponent title='I want to' isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} titleAlign='left' blurIntensity={100}>
                        <CashFlowPicker onCloseModal={() => setIsModalVisible(false)}></CashFlowPicker>
                    </BottomModalComponent>
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
                    <BlurView
                        style={{
                            ...styles.actions,
                            bottom: keyboardHeight ? insets.bottom : MainConstants.TAB_BAR_HEIGHT + insets.bottom
                        }}
                        tint="light"
                        intensity={50}
                    >
                        <View>
                            <Pressable style={{
                                paddingVertical: 5,
                                paddingHorizontal: 5,
                                borderRadius: 5,
                                elevation: 3,
                                backgroundColor: 'black',
                            }} onPress={() => setIsModalVisible(true)}>
                                <Text style={styles.findButtonText}>Select coin</Text>
                            </Pressable>
                        </View>
                        <TextInput placeholder='Delivery location' style={styles.locationInput} />
                        <View style={styles.actionsButtons}>
                            <Pressable style={styles.findButton} onPress={onZoomOutPress}>
                                <Text style={styles.findButtonText}>Find a delivery</Text>
                            </Pressable>
                            <Pressable style={styles.optionsButton} onPress={() => setIsModalVisible(true)}>
                                <Ionicons name="options-outline" size={24} color="white" />
                            </Pressable>
                        </View>

                    </BlurView>
                </>
            )
            }
        </View >
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
        alignItems: 'center',
        paddingTop: 20,
    },
    locationInput: {
        width: '90%',
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        borderRadius: 5,
        elevation: 3,
    },
    actionsButtons: {
        flexDirection: 'row',
        marginBottom: 12,
        marginLeft: '5%',
        marginRight: '5%'
    },
    findButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'black',
    },
    findButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    optionsButton: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        elevation: 3,
        marginLeft: 10,
        backgroundColor: 'black',
    },
});
