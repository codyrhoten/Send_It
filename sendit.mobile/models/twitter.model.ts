
export interface TwitterProfileModel {
    id?: string,
    name?: string,
    username: string,
    profile_image_url?: string
}

export interface TwitterAuthModel {
    accessToken: string;
    expirationDate: Date;
}

export interface TwitterStorageModel {
    profile: TwitterProfileModel;
    auth: TwitterAuthModel;
}
