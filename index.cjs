require("dotenv").config();
const { ethers } = require("ethers");

const rpcEndpoint = process.env.INFURA_PROJECT_ID;
const privateKey = process.env.SIGNER_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);

const signer = new ethers.Wallet(privateKey, provider);

const rawTransaction = process.env.SIGNED_CONTRACT;

async function sendTransaction() {
  const transaction = await signer.populateTransaction(rawTransaction);

  signer.sendTransaction(transaction)
    .then((tx) => {
      console.log('Transaction sent. Hash:', tx.hash);
      return tx.wait();
    })
    .then((receipt) => {
      console.log('Transaction mined. Receipt:', receipt);
    })
    .catch((error) => {
      console.error('Error sending transaction:', error.message);
    });
}

sendTransaction();
