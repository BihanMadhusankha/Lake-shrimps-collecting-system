import React from 'react';
import { Link } from 'react-router-dom'
import '../CSS/navCSS.css'

function UserNavigation() {
    return (
        <div className="Nav">
            <header className="p-3 mb-3 border-bottom text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            {/* <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap" /></svg> */}
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <Link to={'/SSABS/user/userhome'}><li>
                                <a href="#" className="nav-link px-2 text-white">Home</a>
                            </li></Link>
                            <Link to={'/SSABS/user/userhome/selerPage'}><li><a href="#" className="nav-link px-2 text-white">Sellers</a></li></Link>
                            <Link to={'/SSABS/user/userhome/vehicaleowner'}><li><a href="#" className="nav-link px-2 text-white">Vehi.Owner</a></li></Link>
                            <Link to={'/SSABS/user/userhome/con.creaters'}><li><a href="#" className="nav-link px-2 text-white">Con.Creaters</a></li></Link>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
                        </form>

                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                            </a>
                            <ul className="dropdown-menu text-small">
                                <Link to={'/SSABS/user/userhome/profile'}><li><a className="dropdown-item" href="#">Profile</a></li></Link>
                                <li><a className="dropdown-item" href="#">Setting</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <Link to={'/SSABS/user/login'}><li><a className="dropdown-item" href="#">Sign out</a></li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default UserNavigation;