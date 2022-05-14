//================= React Packages ======================
import React from 'react'
import axios from 'axios'
import {useState} from 'react'

//================== Custom CSS ==================

import '../Styles/usersignup.css'


// ================ UserSignUp Component ==================

const UserSignUp = () => {

    // Front-End Root URLS
    
    let localurlf = "http://localhost:3000";
    // let localurlf = "https://spitrack-9f734.web.app";
    // let localurlf = "https://spitrack-9f734.firebaseapp.com";

    // Back-End Root URLS =======================

    let localurlb = "http://127.0.0.1:8000";
    // let localurlb = "https://spitrack-py.herokuapp.com";

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    const handleSubmit = async (event) => {
        if(first_name === '' || last_name === '' || username === '' || email === '' || password === ''){
            alert("Please enter all the details!");
        }
        else {event.preventDefault();
        const user = {
          first_name: first_name,
          last_name: last_name,
          username: username,
          email: email,
          password: password,
          is_superuser: 0,
          is_staff: 0
        }
        // await axios.post('http://127.0.0.1:8000/auth/users/', user)
        await axios.post(localurlb.concat("/auth/users/"), user)
          .then(res=>{
            console.log(res);
            console.log(res.data);
            window.location = localurlf.concat("/userlogin");
          }, (error) => {
            alert("Username already taken or Password is not strong enough!");
            console.log(error);
            window.location = localurlf.concat("/usersignup");
          })}
      }

    return(
        
        <>
            <nav className="navbar navbar-expand-lg navbar-dark nav-body">
                <div className="container">
                    <a className="navbar-brand branding" href="/">SPITRACK</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="userlogin">Log In</a>
                            </li>

                            <li className="nav-item">
                                <a className=" nav-link" href="adminlogin">Admin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <form className = "form-box" onSubmit = {handleSubmit}>

                <div className="form-head">Sign Up</div>

                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" id="firstname" placeholder="Enter First Name" name = "first_name" onChange = {(e) => setFirstName(e.target.value)}/>   
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" placeholder="Enter Last Name" name = "last_name" onChange = {(e) => setLastName(e.target.value)}/>   
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" className="form-control" id="username" placeholder="Enter Username" name = "username" onChange = {(e) => setUsername(e.target.value)}/>   
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" name = "email" onChange = {(e) => setEmail(e.target.value)}/>   
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name = "password" onChange = {(e) => setPassword(e.target.value)}/>   
                </div>

                <button type='submit' className="submit">Submit</button>
            </form>
        </>
           
    );
}

export default UserSignUp;