import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

// pages
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      <Router>
        <nav className="navbar py-4 fixed-top navbar-expand-lg">
          <div className="container-fluid" id="navbar">
            <a className="navbar-brand light-text" href="/index.html">
              {/* <img src="" alt="logo-img" loading="lazy" /> */}
              <h1 className="logo-name">Podify</h1>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title light-text"
                  id="offcanvasNavbarLabel"
                >
                  <img src="" alt="logo-img" loading="lazy" />
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Discover">
                      Discover
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Favorites">
                      Favorites
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
