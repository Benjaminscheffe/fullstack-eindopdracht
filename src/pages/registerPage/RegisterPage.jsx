import './RegisterPage.scss';
import VisualTextBlock from "../../components/visualTextBlock/VisualTextBlock.jsx";
import { useForm } from "react-hook-form";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import {useState} from "react";
import axios from "axios";
// import toast, {Toaster} from 'react-hot-toast';
import ButtonComponent from "../../components/buttonComponent/ButtonComponent.jsx";
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    const [error, toggleError] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();
    // const notify = () => toast('Registered successfully!')
    const navigate = useNavigate();

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
        } finally {
            navigate('/success' , {state: {registered: true }});
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
                                inputName="username"
                                inputId="username-field"
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
                                inputType="password"
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
                            <ButtonComponent type="submit" classNames="btn-small btn-inverted" buttonText="Register" />
                        </form>
                    </div>
                    { error && <p>Something went wrong!!</p>}
                </VisualTextBlock>
            </section>
        </main>
    );
}

export default RegisterPage;