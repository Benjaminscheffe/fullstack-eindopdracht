import './header.scss';
import {useState} from "react";

function Header() {

    const [isActive, setActive] = useState("false");
    const ToggleClass = () => {
        setActive(!isActive);
    };

    return (
        <header>
            <div className="container flexBox">
                <div className="flexBox justify-content-flex-start">
                    <button className="btnReset menuBtn" onClick={ToggleClass}>
                        <i className={!isActive ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i
                        ></button>
                    <a href="/">BeatsForSale</a>
                </div>
                <a href="/"><i className="fa-solid fa-user"></i></a>
                <div className={!isActive ? "menu open" : "menu"} >
                    <ul>
                        <li><a href="/">Go to</a></li>
                        <li><a href="/">Go to</a></li>
                        <li><a href="/">Go to</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;