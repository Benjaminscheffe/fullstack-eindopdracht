import './ProductsOverview.scss';
import {useEffect, useState} from 'react';
import axios from 'axios';
import BeatBlock from "../../components/beatBlock/BeatBlock.jsx";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent.jsx";


function ProductsOverview() {
    const [beats, setBeats] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const response = await axios.get('');

                console.log(response.data);

                setBeats(response.data);
            } catch (e) {
                console.error(e);

                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchData();
    })

    return (
        <main>
            <section className="main-content-block">
                <div className="container">
                    <h1>Listen to all the beats</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </section>
            <section className="main-content-block no-padding-top">
                <div className="container small-container">

                    <div className="beats-container">

                        <BeatBlock title="title 1" artist="artist 1" bpm="90" price="9,95" image="src/assets/images/ghettoblaster.jpg">


                            <ButtonComponent classNames="btn-small btn-border btnReset" buttonText="Go to the beat" noteIcon={true}  />
                        </BeatBlock>

                        {loading && <p>Loading....</p>}
                        {beats.length === 0 && error && <p>Er ging iets mis bij het ophalen van de data...</p>}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProductsOverview;