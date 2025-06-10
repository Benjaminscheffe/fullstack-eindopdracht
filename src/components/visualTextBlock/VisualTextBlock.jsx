import './VisualTextBlock.scss';

function VisualTextBlock({ children, imageTitle }) {
    return (
        <section className="main-content-block">
            <div className="container small-container">
                <div className="text-with-visual-block">
                    <div className="text-with-visual-block-text">
                        { children }
                    </div>
                    <div className="text-with-visual-block-visual"><h3 className="text-transform-uppercase">{ imageTitle }</h3></div>
                </div>
            </div>
        </section>
    );
}

export default VisualTextBlock;