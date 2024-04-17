import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div className="Nav">
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Navbar</Link>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark me-5" type="submit">Search</button>

                        <div className='d-flex flex-lg-row'>
                            <Link to="/SSABS/user/signup/" className="btn btn-outline-success me-2" id="signUpbtn">Signup</Link>
                            <Link to="/SSABS/user/login" className="btn btn-outline-success me-2" id="signUpbtn">Login</Link>
                        </div>
                    </form>
                </div>
            </nav>
            </div>
            )
}

            export default Navigation;