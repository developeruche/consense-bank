import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { MdKeyboardArrowDown } from "react-icons/md";
import AppModal from "./AppModal";

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  const [multiSig, setMultiSig] = useState<boolean>(false);

  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("SUBMITTED!!!");

    setIsLoading(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 18px",
        alignItems: "center"
      }}
    >
      <div className="center">
        <div className="center__header">
          <div className="center__header__section__one">
            <h2>Consense | Bank</h2>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="right__header" style={{
          display: "flex",
          alignItems: "center"
        }}>
          <div className="right__header__chain">
            <Link href={"/"}>
              <a className="center__header__section__two">Dashboard</a>
            </Link>
          </div>
          <div className="right__header__second">
            <div className="right__header__profile">
              <div
                className="dropdown"
                onClick={() => setIsDropdown(!isDropdown)}
              >
                Connect <MdKeyboardArrowDown />
              </div>

              {isDropdown && (
                <ClickAwayListener onClickAway={() => setIsDropdown(false)}>
                  <div className="dropdown-details">
                    <div>
                      {/* <ConnectButton
                        accountStatus="avatar"
                        chainStatus="icon"
                        showBalance={false}
                      /> */}
                      <ConnectKitButton />
                    </div>
                    <div
                      onClick={() => setMultiSig(true)}
                      className="dropdown-details-multisig"
                    >
                      MultiSig
                    </div>
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
        </div>
      </div>

      <AppModal>
        <AppModal.Cover
          isOpen={multiSig}
          setIsOpen={setMultiSig}
          variant={"sm"}
        >
          <AppModal.Header
            showCloseBtn={true}
            heading={"Connect Multisig"}
            onClose={() => setMultiSig(false)}
          />

          <AppModal.Content variant={"lg"}>
            <div className="px-3 mt-8">
              <form
                className="check__address__form"
                action=""
                onSubmit={handleSubmit}
              >
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Token Address"
                  className="multisig__form__input"
                />

                <button className="multisig__form__btn">Connect</button>
              </form>
            </div>
          </AppModal.Content>
        </AppModal.Cover>
      </AppModal>
    </div>
  );
};

export default Navbar;
