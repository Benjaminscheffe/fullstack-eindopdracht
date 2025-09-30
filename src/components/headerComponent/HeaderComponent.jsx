import './HeaderComponent.scss';
import {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import logo from "../../assets/images/logo.png"

function HeaderComponent() {

    const [isActive, setActive] = useState("false");
    const ToggleClass = () => {
        setActive(!isActive);
    };

    const { userId, isAuth, logout } = useContext(AuthContext);

    return (
        <header>
            <div className="container flexBox">
                <div className="flexBox justify-content-flex-start text-align-center">
                    <button className="btnReset menuBtn" onClick={ToggleClass}>
                        <i className={!isActive ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                    </button>
                    <NavLink to="/" className="flexBox"><img className="logo" src={logo} /></NavLink>
                </div>
                <nav>
                    <ul className="flexBox gap-2">
                        <li>
                            <NavLink to="/" className={({isActive}) => isActive === true ? 'active-link' : 'default-link' }>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/beats" className={({isActive}) => isActive === true ? 'active-link' : 'default-link' }>
                                Beats
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                    <div className="flexBox gap-1">
                        { !isAuth ?
                            <NavLink className="btn btn-inverted" to="/login">login</NavLink> :
                            <>
                                <button className="btn btn-inverted" onClick={logout}>Logout</button>
                                <NavLink to={`/user/${userId}`}><i className="fa-solid fa-user"></i></NavLink>
                            </>
                        }


                    </div>
                <div className={!isActive ? "menu open" : "menu"} >
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/">Beats</NavLink></li>
                        <br />
                        <li><NavLink className="btn btn-border" to="/login">login</NavLink></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;