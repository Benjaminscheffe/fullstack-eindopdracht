import './ProductDetail.scss';
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast';

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
                const response = await axios.post('http://localhost:8080/orders', orderDate);

                console.log(response.data);

                await assignUser(response.data.id);

                await assignBeat(response.data.id);

            } catch (e) {
                console.error(e);

                toggleError(true);
            } finally {
                toggleLoading(false);

                notifyBought();

            }

        }
    }

    async function assignBeat(id) {
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.put(`http://localhost:8080/orders/${id}/beat/${beat.id}`);
            console.log(response.data);

        } catch (e) {
            console.error(e);

            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    async function assignUser(id) {
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.put(`http://localhost:8080/orders/${id}/user/${localStorage.getItem('id')}`);

            console.log(response.data);

        } catch (e) {
            console.error(e);

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
                <div className="container small-container ">
                    <div className="detail-page justify-content-flex-start flexBox align-items-top gap-2 w-100">
                        <div className="detail-page-image"></div>
                        <div className="detail-page-info">
                            { Object.keys(beat).length > 0 ?
                                <>
                                    <h4>Title: {beat.title}</h4>
                                    <h5>{beat.userId}</h5>
                                    <ul>
                                        <li>{beat.bpm}</li>
                                        <li>{beat.price}</li>
                                    </ul>
                                    <audio controls controlsList="nodownload">
                                        <source src={`http://localhost:8080/beats/${beat.id}/file`}
                                                type="audio/mpeg">
                                        </source>
                                        The browser doesn't support this audio!
                                    </audio>
                                    <br /><br />

                                    <button className="btn btn" onClick={placeOrder}>
                                        BUY
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>

                                    </> : <p>Deze beat is niet beschikbaar</p>
                            }

                            {loading && <p>Loading....</p>}
                            {beat.length === 0 && error && <p>Er ging iets mis bij het ophalen van de data...</p>}
                            </div>
                        </div>
                        <h3>Reviews</h3>

                        <ul>
                            { Object.keys(beat).length > 0 &&
                            beat.reviews.length > 0 ? beat.reviews.map((review) =>

                                    <li>{ review.username } - score: { review.score } <br/> "{ review.comment }"</li>
                                ) :
                                <li>No reviews yet</li>
                            }
                        </ul>
                    </div>




            </section>
        </main>
    );
}

export default ProductDetail;