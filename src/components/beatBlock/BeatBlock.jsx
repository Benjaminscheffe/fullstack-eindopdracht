import './BeatBlock.scss';

function BeatBlock() {
    return (
        <div className="beat-block flexBox gap-2">
            <div className="flexBox gap-1">
                <div className="beat-block-image"></div>
                <div className="beat-block-info">
                    <h4>Title</h4>
                    <h5>Artist name</h5>
                    <div>BPM</div>
                </div>
            </div>
            <div className="beat-block-cta">
                <button className="btn btn-small btn-border btnReset">
                    Go to the beat <i className="fa-solid fa-music"></i>
                </button>
            </div>
        </div>
    );
}

export default BeatBlock;