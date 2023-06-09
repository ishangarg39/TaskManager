import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NavBar from './components/Home/NavBar';
import { useEffect, useState } from 'react';
import { auth } from './Authentication/FirebaseConfig';
import Logout from './components/Login/Logout';
import TaskForm from './components/Task/TaskForm';
import TaskList from './components/Task/TaskList';

function App() {
  const [loginState,setLoginState]=useState("Login");
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setLoginState("Logout");
      }
      else{
        setLoginState("Login");
      }
      console.log(user);
    })
  },[])
  return (
    <div className="App">
      <Router>
      <NavBar login={loginState}/>
        <Routes>
        

          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Signup" element={<SignUp />}></Route>
          <Route exact path="/Login" element={<Login />}></Route>
          <Route exact path="/Logout" element={<Logout />}></Route>
          <Route exact path="/TaskForm" element={<TaskForm />}></Route>
          <Route exact path="/TaskList" element={<TaskList/>}></Route>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
