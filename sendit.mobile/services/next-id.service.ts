import axios from 'axios';
import { ecsign, toRpcSig, keccakFromString, BN } from 'ethereumjs-util';

const SECP256K1_PUBLIC_KEY = process.env.EXPO_PUBLIC_SECP256K1_PUBLIC_KEY;

export class NextIDService {
    private readonly baseUrl: string = 'https://proof-service.next.id/v1';

    constructor() {

    }

    async proofBindingTwitterAccount(twitterUsername: string, tweetId: string, proofPayload: ProofPayload): Promise<boolean> {
        const response = await axios.post(`${this.baseUrl}/proof`, {
            action: 'create',
            platform: 'twitter',
            identity: twitterUsername,
            public_key: SECP256K1_PUBLIC_KEY,
            proof_location: tweetId,
            extra: {},
            uuid: proofPayload.uuid,
            created_at: proofPayload.created_at
        });
        return response.data;
    }

    async hasBindingTwitterAccount(twitterUsername: string, walletAddress: string): Promise<boolean> {
        const response = await axios.get(`${this.baseUrl}/proof?platform=twitter&identity=${twitterUsername}`);
        const result = (response.data as ProofDataModel)?.ids?.flatMap(p => p.proofs)?.some(p => p.identity === walletAddress);
        return result;
    }

    async getProofPayloadForBindingTwitterAccount(twitterUsername: string, walletPrivateKey: string): Promise<ProofPayload> {
        const response = await axios({
            method: 'POST',
            url: `${this.baseUrl}/proof/payload`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                action: 'create',
                platform: 'twitter',
                identity: twitterUsername,
                public_key: SECP256K1_PUBLIC_KEY
            }
        });
        const content: {
            post_content: any,
            sign_payload: string,
            uuid: string,
            created_at: number
        } = response.data;

        console.log('\n\ncontent', content);
        const signature = await this.generateSignature(content.sign_payload, walletPrivateKey);

        return {
            signature,
            uuid: content.uuid,
            created_at: content.created_at
        }
    }

    private async generateSignature(sign_payload: string, walletPrivateKey: string) {
        const message = Buffer.from(sign_payload, 'utf8');

        const secretKey = Buffer.from(walletPrivateKey, 'hex');
        const signature = await this.personalSign(message, secretKey);

        console.log(`\n\nSignature: 0x${signature.toString('hex')}`);
        console.log(`\n\nSignature(base64): ${signature.toString('base64')}`);
        return signature.toString('base64');
    }

    private async personalSign(message: Buffer, privateKey: Buffer): Promise<Buffer> {
        const messageHash = keccakFromString(`\x19Ethereum Signed Message:\n${message.length}${message}`, 256);
        const signature = ecsign(messageHash, privateKey);
        return Buffer.from(toRpcSig(signature.v, signature.r, signature.s).slice(2), 'hex');
    }

}


interface ProofPayload {
    signature: string;
    uuid: string;
    created_at: number;
}

interface Proof {
    platform: string;
    identity: string;
    alt_id: string;
    created_at: string;
    last_checked_at: string;
    is_valid: boolean;
    invalid_reason: string;
}

interface IdsItem {
    persona: string;
    avatar: string;
    last_arweave_id: string;
    activated_at: string;
    proofs: Proof[];
}

interface Pagination {
    total: number;
    per: number;
    current: number;
    next: number;
}

interface ProofDataModel {
    pagination: Pagination;
    ids: IdsItem[];
}
