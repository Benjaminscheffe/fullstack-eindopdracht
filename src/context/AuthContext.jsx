import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {isTokenValid} from "../helpers/isTokenValid";
import axios from "axios";


export const AuthContext = createContext({});

function AuthContentProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    async function checkAuthentication() {
        try {
            const response = await axios.get("http://localhost:8080/authenticated", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            return response;

        } catch (e) {
            console.error(e);

            logout();
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        if (token) {
            try {

                const response = checkAuthentication();

                console.log(response);
                const decoded = jwtDecode(token);
                console.log(decoded);

                if (isTokenValid(decoded)) {
                    // Ja dan halen wev de userinfo op en zetten we hem in de state
                    setAuth({
                        isAuth: true,
                        user: userId,
                        status: 'done',
                    })
                } else {
                    logout();
                }
            } catch (e) {
                console.error(e);
                logout();
            }
        }

     else {
            setAuth({
                ...auth,
                status: 'done',
            })
        }

    }, []);

    const navigate = useNavigate();

    function login(userData) {

        console.log(userData.id);

        localStorage.setItem('token', userData.jwt);
        localStorage.setItem('id', userData.id)

        const userId = localStorage.getItem('id');

        setAuth({
            isAuth: true,
            user: userId,
            status: 'done',
        });

        console.log(userData);

        console.log(auth);

        navigate(`/user/${userData.id}`)
    }

    function logout() {
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/');
    }

    const data = {
        isAuth: auth.isAuth,
        userId: auth.user,
        logout,
        login
    }

    return (
        <>
            <AuthContext.Provider value={data}>
                { auth.status === 'done' ? children : <p>Loading...</p> }
            </AuthContext.Provider>
        </>
    )
}

export default AuthContentProvider;