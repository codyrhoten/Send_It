import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Toggle from "react-native-toggle-element";
import DropDownPicker from 'react-native-dropdown-picker';
import { SvgUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

const cryptoList = [
    {
        label: 'USDT',
        value: 'usdt',
        icon: () => <SvgUri uri='https://static.biswap.org/bs/coins/usdt.svg' width={20} height={20} />
    },
    {
        label: 'USDC',
        value: 'usdc',
        icon: () => <SvgUri uri='https://static.biswap.org/bs/coins/usdc.svg' width={20} height={20} />
    },
    {
        label: 'ETH',
        value: 'eth',
        icon: () => <SvgUri uri='https://static.biswap.org/bs/coins/eth.svg' width={20} height={20} />
    }
];
const currencyList = [
    {
        label: '$ USD',
        value: 'usd',
        alpha2code: 'us',
        title: '$ United States dollar',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/w20/us.png' }} style={{ width: 20, height: 11 }} />
    },
    {
        label: '€ EUR',
        value: 'eur',
        alpha2code: 'eu',
        title: '€ Euro',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/w20/eu.png' }} style={{ width: 20, height: 11 }} />
    },
    {
        label: '$ CAD',
        value: 'cad',
        alpha2code: 'ca',
        title: '$ Canadian dollar',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/w20/ca.png' }} style={{ width: 20, height: 11 }} />
    },
    {
        label: '¥ CNY',
        value: 'cny',
        alpha2code: 'cn',
        title: '¥ Chinese yuan',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/w20/cn.png' }} style={{ width: 20, height: 11 }} />
    },
    {
        label: '฿ THB',
        value: 'thb',
        alpha2code: 'th',
        title: '฿ Thai baht',
        icon: () => <Image source={{ uri: 'https://flagcdn.com/w20/th.png' }} style={{ width: 20, height: 11 }} />
    }
];

export function CashFlowPicker({ onCloseModal }) {
    const [isSelling, setIsSelling] = useState(false);

    const [cryptoIsOpen, setCryptoIsOpen] = useState(false);
    const [cryptoSelected, setCryptoSelected] = useState<string>(cryptoList[0].value);

    const [currencyIsOpen, setCurrencyIsOpen] = useState(false);
    const [currencySelected, setCurrencySelected] = useState(currencyList[0].value);

    return (
        <View style={styles.content}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Toggle
                    value={isSelling}
                    onPress={(newState) => setIsSelling(newState)}
                    thumbButton={{
                        width: 170,
                        height: 40,
                        radius: 5,
                        activeBackgroundColor: '#f57c71',
                        inActiveBackgroundColor: '#add88d',
                    }}
                    trackBar={{
                        width: 355,
                        height: 40,
                        radius: 5,
                        borderWidth: 1,
                        activeBackgroundColor: "#ddd3",
                        inActiveBackgroundColor: "#ddd3",
                    }}
                    trackBarStyle={{
                        borderColor: "#ccc2",
                    }}
                    leftComponent={
                        <Text style={{ fontWeight: 'bold', color: isSelling ? '#888' : '#000' }}>Buy cash</Text>
                    }
                    rightComponent={
                        <Text style={{ fontWeight: 'bold', color: isSelling ? '#000' : '#888' }}>Sell cash</Text>
                    }
                />
            </View>
            <View>
                {isSelling ? <>
                    <View>
                        <View style={{ paddingTop: 200 }}></View>
                    </View>
                </> : <>
                    <View>

                        <View style={{ marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, zIndex: 100 }}>
                                <Text style={{ color: '#666' }}>From</Text>
                                <View style={{ flexGrow: 1 }}>
                                    <DropDownPicker
                                        searchable={true}
                                        open={cryptoIsOpen}
                                        value={cryptoSelected}
                                        items={cryptoList}
                                        setOpen={setCryptoIsOpen}
                                        setValue={setCryptoSelected}
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
                                        dropDownContainerStyle={{
                                            backgroundColor: '#fffc',
                                            borderColor: '#cccc',
                                        }}
                                        containerStyle={{
                                            width: 140,
                                        }}
                                        searchTextInputStyle={{
                                            backgroundColor: '#fffc',
                                            borderColor: '#cccc',
                                        }}
                                        searchContainerStyle={{ borderBottomColor: "#ccc6" }}
                                    />
                                </View>
                                <Text style={{ color: '#666', marginHorizontal: 5 }}>Balance: 1000.0</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{
                                        flexGrow: 1,
                                        backgroundColor: '#fffc',
                                        borderColor: '#cccc',
                                        padding: 12,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        marginRight: 8,
                                        height: 40
                                    }}
                                    keyboardType='numeric'
                                    returnKeyType='done'
                                    //onChangeText={(text) => this.onChanged(text)}
                                    //value={this.state.myNumber}
                                    maxLength={10}  //setting limit of input
                                />
                                <Pressable style={{
                                    width: 40,
                                    backgroundColor: 'black',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    elevation: 5,
                                }} onPress={() => { }}>
                                    <Text style={{
                                        fontWeight: '500',
                                        color: 'white',
                                    }}>Max</Text>
                                </Pressable>
                            </View>
                            {false && <View>
                                <Text style={{ marginTop: 5, color: '#f57c71', fontWeight: '600' }}>Invalid</Text>
                            </View>}
                        </View>



                        <View style={{ marginBottom: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, zIndex: 100 }}>
                                <Text style={{ color: '#666' }}>Fiat </Text>
                                <View style={{ flexGrow: 1 }}>
                                    <DropDownPicker
                                        searchable={true}
                                        open={currencyIsOpen}
                                        value={currencySelected}
                                        items={currencyList}
                                        setOpen={setCurrencyIsOpen}
                                        setValue={setCurrencySelected}
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
                                            backgroundColor: '#fffc',
                                            borderColor: '#cccc',
                                        }}
                                        searchContainerStyle={{ borderBottomColor: "#ccc6" }}
                                        renderListItem={itemProps => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => { setCurrencySelected(itemProps.value); setCurrencyIsOpen(false) }}
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 5,
                                                        marginLeft: 10,
                                                        borderTopWidth: itemProps.isSelected ? 1 : 0,
                                                        borderBottomWidth: itemProps.isSelected ? 1 : 0,
                                                        borderColor: '#cccc',
                                                    }}>
                                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image source={{ uri: `https://flagcdn.com/w20/${itemProps.item.alpha2code}.png` }} style={{ width: 20, height: 11 }} />
                                                        <View
                                                            style={{
                                                                //backgroundColor: itemProps.value,
                                                                marginRight: 10,
                                                                width: 20,
                                                                height: 20,
                                                            }}
                                                        />
                                                        <Text>{itemProps.item.title}</Text>
                                                    </View>
                                                    {itemProps.isSelected === true && (
                                                        <itemProps.TickIconComponent />
                                                    )}
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>
                                <Text style={{ color: '#666' }}>unit price</Text>
                                <Text style={{ fontSize: 12, color: '#888' }}> (optional)</Text>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{
                                        flexGrow: 1,
                                        backgroundColor: '#fffc',
                                        borderColor: '#cccc',
                                        padding: 12,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        marginRight: 8,
                                        height: 40
                                    }}
                                    keyboardType='numeric'
                                    returnKeyType='done'
                                    //onChangeText={(text) => this.onChanged(text)}
                                    //value={this.state.myNumber}
                                    maxLength={10}
                                />
                                <Pressable style={{
                                    width: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'black',
                                    borderRadius: 5,
                                    elevation: 5,
                                }} onPress={() => { }}>
                                    <Feather name="refresh-cw" size={14} color="white" />
                                </Pressable>
                            </View>
                            {false && <View>
                                <Text style={{ marginTop: 5, color: '#f57c71', fontWeight: '600' }}>Invalid</Text>
                            </View>}
                        </View>

                        <Pressable style={styles.applyButton} onPress={() => { }}>
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </Pressable>
                    </View>
                </>}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    content: {
        //marginTop: 10,
        //marginBottom: 10
    },
    dropDown: {
        backgroundColor: '#fffc',
        borderColor: '#cccc',
        zIndex: 55,
    },
    numericInput: {
        width: '100%',
        backgroundColor: '#fffc',
        borderColor: '#cccc',
        padding: 12,
        borderRadius: 5,
        borderWidth: 1
    },
    applyButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'black',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});
