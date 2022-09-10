import Link from "next/link"

function Sidebar() {
  return (
    <div className="s_components">
        <div className="s_component__logo">
            <i className="uil uil-university"></i>
        </div>

        <div className="s_component__menu">
            <Link href={"/"}>
                <a>
                    <div className="s_component__menu__item active_bar">
                        <i className="uil uil-apps"></i>
                    </div>
                </a>
            </Link>
            <Link href={"/transfer"}>
                <a>
                    <div className="s_component__menu__item">
                        <i className="uil uil-message"></i>
                    </div>

                </a>
            </Link>

            <Link href={"/deposit"}>
                <a>
                    <div className="s_component__menu__item">
                        <i className="uil uil-wallet"></i>
                    </div>
                </a>
            </Link>
            <div className="s_component__menu__item">
                <i className="uil uil-chart-pie-alt"></i>
            </div>
        </div>

        <div className="s_component__logout">
            <i className="uil uil-signout"></i>
        </div>
    </div>
  )
}

export default Sidebar