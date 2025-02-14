const hre = require("hardhat");


const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY || '';
const url = process.env.NEXT_PUBLIC_ALCHEMY_API_URL || '';

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(private_key, provider);
  console.log('Deploying contracts with the account:', wallet.address);

  const gasPrice = await provider.getGasPrice();
  console.log(`Current gas price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);

  const nonce = await provider.getTransactionCount(wallet.address);
  console.log(`Current nonce: ${nonce}`);

  const HospitalManagement = await ethers.getContractFactory('HospitalManagement', wallet);
  
  try {
    const tx = await HospitalManagement.deploy({
      gasLimit: 30000000,
      gasPrice: gasPrice.mul(200).div(100), 
      nonce: nonce
    });

    console.log('Contract deploying to address:', tx.address);
    console.log('Transaction hash:', tx.deployTransaction.hash);

    await tx.deployed();
    console.log('Contract deployed successfully');
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });