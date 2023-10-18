import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toggle from "react-native-toggle-element";
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
import { SendCashComponent } from './SendCashComponent';
import { RequestCashComponent } from './RequestCashComponent';

const recipientList = [
    {
        label: 'Add contact',
        value: 'add',
        icon: () => <AntDesign name="adduser" size={24} color="black" />
    },
    {
        label: 'Me',
        value: 'me',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'John Smith',
        value: 'js',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'Emily Johnson',
        value: 'ej',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'Michael Brown',
        value: 'mb',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'Sarah Davis',
        value: 'sd',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
    {
        label: 'Robert Wilson',
        value: 'rw',
        icon: () => <AntDesign name="user" size={20} color="black" />
    },
];

export function CashFlowPicker({ onCloseModal }) {
    const [isSelling, setIsSelling] = useState(false);

    // const [tokenAmount, setTokenAmount] = useState(500);
    // const [currencyUnitPrice, setCurrencyUnitPrice] = useState(1.36);

    const [recipientIsOpen, setRecipientIsOpen] = useState(false);
    const [recipientValueSelected, setRecipientValueSelected] = useState<string>(recipientList[1].value);

    // const [cryptoIsOpen, setCryptoIsOpen] = useState(false);
    // const [cryptoValueSelected, setCryptoValueSelected] = useState<string>(cryptoList[0].value);

    // const [currencyIsOpen, setCurrencyIsOpen] = useState(false);
    // const [currencyValueSelected, setCurrencyValueSelected] = useState(currencyList[2].value);

    // const cryptoSelected = cryptoList.find(p => p.value === currencyValueSelected);
    // const currencySelected = currencyList.find(p => p.value === currencyValueSelected);

    const onApplyButtonClick = () => {
        onCloseModal();
    }

    return (
        <View style={styles.content}>
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
                    width: 350,
                    height: 40,
                    radius: 5,
                    borderWidth: 1,
                    activeBackgroundColor: "#ddd3",
                    inActiveBackgroundColor: "#ddd3",
                }}
                containerStyle={{
                    marginBottom: 20
                }}
                trackBarStyle={{
                    borderColor: "#ccc2",
                }}
                leftComponent={
                    <Text style={{ fontWeight: 'bold', color: isSelling ? '#888' : '#000' }}>Send cash {isSelling ? '' : 'for'}</Text>
                }
                rightComponent={
                    <Text style={{ width: '100%', fontWeight: 'bold', color: isSelling ? '#000' : '#888' }}>Request cash {isSelling ? 'from' : ''}</Text>
                }
            />
            <View>
                <View style={{ marginBottom: 20 }}>
                    <DropDownPicker
                        searchable={true}
                        open={recipientIsOpen}
                        value={recipientValueSelected}
                        items={recipientList}
                        setOpen={setRecipientIsOpen}
                        setValue={setRecipientValueSelected}
                        placeholder='Recipient'
                        searchPlaceholder='Search...'
                        listMode='MODAL'
                        modalProps={{
                            animationType: 'slide'
                        }}
                        style={{
                            backgroundColor: '#fffa',
                            borderColor: '#cccc',
                            borderRadius: 5,
                            borderWidth: 1,
                            minHeight: 40,
                        }}
                        textStyle={{
                            letterSpacing: 0.75,
                            fontWeight: '500'
                        }}
                        searchTextInputStyle={{
                            backgroundColor: '#fff6',
                            borderColor: '#cccc',
                        }}
                        searchContainerStyle={{ borderBottomColor: "#ccc6" }}
                    />
                </View>

                {isSelling ? <RequestCashComponent /> : <SendCashComponent />}

                <TouchableOpacity style={styles.applyButton} onPress={onApplyButtonClick}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    content: {

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
