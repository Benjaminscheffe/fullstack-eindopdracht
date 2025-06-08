import './App.scss'
import LandingPage from "./pages/landingpage/Landingpage.jsx";
import Header from "./components/header/Header.jsx";
import ProductsOverview from "./pages/productsOverview/ProductsOverview.jsx";

function App() {


  return (
    <>

        <Header />

        <main>
            {/*<LandingPage />*/}

            {/*<ProductsOverview />*/}



        </main>

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
