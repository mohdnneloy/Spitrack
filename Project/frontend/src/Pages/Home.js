//================= React Packages ======================
import {React} from 'react'

//================== Custom CSS ==================

import '../Styles/home.css'



// ================ Home Component ==================

const Home = () => {

    return(
        
        <>
            <>
            <nav className="navbar navbar-expand-lg navbar-dark nav-body">
                <div className="container">
                <a className="navbar-brand branding" href="">SPITRACK</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="userlogin">User</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="adminlogin">Admin</a>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>

            <div className="scr">

                <div className="txtlogosec">
                    <h2 className="txtlogo">SPITRACK</h2>
                    <h4 className="txttagline">Simplifying Research Techniques</h4>
                </div>
            
                <div className="image">
                    <img src="https://images.assetsdelivery.com/compings_v2/shendart/shendart1702/shendart170200118.jpg" alt="Working" />
                </div>

            </div>

            

            </>
        </>
    );
}

export default Home;