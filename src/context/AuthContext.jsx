import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {isTokenValid} from "../helpers/isTokenValid";


export const AuthContext = createContext({});

function AuthContentProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            const decoded = jwtDecode(token);
            console.log(decoded);

            if (isTokenValid(decoded)) {
                // Ja dan halen wev de userinfo op en zetten we hem in de state
                setAuth({
                    isAuth: true,
                    user: {
                        email: decoded.email,
                        roles: decoded.role,
                    },
                    status: 'done',
                })
            } else {
                logout();
            }
        } else {
            setAuth({
                ...auth,
                status: 'done',
            })
        }

    }, []);

    const navigate = useNavigate();

    function login(userData) {

        console.log(userData);

        localStorage.setItem('token', userData.jwt);

        setAuth({
            isAuth: true,
            user: {},
            status: 'done',
        });

        console.log(userData);

        navigate(`/user/${userData.id}`)
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/')
    }

    const data = {
        isAuth: auth.isAuth,
        login,
        logout
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