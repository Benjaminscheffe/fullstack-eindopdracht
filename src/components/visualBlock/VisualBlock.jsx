import './VisualBlock.scss';

function VisualBlock({imageTitle}) {
    return (
        <section className="visual-block">
            <div className="container small-container text-align-center">
                <h2 className="text-transform-uppercase">{ imageTitle }</h2>
            </div>
        </section>
    );
}

export default VisualBlock;