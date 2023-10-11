const Wallet = require('ethereumjs-wallet');

// Generate a new wallet
const wallet = Wallet.generate();

// Get the private key
const privateKey = wallet.getPrivateKey().toString('hex');

console.log('Private Key:', privateKey);
