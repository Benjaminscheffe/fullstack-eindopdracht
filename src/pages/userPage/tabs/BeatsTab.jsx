import BeatBlock from "../../../components/beatBlock/BeatBlock.jsx";
import Popup from "reactjs-popup";
import InputComponent from "../../../components/inputComponent/InputComponent.jsx";
import newyork from "../../../assets/images/newyork-panorama.jpg";
import axios from "axios";
import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import toast, {Toaster} from 'react-hot-toast';
import {useNavigate} from "react-router-dom";

function BeatsTab({ user, error, toggleError }) {
    const [file, setFile] = useState([]);
    const [image, setImage] = useState([]);
    const { register, handleSubmit, formState: {errors} } = useForm();
    //const notify = () => toast('Beat added successfully!')
    const navigate = useNavigate();
    const ref = useRef();
    //const closeTooltip = () => ref.current.close();

    async function handleFormSubmit(data) {
        toggleError(false);

        data.userId = user.id;

        const formFile = new FormData();
        formFile.append("file", file);

        const formImage = new FormData();
        formImage.append("file", image);

        try {
            const responseData = await axios.post(`http://localhost:8080/beats`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });


            await axios.post(`http://localhost:8080/beats/${responseData.data.id}/file`, formFile, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });

            await axios.post(`http://localhost:8080/beats/${responseData.data.id}/image`, formImage, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(responseData.data.id);
            
            navigate('/success' , {state: {beatId: responseData.data.id}});


        } catch (e) {
            console.error(e);

            toggleError(true);
        } finally {

            //fetchUser();
        }
    }

    function handleFileChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
    }

    function handleImageChange(e) {
        const uploadedImageFile = e.target.files[0];
        console.log(uploadedImageFile);
        setImage(uploadedImageFile);
    }

    return (
        <>
            <h2>My Beats</h2>
            <p>Here you can add beats and you will find an overview of your beats. </p>

            { Object.keys(user).length > 0 &&

            user.beats.length > 0 ? user.beats.map((beat) =>
                <BeatBlock title={beat.title} bpm={beat.bpm} price={beat.price}  image={`http://localhost:8080/beats/${beat.id}/image`}>
                    {/*<button className="btn btn-small btn-border btnReset">*/}
                    {/*    Edit <i className="fa-solid fa-gear"></i>*/}
                    {/*</button>*/}
                </BeatBlock>) : <p>No beats</p>
            }

            <Popup ref={ref} trigger={<button className="btn btn-small btn-inverted">Add a beat <i className="fa-solid fa-music"></i></button>} modal>
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
                                    onChange={handleFileChange}
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
                                    onChange={handleImageChange}
                                />
                                <button type="submit" className="btn btn-small">Add</button>
                            </form>
                            {error && <p>Something went wrong, please try again.</p>}
                        </div>
                        <img src={newyork} alt="New York Panorama" />

                    </div>
                )}
            </Popup>
            <Toaster />
        </>
    );
}

export default BeatsTab;