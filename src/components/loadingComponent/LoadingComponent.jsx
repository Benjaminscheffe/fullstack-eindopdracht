import './LoadingComponent.scss';

function LoadingComponent({ text }) {
    return (
        <div className="loading-overlay flexBox justify-content-center">
            <div className="flexBox flex-direction-column gap-2">
                { text && <h2>{ text }</h2>}
                <div className="loader"></div>
            </div>
        </div>
    );
}

export default LoadingComponent;