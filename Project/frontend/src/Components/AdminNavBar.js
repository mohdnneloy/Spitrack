import {React} from 'react'

//================== Custom CSS ==================

import '../Styles/adminnavbar.css'

const UserNavbar = () => {

    // Front-End Root URLS ======================

    let localurlf = "http://localhost:3000";
    // let localurlf = "https://spitrack-9f734.web.app";
    // let localurlf = "https://spitrack-9f734.firebaseapp.com";

    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location = localurlf.concat("/adminlogin");
    }
    return (

        <div class="a-sidenav">
                <a href="/">SPITRACK</a>
                <br />
                <a href="/admindashboard">Dashboard</a>
                <a href="/newadmin">New Admin</a>
                <a className='disabled' href="/controlscrappers">Scrap Control</a>
                <div className="bottom">
                    <button class="btn btn-danger"onClick = {handleLogOut}>Logout</button>
                </div>
        </div>
    );
}

export default UserNavbar;