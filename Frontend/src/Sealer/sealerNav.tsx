import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function sealerNav() {
  return (
    <div>
        <div className="Nav">
            <header className="p-3 border-bottom ">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        </a>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <Link to={'/SSABS/vehicaleowner'}>
                                <li>
                                    <a href="#" className="nav-link px-2 text-white">vehicle Owners</a>
                                </li>
                            </Link>
                            
                            
                        </ul>

                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                            </a>
                            <ul className="dropdown-menu text-small">
                                <Link to={'/SSABS/seler/profile'}><li><a className="dropdown-item" href="#">Profile</a></li></Link>
                                <Link to={'/SSABS/seler/products'}><li><a className="dropdown-item" href="#">Setting</a></li></Link>
                                <Link to={'/SSABS/seler/dashboard'}><li><a className="dropdown-item" href="#">Dashboard</a></li></Link>
                                <li><hr className="dropdown-divider"/></li>
                                <Link to={'/SSABS/user/login'}><li><Button onClick={()=>{
                                    localStorage.removeItem('accessToken')
                                }}><a className="dropdown-item" href="#">Sign out</a></Button></li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    </div>
  )
}
