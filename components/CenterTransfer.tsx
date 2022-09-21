import ERC20_ABI from "../utils/ERC20.json";
import { ethers } from "ethers";
import { Fragment, useState } from "react";
import { BANK_CONTRACT, CHAIN_ID } from "../config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";

interface Props {
  stable: any;
  crypto: any;
  transaction: any;
  bal: any;
}

function CenterTransfer({ stable, crypto, transaction, bal }: Props) {
  const router = useRouter();

  const { address } = useAccount(); // address of user connected

  const [toggle, setToggle] = useState<string>("Custody");

  const [erc20Adddress, setERC20Address] = useState<string>("");
  const [erc20ToBankAdddress, setERC20ToBankAddress] = useState<string>("");
  const [addressTo, setAddressTo] = useState<string>("");
  const [addressToBank, setAddressToBank] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [tokenAmountToBank, setTokenAmountToBank] = useState<string>("");
  const [maticAdddressToBank, setMaticAddressToBank] = useState<string>("");
  const [maticAmountToBank, setMaticAmountToBank] = useState<string>("");

  //------- TRANSFER ERC20 TOKEN IN CUSTODY -----------//

  // approves ERC20 TOKEN TO DEPOSIT
  const {
    data: approveCustodyData,
    write: approveERC20CustodyToken,
    isLoading: approveCustodyLoading,
    isError: approveERC20CustodyError,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: erc20Adddress,
    contractInterface: ERC20_ABI.abi,
    functionName: "approve",
    args: [
      addressTo,
      ethers.utils.parseEther(tokenAmount ? tokenAmount.toString() : "0"),
    ],
    chainId: CHAIN_ID,
  });

  const {
    data: transferERC20CustodyData,
    write: transferERC20CustodyToken,
    isLoading: transferERC20CustodyLoading,
    isError: transferERC20CustodyError,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: erc20Adddress,
    contractInterface: ERC20_ABI.abi,
    functionName: "transfer",
    args: [
      addressTo,
      ethers.utils.parseEther(tokenAmount ? tokenAmount.toString() : "0"),
    ],
    chainId: CHAIN_ID,
  });

  // resolve the form submission after the deposit is successful
  const {
    isError: approveERC20CustodyWaitError,
    isLoading: approveERC20CustodyWaitLoading,
  } = useWaitForTransaction({
    hash: approveCustodyData?.hash,
    onSuccess(data: any) {
      transferERC20CustodyToken();
    },
    onError(error: any) {
      toast.error("Failed to transfer Token!");
    },
  });

  // resolve the form submission after the deposit is successful
  const {
    isError: transferERC20CustodyWaitError,
    isLoading: transferERC20CustodyWaitLoading,
  } = useWaitForTransaction({
    hash: transferERC20CustodyData?.hash,
    onSuccess(data: any) {
      toast.success("Transfer Successful!");
      router.push("/");
    },
    onError(error: any) {
      toast.error("Failed to transfer Token!");
    },
  });

  const handleERC20CustodySubmit = (e: any) => {
    e.preventDefault();

    approveERC20CustodyToken();

    if (transferERC20CustodyLoading || transferERC20CustodyWaitLoading) {
      toast.loading("Loading!!!");
    }
  };

  //------- TRANSFER ERC20 TOKEN IN BANK -----------//
  // function transferERC20Token(address _to, address _tokenAddress, uint _amount)
  const {
    data: transferERC20BankData,
    write: transferERC20BankToken,
    isLoading: transferERC20BankLoading,
    isError: transferERC20BankError,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...BANK_CONTRACT,
    functionName: "transferERC20Token",
    args: [
      addressToBank,
      erc20ToBankAdddress,
      ethers.utils.parseEther(
        tokenAmountToBank ? tokenAmountToBank.toString() : "0"
      ),
    ],
    chainId: CHAIN_ID,
  });

  const {
    isError: transferERC20BankWaitError,
    isLoading: transferERC20BankWaitLoading,
  } = useWaitForTransaction({
    hash: transferERC20BankData?.hash,
    onSuccess(data: any) {
      toast.success("Transfer Successful!");
      router.push("/");
    },
    onError(error: any) {
      toast.error("Failed to transfer Token!");
    },
  });

  const handleERC20BankSubmit = (e: any) => {
    e.preventDefault();

    transferERC20BankToken();

    if (transferERC20BankLoading) {
      toast.loading("Loading!!!");
    }
  };

  // function transferERC20Token(address _to, address _tokenAddress, uint _amount)
  const {
    data: transferMaticBankData,
    write: transferMaticBankToken,
    isLoading: transferMaticBankLoading,
    isError: transferMaticBankError,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...BANK_CONTRACT,
    functionName: "transfer",
    args: [
      maticAdddressToBank,
      ethers.utils.parseEther(
        maticAmountToBank ? maticAmountToBank.toString() : "0"
      ),
    ],
    chainId: CHAIN_ID,
  });

  const handleMaticBankSubmit = (e: any) => {
    e.preventDefault();

    transferMaticBankToken();

    if (transferMaticBankLoading) {
      toast.loading("Loading!!!");
    }
  };

  return (
    <div className="center">
      <div className="center__overview">
        <p>Transfer ERC20</p>

        <div className="center__overview__toggle">
          <button
            onClick={() => setToggle("Custody")}
            className={`center__overview__toggle__btn center__overview__toggle__btn__left ${
              toggle === "Custody"
                ? "center__overview__toggle__btn_active"
                : null
            }`}
          >
            Custody
          </button>
          <button
            onClick={() => setToggle("Bank")}
            className={`center__overview__toggle__btn center__overview__toggle__btn__right ${
              toggle === "Bank" ? "center__overview__toggle__btn_active" : null
            }`}
          >
            Bank
          </button>
        </div>
      </div>

      {toggle === "Custody" ? (
        <Fragment>
          <div className="center__display">
            <h4 className={"center_title"}>
              Transfer ERC20 Token from your wallet to another user
            </h4>
            <form
              onSubmit={handleERC20CustodySubmit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__erc20">
                <input
                  onChange={(e) => setERC20Address(e.target.value)}
                  type="text"
                  placeholder="ERC20 Address"
                  className="transfer__token__form__erc20__input"
                />
              </div>
              <div className="transfer__token__form__addr__to">
                <input
                  onChange={(e) => setAddressTo(e.target.value)}
                  type="text"
                  placeholder="Address To"
                  className="transfer__token__form__addr__to__input"
                />
              </div>
              <div className="transfer__token__form__amount">
                <div>
                  <input
                    onChange={(e) => setTokenAmount(e.target.value)}
                    type="text"
                    placeholder="Amount"
                    className="transfer__token__form__amount__input"
                  />
                </div>

                <button className="transfer__token__form__amount__max">
                  MAX
                </button>
              </div>

              <div className="transfer__token__form__action">
                <button className="transfer__token__form__action__btn">
                  Generate Txn Data
                </button>
                <button
                  type="submit"
                  className="transfer__token__form__action__btn"
                >
                  Custody Transfer
                </button>
              </div>
            </form>
          </div>

          {/* <div className="center__display" style={{ marginTop: "20px" }}>
            <h4 className={"center_title"}>
              Transfer Matic from your wallet to another user
            </h4>

            <p className="uuu">Transfer Matic</p>

            <form
              onSubmit={handleMaticCustodySubmit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__addr__to">
                <input
                  onChange={(e) => setMaticAddress(e.target.value)}
                  type="text"
                  placeholder="Address To"
                  className="transfer__token__form__addr__to__input"
                />
              </div>
              <div className="transfer__token__form__amount">
                <div>
                  <input
                    onChange={(e) => setMaticAmount(e.target.value)}
                    type="text"
                    placeholder="Amount"
                    className="transfer__token__form__amount__input"
                  />
                </div>

                <button className="transfer__token__form__amount__max">
                  MAX
                </button>
              </div>

              <div className="transfer__token__form__action">
                <div></div>
                <button
                  type="submit"
                  className="transfer__token__form__action__btn"
                >
                  Transfer
                </button>
              </div>
            </form>
          </div> */}
        </Fragment>
      ) : (
        <Fragment>
          <div className="center__display">
            <h4 className={"center_title"}>
              Transfer ERC 20 from your consense wallet to another user
            </h4>
            <form
              onSubmit={handleERC20BankSubmit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__erc20">
                <input
                  onChange={(e) => setERC20ToBankAddress(e.target.value)}
                  type="text"
                  placeholder="ERC20 Address"
                  className="transfer__token__form__erc20__input"
                />
              </div>
              <div className="transfer__token__form__addr__to">
                <input
                  onChange={(e) => setAddressToBank(e.target.value)}
                  type="text"
                  placeholder="Address To"
                  className="transfer__token__form__addr__to__input"
                />
              </div>
              <div className="transfer__token__form__amount">
                <div>
                  <input
                    onChange={(e) => setTokenAmountToBank(e.target.value)}
                    type="text"
                    placeholder="Amount"
                    className="transfer__token__form__amount__input"
                  />
                </div>

                <button className="transfer__token__form__amount__max">
                  MAX
                </button>
              </div>

              <div className="transfer__token__form__action">
                <button className="transfer__token__form__action__btn">
                  Generate Txn Data
                </button>
                <button
                  type="submit"
                  className="transfer__token__form__action__btn"
                >
                  Wallet Transfer
                </button>
              </div>
            </form>
          </div>

          <div className="center__display" style={{ marginTop: "20px" }}>
            <h4 className={"center_title"}>
              Transfer Matic from your consense wallet to another user
            </h4>
            <p className="uuu">Transfer ETH</p>

            <form
              onSubmit={handleMaticBankSubmit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__addr__to">
                <input
                  onChange={(e) => setMaticAddressToBank(e.target.value)}
                  type="text"
                  placeholder="Address To"
                  className="transfer__token__form__addr__to__input"
                />
              </div>
              <div className="transfer__token__form__amount">
                <div>
                  <input
                    onChange={(e) => setMaticAmountToBank(e.target.value)}
                    type="text"
                    placeholder="Amount"
                    className="transfer__token__form__amount__input"
                  />
                </div>

                <button className="transfer__token__form__amount__max">
                  MAX
                </button>
              </div>

              <div className="transfer__token__form__action">
                <div></div>
                <button
                  type="submit"
                  className="transfer__token__form__action__btn"
                >
                  Transfer
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default CenterTransfer;
