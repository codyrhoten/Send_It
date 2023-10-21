import axios from 'axios';

const TWITTER_API_KEY = process.env.EXPO_PUBLIC_TWITTER_API_KEY;
const TWITTER_API_KEY_SECRET = process.env.EXPO_PUBLIC_TWITTER_API_KEY_SECRET;
const TWITTER_CLIENT_ID = process.env.EXPO_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.EXPO_PUBLIC_TWITTER_CLIENT_SECRET;
const TWITTER_CLIENT_REDIRECT_URI = process.env.EXPO_PUBLIC_TWITTER_CLIENT_REDIRECT_URI;


export class TwitterBackendService {
    private readonly baseUrl: string = 'https://api.twitter.com/1.1';
    //private readonly twitterApi: TwitterApi;

    constructor() {
        // this.twitterApi = new TwitterApi({
        //     clientId: TWITTER_CLIENT_ID,
        //     clientSecret: TWITTER_CLIENT_SECRET
        // });

        //     {
        //     consumer_key: TWITTER_API_KEY,
        //     consumer_secret: TWITTER_API_KEY_SECRET,
        // });
    }

    // async getRequestToken(): Promise<TokenResponse> {
    //     try {
    //         const response = await this.twitterApi.getRequestToken(TWITTER_CLIENT_REDIRECT_URI);
    //         console.log('TwitterBackendService.getRequestToken', response);
    //         return response;
    //     } catch (error) {
    //         console.error('TwitterBackendService.getRequestToken', error);
    //         throw error;
    //     }
    // }


    // async getAccessToken(code: string, oauth_token: string): Promise<AccessTokenResponse> {
    //     try {
    //         const { url, codeVerifier, state } = this.twitterApi.generateOAuth2AuthLink(TWITTER_CLIENT_REDIRECT_URI, {
    //             scope: ['tweet.read', 'users.read', 'offline.access']
    //         });

    //         const { client: loggedClient, accessToken, refreshToken } = await this.twitterApi.loginWithOAuth2({
    //             code,
    //             codeVerifier,
    //             redirectUri: TWITTER_CLIENT_REDIRECT_URI
    //         });


    //         console.log('TwitterBackendService.getAccessToken', response);
    //         return response;
    //     } catch (error) {
    //         console.error('TwitterBackendService.getAccessToken', error, { oauth_verifier, oauth_token });
    //         throw error;
    //     }
    // }

    // async getAccessToken(oauth_verifier: string | number, oauth_token: string): Promise<AccessTokenResponse> {
    //     try {
    //         const response = await this.twitterApi.getAccessToken({
    //             oauth_verifier: oauth_verifier,
    //             oauth_token: oauth_token,
    //         });
    //         console.log('TwitterBackendService.getAccessToken', response);
    //         return response;
    //     } catch (error) {
    //         console.error('TwitterBackendService.getAccessToken', error, { oauth_verifier, oauth_token });
    //         throw error;
    //     }
    // }

    // async getAccessToken(code: string): Promise<string> {
    //     try {
    //         const response = await axios.post('https://api.twitter.com/1.1/oauth2/token', null, {
    //             params: {
    //                 code,
    //                 client_id: TWITTER_CLIENT_ID,
    //                 client_secret: TWITTER_CLIENT_SECRET,
    //                 redirect_uri: TWITTER_CLIENT_REDIRECT_URI,
    //                 grant_type: 'authorization_code',
    //             },
    //         });

    //         console.log('TwitterBackendService.getAccessToken', response);

    //         const accessToken = response.data.access_token;
    //         return accessToken;
    //     } catch (error) {
    //         console.error('TwitterBackendService.getAccessToken:', error);
    //         throw error;
    //     }
    // }

}
