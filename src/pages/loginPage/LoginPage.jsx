import './LoginPage.scss';
import VisualTextBlock from "../../components/visualTextBlock/VisualTextBlock.jsx";

function LoginPage() {
    return (
        <main>
            <section className="container small-container">
                <VisualTextBlock imageTitle="The beats are calling">
                    <h1>Login</h1>
                    <div className="form-block">
                        <form>
                            <label>
                                Email
                                <input />
                            </label>
                            <label>
                                Password
                                <input />
                            </label>

                            <button className="btn btn-small">inloggen</button>
                        </form>
                    </div>
                    <h2>Not yet a customer?</h2>
                    <p>Register now and get 5% discount code.</p>
                    <button className="btn btn-small">Register</button>
                </VisualTextBlock>
            </section>
        </main>
    );
}

export default LoginPage;