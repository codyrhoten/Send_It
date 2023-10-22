import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
import { BottomModalComponent } from '@/components';
import { cryptoList, recipientList } from '../data';

const borrows = [

];

const loans = [

];

export function TreasuryScreen() {
    const [isBorrowModalVisible, setIsBorrowModalVisible] = useState(false);

    const [cryptoIsOpen, setCryptoIsOpen] = useState(false);
    const [cryptoValueSelected, setCryptoValueSelected] = useState<string>(cryptoList[0].value);

    const [borrowers, setBorrowers] = useState([]);
    const [recipientIsOpen, setRecipientIsOpen] = useState(false);
    const [recipientValueSelected, setRecipientValueSelected] = useState<string>();

    const cryptoSelected = cryptoList.find(p => p.value === cryptoValueSelected);

    return (
        <View style={styles.centered}>
            <BottomModalComponent title='Borrow' isVisible={isBorrowModalVisible} onClose={() => setIsBorrowModalVisible(false)} titleAlign='left' blurIntensity={90}>
                <View style={{}}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        letterSpacing: 0.75,
                        margin: 20,
                    }}>What do you need?</Text>

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

                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        letterSpacing: 0.75,
                        margin: 30,
                        marginBottom: 20
                    }}>How much do you need?</Text>

                    <TextInput
                        style={{
                            textAlign: 'center',
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
                        //onChangeText={(text) => setTokenAmount(Number.parseFloat(text))}
                        //value={tokenAmount.toString()}
                        maxLength={10}
                    />


                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        letterSpacing: 0.75,
                        margin: 30,
                        marginBottom: 20
                    }}>Collective Collateral</Text>

                    <DropDownPicker
                        searchable={true}
                        open={recipientIsOpen}
                        value={recipientValueSelected}
                        items={recipientList}
                        setOpen={setRecipientIsOpen}
                        setValue={setRecipientValueSelected}
                        onChangeValue={(value) => {
                            const recipient = recipientList.find(p => p.value === value);
                            if (!borrowers.includes(recipient)) {
                                setBorrowers([...borrowers, recipient]);
                            }
                        }}
                        placeholder='Collaterals'
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

                    {borrowers.map(b => <View key={b.value} style={{
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            flexGrow: 1
                        }}>{b.label}</Text>
                        <TextInput
                            style={{
                                flexGrow: 1,
                                textAlign: 'center',
                                backgroundColor: '#fffa',
                                borderColor: '#cccc',
                                padding: 12,
                                borderRadius: 5,
                                borderWidth: 1,
                                height: 40
                            }}
                            returnKeyType='done'
                            //onChangeText={(text) => setTokenAmount(Number.parseFloat(text))}
                            //value={tokenAmount.toString()}
                            maxLength={10}
                        />
                        <TouchableOpacity style={{
                            //width: 40,
                            padding: 8,
                            marginLeft: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                            borderRadius: 5,
                            elevation: 5,
                        }} onPress={() => { }}>
                            <AntDesign name='deleteuser' size={24} color='white' />
                        </TouchableOpacity>

                    </View>)}

                    <TouchableOpacity style={styles.applyButton} onPress={() => setIsBorrowModalVisible(false)}>
                        <Text style={styles.applyButtonText}>Request</Text>
                    </TouchableOpacity>

                </View>
            </BottomModalComponent>

            {!(borrows.length && loans.length) && <View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    letterSpacing: 0.75,
                    marginBottom: 30,
                }}>What would you like?</Text>

                <TouchableOpacity style={{
                    marginBottom: 30,
                    padding: 10,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    borderRadius: 5,
                    elevation: 5,
                }} onPress={() => setIsBorrowModalVisible(true)}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        letterSpacing: 0.75,
                        color: 'white',
                    }}>Borrow</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    marginBottom: 30,
                    padding: 10,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    borderRadius: 5,
                    elevation: 5,
                }} onPress={() => { }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        letterSpacing: 0.75,
                        color: 'white',
                    }}>Lend</Text>
                </TouchableOpacity>

            </View>}

            {/* {borrows.length && <View>

                <View style={{
                    marginVertical: 30
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        letterSpacing: 0.75,
                    }}>Borrows</Text>
                </View>

            </View>} */}

            {/* {loans.length && <View>

                <View style={{
                    marginVertical: 30
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        letterSpacing: 0.75,
                    }}>Loans</Text>
            </View>} */}

        </View>
    )
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    applyButton: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        paddingVertical: 12,
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
