import './UserPage.scss';
import BeatBlock from "../../components/beatBlock/BeatBlock.jsx";
import Popup from "reactjs-popup";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import {useForm} from "react-hook-form";
import { useState} from 'react';
import newyork from "../../assets/images/newyork-panorama.jpg"
import axios from "axios";


function UserPage() {
    const [error, toggleError] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();

    async function handleFormSubmit(data) {
        console.log(data);
         toggleError(false);

         try {
             const response = await axios.post("http://localhost:8080/users", data, {
                 headers: {
                     'Content-Type': 'application/json',
                 }
             })

             console.log(response);
         } catch (e) {
             console.error(e);

             toggleError(true);
         }

    }

    function toggleAsideContent(id) {
        const contents = document.querySelectorAll('.aside-content-block');
        const asideLinks = document.querySelectorAll(".asideLink")
        const activeBlock = document.getElementById(id);

        console.log(`${id}Link`);

        const activeLink = document.getElementById(`${id}Link`);

        console.log(activeLink);
        contents.forEach(e => e.classList.add('hide'));
        asideLinks.forEach(e => e.classList.remove('active'));
        activeBlock.classList.remove('hide');
        activeLink.classList.add('active');
    }

    return (
        <main>
            <div className="container small-container">
                <div className="main-content-block">
                    <h1>Your Account</h1>
                    <section className="flexBox justify-content-flex-start align-items-top">
                        <aside className="flex-30">
                            <ul>
                                <li className="asideLink active" id="myProfileLink" onClick={(() => toggleAsideContent('myProfile'))}>
                                    My profile
                                </li>
                                <li className="asideLink" id="myBeatsLink" onClick={(() => toggleAsideContent('myBeats'))}>
                                    Beats
                                </li>
                                <li className="asideLink" id="myOrdersLink" onClick={(() => toggleAsideContent('myOrders'))}>
                                    Orders
                                </li>
                            </ul>
                        </aside>
                        <div className="flex-70">
                            <div className="aside-content-block" id="myProfile">
                                <h2>My Profile</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                                <ul>
                                    <li className="flexBox justify-content-flex-start">
                                        <div className="flex-40 font-weight-500">Email</div>
                                        <div className="flex-60">emailaddress@hotmail.com</div>
                                    </li>
                                    <li className="flexBox justify-content-flex-start">
                                        <div className="flex-40 font-weight-500">Username</div>
                                        <div className="flex-60">Eminem</div>
                                    </li>
                                    <li className="flexBox justify-content-flex-start">
                                        <div className="flex-40 font-weight-500">Firstname</div>
                                        <div className="flex-60">Slim</div>
                                    </li>
                                    <li className="flexBox justify-content-flex-start">
                                        <div className="flex-40 font-weight-500">Password</div>
                                        <div className="flex-60">BluePills</div>
                                    </li>

                                </ul>
                            </div>

                            <div className="aside-content-block hide" id="myBeats">
                                <h2>My Beats</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                                <BeatBlock title="title 1" artist="artist 1" bpm="90">
                                    <button className="btn btn-small btn-border btnReset">
                                        Edit <i className="fa-solid fa-gear"></i>
                                    </button>
                                </BeatBlock>

                                <Popup trigger={<button className="btn btn-small">Add a beat <i className="fa-solid fa-music"></i></button>} modal>
                                    {close => (
                                        <div className="popup">

                                            <a className="close" onClick={close}>
                                                <i className="fa-solid fa-xmark"></i>
                                            </a>
                                            <h3>Add a beat</h3>
                                            <div className="form-block">
                                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                                    <InputComponent
                                                        inputType="text"
                                                        inputName="title"
                                                        inputId="title-field"
                                                        inputLabel="Title"
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
                                                        inputType="number"
                                                        inputName="bpm"
                                                        inputId="bpm-field"
                                                        inputLabel="BPM"
                                                        validationRules={{
                                                            required:  {
                                                                value: true,
                                                                message: 'This field is required'
                                                            },
                                                            min: {
                                                                value: 50,
                                                                message: 'Input not a valid BPM amount',
                                                            },
                                                            max: {
                                                                value: 199,
                                                                message: 'Input not a valid BPM amount',
                                                            }
                                                        }}
                                                        register={register}
                                                        errors={errors}
                                                    />
                                                    <InputComponent
                                                        inputType="number"
                                                        inputName="price"
                                                        inputId="price-field"
                                                        inputLabel="Price"
                                                        validationRules={{
                                                            required:  {
                                                                value: true,
                                                                message: 'This field is required'
                                                            },
                                                            min: {
                                                                value: 1,
                                                                message: 'Price lower then &euro; 1 not allowed',
                                                            },
                                                            max: {
                                                                value: 1000,
                                                                message: 'Price higher then &euro; 1000 not allowed',
                                                            },
                                                        }}
                                                        register={register}
                                                        errors={errors}
                                                    />
                                                    <InputComponent
                                                        inputType="file"
                                                        inputName="file"
                                                        inputId="file-field"
                                                        inputLabel="Music File"
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
                                                        inputType="file"
                                                        inputName="image"
                                                        inputId="image-field"
                                                        inputLabel="Image"
                                                        validationRules={{
                                                            required:  {
                                                                value: true,
                                                                message: 'This field is required'
                                                            },
                                                        }}
                                                        register={register}
                                                        errors={errors}
                                                    />
                                                    <button type="submit" className="btn btn-small">Add</button>
                                                </form>
                                                {error && <p>Something went wrong, please try again.</p>}
                                            </div>
                                            <img src={newyork} alt="New York Panorama" />

                                        </div>
                                    )}
                                </Popup>

                            </div>

                            <div className="aside-content-block hide" id="myOrders">
                                <h2>My Orders</h2>
                                <BeatBlock title="title 1" artist="artist 1" bpm="90">
                                    <button className="btn btn-small btn-border btnReset">
                                        Download <i className="fa-solid fa-download"></i>
                                    </button>
                                </BeatBlock>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default UserPage;