import {React} from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

//================== Custom CSS ==================

import '../Styles/userclusters.css'

// ================ Components ==================

import UserNavbar from '../Components/UserNavBar';

// ================ Clusters Component ==================

const Clusters = () => {

    const [clusters, setClusters] = useState([]);

    useEffect(()=>{

        // Front-End Root URLS ======================

        let localurlf = "http://localhost:3000";
        // let localurlf = "https://spitrack-9f734.web.app";
        // let localurlf = "https://spitrack-9f734.firebaseapp.com";

        // Back-End Root URLS =======================

        let localurlb = "http://127.0.0.1:8000";
        // let localurlb = "https://spitrack-py.herokuapp.com";

        const getClusters = async() => {

            const token = localStorage.getItem('token');
            if(token == null){
                window.location = localurlf.concat("/userlogin");
            }
            console.log('Access JWT token: ' + token);

            await axios.get(localurlb.concat("/cluster/clusterdetails"),
                { headers: {'Authorization': "JWT " + token,
                'Content-Type': 'application/json'} })
            .then(res=>{
                console.log(res);
                console.log(res.data);
                setClusters(res.data);
                console.log(clusters);
            }, 
            (error) => {
                console.log(error);
                if(error.response.status === 401){
                    window.location = localurlf.concat("/userlogin");
                }
              })
        }
    
        getClusters();

    }, []);


    return(

        <>

            <UserNavbar/>

            <div class="main">
                
                <h2>Clusters</h2>
                <br />
                <div className = "createcluster">
                    <Link to = "createcluster">Create Cluster</Link>
                </div>

                <div className="cards">

                    {clusters.map(item => {
                        return(
                            <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title">{item.cluster_name}</h5><br/>
                                    <p className="card-text"><b>Created On : </b>{item.date_of_creation}</p>
                                    <p className="card-text"><b>Depth : </b>{item.depth}</p>
                                </div>
                                <ul className="list-group list-group-flush group1">
                                    <li className="list-group-item">URL1 : <a href={item.url1} className="card-link"> {item.url1}</a></li>
                                    <li className="list-group-item">URL2 : <a href={item.url2} className="card-link"> {item.url2}</a></li>
                                    <li className="list-group-item">URL3 : <a href={item.url3} className="card-link"> {item.url3}</a></li>
                                </ul>
                                <div className="card-body body2">
                                    <h6>Crawling Strategies: </h6>
                                    <br />
                                    {item.pdf && <p> PDF{(item.word || item.powerpoint || item.text || item.non_html_text) && ","}</p>}
                                    {item.word && <p> Word{(item.powerpoint || item.text || item.non_html_text) && ","}</p>}
                                    {item.word && <p> Powerpoint{(item.text || item.non_html_text) && ","}</p>}
                                    {item.text && <p> Text{(item.non_html_text) && ","}</p>}
                                    {item.non_html_text && <p> Non-HTML Text</p>}
                                </div>
                            </div>
                        );
                    })}

                </div>


            </div>
        </>

        
    );
}

export default Clusters;