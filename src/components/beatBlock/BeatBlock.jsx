import './BeatBlock.scss';
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

function BeatBlock({ title, artist, bpm, image, children, error, price }) {

    return (
        <>
            <div className="beat-block flexBox no-wrap gap-2">
                <div className="flexBox gap-2">
                    <div className="beat-block-image">
                        <img src={image} alt={title} />
                    </div>
                    <div className="beat-block-info">
                        <p>{ title &&
                                <><span className="bold">{ title }</span><br/></>
                            }
                            { artist &&
                                <>{ artist }<br /></>
                            }
                           { bpm } BPM
                            { price &&
                                <><br />&#8364; { price }</>
                            }
                        </p>
                    </div>
                </div>

                <div className="beat-block-cta flexBox align-items-flex-end flex-direction-column gap">
                    { children }
                </div>
            </div>
            {error && <ErrorMessage message="Er is iets misgegaan bij het ophalen van het product. Probeer het opnieuw." /> }
        </>
    );
}

export default BeatBlock;