import './RegisterPage.scss';
import VisualTextBlock from "../../components/visualTextBlock/VisualTextBlock.jsx";

function RegisterPage() {
    return (
        <main>
            <section className="container small-container">
                <VisualTextBlock imageTitle="The beats are calling">
                    <h1>Sign up</h1>
                    <div className="form-block">
                        <form>
                            <label>
                                Username
                                <input />
                            </label>
                            <label>
                                Firstname
                                <input />
                            </label>
                            <label>
                                Email
                                <input />
                            </label>
                            <label>
                                Choose your password
                                <input />
                            </label>


                            <button className="btn btn-small">Register</button>
                        </form>
                    </div>
                </VisualTextBlock>
            </section>
        </main>
    );
}

export default RegisterPage;