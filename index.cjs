require("dotenv").config();
const { ethers } = require("ethers");

// Load environment variables
const infuraProjectId = process.env.INFURA_PROJECT_ID;
const privateKey = process.env.SIGNER_PRIVATE_KEY;
const rawTransaction = JSON.parse(process.env.SIGNED_CONTRACT); // Parse the transaction object

// Validate environment variables
if (!infuraProjectId || !privateKey || !rawTransaction) {
  throw new Error("Missing required environment variables.");
}

// Set up provider and signer
const rpcEndpoint = `https://mainnet.infura.io/v3/${infuraProjectId}`; // Full Infura URL
const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
const signer = new ethers.Wallet(privateKey, provider);

async function sendTransaction() {
  try {
    // Populate the transaction with current gas prices and nonce
    const transaction = await signer.populateTransaction(rawTransaction);

    // Send the transaction
    const txResponse = await signer.sendTransaction(transaction);
    console.log("Transaction sent. Hash:", txResponse.hash);

    // Wait for the transaction to be mined
    const receipt = await txResponse.wait();
    console.log("Transaction mined. Receipt:", receipt);
  } catch (error) {
    console.error("Error sending transaction:", error.message);
  }
}

sendTransaction();