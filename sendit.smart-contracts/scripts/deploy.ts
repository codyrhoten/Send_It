const { ethers } = require("hardhat");

async function main() {
    const orders = await ethers.deployContract("Orders", {

    });

    const transfers = await ethers.deployContract("Transfers", {

    });

    await orders.waitForDeployment();
    await transfers.waitForDeployment();

    // console.log(
    //     `Lock with ${ethers.formatEther()}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
    // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
