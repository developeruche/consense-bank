import { useState } from "react";

interface Props {
  handleChainChange: () => void;
  chainName: string;
  chainId: any;
  pie_data: any;
  nfts: any;
}

function RightDeposit({ handleChainChange, pie_data, chainName, nfts }: Props) {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  const [multiSig, setMultiSig] = useState<boolean>(false);

  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("SUBMITTED!!!");

    setIsLoading(true);
  };

  console.log(nfts);
  return (
    <div className="right">
      <div className="right__nft__list__wrapper">
        <div className="right__nft__list">

        </div>
      </div>
    </div>
  );
}

export default RightDeposit;
