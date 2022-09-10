import React from "react";

interface Props {
    handleChainChange: () => void;
    chainName: string;
    chainId: any;
    pie_data: any;
    nfts: any;
}

function Right({handleChainChange, pie_data, chainName, nfts} : Props) {
    
    console.log(nfts)
    return (
      <div className="right">
        <div className="right__nft__list__wrapper">
            <div className="right__nft__list">
                
            </div>
        </div>
      </div>
    )
  }
  
  export default Right;