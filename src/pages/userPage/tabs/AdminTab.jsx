import axios from "axios";
import {useEffect, useRef, useState} from "react";
import BeatBlock from "../../../components/beatBlock/BeatBlock.jsx";
import Popup from "reactjs-popup";
import InputComponent from "../../../components/inputComponent/InputComponent.jsx";
import toast, {Toaster} from "react-hot-toast";
import {useForm} from "react-hook-form";


function AdminTab() {
    const [currentBeat, setCurrentBeat] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [users, setUsers] = useState({});
    const { register, handleSubmit, formState: {errors} } = useForm();


    const notify = () => toast('Beat successfully changed!')
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
            const response = await axios.get('http://localhost:8080/users');
            console.log(response.data);

            setUsers(response.data);
        } catch (e) {
            console.error(e);

            toggleError(true);

        } finally {
            toggleLoading(false);
        }
    }

    async function handleFormSubmit(data) {

        console.log(data);

        toggleError(false);

        try {
            const responseData = await axios.put(`http://localhost:8080/beats/${currentBeat.id}`, data);

            console.log(responseData);


            closeTooltip();
            notify();

        } catch (e) {
            console.error(e);

            toggleError(true);
        } finally {

            //fetchUser();
        }
    }

    async function editBeat(id) {
        console.log(id);
        try {
            const response = await axios.delete(`http://localhost:8080/beats/${id}`);
            console.log(response.data);

        } catch (e) {
            console.error(e);

            toggleError(true);

        } finally {
            toggleLoading(false);
        }
    }

    return (
        <>
            <h2>Admin</h2>

            <h3>All users</h3>
            <ul>
                { users.length > 0 ? users.map((user) =>
                    <li>
                        <div  className="flexBox">
                            <div className="flex-50"><span className="font-weight-600">Id:</span> { user.id }</div>
                            <div className="flex-50"><span className="font-weight-600">Username:</span> { user.username }</div>
                        </div>

                        { Object.keys(user).length > 0 &&

                        user.beats.length > 0 ? user.beats.map((beat) =>
                            <BeatBlock title={beat.title} artist="artist 1" bpm={beat.bpm} price={beat.price}  image={`http://localhost:8080/beats/${beat.id}/image`}>
                                <button className="btn btn-small btn-border btnReset" onClick={() => {setCurrentBeat(beat); openTooltip(); }}>
                                    Edit <i className="fa-solid fa-xmark"></i>
                                </button>
                            </BeatBlock>) : <p>No beats</p>
                        }

                    </li>
                ) : <li>No users found!</li>}
            </ul>

            <Popup ref={ref} modal>
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
                                <button type="submit" className="btn btn-small">Change beat</button>
                            </form>
                            {error && <p>Something went wrong, please try again.</p>}
                        </div>

                    </div>
                )}
            </Popup>
            <Toaster position="bottom-center" reverseOrder={false} />

        </>

    );
}

export default AdminTab;