import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { StackHeaderProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ecsign, toRpcSig, keccakFromString, BN } from 'ethereumjs-util';

const WALLET_PRIVATE_KEY = process.env.EXPO_PUBLIC_WALLET_PRIVATE_KEY;

export function SettingsScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Settings',
            headerLeft: (props: StackHeaderProps) =>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={24} style={{ marginLeft: 25 }} />
                </TouchableOpacity>
        } as DrawerNavigationOptions);
    });

    const personalSign = async (message: Buffer, privateKey: Buffer): Promise<Buffer> => {
        const messageHash = keccakFromString(`\x19Ethereum Signed Message:\n${message.length}${message}`, 256);
        const signature = ecsign(messageHash, privateKey);
        return Buffer.from(toRpcSig(signature.v, signature.r, signature.s).slice(2), 'hex');
    }

    const generateSignature = async (sign_payload: string, walletPrivateKey: string) => {
        const message = Buffer.from(sign_payload, 'utf8');

        const secretKey = Buffer.from(walletPrivateKey, 'hex');
        const signature = await personalSign(message, secretKey);

        console.log(`\n\nSignature: 0x${signature.toString('hex')}\n\n`);
        // For demo ONLY
        // Signature: 0xf72fe6b00be411bd70ffe1b9bf322f18529ea10e9559dd26ba10387544849fc86d712709dfb709efc3dcc0a01b6f6b9ca98bd48fe780d58921f4926c6f2c0b871b

        console.log(`\n\nSignature(base64): ${signature.toString('base64')}\n\n`);
        // For demo ONLY
        // Signature(base64): 9y/msAvkEb1w/+G5vzIvGFKeoQ6VWd0muhA4dUSEn8htcScJ37cJ78PcwKAbb2ucqYvUj+eA1Ykh9JJsbywLhxs=
    }

    const onBindingTwitterAccountClick = async () => {
        const twitterAccount = 'happyNariman';
        const secp256k1PublicKey = '03e105e5132a0cce3c70fe05cc3d7c40c28630097816308fb3fbf46364348c5ad4';

        const rawResponse = await fetch('https://proof-service.next.id/v1/proof/payload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'create',
                platform: 'twitter',
                identity: twitterAccount,
                public_key: secp256k1PublicKey
            })
        });
        const content: {
            post_content: any,
            sign_payload: string,
            uuid: string,
            created_at: number
        } = await rawResponse.json();

        console.log('\n\ncontent', content);

        await generateSignature(content.sign_payload, WALLET_PRIVATE_KEY);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 42 }} >
                    <TouchableOpacity onPress={onBindingTwitterAccountClick}>
                        <Text>GoBack</Text>
                    </TouchableOpacity>
                    <Text>settings information</Text>
                </View>
                <View style={{ margin: 24 }}>
                    <Text>settings</Text>
                    <Text>settings</Text>
                    <Text>settings</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },
});
