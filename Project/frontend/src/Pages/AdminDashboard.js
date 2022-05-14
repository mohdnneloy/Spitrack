// React Packages
import {useState, useEffect} from 'react';
import axios from 'axios';

//================== Custom CSS ==================

import '../Styles/admindashboard.css'

// ================ Components ==================

import AdminNavbar from '../Components/AdminNavBar';


// ================ UserDashboard Component ==================

const AdminDashboard = () => {

    const [user, setUser] = useState([]);

    useEffect(()=>{

        const getUser = async() => {
    
            // Front-End Root URLS ======================

            let localurlf = "http://localhost:3000";
            // let localurlf = "https://spitrack-9f734.web.app";
            // let localurlf = "https://spitrack-9f734.firebaseapp.com";

            // Back-End Root URLS =======================

            let localurlb = "http://127.0.0.1:8000";
            // let localurlb = "https://spitrack-py.herokuapp.com";
            
            const token = localStorage.getItem('token');
            if(token == null){
                window.location = localurlf.concat("/adminlogin");
            }
            console.log('Access JWT token: ' + token);
            await axios.get( localurlb.concat("/user/admindashboard"), 
                { headers: {'Authorization': "JWT " + token,
                'Content-Type': 'application/json'} })
            .then(res=>{
                    console.log(res);
                    setUser(res.data);
                    console.log(user);                
            }, 
            (error) => {
                console.log(error);
                if(error.response.status === 401){
                    window.location = localurlf.concat("/adminlogin");
                }
              })
        }
    
        getUser();

    }, [])

    // When back button on the window is clicked return to the login page if the status is 401 timed out
    window.onpopstate = event => {
        alert("clicked back button");
     }; 



    return(

        <>

            <AdminNavbar/>            
            <div className="main">
                <h2>Dashboard</h2>
                <br />
                
                {user.map(item => {
                    return(
                        <div className="profile">
                            <p>Full Name: {item.first_name + " " + item.last_name}</p>
                            <p>Username: {item.username}</p>
                            <p>Email: {item.email}</p>
                        </div>
                    );
                })}
                
            </div>
        </>
        
    );
}

export default AdminDashboard;