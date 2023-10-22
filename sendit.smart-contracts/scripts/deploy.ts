const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    
    const orders = await ethers.deployContract("Orders");
    await orders.waitForDeployment();

    console.log('Contract deployed with the account:', deployer.address);
    console.log('Send It Orders contract deployed to:', orders.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
