import './productsOverview.scss';
import BeatBlock from "../../components/beatBlock/BeatBlock.jsx";

function productsOverview() {
    return (
        <>
            <section className="main-content-block">
                <div className="container">
                    <h1>Listen to all the beats</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </section>
            <section className="main-content-block no-padding-top">
                <div className="container small-container">
                    <label>
                        Sort by style:
                        <select>
                            <option selected>raw</option>
                            <option>north-style</option>
                            <option>south-style</option>
                        </select>
                    </label> <br /><br />

                    <div className="beats-container">
                        <BeatBlock />

                        <BeatBlock />
                        <BeatBlock />
                    </div>
                </div>
            </section>
        </>
    );
}

export default productsOverview;