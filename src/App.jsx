import './App.scss'

function App() {


  return (
    <>

        <header>
            <div className="container flexBox">
                <a href="/">BeatsForSale</a>
                <a href="/"><i className="fa-solid fa-user"></i></a>
            </div>
        </header>

        <main>
            <section className="hero">
                <div className="container hero-inner">
                    <div className="text-align-center">
                        <h1>start your music journey as creator</h1>
                        <button className="btn">get your beats</button>
                    </div>
                </div>
                
            </section>

            <section className="main-content-block">
                <div className="container small-container">
                    <p className="text-align-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

            </section>

            <section className="visual-block">
                <div className="container small-container text-align-center">
                    <h2 className="text-transform-uppercase">The music lives inside you</h2>
                </div>
            </section>

            <section className="main-content-block">
                <div className="container small-container">
                    <div className="text-with-visual-block">
                        <div className="text-with-visual-block-text">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="text-with-visual-block-visual">
                            <h3 className="text-transform-uppercase">The streets are calling</h3>
                        </div>
                    </div>
                </div>
            </section>
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
        </main>
    </>
  )
}

export default App
