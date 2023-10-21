
export interface TwitterProfileModel {
    id: string,
    name: string,
    username: string
}

export interface TwitterAuthModel {
    accessToken: string;
    expirationDate: Date;
}

export interface TwitterStorageModel {
    profile: TwitterProfileModel;
    auth: TwitterAuthModel;
}
