import axios from "axios";
import {useEffect, useRef, useState} from "react";
import BeatBlock from "../../../components/beatBlock/BeatBlock.jsx";
import Popup from "reactjs-popup";
import InputComponent from "../../../components/inputComponent/InputComponent.jsx";
import {useForm} from "react-hook-form";


function AdminTab({ toggleLoading, notify }) {
    const [currentBeat, setCurrentBeat] = useState({});
    const [error, toggleError] = useState(false);
    const [users, setUsers] = useState({});
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const ref = useRef();
    const closeTooltip = () => ref.current.close();
    const openTooltip = () => ref.current.open();

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.get('http://localhost:8080/users', {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });

            setUsers(response.data);
        } catch (e) {
            console.error(e);

            toggleError(true);

        } finally {
            toggleLoading(false);
        }
    }

    async function handleFormSubmit(data) {
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.put(`http://localhost:8080/beats/${currentBeat.id}`, data, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });

            closeTooltip();

        } catch (e) {
            console.error(e);

            toggleError(true);
        } finally {
            toggleLoading(false);

            notify()
            reset();
            await fetchUsers();
        }
    }

    return (
        <>
            <h2>Admin</h2>

            <h3 className="text-transform-uppercase">All users</h3>
            <ul>
                { users.length > 0 ? users.map((user) =>
                    <li key={user.id}>
                        <h4>Username: { user.username }</h4>

                        { Object.keys(user).length > 0 &&

                        user.beats.length > 0 ? user.beats.map((beat) =>
                            <BeatBlock title={beat.title} artist="artist 1" bpm={beat.bpm} price={beat.price} key={beat.id} image={`http://localhost:8080/beats/${beat.id}/image`}>
                                <button className="btn btn-small btn-inverted" onClick={() => {
                                    setCurrentBeat(beat);
                                    openTooltip();
                                }}>
                                    Edit <i className="fa-solid fa-pen"></i>
                                </button>
                            </BeatBlock>) : <p>No beats</p>
                        }

                    </li>
                ) : <li>No users found!</li>}
            </ul>
            {error && <p>Something went wrong, please try again.</p>}

            <Popup ref={ref} modal>
                {close => (
                    <div className="popup">

                        <a className="close" onClick={close}>
                            <i className="fa-solid fa-xmark"></i>
                        </a>
                        <h3>Change the beat</h3>
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
                                <button type="submit" className="btn btn-small">Change beat</button>
                            </form>
                            {error && <p>Something went wrong, please try again.</p>}
                        </div>

                    </div>
                )}
            </Popup>
        </>
    );
}

export default AdminTab;