import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ConnectWallet, useAddress, useConnectionStatus, useWallet } from '@thirdweb-dev/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { AntDesign } from '@expo/vector-icons';

import { NextIDService, TwitterService } from '@/services';
import { TwitterStorageModel } from '@/models';
import { delay } from '@/utils';

const TWITTER_CLIENT_ID = process.env.EXPO_PUBLIC_TWITTER_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

const twitterEndpoint = {
    authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
    tokenEndpoint: 'https://twitter.com/i/oauth2/token',
    revocationEndpoint: 'https://twitter.com/i/oauth2/revoke',
};
const twitterService = new TwitterService();
const nextIDService = new NextIDService();

export function LoginScreen({ onCloseModal }) {
    const [loading, setLoading] = useState(false);
    const [twitter, setTwitter] = useState<TwitterStorageModel>();

    const connectionStatus = useConnectionStatus();
    const address = useAddress();
    const wallet = useWallet();

    const [twitterAuthRequest, twitterAuthSessionResult, startTwitterLoginAsync] = useAuthRequest(
        {
            clientId: TWITTER_CLIENT_ID,
            redirectUri: makeRedirectUri({
                scheme: 'sendit',
            }),
            usePKCE: true,
            scopes: [
                'tweet.read',
                'tweet.write',
                'users.read'
            ],
        },
        twitterEndpoint
    );

    useEffect(() => {
        const loadTwitterInfo = async () => {
            const twitterStorageString = await AsyncStorage.getItem('twitter');
            const twitterAccessTokenInfo = twitterStorageString && JSON.parse(twitterStorageString) as TwitterStorageModel;
            if (new Date() < twitterAccessTokenInfo?.auth?.expirationDate) {
                setTwitter(twitterAccessTokenInfo);
            }
        }
        loadTwitterInfo();
    }, []);

    useEffect(() => {
        const fetchTwitterBinding = async (code: string, codeVerifier: string) => {
            setLoading(true);
            try {
                const accessTokenInfo = await twitterService.getAccessToken(code, codeVerifier);
                await delay(500);

                const twitterProfile = await twitterService.getProfile(accessTokenInfo.accessToken);
                await delay(500);

                const hasBindingTwitterAccount = await nextIDService.hasBindingTwitterAccount(twitterProfile.username, address);
                console.log('hasBindingTwitterAccount', hasBindingTwitterAccount);
                if (!hasBindingTwitterAccount) {
                    const walletPrivateKey = (await wallet?.getSigner() as any)._signingKey().privateKey;
                    const proofPayload = await nextIDService.getProofPayloadForBindingTwitterAccount(twitterProfile.username, walletPrivateKey);
                    const tweetId = await twitterService.postTweet(accessTokenInfo.accessToken,
                        `🎭 Verifying my Twitter ID @${twitterProfile.username} for @NextDotID.\nSig: ${proofPayload.signature} \n\nNext.ID YOUR DIGITAL IDENTITIES IN ONE PLACE`);

                    await nextIDService.proofBindingTwitterAccount(twitterProfile.username, tweetId, proofPayload);
                }

                const twitterStorage: TwitterStorageModel = {
                    auth: accessTokenInfo,
                    profile: twitterProfile
                };

                await AsyncStorage.setItem('twitter', JSON.stringify(twitterStorage));
                setTwitter(twitterStorage);
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        if (!twitter && twitterAuthSessionResult?.type === 'success') {
            const { code, state } = twitterAuthSessionResult.params;
            fetchTwitterBinding(code, twitterAuthRequest.codeVerifier);
        }
    }, [twitterAuthSessionResult]);

    return (
        <View style={styles.container}>
            {loading &&
                <View style={[StyleSheet.absoluteFill, styles.loading]}>
                    <ActivityIndicator color='#fff' size='large' animating />
                </View>
            }
            {!loading && connectionStatus === 'connected' && <>
                {!twitter?.auth?.accessToken && <>
                    <TouchableOpacity disabled={!!twitter?.auth?.accessToken} onPress={() => startTwitterLoginAsync()} style={styles.button}>
                        <Text style={styles.buttonText}>Connect to <AntDesign name='twitter' size={18} color='white' /> Twitter</Text>
                    </TouchableOpacity>
                </>}
                {twitter?.auth?.accessToken && <>
                    <Text style={{ marginTop: 20 }}>Twitter</Text>
                    <Text>twitterUserName: {twitter.profile.name ?? twitter.profile.username}</Text>
                    <Text>twitterAccessToken: {twitter.auth.accessToken}</Text>
                </>}
            </>}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text>{connectionStatus}</Text>
            </View> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        minHeight: 300,
    },
    loading: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});
