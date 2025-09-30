import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import {useLocation} from "react-router-dom";

function SuccessPage() {
    const { userId } = useContext(AuthContext);
    const {state} = useLocation();
    const { beatId, registered } = state;

    return (
        <main className="container small-container flexBox justify-content-center">
            <section className="text-align-center">
                { beatId &&
                    <>
                        <h1>Beat added successfully!</h1>
                        <p>
                            <Link to={`/beats/${beatId}`}>Check the beat page</Link> or go back to <Link to={`/user/${userId}`}>you're profile</Link>
                        </p>
                    </>
                }

                { registered &&
                    <>
                        <h1>Thank you for signing up.</h1>
                        <p>
                            <Link to={"/login"}>You can login here!!</Link>
                        </p>
                    </>
                }



            </section>
        </main>
    );
}

export default SuccessPage;