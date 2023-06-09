import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Authentication/FirebaseConfig";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subState, setSubState] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!(email || password)) {
      console.log(email);
      console.log(password);
      alert("Enter all details");
    } else {
      setSubState(true); // Disable the button while submitting

      createUserWithEmailAndPassword(auth, email, password)
        .then(async(res) => {
          console.log("Success");
          console.log(res.user);
          const user = res.user;
          await updateProfile(user,{displayName:name});
          console.log(user);
          setSubState(false); // Enable the button after successful submission
          navigate("/");
        })
        .catch((error) => {
          console.log("Error: ");
          console.log("Error: " + error.message);
          alert(error.message)
          setSubState(false); // Enable the button if there's an error
        });
    }
  };

  return (
    <div>
      <div className="container-fluid rounded my-3" style={{ color: "white", backgroundColor: "#212529", width: "20vw", padding: "10px", border: "10px" }}>
        <h1>SignUp</h1>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="form-label">UserName</label>
          <div className="col-sm-10">
            <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder="UserName" />
          </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Example@email.com" value={email} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="inputPassword" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" onClick={handleSubmit} className="btn btn-light" disabled={subState} style={{ width: "55%", alignContent: "center", alignItems: "center" }}>SignUp</button>
          </div>
          <p className='my-2'>Already have an account?<span><Link to="/Login" style={{ color: "white", textDecoration: "none" }}> Login</Link></span></p>
        </div>
      </div>
      );
}
