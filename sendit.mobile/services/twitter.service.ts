import axios from 'axios';
import { TwitterBackendService } from './twitter-backend.service';
import { TwitterAuthModel, TwitterProfileModel } from '@/models';

const TWITTER_API_KEY = process.env.EXPO_PUBLIC_TWITTER_API_KEY;
const TWITTER_API_KEY_SECRET = process.env.EXPO_PUBLIC_TWITTER_API_KEY_SECRET;
const TWITTER_CLIENT_ID = process.env.EXPO_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.EXPO_PUBLIC_TWITTER_CLIENT_SECRET;
const TWITTER_CLIENT_REDIRECT_URI = process.env.EXPO_PUBLIC_TWITTER_CLIENT_REDIRECT_URI;


export class TwitterService {
    private readonly baseUrl: string = 'https://api.twitter.com/2';
    private readonly twitterService: TwitterBackendService;

    constructor() {
        this.twitterService = new TwitterBackendService();
    }

    async getAccessToken(code: string, codeVerifier: string): Promise<TwitterAuthModel> {
        try {
            const data = new URLSearchParams();
            data.append('code', code);
            data.append('code_verifier', codeVerifier);
            data.append('grant_type', 'authorization_code');
            data.append('client_id', TWITTER_CLIENT_ID);
            data.append('redirect_uri', TWITTER_CLIENT_REDIRECT_URI);

            const response = await axios({
                method: 'POST',
                url: `${this.baseUrl}/oauth2/token`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: data.toString(),
            });

            console.log('\n\nTwitterService.getAccessToken', response.data);

            return {
                accessToken: response.data.access_token,
                expirationDate: new Date(new Date().getTime() + response.data.expires_in * 1000)
            };
        } catch (error) {
            console.error('TwitterService.getAccessToken:', error);
            throw error;
        }
    }

    async getProfile(accessToken: string): Promise<TwitterProfileModel> {
        try {
            const response = await axios.get(`${this.baseUrl}/users/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('TwitterService.getProfile:', error);
            throw error;
        }
    }

    async postTweet(accessToken: string, text: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/tweets`, { text }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data.data.id;
        } catch (error) {
            console.error('TwitterService.getProfile:', error);
            throw error;
        }
    }

}
