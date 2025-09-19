import './LoginPage.scss';
import VisualTextBlock from "../../components/visualTextBlock/VisualTextBlock.jsx";
import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import {useForm} from "react-hook-form";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent.jsx";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [error, toggleError] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();

    async function handleFormSubmit(data) {
        console.log(login);
        toggleError(false);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            console.log(response.data);

            login(response.data);
        } catch (e) {
            console.error(e);

            toggleError(true);
        }
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
                                inputName="username"
                                inputId="username-field"
                                inputLabel="Username"
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

                            <ButtonComponent type="submit" classNames="btn-inverted btn-small" buttonText="login"/>
                        </form>
                        { error && <p>Something went wrong!!</p>}
                    </div>
                    <h2>Not yet a customer?</h2>
                    <p>Register now and get 5% discount code.</p>
                    <Link className="btn btn-small btn-inverted" to="/register">Register</Link>
                </VisualTextBlock>
            </section>
        </main>
    );
}

export default LoginPage;