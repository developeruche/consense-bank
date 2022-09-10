import {useState} from "react"

interface Props {
    blockchainData: any,
    offPopModal: () => void,
    report: (x: string, y: number) => void
}
const PopModal = ({blockchainData, offPopModal, report}: Props) => {
    const [mod, setMod] = useState("");


    const handler = (x: string, y: number) => {
        report(x, y);
        offPopModal();
    }
    
    return (
        <div className="pop__modal__container">
         <div className="pop__modal">
            {
                blockchainData ? (
                    <>
                        {
                            blockchainData.map((blk: any, index: any) => {
                                return (
                                    <div className="pop__modal__cta" key={index} onClick={() => {handler(blk.label, blk.chain_id)}}>
                                        <img src={blk.logo_url} alt="" />
                                        <p>{blk.label}</p>
                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    <div className="pop__modal__loading">
                        <p>Loading chians</p>
                    </div>
                )
            }
         </div>
        </div>
    )
}

export default PopModal;