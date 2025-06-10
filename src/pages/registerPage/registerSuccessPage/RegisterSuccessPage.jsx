import './RegisterSuccessPage.scss';
import {Link} from "react-router-dom";

function RegisterSuccessPage() {
    return (
        <main className="container small-container flexBox justify-content-center">
            <section className="text-align-center">
                <h1>Thank for signing up.</h1>
                <Link to="/beats">Go check out some beats</Link>
            </section>
        </main>
    );
}

export default RegisterSuccessPage;