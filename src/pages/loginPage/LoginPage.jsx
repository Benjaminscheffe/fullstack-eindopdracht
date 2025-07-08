import './LoginPage.scss';
import VisualTextBlock from "../../components/visualTextBlock/VisualTextBlock.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import {useForm} from "react-hook-form";

function LoginPage() {
    const [user, setUser] = useState({});
    const [error, toggleError] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();

    async function getUser() {

    }

    function handleFormSubmit(data) {
        console.log(data);
    }
    return (
        <main>
            <section className="container small-container">
                <VisualTextBlock imageTitle="The beats are calling">
                    <h1>Login</h1>
                    <div className="form-block">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <InputComponent
                                inputType="text"
                                inputName="email"
                                inputId="email-field"
                                inputLabel="Email"
                                validationRules={{
                                    required:  {
                                        value: true,
                                        message: 'This field is required'
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
                            <InputComponent
                                inputType="text"
                                inputName="password"
                                inputId="password-field"
                                inputLabel="Password"
                                validationRules={{
                                    required:  {
                                        value: true,
                                        message: 'This field is required'
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
                            <button type="submit" className="btn btn-small">Login</button>
                        </form>
                    </div>
                    <h2>Not yet a customer?</h2>
                    <p>Register now and get 5% discount code.</p>
                    <Link className="btn btn-small" to="/register">Register</Link>
                </VisualTextBlock>
            </section>
        </main>
    );
}

export default LoginPage;