import './UserPage.scss';
import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import ProfileTab from "./tabs/ProfileTab.jsx";
import BeatsTab from "./tabs/BeatsTab.jsx";
import OrderTabs from "./tabs/OrdersTab.jsx";
import AdminTab from "./tabs/AdminTab.jsx";
import LoadingComponent from "../../components/loadingComponent/LoadingComponent.jsx";
import toast, {Toaster} from "react-hot-toast";


function UserPage() {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [user, setUser] = useState({});
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const notify = () => toast(message)

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            });

            setUser(response.data);
        } catch (e) {
            console.error(e);

            toggleError(true);

            navigate('/notfound');
        } finally {
            toggleLoading(false);
        }
    }

    const {id} = useParams();

    function toggleAsideContent(id) {
        const contents = document.querySelectorAll('.aside-content-block');
        const asideLinks = document.querySelectorAll(".asideLink")
        const activeBlock = document.getElementById(id);
        const activeLink = document.getElementById(`${id}Link`);

        contents.forEach(e => e.classList.add('hide'));
        asideLinks.forEach(e => e.classList.remove('active'));
        activeBlock.classList.remove('hide');
        activeLink.classList.add('active');
    }

    return (
        <main>
            <div className="container small-container">
                <div className="main-content-block user-page">
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
                                <li className="asideLink" id="myOrdersLink" onClick={(() => {toggleAsideContent('myOrders'); setMessage('Review added successfully!');})}>
                                    Orders
                                </li>
                                {user?.roles?.some(r => r.rolename === "ROLE_ADMIN") &&
                                    <li className="asideLink" id="myAdminLink" onClick={(() => {toggleAsideContent('myAdmin'); setMessage('Beat successfully changed!');})}>
                                        Admin
                                    </li>
                                }
                            </ul>
                        </aside>
                        <div className="flex-70">
                            <div className="aside-content-block" id="myProfile">
                                <ProfileTab user={user} error={error} toggleError={toggleError} />
                            </div>

                            <div className="aside-content-block hide" id="myBeats">
                                <BeatsTab user={user} error={error} toggleError={toggleError} toggleLoading={toggleLoading} fetchUser={fetchUser} />
                            </div>

                            <div className="aside-content-block hide" id="myOrders">
                                <OrderTabs user={user} error={error} toggleError={toggleError} toggleLoading={toggleLoading} setMessage={setMessage} notify={notify}/>
                            </div>
                            {user?.roles?.some(r => r.rolename === "ROLE_ADMIN") &&
                                <div className="aside-content-block hide" id="myAdmin">
                                    <AdminTab toggleLoading={toggleLoading} setMessage={setMessage} notify={notify} />
                                </div>
                            }

                        </div>
                    </section>
                </div>
            </div>
            { loading && <LoadingComponent text="Loading...please wait!" />}
            <Toaster position="bottom-center" reverseOrder={false} />
        </main>
    );
}

export default UserPage;