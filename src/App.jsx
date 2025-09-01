import './App.scss';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/landingpage/Landingpage.jsx";
import Header from "./components/header/Header.jsx";
import ProductsOverview from "./pages/productsOverview/ProductsOverview.jsx";
import ProductDetail from "./pages/productsOverview/productDetail/ProductDetail.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import UserPage from "./pages/userPage/UserPage.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import {Navigate} from "react-router";

function App() {
    const { isAuth } = useContext(AuthContext);

  return (
    <>

        <Header />


            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/beats" element={<ProductsOverview/>} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="*" element={<NotFoundPage/>} />
                <Route path="/user/:id" element={ isAuth? <UserPage/> : <Navigate to='/login' /> } />
                <Route path="/beats/:id" element={<ProductDetail/>} />
            </Routes>

        <footer>
            <div className="container">
                <div className="flexBox">
                    <div>
                        <ul>
                            <li>hallo</li>
                            <li>contact</li>
                            <li>dag</li>
                        </ul>
                    </div>
                    <div>
                        socials
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default App
