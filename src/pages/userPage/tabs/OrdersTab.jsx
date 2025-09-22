import ButtonComponent from "../../../components/buttonComponent/ButtonComponent.jsx";
import dateFormatter from "../../../helpers/dateFormatter.js";
import Popup from "reactjs-popup";
import InputComponent from "../../../components/inputComponent/InputComponent.jsx";
import toast, {Toaster} from "react-hot-toast";
import {useForm} from "react-hook-form";
import {useRef, useState} from "react";
import axios from "axios";
import BeatBlock from "../../../components/beatBlock/BeatBlock.jsx";

function OrderTabs({ user, error, toggleError }) {
    const [currentBeat, setCurrentBeat] = useState(null);
    const { register, handleSubmit, formState: {errors} } = useForm();
    const notify = () => toast('Review added successfully!');
    const ref = useRef();
    const closeTooltip = () => ref.current.close();
    const openTooltip = () => ref.current.open();

    async function handleFormSubmit(data) {
        toggleError(false);

        data.beatId = currentBeat;

        try {
            const responseData = await axios.post('http://localhost:8080/reviews', data,
                {headers: {
                'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }});

            console.log(responseData.data);

            closeTooltip();

        } catch (e) {
            console.error(e.response.data);

            toggleError(true);
        } finally {
            notify();
        }
    }

    return (
      <>
          <h2>My Orders</h2>

          <ul>
              { Object.keys(user).length > 0 &&
              user.orderList.length > 0 ? user.orderList.map((order) =>

                  <li>
                      <ul className="order-block">
                          <li>Ordernumber: { order.id }</li>
                          <li>Order date: { dateFormatter(order.orderDate)}</li>
                          <li>
                              <BeatBlock title={order.beat.title} artist={order.beat.userName} bpm={order.beat.bpm}  image={`http://localhost:8080/beats/${order.beat.id}/image`}>
                                  {/*<button className="btn btn-small btn-border btnReset">*/}
                                  {/*    Edit <i className="fa-solid fa-gear"></i>*/}
                                  {/*</button>*/}

                                  <ButtonComponent classNames="btn btn-small btn-inverted" buttonText="Download" downloadIcon={true} buttonFunction={() => location.href=`http://localhost:8080/beats/${order.beat.id}/file`} />

                                  <button onClick={() => {setCurrentBeat(order.beat.id); openTooltip()}} type="submit" className="btn btn-small btn-inverted">Add review</button>
                              </BeatBlock>
                          </li>
                          {/*<li className="flexBox justify-content-flex-start gap">*/}
                          {/*    <ButtonComponent classNames="btn btn-small btn-inverted" buttonText="Download" downloadIcon={true} buttonFunction={() => location.href=`http://localhost:8080/beats/${order.beatId}/file`} />*/}

                          {/*    <button onClick={() => {setCurrentBeat(order.beatId); openTooltip()}} type="submit" className="btn btn-small btn-inverted">Add review</button>*/}

                          {/*</li>*/}
                      </ul>
                  </li>
                  ) : <li>No orders yet.</li>
              }
          </ul>
          <Popup ref={ref} modal>
              {close => (
                  <div className="popup">

                      <a className="close" onClick={close}>
                          <i className="fa-solid fa-xmark"></i>
                      </a>
                      <h3>Add a review</h3>
                      <div className="form-block">
                          <form onSubmit={handleSubmit(handleFormSubmit)}>
                              <InputComponent
                                  inputType="score"
                                  inputName="score"
                                  inputId="score-field"
                                  inputLabel="Score (from 1 to 10)"
                                  validationRules={{
                                      required:  {
                                          value: true,
                                          message: 'This field is required'
                                      },
                                      min: {
                                          value: 1,
                                          message: 'Minimum score is 1',
                                      },
                                      max: {
                                          value: 10,
                                          message: 'Maximum score is 10',
                                      },
                                  }}
                                  register={register}
                                  errors={errors}
                              />
                              <InputComponent
                                  inputType="text"
                                  inputName="comment"
                                  inputId="comment-field"
                                  inputLabel="Comment"
                                  validationRules={{
                                      required:  {
                                          value: true,
                                          message: 'This field is required'
                                      },
                                      minLength: {
                                          value: 10,
                                          message: 'Comment must be at least 10 characters',
                                      },
                                      maxLength: {
                                          value: 150,
                                          message: 'Comment may contain a maximum of 150 characters',
                                      }
                                  }}
                                  register={register}
                                  errors={errors}
                              />

                              <button type="submit" className="btn btn-small">Add review</button>
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

export default OrderTabs;