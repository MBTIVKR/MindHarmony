import { Home, UserRound} from "lucide-react";
import { Link } from "react-router-dom";
import { Paths } from "@/App/Routes/types/Paths";
import './HeaderMain.scss'
import { Burger } from "@/Components";

interface HeaderProps {
    title: string
    activeMenu: boolean
    location: string
    handleMenu: () => void
}

const HeaderMain = ({title, handleMenu, location}: HeaderProps) => {
  return (
    <header className={ location === Paths.Home ? "header pos-sticky" : 'header'}>
        <div className="container">
            <div className="header__wrapper">
                <Burger handleMenu={handleMenu}/>
                <div className="header__title section-title section-title-lines">{title}</div>
                {location !== Paths.Account ? 
                <Link to={Paths.Account}>
                    <div className="header__icon border-r-4">
                        <UserRound color="#CDB79E"/>
                    </div>
                </Link>: 
                <Link to={Paths.Home}>
                    <div className="header__icon border-r-4">
                        <Home color="#CDB79E" />
                    </div>
                </Link>
                }
            </div>
        </div>
    </header>
  );
};

export {HeaderMain};