import React from 'react';
import { Link } from 'react-router-dom'
import '../CSS/navCSS.css'
import '../CSS/login_btn.css'

function Navigation() {
    return (
        <div className="Nav">
            <header className="p-3 border-bottom  ">
                <div className="container ">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap" /></svg> */}
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <Link to={'/'}><li>
                                <a href="#" className="nav-link px-2 text-white">Home</a>
                            </li></Link>
                            <Link to={'/Notfounded'}><li><a href="#" className="nav-link px-2 text-white">Sellers</a></li></Link>
                            <Link to={'/Notfounded'}><li><a href="#" className="nav-link px-2 text-white">Vehi.Owner</a></li></Link>
                            <Link to={'/Notfounded'}><li><a href="#" className="nav-link px-2 text-white">Con.Creaters</a></li></Link>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-4" role="search">
                            <input
                                type="search"
                                className="form-control form-control-dark text-bg-transparent"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                        </form>

                        <div className="login-buttons d-flex flex-row ">
                            <Link type="button" className="btn btn-outline-light me-1 login-btn" to={'/SSABS/user/login'}>Login</Link>
                            <Link type="button" className="btn btn-outline-light login-btn" to={'/SSABS/user/signup'}>Sign-up</Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navigation;