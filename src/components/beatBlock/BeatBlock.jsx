import './BeatBlock.scss';
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

function BeatBlock({ title, artist, bpm, image, children, error }) {

    return (
        <>
            <div className="beat-block flexBox gap-2">
                <div className="flexBox gap-2">
                    <div className="beat-block-image">
                        <img src={image} alt={title} />
                    </div>
                    <div className="beat-block-info">
                        <p><span className="bold">{ title }</span><br/>
                           { artist }<br />
                           { bpm } BPM
                        </p>
                    </div>
                    {/*{ price &&*/}
                    {/*    <div>*/}
                    {/*        <p className="no-margin">&euro; { price }</p>*/}
                    {/*    </div>*/}
                    {/*}*/}
                </div>

                <div className="beat-block-cta">
                    { children }
                </div>
            </div>
            {error && <ErrorMessage message="Er is iets misgegaan bij het ophalen van het product. Probeer het opnieuw." /> }
        </>
    );
}

export default BeatBlock;