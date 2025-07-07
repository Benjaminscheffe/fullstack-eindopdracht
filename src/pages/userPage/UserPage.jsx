import './UserPage.scss';
import BeatBlock from "../../components/beatBlock/BeatBlock.jsx";

function UserPage() {

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
                                <BeatBlock title="title 1" artist="artist 1" bpm="90">
                                    <button className="btn btn-small btn-border btnReset">
                                        Edit <i className="fa-solid fa-gear"></i>
                                    </button>
                                </BeatBlock>
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