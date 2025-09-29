import './ProductDetail.scss';
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext.jsx";
import toast, {Toaster} from 'react-hot-toast';
import BeatBlock from "../../../components/beatBlock/BeatBlock.jsx";
import ButtonComponent from "../../../components/buttonComponent/ButtonComponent.jsx";

function ProductDetail() {
    const [beat, setBeat] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const {isAuth} = useContext(AuthContext);
    const notifyLogin = () => toast('Login to buy beats!');
    const notifyBought = () => toast('Beat successfully added to your profile!');

    useEffect(() => {
        async function fetchBeat() {
            toggleLoading(true);
            toggleError(false);

            try {
                const response = await axios.get(`http://localhost:8080/beats/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);

                setBeat(response.data);
            } catch (e) {
                console.error(e);

                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchBeat();
    }, []);

    async function placeOrder() {
        if (!isAuth) {
            notifyLogin();
        } else {
            toggleLoading(true);
            toggleError(false);

            let date = new Date().toISOString();
            date = date.replace(/Z$/, '');

            console.log(date);

            const orderDate = { orderDate : date };

            try {
                const response = await axios.post('http://localhost:8080/orders', orderDate, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    }
                });

                console.log(response.data);

                await assignBeat(response.data.id);
                await assignUser(response.data.id);

            } catch (e) {
                console.error(e);

                toggleError(true);
            } finally {
                toggleLoading(false);
            }

        }
    }

    async function assignBeat(id) {
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.put(`http://localhost:8080/orders/${id}/beat/${beat.id}`, null, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data);

        } catch (e) {
            console.error(e.response.data);

            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    async function assignUser(id) {
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.put(`http://localhost:8080/orders/${id}/user/${localStorage.getItem('id')}`, null, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(response.data);
            notifyBought();

        } catch (e) {
            console.error(e.response.data);

            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }


    const {id} = useParams();

    return (
        <main>
            <Toaster />
            <section className="main-content-block">
                <div className="container extra-small-container ">
                    <div className="detail-page w-100">
                        <div className="detail-page-info">
                            { Object.keys(beat).length > 0 ?
                                <>
                                    <div className="flexBox no-wrap gap-1 title-block">
                                        <h2>{beat.title}</h2>
                                        <a href="/beats" className="btn btn-small btn-inverted">
                                            <i className="fa-solid fa-chevron-left"></i> <span className="hide-on-mobile">Back to overview</span>
                                        </a>
                                    </div>
                                    <BeatBlock artist={beat.userName} bpm={beat.bpm} price={beat.price} image={`http://localhost:8080/beats/${beat.id}/image`} error={error}>
                                        <ButtonComponent classNames="btn-small btn-border btn-inverted btnReset" buttonText="buy" noteIcon={true} buttonFunction={() => placeOrder()}  />
                                    </BeatBlock>

                                    <div className="audio-block">
                                        <audio controls controlsList="nodownload">
                                            <source src={`http://localhost:8080/beats/${beat.id}/file`}
                                                    type="audio/mpeg">
                                            </source>
                                            The browser doesn't support this audio!
                                        </audio>
                                    </div>

                                    <h3 className="text-transform-uppercase">Reviews</h3>
                                    <ul>
                                        { beat.reviews.length > 0 ? beat.reviews.map((review) =>

                                            <li><span className="font-weight-700 text-transform-uppercase">{ review.username }</span> <br /> score: { review.score } <br/> "{ review.comment }"</li>
                                            ) :
                                            <li>No reviews yet</li>
                                        }
                                    </ul>

                                    </> : <p>Deze beat is niet beschikbaar</p>
                            }

                            {loading && <p>Loading....</p>}
                            {beat.length === 0 && error && <p>Er ging iets mis bij het ophalen van de data...</p>}
                            </div>
                        </div>

                    </div>




            </section>
        </main>
    );
}

export default ProductDetail;