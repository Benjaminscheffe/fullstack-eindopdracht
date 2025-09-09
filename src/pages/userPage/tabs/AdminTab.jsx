import axios from "axios";
import {useEffect, useState} from "react";

function AdminTab() {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [users, setUsers] = useState({});

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

    return (
        <>
            <h2>Admin</h2>

            <ul>
                { users.length > 0 ? users.map((user) =>
                    <li>
                        <div  className="flexBox">
                            <div className="flex-50 font-weight-600">Id:</div>
                            <div className="flex-50">{ user.id }</div>
                        </div>
                        <div  className="flexBox">
                            <div className="flex-50 font-weight-600">Username:</div>
                            <div className="flex-50">{ user.username }</div>
                        </div>
                        <div  className="flexBox">
                            <div className="flex-50 font-weight-600">Email:</div>
                            <div className="flex-50">{ user.email }</div>
                        </div>


                    </li>
                ) : <li>No users found!</li>}
            </ul>

        </>

    );
}

export default AdminTab;