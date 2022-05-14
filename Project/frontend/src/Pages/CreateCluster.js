// ============ React ==================
import {useEffect, useState} from 'react'
import axios from 'axios';

// ============== Custom CSS ==================

import "../Styles/createcluster.css"
// ================== Components ==============
import UserNavbar from '../Components/UserNavBar';

const CreateCluster = () => {

    // Front-End Root URLS ======================

    let localurlf = "http://localhost:3000";
    // let localurlf = "https://spitrack-9f734.web.app";
    // let localurlf = "https://spitrack-9f734.firebaseapp.com";

    // Back-End Root URLS =======================

    let localurlb = "http://127.0.0.1:8000";
    // let localurlb = "https://spitrack-py.herokuapp.com";
    
    const [cluster_name, setClusterName] = useState('');
    const [url1, setURL1] = useState('');
    const [url2, setURL2] = useState('');
    const [url3, setURL3] = useState('');
    const [depth, setDepth] = useState('');
    const [pdf, setPDF] = useState(false);
    const [word, setWord] = useState(false);
    const [powerpoint, setPowerpoint] = useState(false);
    const [text, setText] = useState(false);
    const [nhtmltext, setNhtmltext] = useState(false);

    const token = localStorage.getItem('token');
    
    useEffect(()=>{

        if(token == null){
            window.location = localurlf.concat("/userlogin");
        }
    },[])
    
    const handleSubmit = async (event) => {
        if(token == null){
            window.location = localurlf.concat("/userlogin");
        }
        if(cluster_name === '' || url1 === '' || url2 === '' || url3 === '' || depth === ''){
            alert("Please enter all the details!");
        }
        else {event.preventDefault();
        const cluster = {
          cluster_name: cluster_name,
          url1: url1,
          url2: url2,
          url3: url3,
          depth: depth,
          pdf: pdf,
          word: word,
          powerpoint: powerpoint,
          text: text,
          non_html_text: nhtmltext,
        }
        alert("We will notify you through email when your cluster is ready for searching!");
        console.log(cluster);
        console.log("JWT " + token);
        await axios.post(localurlb.concat("/cluster/createcluster"), cluster, {headers: {'Authorization': "JWT " + token, 'Content-Type': 'application/json' }
          })
          .then(res=>{
            console.log(res);
            console.log(res.data);
            window.location = localurlf.concat("/userclusters");
          }, (error) => {
                console.log(error);
                if(error.response.status === 401){
                    window.location = localurlf.concat("/userlogin");
                }
                alert("Error Found Please Check Log!");
                
          })}
      }


    return (
        
        <>

            <UserNavbar/>
        
            <div className="main">
                
                <form className = "form-box-cluster" onSubmit = {handleSubmit}>

                    <div className="form-head-cluster">Create Cluster</div>

                    <div className="form-group">
                        <label htmlFor="clustername">Cluster Name</label>
                        <input type="text" className="form-control" id="clustername" placeholder="Enter Cluster Name" name = "cluster_name" onChange = {(e) => setClusterName(e.target.value)}/>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="url1">URL1</label>
                        <input type="text" className="form-control" id="url1" placeholder="Enter URL 1" name = "url1" onChange = {(e) => setURL1(e.target.value)}/>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="url2">URL2</label>
                        <input type="text" className="form-control" id="url2" placeholder="Enter URL 2" name = "url2" onChange = {(e) => setURL2(e.target.value)}/>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="url3">URL3</label>
                        <input type="text" className="form-control" id="url3" placeholder="Enter URL 3" name = "url3" onChange = {(e) => setURL3(e.target.value)}/>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="depth">Depth</label>
                        <input type="text" className="form-control" id="depth" placeholder="Enter Depth" name = "depth" onChange = {(e) => setDepth(e.target.value)}/>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Select Strategies</label>

                        <div className="holder">
                            <div className="c-checkbox">
                            <input type="checkbox" value="" id="PDF" onChange = {() => setPDF(!pdf)}/>
                            <label className="form-check-label" htmlFor="PDF">PDF (.pdf)</label>
                            </div>

                            <div className="c-checkbox">
                            <input type="checkbox" value="" id="Word" onChange = {() => setWord(!word)}/>
                            <label className="form-check-label" htmlFor="Word">Word (.docx)</label>
                            </div>

                            <div className="c-checkbox">
                            <input type="checkbox" value="" id="Powerpoint" onChange = {() => setPowerpoint(!powerpoint)}/>
                            <label className="form-check-label" htmlFor="Powerpoint">Powerpoint (.pptx)</label>
                            </div>

                            <div className="c-checkbox">
                            <input type="checkbox" value="" id="Text" onChange = {() => setText(!text)}/>
                            <label className="form-check-label" htmlFor="Text">Text (.txt)</label>
                            </div>

                            <div className="c-checkbox">
                            <input type="checkbox" value="" id="nhtmlText" onChange = {() => setNhtmltext(!nhtmltext)}/>
                            <label className="form-check-label" htmlFor="nhtmlText">Non-HTML Text (.htm)</label>
                            </div>
                        </div>

                        

                    </div>

                    <button type="submit" className="submit">Create</button>
                </form>
            </div>

        </>
    );
}

export default CreateCluster;