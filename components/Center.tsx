import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { BounceLoader, CircleLoader, ClipLoader } from "react-spinners";
import { useAccount, useContract, useContractRead, useContractReads, useProvider } from "wagmi";
import { BANK_ABI, BANK_CONTRACT, BANK_CONTRACT_ADDRESS } from "../config";
import { get_balances } from "../utils/action";

interface Props {
  stable: any;
  crypto: any;
  transaction: any;
  bal: any;
}

function Center({ stable, crypto, transaction, bal }: Props) {
  const [toggle, setToggle] = useState<string>("Custody");


  const {address} = useAccount();



  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("SUBMITTED!!!");

    setIsLoading(true);


    const response = await contract.getERC20TokenBalance(tokenAddress);

    // @ts-ignore
    setTokenBalance(Number(response._hex));

    setIsLoading(false);
  };

  // const {
  //   data: balanceData,
  //   isError: timeLockError,
  //   isLoading: timeLockLoading,
  // } = useContractRead({
  //   addressOrName: BANK_CONTRACT_ADDRESS,
  //   contractInterface: BANK_ABI.abi,
  //   functionName: "getBalance",
  // });

  // console.log("Success Balance: ", Number(balanceData));




  const provider = useProvider()
  const contract = useContract({
    ...BANK_CONTRACT, // MATIC
    signerOrProvider: provider,
  })


  const {
    data: balanceData,
    isError,
    isLoading: balanceLoading,
  } = useContractReads({
    contracts: [
      {
        ...BANK_CONTRACT, // MATIC
        functionName: "getBalance",
      },
      {
        ...BANK_CONTRACT, // USDT
        functionName: "getERC20TokenBalance",
        args: ["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
      },
      {
        ...BANK_CONTRACT, // USDC
        functionName: "getERC20TokenBalance",
        args: ["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
      },
      {
        ...BANK_CONTRACT, // DAI
        functionName: "getERC20TokenBalance",
        args: ["0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"],
      },
    ],
  });

  console.log(balanceData);

  const balances = (balanceData: Array<any>) => {
    return [
      {
        // @ts-ignore
        quote: balanceData[0]?.toString(),
        contract_ticker_symbol: "MATIC",
        logo_url:
          "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
      {
        // @ts-ignore
        quote: balanceData[1]?.toString(),
        contract_ticker_symbol: "USDT",
        logo_url:
          "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
      {
        // @ts-ignore
        quote: balanceData[2]?.toString(),
        contract_ticker_symbol: "USDC",
        logo_url:
          "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
      {
        // @ts-ignore
        quote: balanceData[3]?.toString(),
        contract_ticker_symbol: "DAI",
        logo_url:
          "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
    ];
  };

  const [etherBalanceInUSD, setEtherBalanceInUSD] = useState("");
  const [usdcBalanceInUSD, setUSDCBalanceInUSD] = useState("");
  const [usdtBalanceInUSD, setUSDTBalanceInUSD] = useState("");
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState("");

  async function getBalanceInUSD() {
    // @ts-ignore
    const response = await get_balances(address);

    console.log(response);
    

    let etherBal = response[0][0]?.balance;
    let usdcBal = response[1][0]?.balance;
    let usdtBal = response[2][0]?.balance;

    console.log(etherBal, usdcBal, usdtBal);

    setEtherBalanceInUSD(etherBal);
    setUSDCBalanceInUSD(usdcBal);
    setUSDTBalanceInUSD(usdtBal);

    setTotalBalanceInUSD(etherBal + usdcBal + usdtBal);
  }


  useEffect(() => {
    getBalanceInUSD();
  }, []);

  return (
    <div className="center">
      <div className="center__overview">
        <p>Overview</p>
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
            <div className="center__display__stable">
              {stable &&
                stable.map((token: any, index: number) => {
                  return (
                    <div key={index} className="center__display__stable__item">
                      <img
                        src={token.logo_url}
                        alt={token.contract_ticker_symbol}
                      />
                      <p>${Number(token.quote).toFixed(2)}</p>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="center__display__coin">
              {stable &&
                stable.map((token: any, index: number) => {
                  return (
                    <div key={index} className="center__display__stable__item">
                      <img
                        src={token.logo_url}
                        alt={token.contract_ticker_symbol}
                      />
                      <p>${Number(token.quote).toFixed(2)}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="center__display" style={{ marginTop: "20px" }}>
            <div className="center__display__stable">
              {balanceData &&
                balances(balanceData)?.map((token: any, index: number) => {
                  return (
                    <div key={index} className="center__display__crypto__item">
                      <img
                        src={token.logo_url}
                        alt={token.contract_ticker_symbol}
                      />
                      <p>{Number(token.quote).toFixed(2)}</p>
                    </div>
                  );
                })}
            </div>
            <hr />

            <form
              className="check__address__form"
              action=""
              onSubmit={handleSubmit}
            >
              <input
                onChange={(e) => setTokenAddress(e.target.value)}
                type="text"
                placeholder="Token Address"
                className="check__address__form__input"
              />

              <div className="check__address__form__btn">
                <button className="check__address__form__btn__submit">
                  Query Balance
                </button>
                {isLoading && (
                  <button className="check__address__form__btn__submit">
                    <ClipLoader size={20} />
                  </button>
                )}
              </div>


              {(!isLoading && tokenBalance !== "") ? (
                <div className="query__balance__result">
                  {`${tokenBalance}`}
                </div>
                // 0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b
              ) : null}
            </form>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Center;
