import axios from 'axios';
import { ethers } from 'ethers';
import { ecsign, toRpcSig, keccakFromString, BN } from 'ethereumjs-util';

const SECP256K1_PUBLIC_KEY = process.env.EXPO_PUBLIC_SECP256K1_PUBLIC_KEY;

export class NextIDService {
    private readonly baseUrl: string = 'https://proof-service.next.id/v1';

    constructor() {

    }

    async getProofByEvmAddress(walletAddress: string) {
        if (!ethers.utils.isAddress(walletAddress))
            throw new Error('The string passed is not the evm address');

        const response = await axios.get(`${this.baseUrl}/proof?platform=ethereum&identity=${walletAddress}`);
        const proofs = (response.data as ProofDataModel)?.ids?.flatMap(p => p.proofs);
        return proofs;
    }

    async getTwitterUsernameByEvmAddress(walletAddress: string): Promise<string> {
        const proofs = await this.getProofByEvmAddress(walletAddress);
        const twitterUsername = proofs.find(p => p.platform === 'twitter')?.identity;
        return twitterUsername;
    }

    async proofBindingTwitterAccount(twitterUsername: string, tweetId: string, proofPayload: ProofPayload): Promise<boolean> {
        const rawResponse = await fetch(`${this.baseUrl}/proof`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'create',
                platform: 'twitter',
                identity: twitterUsername,
                public_key: SECP256K1_PUBLIC_KEY,
                proof_location: tweetId,
                extra: {},
                uuid: proofPayload.uuid,
                created_at: proofPayload.created_at
            })
        });
        const content = await rawResponse.json();
        return content;
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
            post_content: {
                default: string,
                en_US: string,
                zh_CN: string
            },
            sign_payload: string,
            uuid: string,
            created_at: number
        } = response.data;

        const signature = await this.generateSignature(content.sign_payload, walletPrivateKey);

        return {
            uuid: content.uuid,
            created_at: content.created_at,
            post_content: content.post_content.default.replace('%SIG_BASE64%', signature),
        }
    }

    private async generateSignature(sign_payload: string, walletPrivateKey: string) {
        const message = Buffer.from(sign_payload, 'utf8');
        const secretKey = Buffer.from(walletPrivateKey.slice(2), 'hex');
        const signature = await this.personalSign(message, secretKey);
        //console.log(`\n\nSignature: 0x${signature.toString('hex')}`);
        //console.log(`\n\nSignature(base64): ${signature.toString('base64')}`);
        return signature.toString('base64');
    }

    private async personalSign(message: Buffer, privateKey: Buffer): Promise<Buffer> {
        const messageHash = keccakFromString(`\x19Ethereum Signed Message:\n${message.length}${message}`, 256);
        const signature = ecsign(messageHash, privateKey);
        return Buffer.from(toRpcSig(signature.v, signature.r, signature.s).slice(2), 'hex');
    }

}


interface ProofPayload {
    uuid: string;
    created_at: number;
    post_content: string;
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
