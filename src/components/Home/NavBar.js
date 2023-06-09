import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(props) {
  const navigate = useNavigate();
  const loginStatus = () => {
    if (props.login === "Login") {
      navigate("/login");
    }
    else {
      navigate("/logout");
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">ResoluteAi</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/TaskForm">New Task</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/TaskList">Task List</Link>
              </li>
            
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button onClick={loginStatus} className="btn btn-light " href="#" tabIndex="-1" aria-disabled="true">{props.login}</button>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
