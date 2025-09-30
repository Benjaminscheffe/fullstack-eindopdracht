import './FooterComponent.scss';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.png"

function FooterComponent() {


    return (
        <footer>
            <div className="container">
                <div className="flexBox">
                    <div>
                        <ul className="">
                            <li>
                                <NavLink to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/beats">
                                    Beats
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <img src={logo} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;