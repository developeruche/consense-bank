import {ReactNode} from "react"
import Sidebar from "./Sidebar"

interface Props {
    children?: ReactNode,
  };

const Page = ({ children }: Props) => (
    <div className="page_layout">
        <div className="page__section__one">
            <Sidebar />
        </div>
        <div className="page__section__two">
            {children}
        </div>
    </div>
  );

export default Page;