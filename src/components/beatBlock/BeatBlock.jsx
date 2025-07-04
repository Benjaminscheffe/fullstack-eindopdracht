import './BeatBlock.scss';

function BeatBlock({ title, artist, price, bpm, image, children }) {
    return (
        <div className="beat-block flexBox gap-2">
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
        </div>
    );
}

export default BeatBlock;