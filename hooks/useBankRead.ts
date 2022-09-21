import { useContractRead } from "wagmi";
import { BANK_CONTRACT } from "../config";

export const useBankRead = (functionName = "") => {
  const { data, isError, isLoading } = useContractRead({
    ...BANK_CONTRACT,
    functionName,
  });

  return { data, isError, isLoading };
};

// export default usePiggyRead;
