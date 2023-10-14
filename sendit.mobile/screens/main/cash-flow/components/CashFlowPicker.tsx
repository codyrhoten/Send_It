import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, TextInput } from 'react-native';
import Toggle from "react-native-toggle-element";
import DropDownPicker from 'react-native-dropdown-picker';
import { SvgUri } from 'react-native-svg';

const cryptoList = [
    {
        label: 'USDT',
        value: 'usdt',
        icon: () => <SvgUri uri='https://static.biswap.org/bs/coins/usdt.svg' width={24} height={24} />
        //<Image source={{ uri: 'https://static.biswap.org/bs/coins/usdt.svg' }} style={{ width: 20, height: 20 }} />
    },
    {
        label: 'USDC',
        value: 'usdc',
        icon: () => <SvgUri uri='https://static.biswap.org/bs/coins/usdc.svg' width={24} height={24} />
    }
];
const currencyList = [
    {
        label: '$ United States dollar',
        value: 'usd',
        icon: () => <SvgUri uri='https://flagcdn.com/us.svg' width={24} height={24} />
    },
    {
        label: '€ Euro',
        value: 'eur',
        icon: () => <SvgUri uri='https://flagcdn.com/eu.svg' width={24} height={24} />
    },
    {
        label: '$ Canadian dollar',
        value: 'cad',
        icon: () => <SvgUri uri='https://flagcdn.com/ca.svg' width={24} height={24} />
    },
    {
        label: '¥ Chinese yuan',
        value: 'cny',
        icon: () => <SvgUri uri='https://flagcdn.com/cn.svg' width={24} height={24} />
    },
    {
        label: '฿ Thai baht',
        value: 'thb',
        icon: () => <SvgUri uri='https://flagcdn.com/th.svg' width={24} height={24} />
    }
];

export function CashFlowPicker({ onCloseModal }) {
    const [isSelling, setIsSelling] = useState(false);

    const [cryptoIsOpen, setCryptoIsOpen] = useState(false);
    const [cryptoSelected, setCryptoSelected] = useState(null);

    const [currencyIsOpen, setCurrencyIsOpen] = useState(false);
    const [currencySelected, setCurrencySelected] = useState(null);

    return (
        <View style={styles.content}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Toggle
                    value={isSelling}
                    onPress={(newState) => setIsSelling(newState)}
                    thumbButton={{
                        width: 170,
                        height: 50,
                        radius: 5,
                        activeBackgroundColor: '#f57c71',
                        inActiveBackgroundColor: '#add88d',
                    }}
                    trackBar={{
                        width: 355,
                        height: 50,
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <View style={{ width: '48%' }}>
                                <DropDownPicker
                                    open={cryptoIsOpen}
                                    value={cryptoSelected}
                                    items={cryptoList}
                                    setOpen={setCryptoIsOpen}
                                    setValue={setCryptoSelected}
                                    placeholder='Crypto'
                                    style={styles.dropDown}
                                    dropDownContainerStyle={styles.dropDown}
                                />
                            </View>
                            <View style={{ width: '48%' }}>
                                <DropDownPicker
                                    searchable={true}
                                    open={currencyIsOpen}
                                    value={currencySelected}
                                    items={currencyList}
                                    setOpen={setCurrencyIsOpen}
                                    setValue={setCurrencySelected}
                                    placeholder='For'
                                    searchPlaceholder='Search...'
                                    style={styles.dropDown}
                                    dropDownContainerStyle={styles.dropDown}
                                    searchTextInputStyle={styles.dropDown}
                                    searchContainerStyle={{ borderBottomColor: "#ccc6" }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <View style={{ width: '48%' }}>
                                <Text style={{ marginBottom: 3, fontWeight: '500' }}>Quantity</Text>
                                <TextInput
                                    style={styles.numericInput}
                                    keyboardType='decimal-pad'
                                    //onChangeText={(text) => this.onChanged(text)}
                                    //value={this.state.myNumber}
                                    maxLength={10}  //setting limit of input
                                />
                            </View>
                            <View style={{ width: '48%' }}>
                                <Text style={{ marginBottom: 3, fontWeight: '500' }}>Unit price</Text>
                                <TextInput
                                    style={styles.numericInput}
                                    keyboardType='decimal-pad'
                                    //onChangeText={(text) => this.onChanged(text)}
                                    //value={this.state.myNumber}
                                    maxLength={10}  //setting limit of input
                                />
                            </View>
                        </View>

                        <Pressable style={styles.applyButton} onPress={() => { }}>
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </Pressable>
                    </View>
                </>}
            </View>
        </View>
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
        zIndex: 55
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
