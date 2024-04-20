const { Web3 } = require("web3");
const ABI = require("./abi.json");
const BYTECODE = require("./bytecode.json");

//initialize a provider
const web3 = new Web3("https://ethereum-sepolia-rpc.publicnode.com");

async function getCounter() {
  const myContract = new web3.eth.Contract(ABI, "0x2554f31C1e8854eF4915Bc08178eC7f8780b9152");

  const response = await myContract.methods.getCounter().call();
  console.log("Current counter:", response);
}

getCounter();

/* async function deploy() {
  //initialize a wallet
  const wallet = web3.eth.wallet.add("0x590deee7395f6cb6d2ad5e0ae8a4e32fd74c47e2bd157022dafbda4539fe637e");

  //initialize the contract
  const myContract = new web3.eth.Contract(ABI);

  //initialzie a contract deployer
  const deployer = myContract.deploy({
    data: BYTECODE,
    arguments: [77],
  });

  //send transaction
  const txReceipt = await deployer.send({ from: wallet[0].address });

  console.log("contract deployed to:", txReceipt.options.address);
}

deploy(); */
