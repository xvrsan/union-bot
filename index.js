require("dotenv").config();
const { ethers } = require("ethers");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider("https://rpc.testnet.xion.global");
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const ROUTER_ADDRESS = "0xf213a10e58e5a8d7681f4e30a3079ac187ebe99c";
const ROUTER_ABI = [
  "function transferTo(uint256 destination, address receiver, bytes asset, uint256 amount) public returns (bool)"
];

const destination = 17000;
const receiver = "0xe2ddf383ac17ee7481dafce5533f3ecbd31a439f";
const asset = "0x78696f6e3175746b687939756e6d33396d75346a716b7371337738777a737535366a6b707239383579786a6c7a6d64366c65787a37706d717177786b617672";
const amount = ethers.parseUnits("0.0001", 18);

async function transfer() {
  const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, wallet);

  try {
    const tx = await contract.transferTo(destination, receiver, asset, amount);
    console.log("Tx sent:", tx.hash);
    await tx.wait();
    console.log("✅ Transfer sukses!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

transfer();
