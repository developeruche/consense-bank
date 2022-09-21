import ERC20_ABI from "../utils/ERC20.json";
import { Fragment, useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { BANK_ABI, BANK_CONTRACT, BANK_CONTRACT_ADDRESS, CHAIN_ID } from "../config";
import { useDepositERC20Write } from "../hooks/useBankWrite";
import { ethers } from "ethers";

import { useRouter } from 'next/router'


import { toast } from 'react-toastify';

interface Props {
  stable: any;
  crypto: any;
  transaction: any;
  bal: any;
}

function CenterDeposit({ stable, crypto, transaction, bal }: Props) {
  const router = useRouter()


  const { address} = useAccount(); // address of user connected

  const [toggle, setToggle] = useState<string>("Custody");

  const [erc20Adddress, setERC20Address] = useState<string>("");
  const [erc20AdddressError, setEC20AddressError] = useState<string>(
    "Address is invalid!"
  );
  const [addressTo, setAddressTo] = useState<string>("");
  const [addressToError, setAddressToError] = useState<string>(
    "Address is invalid!"
  );
  const [tokenAmount, setTokenAmount] = useState<number>(0);

  const [adddressOfMatic, setAddressOfMatic] = useState<string>("");
  const [maticAmount, setMaticAmount] = useState<string>("");

  
  
  // approves ERC20 TOKEN TO DEPOSIT
  const { data: approveData, write: approveERC20Token, isLoading: approveLoading, isError: approveERC20Error } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: erc20Adddress,
    contractInterface: ERC20_ABI.abi,
    functionName: 'approve',
    args: [BANK_CONTRACT_ADDRESS, ethers.utils.parseEther(tokenAmount.toString())],
    chainId: CHAIN_ID
  });

  // DEPOSIT ERC20 token into the contract
  const { data: depositData, write: depositERC20Token, isLoading: depositERC20TokenLoading, isError, error } = useContractWrite({
    mode: 'recklesslyUnprepared',
    ...BANK_CONTRACT,
    functionName: 'depositERC20Token',
    args: [erc20Adddress, ethers.utils.parseEther(tokenAmount.toString())],
    chainId: CHAIN_ID
  });
  
  // call DEPOSIT erc20 token function after apporve function is successful
  const { isError: approvalError, isLoading: approvalLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess(data) {
      depositERC20Token();
    },
    onError(error) {
      toast.error("Encountered Error!");
    },
  })

  // resolve the form submission after the deposit is successful
  const { isError: depositError, isLoading: depositLoading } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess(data) {
      toast.success("Deposit Successful!");
      router.push('/')
    },
    onError(error) {
      toast.error("Failed to deposit Token!");
    },
  })


  // deposit matic into the contract
  const { data: depositMaticData, write: depositMatic, isLoading: depositMaticLoading, isError: depositMaticError } = useContractWrite({
    mode: 'recklesslyUnprepared',
    ...BANK_CONTRACT,
    functionName: 'deposit',
    overrides: {
      from: address,
      value: ethers.utils.parseEther(maticAmount ? maticAmount.toString() : "0"),
    },
    chainId: CHAIN_ID
  });


  // resolve the form submission after the deposit is successful
  const { isError: depositMaticWaitError, isLoading: depositMaticWaitLoading } = useWaitForTransaction({
    hash: depositMaticData?.hash,
    onSuccess(data) {
      toast.success("Deposit of Matic Successful!");
      router.push('/')
    },
    onError(error) {
      toast.error("Failed to deposit Matic!");
    },
  })
  
  
  const handleMaticSubmit = (e: any) => {
    e.preventDefault();

    depositMatic();

    if(approvalLoading || approvalLoading || depositERC20TokenLoading) {
      toast.loading("Loading!!!")
    }
  };

  const handleERC20Submit = (e: any) => {
    e.preventDefault();

    approveERC20Token();

    if(approvalLoading || approvalLoading || depositERC20TokenLoading) {
      toast.loading("Loading!!!")
    }
  };

  return (
    <div className="center">
      <div className="center__overview">
        <p>Deposit ERC20</p>

        <div className="center__overview__toggle">
          {/* <button
            onClick={() => setToggle("Custody")}
            className={`center__overview__toggle__btn center__overview__toggle__btn__left ${
              toggle === "Custody"
                ? "center__overview__toggle__btn_active"
                : null
            }`}
          >
            Custody
          </button> */}
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

      <Fragment>
          <div className="center__display">
            <form
              onSubmit={handleERC20Submit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__erc20">
                <input
                  onChange={(e: any) => setERC20Address(e.target.value)}
                  type="text"
                  placeholder="ERC20 Address"
                  className="transfer__token__form__erc20__input"
                />
                {/* <p className="transfer__token__form__error">
                  {erc20AdddressError}
                </p> */}
              </div>
              <div className="transfer__token__form__amount">
                <div>
                  <input
                    onChange={(e: any) => setTokenAmount(e.target.value)}
                    type="text"
                    placeholder="Amount"
                    className="transfer__token__form__amount__input"
                  />
                </div>
              </div>

              <div className="transfer__token__form__action">
                <button className="transfer__token__form__action__btn">
                  Generate Txn Data
                </button>
                <button
                  type="submit"
                  className="transfer__token__form__action__btn"
                >
                  Deposit
                </button>
              </div>
            </form>
          </div>

          <div className="deposit-details"></div>

          <div
            className="uuu"
            style={{ margin: "20px 0px 0px 0px", color: "white" }}
          >
            Deposit MATIC
          </div>
          <div className="center__display" style={{ marginTop: "20px" }}>
            <form
              onSubmit={handleMaticSubmit}
              className="transfer__token__form"
            >
              {/* <div className="transfer__token__form__addr__to">
                <input
                  onChange={(e) => setAddressOfMatic(e.target.value)}
                  type="text"
                  placeholder="Address of Matic"
                  className="transfer__token__form__addr__to__input"
                />
                {addressToError && (
                  <p className="transfer__token__form__error">
                    {addressToError}
                  </p>
                )}
              </div> */}
              <div className="transfer__token__form__amount">
                <div>
                  <input
                    onChange={(e) => setMaticAmount(e.target.value)}
                    type="text"
                    placeholder="Amount"
                    className="transfer__token__form__amount__input"
                  />
                </div>
              </div>

              <div className="transfer__token__form__action">
                <button className="transfer__token__form__action__btn">
                  Generate Txn Data
                </button>
                <button
                  type="submit"
                  className="transfer__token__form__action__btn"
                >
                  Deposit
                </button>
              </div>
            </form>
          </div>
        </Fragment>

      {/* {toggle === "Custody" ? (
        <Fragment>
          <div className="center__display">
            <form
              onSubmit={handleERC20Submit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__erc20">
                <input
                  onChange={(e: any) => setERC20Address(e.target.value)}
                  type="text"
                  placeholder="ERC20 Address"
                  className="transfer__token__form__erc20__input"
                />
                <p className="transfer__token__form__error">
                  {erc20AdddressError}
                </p>
              </div>
              <div className="transfer__token__form__amount">
                <div>
                  <input
                    onChange={(e: any) => setTokenAmount(e.target.value)}
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
                  Transfer
                </button>
              </div>
            </form>
          </div>

          <div className="deposit-details"></div>

          <div
            className="uuu"
            style={{ margin: "20px 0px 0px 0px", color: "white" }}
          >
            Deposit MATIC
          </div>
          <div className="center__display" style={{ marginTop: "20px" }}>
            <form
              onSubmit={handleMaticSubmit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__addr__to">
                <input
                  onChange={(e) => setAddressOfMatic(e.target.value)}
                  type="text"
                  placeholder="Address of Matic"
                  className="transfer__token__form__addr__to__input"
                />
                {addressToError && (
                  <p className="transfer__token__form__error">
                    {addressToError}
                  </p>
                )}
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
                <button className="transfer__token__form__action__btn">
                  Generate Txn Data
                </button>
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
      ) : (
        <Fragment>
          <div className="center__display">
            <form
              onSubmit={handleERC20Submit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__erc20">
                <input
                  onChange={(e) => setERC20Address(e.target.value)}
                  type="text"
                  placeholder="ERC20 Address"
                  className="transfer__token__form__erc20__input"
                />
                <p className="transfer__token__form__error">
                  {erc20AdddressError}
                </p>
              </div>
              <div className="transfer__token__form__amount">
                <div>
                  <input
                    onChange={(e: any) => setTokenAmount(e.target.value)}
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
                  Transfer
                </button>
              </div>
            </form>
          </div>

          <div className="deposit-details"></div>

          <div
            className="uuu"
            style={{ margin: "20px 0px 0px 0px", color: "white" }}
          >
            Deposit MATIC
          </div>
          <div className="center__display" style={{ marginTop: "20px" }}>
            <form
              onSubmit={handleMaticSubmit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__addr__to">
                <input
                  onChange={(e) => setAddressOfMatic(e.target.value)}
                  type="text"
                  placeholder="Address of Matic"
                  className="transfer__token__form__addr__to__input"
                />
                {addressToError && (
                  <p className="transfer__token__form__error">
                    {addressToError}
                  </p>
                )}
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
          </div>
        </Fragment>
      )} */}
    </div>
  );
}

export default CenterDeposit;
