import './Landingpage.scss';
import VisualBlock from "../../components/visualBlock/VisualBlock.jsx";
import VisualTextBlock from "../../components/visualTextBlock/VisualTextBlock.jsx";
import {Link} from "react-router-dom";

function Landingpage() {
    return (
        <main>
            <section className="hero">
                <div className="container hero-inner">
                    <div className="text-align-center">
                        <h1>start your music journey as creator</h1>
                        <Link to="/beats" className="btn">get / drop your beats</Link>
                    </div>
                </div>

            </section>

            <section className="main-content-block">
                <div className="container small-container">
                    <p className="text-align-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

            </section>


            <VisualBlock imageTitle="Music from the streets"/>

            <VisualTextBlock imageTitle="Drop your beats">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur.</p><p>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.</p>
            </VisualTextBlock>

        </main>
    );
}

export default Landingpage;