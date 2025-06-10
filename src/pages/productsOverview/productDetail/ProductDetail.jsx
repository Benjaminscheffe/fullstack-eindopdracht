import './ProductDetail.scss';

function ProductDetail() {
    return (
        <main>
            <section className="main-content-block">
                <div className="container small-container ">
                    <div className="detail-page flexBox justify-content-flex-start">
                        <div className="flexBox align-items-top gap-2 w-100">
                            <div className="detail-page-image"></div>
                            <div className="detail-page-info">
                                <h4>Title</h4>
                                <h5>Artist name</h5>
                                <p>BPM</p>
                                <div>
                                    nummer preview
                                </div>
                                <button className="btn btn">
                                    BUY
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProductDetail;