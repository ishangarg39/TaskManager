import React from 'react'
import { auth } from '../../Authentication/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate=useNavigate();
    const handleLogout = () => {
        console.log("LogoutClicked")
        signOut(auth).then(() => {
            console.log("logout Successfull");
            navigate("/")

        }).catch((error) => {
            // An error happened.
            console.log("Can'logout");
        });
    }
    return (
        <div>
            <h2>You Want to Logout</h2>
            <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Logout</button>

        </div>
    )
}
