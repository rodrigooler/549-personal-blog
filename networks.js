const { projectId, mnemonic } = require('./secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = { 
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
    goerli: {
      provider: () => new HDWalletProvider(
        mnemonic, `https://goerli.infura.io/v3/980438a182dd4089ab8189d6aa01b881`
      ),
      networkId: 5,
      gasPrice: 10e9    
    }
  },
};
