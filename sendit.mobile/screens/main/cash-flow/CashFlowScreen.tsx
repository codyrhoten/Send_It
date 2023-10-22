import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Camera, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from "expo-location";
import { BlurView } from 'expo-blur';

import { useKeyboardHeight } from '@/hooks';
import { MainConstants } from '../MainConstants';
import { BottomModalComponent } from '@/components';
import { CashFlowPicker, LookingCourierComponent } from './components';

export function CashFlowScreen() {
    const insets = useSafeAreaInsets();
    const keyboardHeight = useKeyboardHeight();

    const [isLookingCourierModalVisible, setIsLookingCouriersModalVisible] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
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

        let location = await Location.getCurrentPositionAsync();
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
                        <CashFlowPicker onCloseModal={() => setIsModalVisible(false)} />
                    </BottomModalComponent>
                    <LookingCourierComponent isVisible={isLookingCourierModalVisible} onClose={() => setIsLookingCouriersModalVisible(false)} />

                    <MapView
                        ref={map}
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
                        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ marginHorizontal: 10, color: '#666', fontWeight: '600' }}>100 USDT</Text>
                                <Image source={require(`../../../assets/tokens/${'usdt'}.png`)} style={{
                                    left: 3,
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                    borderColor: '#999c',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                }} />
                                <Image source={require(`../../../assets/flags/${'ca'}.png`)} style={{
                                    left: -3,
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                    borderColor: '#999c',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                }} />
                                <Text style={{ marginHorizontal: 10, color: '#666', fontWeight: '600' }}>136.51* $ CAD</Text>
                            </View>
                        </TouchableOpacity>
                        <TextInput
                            placeholder='Delivery location'
                            style={styles.locationInput}
                            value='1800 Ellis St, San Francisco, CA 94115, USA'
                        />
                        <View style={styles.actionsButtons}>
                            <TouchableOpacity style={styles.findButton} onPress={() => setIsLookingCouriersModalVisible(true)}>
                                <Text style={styles.findButtonText}>Find an exchanger</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionsButton} onPress={() => setIsModalVisible(true)}>
                                <Ionicons name="options-outline" size={24} color="white" />
                            </TouchableOpacity>
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
        alignItems: 'stretch',
        padding: 20,
    },
    locationInput: {
        height: 44,
        padding: 12,
        marginVertical: 18,
        backgroundColor: '#fffa',
        borderColor: '#cccc',
        borderRadius: 5,
        borderWidth: 1,
        elevation: 5,
    },
    actionsButtons: {
        flexDirection: 'row',
    },
    findButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        paddingVertical: 12,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'black',
    },
    findButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: 'white',
    },
    optionsButton: {
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 12,
        borderRadius: 5,
        elevation: 3,
        marginLeft: 10,
    },
});
