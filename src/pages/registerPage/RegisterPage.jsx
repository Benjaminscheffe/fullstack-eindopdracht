import './RegisterPage.scss';
import VisualTextBlock from "../../components/visualTextBlock/VisualTextBlock.jsx";
import { useForm } from "react-hook-form";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function RegisterPage() {
    const [user, setUser] = useState({});
    const [error, toggleError] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();

    async function handleFormSubmit(data) {
        toggleError(false);

        try {
            const response = await axios.post("http://localhost:8080/users",
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

            console.log(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <main>
            <section className="container small-container">
                <VisualTextBlock imageTitle="The beats are calling">
                    <h1>Sign up</h1>
                    <div className="form-block">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <InputComponent
                                inputType="text"
                                inputName="name"
                                inputId="name-field"
                                inputLabel="Username"
                                validationRules={{
                                    required:  {
                                        value: true,
                                        message: 'This field is required'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Name must be at least 3 characters',
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: 'Name may contain a maximum of 15 characters',
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
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
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
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
                                    minLength: {
                                        value: 6,
                                        message: 'Name must be at least 6 characters',
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: 'Name may contain a maximum of 12 characters',
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
                            <button type="submit" className="btn btn-small">Register</button>
                        </form>
                    </div>
                </VisualTextBlock>
            </section>
        </main>
    );
}

export default RegisterPage;