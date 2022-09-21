import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { BANK_CONTRACT } from "../config";

export const useDepositERC20Write = (functionName = "", _tokenAddress: any, amount: number) => {
  const { config } = usePrepareContractWrite({
    ...BANK_CONTRACT,
    functionName,
    // overrides: {
    //   value: ethers.utils.parseEther(value ? value?.toString() : "0"),
    // },
    args: [_tokenAddress, amount]
  });

  const { data, isError, isLoading, write, writeAsync } =
    useContractWrite(config);

  return { data, isError, isLoading, write, writeAsync };
};

// export default usePiggyCreateBank;
