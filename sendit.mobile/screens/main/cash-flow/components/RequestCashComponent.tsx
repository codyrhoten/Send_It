import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { cryptoList, fiatList } from './data';

export function RequestCashComponent() {

    const [fiatAmount, setFiatAmount] = useState(500);
    const [fiatUnitPrice, setFiatUnitPrice] = useState(0.73);

    const [cryptoIsOpen, setCryptoIsOpen] = useState(false);
    const [cryptoValueSelected, setCryptoValueSelected] = useState<string>(cryptoList[0].value);

    const [fiatIsOpen, setFiatIsOpen] = useState(false);
    const [fiatValueSelected, setFiatValueSelected] = useState(fiatList[2].value);

    const cryptoSelected = cryptoList.find(p => p.value === cryptoValueSelected);
    const fiatSelected = fiatList.find(p => p.value === fiatValueSelected);

    return (
        <View style={styles.content}>

            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, zIndex: 100 }}>
                    <Text style={{ color: '#666' }}>From </Text>
                    <View style={{ flexGrow: 1 }}>
                        <DropDownPicker
                            searchable={true}
                            open={fiatIsOpen}
                            value={fiatValueSelected}
                            items={fiatList}
                            setOpen={setFiatIsOpen}
                            setValue={setFiatValueSelected}
                            placeholder='Fiat'
                            searchPlaceholder='Search...'
                            listMode='MODAL'
                            modalProps={{
                                animationType: 'slide'
                            }}
                            style={{
                                backgroundColor: 'transparent',
                                minHeight: 30,
                                borderWidth: 0,
                            }}
                            containerStyle={{
                                width: 150,
                            }}
                            searchTextInputStyle={{
                                backgroundColor: '#fff6',
                                borderColor: '#cccc',
                            }}
                            searchContainerStyle={{ borderBottomColor: "#ccc6" }}
                            renderListItem={itemProps => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { setFiatValueSelected(itemProps.value); setFiatIsOpen(false) }}
                                        style={{
                                            padding: 10,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            // borderTopWidth: itemProps.isSelected ? 1 : 0,
                                            // borderBottomWidth: itemProps.isSelected ? 1 : 0,
                                            // borderColor: '#ccc8',
                                        }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={{ uri: `https://flagcdn.com/h20/${itemProps.item.alpha2code}.png` }} style={{ width: 38, height: 20 }} />
                                            <Text style={{ marginHorizontal: 10 }}>{itemProps.item.title}</Text>
                                        </View>
                                        {itemProps.isSelected === true && (
                                            <itemProps.TickIconComponent />
                                        )}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={{
                            flexGrow: 1,
                            backgroundColor: '#fffa',
                            borderColor: '#cccc',
                            padding: 12,
                            borderRadius: 5,
                            borderWidth: 1,
                            marginRight: 8,
                            height: 40
                        }}
                        keyboardType='numeric'
                        returnKeyType='done'
                        onChangeText={(text) => setFiatAmount(Number.parseFloat(text))}
                        value={fiatAmount.toString()}
                        maxLength={10}
                    />

                </View>
                {false && <View>
                    <Text style={{ marginTop: 5, color: '#f57c71', fontWeight: '600' }}>Invalid</Text>
                </View>}
            </View>

            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, zIndex: 100 }}>
                    <Text style={{ color: '#666' }}>To</Text>
                    <View style={{ flexGrow: 1 }}>
                        <DropDownPicker
                            searchable={true}
                            open={cryptoIsOpen}
                            value={cryptoValueSelected}
                            items={cryptoList}
                            setOpen={setCryptoIsOpen}
                            setValue={setCryptoValueSelected}
                            placeholder='Crypto'
                            searchPlaceholder='Search...'
                            listMode='MODAL'
                            modalProps={{
                                animationType: 'slide'
                            }}
                            style={{
                                backgroundColor: 'transparent',
                                minHeight: 30,
                                borderWidth: 0,
                            }}
                            containerStyle={{
                                width: 140,
                            }}
                            searchTextInputStyle={{
                                backgroundColor: '#fff6',
                                borderColor: '#cccc',
                            }}
                            searchContainerStyle={{ borderBottomColor: "#ccc6" }}
                        />
                    </View>
                    <Text style={{ color: '#666' }}>unit price</Text>
                    <Text style={{ fontSize: 12, color: '#888' }}> (optional)</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={{
                            flexGrow: 1,
                            backgroundColor: '#fffa',
                            borderColor: '#cccc',
                            padding: 12,
                            borderRadius: 5,
                            borderWidth: 1,
                            marginRight: 8,
                            height: 40
                        }}
                        keyboardType='numeric'
                        returnKeyType='done'
                        onChangeText={(text) => setFiatUnitPrice(Number.parseFloat(text))}
                        value={fiatUnitPrice.toString()}
                        maxLength={10}
                    />
                    <TouchableOpacity style={{
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'black',
                        borderRadius: 5,
                        elevation: 5,
                    }} onPress={() => { }}>
                        <Feather name="refresh-cw" size={14} color="white" />
                    </TouchableOpacity>
                </View>
                {false && <View>
                    <Text style={{ marginTop: 5, color: '#f57c71', fontWeight: '600' }}>Invalid</Text>
                </View>}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: '#666' }}>Approximately you will get</Text>
                    <MaterialCommunityIcons name="approximately-equal" size={24} color="#888" />
                    <Text style={{ fontSize: 12, color: '#666' }}>{(fiatAmount * fiatUnitPrice).toFixed()} {cryptoSelected.label}</Text>
                </View>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    content: {

    },
});
