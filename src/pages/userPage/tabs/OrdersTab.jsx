import ButtonComponent from "../../../components/buttonComponent/ButtonComponent.jsx";
import dateFormatter from "../../../helpers/dateFormatter.js";

function OrderTabs({ user }) {

    return (
      <>
          <h2>My Orders</h2>

          <ul>
              { Object.keys(user).length > 0 &&
              user.orderList.length > 0 ? user.orderList.map((order) =>

                      <li>
                          <ul>
                              <li>Ordernumber: { order.id }</li>
                              <li>Order date: { dateFormatter(order.orderDate)}</li>
                              <li>
                                  <ButtonComponent classNames="btn btn-small btn-border btnReset" buttonText="Download" downloadIcon={true} buttonFunction={() => location.href=`http://localhost:8080/beats/${order.beatId}/file`} />

                                  <ButtonComponent classNames="btn btn-small btn-border btnReset" buttonText="Add review" reviewIcon={true} buttonFunction={() => location.href=`http://localhost:8080/beats/${order.beatId}/file`} />

                              </li>
                              <li><br/><hr/></li>
                          </ul>
                      </li>

                  // <BeatBlock title={order.beat.title} artist="artist 1" bpm={order.beat.bpm}>
                  //     <ButtonComponent classNames="btn btn-small btn-border btnReset" buttonText="Download" downloadIcon={true} buttonFunction={() => location.href=
                  //         `http://localhost:8080/beats/${order.beat.id}/file`} />
                  // </BeatBlock>
              ) : <li>No orders yet.</li>
              }
          </ul>
      </>
    );
}

export default OrderTabs;