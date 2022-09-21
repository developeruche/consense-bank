import { chain } from "wagmi";
import BANK_ABI from "../utils/Bank.json";

export const CHAIN_ID = chain.polygonMumbai.id;

export { BANK_ABI };

export const BANK_CONTRACT_ADDRESS =
  "0x8DDCfe8a48Ec2E0666d29908a2A547Ba7D3bb797";

export const BANK_CONTRACT = {
  addressOrName: BANK_CONTRACT_ADDRESS,
  contractInterface: BANK_ABI.abi,
};
