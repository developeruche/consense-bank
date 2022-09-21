// This file would handle all the api requests
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config(); // Init enviroment variables

// const APIKEY = process.env.API_KEY;
const APIKEY = "ckey_734f1d56d86f424cad81af0241d";
const baseURL = "https://api.covalenthq.com/v1";
const chainId = "80001";

function filter_nft(item: any) {
  return item.type == "nft";
}

function filter_stablecoin(item: any) {
  return item.type == "stablecoin" && item.quote != 0;
}

function filter_crypto(item: any) {
  return item.type == "cryptocurrency" && item.quote != 0;
}

function filter_stablecoin__or__crypto(item: any) {
  return (
    item.type == "stablecoin" ||
    (item.type == "cryptocurrency" && item.quote != 0)
  );
}

// this woould return the list of the supported token address
export const get_chain = async () => {
  // This would return all the token balnaces data of a user
  let r_responds = null;
  await axios
    .get(`${baseURL}/chains/?quote-currency=USD&format=JSON&key=${APIKEY}`)
    .then((data) => {
      r_responds = data.data.data.items;
    })
    .catch((err) => console.log(err));

  return r_responds;
};

// this would be returning the balances of the user
export const get_balances = async (address: any) => {
  let r_nft = null;
  let r_cryptocurrency: any = null;
  let r_stablecoin: any = null;
  let r_stable_and__crypto: any = null;
  let asset__value: any = 0;
  let stable_asset__value = null;

  await axios
    .get(
      `${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}&page-size&nft=false&no-nft-fetch=false`
    )
    .then((data) => {
      let items = data.data.data.items;
      r_nft = items.filter(filter_nft);
      r_stablecoin = items.filter(filter_stablecoin);
      r_cryptocurrency = items.filter(filter_crypto);
      r_stable_and__crypto = items.filter(filter_stablecoin__or__crypto);
    })
    .catch((err) => console.log(err));
  console.log(
    `${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}&page-size&nft=true&no-nft-fetch=false`
  );

  if (r_stable_and__crypto?.length) {
    for (let i = 0; i < r_stable_and__crypto.length; i++) {
      asset__value += r_stable_and__crypto[i].quote;
    }
  }

  if (r_stablecoin?.length) {
    for (let i = 0; i < r_stablecoin.length; i++) {
      stable_asset__value += r_stablecoin[i].quote;
    }
  }

  
  
  let pie_data = [
    {
      name: "Stable",
      dig: stable_asset__value,
    },
    {
      name: r_cryptocurrency[0]
      ? r_cryptocurrency[0].contract_ticker_symbol
        : "",
        dig: r_cryptocurrency[0] ? r_cryptocurrency[0].quote : 0,
      },
      {
      name: r_cryptocurrency[1]
        ? r_cryptocurrency[1].contract_ticker_symbol
        : "",
      dig: r_cryptocurrency[1] ? r_cryptocurrency[1].quote : 0,
    },
    {
      name: r_cryptocurrency[2]
        ? r_cryptocurrency[1].contract_ticker_symbol
        : "",
        dig: r_cryptocurrency[2] ? r_cryptocurrency[1].quote : 0,
      },
      {
        name: r_cryptocurrency[3]
        ? r_cryptocurrency[1].contract_ticker_symbol
        : "",
        dig: r_cryptocurrency[3] ? r_cryptocurrency[1].quote : 0,
      },
    ];
    
    console.log(r_cryptocurrency);
    console.log(stable_asset__value);
  return [r_cryptocurrency, r_stablecoin, r_nft, asset__value, pie_data];
};

// this would return the last 15 transaction of the user
export const get_transaction = async (
  chainId: string,
  address: string,
  page_size: string
) => {
  let r_responds = null;
  await axios
    .get(
      `${baseURL}/${chainId}/address/${address}/transactions_v2/?key=${APIKEY}&page-size=${page_size}`
    )
    .then((data) => {
      // console.log(data.data.data.items);
      r_responds = data.data.data.items;
    })
    .catch((err) => console.log(err));

  return r_responds;
};
