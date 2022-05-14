//================= React Packages ======================
import {React} from 'react'
import {useState} from 'react'
import axios from 'axios'

//================== Custom CSS ==================

import '../Styles/userlogin.css'


// ================ UserLogin Component ==================

const UserLogin = () => {

// Front-End Root URLS ======================

let localurlf = "http://localhost:3000";
// let localurlf = "https://spitrack-9f734.web.app";
// let localurlf = "https://spitrack-9f734.firebaseapp.com";

// Back-End Root URLS =======================

let localurlb = "http://127.0.0.1:8000";
// let localurlb = "https://spitrack-py.herokuapp.com";

let token = '';
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async (event) => {
    
    if(username === '' || password === ''){
        alert("Please enter all the details!");
    }
    
    else {event.preventDefault();
    const user = {
        username: username,
        password: password,
    }
    await axios.post(localurlb.concat("/auth/jwt/create/"), user)
      .then(res=>{
        console.log(res);
        console.log(res.data);
        token = res.data['access'];
        localStorage.setItem('token', token);
        window.location = localurlf.concat("/userdashboard");
      }, 
      (error) => {
        alert("Username or Password is Invalid!")
        console.log(error);
        window.location = localurlf.concat("/userlogin");
        
        
      })}
  }
    return( 
    
    <>
        <>
        <nav className="navbar navbar-expand-lg navbar-dark nav-body">
                <div className="container">
                    <a className="navbar-brand branding" href="/">SPITRACK</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <a className=" nav-link" href="usersignup">Sign Up</a>
                            </li>

                            <li className="nav-item">
                            <a className=" nav-link" href="adminlogin">Admin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>

        <>
        <form className = "form-box" onSubmit = {handleSubmit}>

            <div className="form-head">Log In</div>

            <div className="form-group">
                <label htmlFor="email">Username</label>
                <input type="username" className="form-control" id="username" placeholder="Enter Username" name = "username" onChange = {(e) => setUsername(e.target.value)}/>
                
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" name = "password" onChange = {(e) => setPassword(e.target.value)} />
                
            </div>

            <button type="submit" className="submit">Submit</button>
        </form>
           
        </>
    </>);

}

export default UserLogin;