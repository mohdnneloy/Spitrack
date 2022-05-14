import {React} from 'react'

//================== Custom CSS ==================

import '../Styles/usernavbar.css'

const UserNavbar = () => {


    // Front-End Root URLS ======================

    let localurlf = "http://localhost:3000";
    // let localurlf = "https://spitrack-9f734.web.app";
    // let localurlf = "https://spitrack-9f734.firebaseapp.com";

    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location = localurlf.concat("/userlogin");
    }
    return (

        <div class="sidenav">
                <a href="/">SPITRACK</a>
                <br />
                <a href="/userdashboard">Dashboard</a>
                <a href="/userclusters">Clusters</a>
                <a href="/usersearch">Search</a>
                <div className="bottom">
                    <button class="btn btn-primary "onClick = {handleLogOut}>Logout</button>
                </div>
        </div>
    );
}

export default UserNavbar;