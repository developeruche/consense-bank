import { Fragment, useState } from "react";

interface Props {
  stable: any;
  crypto: any;
  transaction: any;
  bal: any;
}

function CenterDeposit({ stable, crypto, transaction, bal }: Props) {
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

  const [erc20Adddress, setEC20Address] = useState<string>("");
  const [erc20AdddressError, setEC20AddressError] = useState<string>(
    "Address is invalid!"
  );
  const [addressTo, setAddressTo] = useState<string>("");
  const [addressToError, setAddressToError] = useState<string>(
    "Address is invalid!"
  );
  const [tokenAmount, setTokenAmount] = useState<string>("");

  const [adddressOfMatic, setAddressOfMatic] = useState<string>("");
  const [maticTokenAmount, setMaticTokenAmount] = useState<string>("");

  const handleERC20Submit = (e: any) => {
    e.preventDefault();
    console.log({ erc20Adddress, addressTo, tokenAmount });
  };

  const handleMaticSubmit = (e: any) => {
    e.preventDefault();
    console.log({ adddressOfMatic, maticTokenAmount });
  };

  return (
    <div className="center">
      <div className="center__overview">
        <p>Deposit ERC20</p>

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
            <form
              onSubmit={handleERC20Submit}
              className="transfer__token__form"
            >
              <div className="transfer__token__form__erc20">
                <input
                  onChange={(e) => setEC20Address(e.target.value)}
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
                    onChange={(e) => setMaticTokenAmount(e.target.value)}
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
                  onChange={(e) => setEC20Address(e.target.value)}
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
                    onChange={(e) => setMaticTokenAmount(e.target.value)}
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

export default CenterDeposit;
