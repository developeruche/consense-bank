import Link from "next/link";
import { Fragment, useState } from "react";
import { BounceLoader, CircleLoader, ClipLoader } from "react-spinners";

interface Props {
  stable: any;
  crypto: any;
  transaction: any;
  bal: any;
}

function Center({ stable, crypto, transaction, bal }: Props) {
  const [toggle, setToggle] = useState<string>("Custody");

  const ov = [
    {
      quote: 5344.9346,
      contract_ticker_symbol: "USDT",
      logo_url:
        "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
    {
      quote: 5344.9346,
      contract_ticker_symbol: "USDT",
      logo_url:
        "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
    {
      quote: 5344.9346,
      contract_ticker_symbol: "USDT",
      logo_url:
        "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
    {
      quote: 5344.9346,
      contract_ticker_symbol: "USDT",
      logo_url:
        "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
    {
      quote: 5344.9346,
      contract_ticker_symbol: "USDT",
      logo_url:
        "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    },
  ];

  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("SUBMITTED!!!");

    setIsLoading(true);

    setTimeout(() => {
      setTokenAddress("");
      setTokenBalance("4000");
      setIsLoading(false);
    }, 3000);
  };

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
              {ov &&
                ov.slice(0, 1).map((token: any, index: number) => {
                  return (
                    <div key={index} className="center__display__crypto__item">
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

              {!isLoading && tokenBalance && (
                <div className="query__balance__result">
                  {`${tokenBalance} ETH`}
                </div>
              )}
            </form>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Center;
