import './BeatBlock.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import {useParams} from "react-router";

function BeatBlock({ title, artist, price, bpm, image, children }) {
    const [beat, setBeat] = useState({});
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function fetchBeat() {
            toggleError(false);

            try {
                const response = await axios.get(`https://localhost:8080/beats/${id}`);

                console.log(response.data);

                setBeat(response.data)
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchBeat();
    })

    const {id} = useParams();

    return (
        <>
            <div className="beat-block flexBox gap-2">
                {Object.keys(beat).length > 0 && (<>
                    <div className="flexBox gap-2">
                        <div className="beat-block-image">
                            <img src={image} alt={title} />
                        </div>
                        <div className="beat-block-info">
                            <h4>{ title }</h4>
                            <h5>{ artist }</h5>
                            <div>{ bpm } BPM</div>
                        </div>
                        { price &&
                            <div>
                                <p className="no-margin">&euro; { price }</p>
                            </div>
                        }
                    </div>

                    <div className="beat-block-cta">
                        { children }
                    </div>
                </>)}
            </div>
            {error && <ErrorMessage message="Er is iets misgegaan bij het ophalen van het product. Probeer het opnieuw." /> }
        </>
    );
}

export default BeatBlock;