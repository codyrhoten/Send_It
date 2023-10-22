import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ConnectWallet, useAddress, useConnectionStatus, useDisconnect, useWallet } from '@thirdweb-dev/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { AntDesign } from '@expo/vector-icons';

import { NextIDService, TwitterService } from '@/services';
import { TwitterProfileModel, TwitterStorageModel } from '@/models';
import { truncateEthAddress } from '@/utils';

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
    const [twitterError, setTwitterError] = useState(false);
    const [twitter, setTwitter] = useState<TwitterStorageModel>();

    const connectionStatus = useConnectionStatus();
    const onDisconnect = useDisconnect();
    const address = useAddress();
    const wallet = useWallet();
    console.log('\n\n');


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
                'users.read',
            ],
        },
        twitterEndpoint
    );

    useEffect(() => {
        const loadTwitterInfo = async () => {
            const twitterUsername = await nextIDService.getTwitterUsernameByEvmAddress(address);
            if (twitterUsername) {
                const twitterStorageString = await AsyncStorage.getItem('twitter');
                const twitterAccessTokenInfo = twitterStorageString && JSON.parse(twitterStorageString) as TwitterStorageModel;
                if (new Date() < new Date(twitterAccessTokenInfo?.auth?.expirationDate)) {
                    setTwitter(twitterAccessTokenInfo);
                }
            } else {
                await AsyncStorage.removeItem('twitter');
            }
        }
        if (address) {
            loadTwitterInfo();
        }
    }, [address]);

    useEffect(() => {
        const fetchTwitterBinding = async (code: string, codeVerifier: string) => {
            setLoading(true);
            try {
                let twitterProfile: TwitterProfileModel;
                const accessTokenInfo = await twitterService.getAccessToken(code, codeVerifier);
                const twitterUsername = await nextIDService.getTwitterUsernameByEvmAddress(address);

                if (!twitterUsername) {
                    twitterProfile = await twitterService.getProfile(accessTokenInfo.accessToken);
                    const walletPrivateKey = (await wallet?.getSigner() as any)._signingKey().privateKey;
                    const proofPayload = await nextIDService.getProofPayloadForBindingTwitterAccount(twitterProfile.username, walletPrivateKey);
                    const tweetId = await twitterService.postTweet(accessTokenInfo.accessToken, proofPayload.post_content);

                    await nextIDService.proofBindingTwitterAccount(twitterProfile.username, tweetId, proofPayload);
                }

                twitterProfile = twitterProfile ?? {
                    username: twitterUsername,
                    //profile_image_url: (await twitterService.getProfileByUsername(accessTokenInfo.accessToken, twitterProfile.username))?.profile_image_url,
                };

                const twitterStorage: TwitterStorageModel = {
                    auth: accessTokenInfo,
                    profile: twitterProfile
                };

                await AsyncStorage.setItem('twitter', JSON.stringify(twitterStorage));
                setTwitter(twitterStorage);
            } catch (error) {
                console.error(JSON.stringify(error, null, 2));
                setTwitterError(true);
            }
            finally {
                setLoading(false);
            }
        };

        if (!(twitter || twitterError) && twitterAuthSessionResult?.type === 'success') {
            const { code, state } = twitterAuthSessionResult.params;
            fetchTwitterBinding(code, twitterAuthRequest.codeVerifier);
        }
    }, [twitterAuthSessionResult]);

    const onStartTwitterLoginClick = async () => {
        setTwitterError(false);
        await startTwitterLoginAsync();
    }

    const onDisconnectClick = async () => {
        await onDisconnect();
        setTwitter(null);
        onCloseModal();
    }

    return (
        <View style={styles.container}>
            {loading &&
                <View style={[StyleSheet.absoluteFill, styles.loading]}>
                    <ActivityIndicator color='#fff' size='large' animating />
                </View>
            }
            {!loading && connectionStatus === 'connected' && <>
                <View style={{ flexGrow: 1 }}>
                    {!twitter && <>
                        <TouchableOpacity onPress={onStartTwitterLoginClick} style={styles.button}>
                            <Text style={styles.buttonText}>Connect to <AntDesign name='twitter' size={18} color='white' /> Twitter{'\n'} and link your wallet in Next.ID</Text>
                        </TouchableOpacity>
                    </>}
                    {twitter && <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {twitter.profile.profile_image_url && <Image source={{ uri: twitter.profile.profile_image_url }} style={styles.avatar} />}
                        {!twitter.profile.profile_image_url && <AntDesign name='twitter' size={24} color='black' style={{ marginHorizontal: 10 }} />}
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>@{twitter.profile.username}</Text>
                    </View>}
                </View>

                <TouchableOpacity onPress={onDisconnectClick} style={{ ...styles.button, marginTop: 30 }}>
                    <Text style={styles.buttonText}>Disconnect {truncateEthAddress(address?.toString())}</Text>
                </TouchableOpacity>
            </>}
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
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});
