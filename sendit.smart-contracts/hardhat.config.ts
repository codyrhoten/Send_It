import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const deploymentPrivateKey = process.env.DEPLOYMENT_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
    solidity: "0.8.21",
    networks: {
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [deploymentPrivateKey],
        }
    }
};

export default config;
