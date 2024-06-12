import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/navCSS.css'
import userPhoto from '../assets/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
export default function AdminNAvigation() {
    return (
        <div>
            <div className="Nav">
                <header className="p-3  border-bottom">
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
                            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            </a>

                            <div className="dropdown text-end">
                                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={userPhoto} alt="mdo" width="32" height="32" className="rounded-circle" />
                                </a>
                                <ul className="dropdown-menu text-small">
                                    <Link to={'/SSABS/admin/dashboard'}><li><a className="dropdown-item" href="#">Dashboard</a></li></Link>
                                    <li><hr className="dropdown-divider" /></li>
                                    <Link to={'/SSABS/user/login'}><li><a className="dropdown-item" href="#">Sign out</a></li></Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
