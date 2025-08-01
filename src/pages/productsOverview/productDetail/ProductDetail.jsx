import './ProductDetail.scss';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function ProductDetail() {
    const [beat, setBeat] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

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

    const {id} = useParams();

    console.log(id);


    return (
        <main>
            <section className="main-content-block">
                <div className="container small-container ">
                    <div className="detail-page justify-content-flex-start flexBox align-items-top gap-2 w-100">
                            <div className="detail-page-image"></div>
                            <div className="detail-page-info">
                                { Object.keys(beat).length > 0 ?
                                    <>
                                        <h4>{beat.title}</h4>
                                        <h5>{beat.userId}</h5>
                                        <ul>
                                            <li>{beat.bpm}</li>
                                            <li>{beat.price}</li>
                                        </ul>
                                        <audio controls>
                                            <source src={`http://localhost:8080/beats/${beat.id}/file`}
                                                    type="audio/mpeg">
                                            </source>
                                            The browser doesn't support this audio!
                                        </audio>
                                        <button className="btn btn">
                                            BUY
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </button>
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