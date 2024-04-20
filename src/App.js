import logo from "./logo.svg";
import "./App.css";
import { Web3 } from "web3";
import { useState } from "react";
import ABI from "./abi.json";

function App() {
  const [wallet, setWallet] = useState("0x");
  const [counter, setCounter] = useState("0");
  let web3, contract, accounts;

  async function connect() {
    //initialize injecteed provider
    web3 = new Web3(window.ethereum);

    //request accounts
    accounts = await web3.eth.requestAccounts();

    //update front end
    setWallet(String(accounts[0]));

    //initialzie contract
    contract = new web3.eth.Contract(ABI, "0x2554f31C1e8854eF4915Bc08178eC7f8780b9152");
  }

  async function getCounter() {
    await connect();

    const response = await contract.methods.getCounter().call();

    //update front end
    setCounter(String(response));
  }

  async function increaseCounter() {
    await connect();

    await contract.methods.increaseCounter().send({ from: accounts[0] });

    await getCounter();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connect}>Connect</button>
        <button onClick={increaseCounter}> Increase Counter</button>
        <button onClick={getCounter}>Get Counter</button>
        <p>Connected account: {wallet}</p>
        <p>Current Counter: {counter}</p>
      </header>
    </div>
  );
}

export default App;
