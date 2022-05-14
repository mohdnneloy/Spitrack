import {React} from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios';

//================== Custom CSS ==================

import '../Styles/usersearch.css'

// ================ Components ==================

import UserNavbar from '../Components/UserNavBar';


// ================ Search Component ==================

const Search = () =>{

    // Front-End Root URLS ======================

    let localurlf = "http://localhost:3000";
    // let localurlf = "https://spitrack-9f734.web.app";
    // let localurlf = "https://spitrack-9f734.firebaseapp.com";

    // Back-End Root URLS =======================

    let localurlb = "http://127.0.0.1:8000";
    // let localurlb = "https://spitrack-py.herokuapp.com";

    

    /* Required cluster information for cluster selection in search*/
    const [clusters, setClusters] = useState([]);

    /* Search Info */
    const [searchstring, setSearchString] = useState('');
    const [clusterselects, setClusterSelectS] = useState([]);
    const [sestring, setSeString] = useState('');
    

    /* Required search results*/
    const [results, setResults] = useState([]);


    /* Search API Call */

    const handleSearch = async (event) =>{

        if(searchstring === ''){
            alert("Please enter data you want to search!");
            
        }

        else if(!clusterselects.length){
            alert("Please select atleast 1 cluster!");
        }

        else{
            event.preventDefault();
            const searchdata = {search_string: searchstring, cluster_names: clusterselects};
            console.log(searchdata);
            const token = localStorage.getItem('token');
                console.log('Access JWT token: ' + token);
  
                await axios.post( localurlb.concat("/cluster/search"), searchdata, 
                    { headers: {'Authorization': "JWT " + token,
                    'Content-Type': 'application/json'} })
                .then(res=>{
                    console.log(res);
                    console.log(res.data.data_crawled);
                    setResults(res.data.data_crawled);
                    setSeString(searchstring);

                    console.log(results);
                }, 
                (error) => {
                    console.log(error);
                })
        }

    }

    const handleSelectCluster = (clusterName) => {
        
        if(clusterselects.includes(clusterName)){
            const ar = clusterselects.filter(item => item !== clusterName);
            setClusterSelectS(ar);
        }
        else{
            setClusterSelectS([...clusterselects, clusterName]);
            
        }
    }

    // Capitalize First Letter

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    const shortify = (content, s_string) => {

        if(!content.toLowerCase().includes(s_string.toLowerCase())){
            return('');
        }

        else{

            let splitted_content = content.split(" ");
            let i = 0;
            let index = 0;
            let result_string = '';
            let counter = 0;
            let temp_array = [];
            let previous_words = '';
            let next_words = '';

            
            for(i;i<splitted_content.length;i++){

                if(splitted_content[i].toLowerCase().includes(s_string.toLowerCase())){
                    index = i;
                    console.log(s_string);
                    console.log(splitted_content[i]);
                    break;
                }
            }

            console.log(index);
            
            /*Previous string Ready*/

            for(i = index-1; i>=0; i--){

                if(counter === 10){
                    break;
                }
                else{
                    temp_array.push(splitted_content[i]);
                    counter = counter + 1;
                }
                
            }

            temp_array = temp_array.reverse()
            

            for(i=0; i<temp_array.length;i++){

                if(i === 0){
                    previous_words = previous_words + temp_array[i];
                }
                else{
                    previous_words = previous_words + " " + temp_array[i];
                }
                
            }

            /*Next string Ready*/

            counter = 0;
            temp_array = []
            for(i = index; i<splitted_content.length; i++){

                if(counter === 20){
                    break;
                }
                else{
                    temp_array.push(splitted_content[i]);
                    counter = counter + 1;
                }
                
            }

            console.log(temp_array);
            console.log("");

            for(i=0; i<temp_array.length;i++){

                if(i === 0){
                    next_words = next_words + temp_array[i];
                }
                else{
                    next_words = next_words + " " + temp_array[i];
                }
                
            }       

            result_string = previous_words + " " + next_words;
            result_string = capitalize(result_string);
            return result_string;

        }
    }

    const titlefy = (content, s_string) => {
        
        if(!content.toLowerCase().includes(s_string.toLowerCase())){
            return('');
        }

        else{

            let splitted_content = content.split(" ");
            let i = 0;
            let index = 0;
            let result_string = '';
            let counter = 0;
            let temp_array = [];
            let next_words = '';

            
            
            for(i;i<splitted_content.length;i++){
                if(splitted_content[i].toLowerCase().includes(sestring.toLowerCase())){
                    index = i;
                    break;
                }
            }

            /*Next string Ready*/

            counter = 0;
            temp_array = []
            for(i = index; i<splitted_content.length; i++){

                if(counter === 4){
                    break;
                }
                else{
                    temp_array.push(splitted_content[i]);
                    counter = counter + 1;
                }
                
            }

            for(i=0; i<temp_array.length;i++){

                if(i === 0){
                    next_words = next_words + temp_array[i];
                }
                else{
                    next_words = next_words + " " + temp_array[i];
                }
                
            }


            result_string = next_words.charAt(0).toUpperCase() + next_words.slice(1);
            return result_string;

        }
        
    }

    
    /*UseEffect*/
    useEffect(()=>{

        const getClusters = async() => {

            const token = localStorage.getItem('token');
            if(token == null){
                window.location = localurlf.concat("/userlogin");
            }
            console.log('Access JWT token: ' + token);

            await axios.get( localurlb.concat("/cluster/clusterdetails"), 
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
    
    


    return (

        <>
            <UserNavbar/>

            <div className="main">
                
                <h2>Search</h2>
                <br />
                <div className="searchbox">
                    <form onSubmit= {handleSearch}>
                        <div className="input-group mb-3 searchbar">
                            <input type="text" className="form-control text-field" placeholder="Search for your data" aria-label="Search" aria-describedby="basic-addon2" onChange={(e) => setSearchString(e.target.value)}/>
                            <div className="input-group-append">
                                <button type="submit" className="btn-search" id="basic-addon2">Search</button>
                                
                            </div>
                        </div>

                        <div className="clusters">

                            <div className="s-form-group ">
                                <label htmlFor="">Select Cluster(s)</label>
                                <div className="s-input-holder">
                                {clusters.map(item => {
                                    
                                    return(
                                        <div className="s-checkbox">
                                            <input className="form-check-input" type="checkbox" value="" id={item.cluster_name} onChange = {(e) => handleSelectCluster(item.cluster_name)}/>
                                            <label className="form-check-label" htmlFor={item.cluster_name}>{item.cluster_name}</label>
                                        </div>
                                    );
                                })}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="search-results cards">
                
                {results.map(item => {
                            
                        return(
                            <div className="card search-card" >
                                <div className="card-body">
                                    <h5 className="card-title">{titlefy(item.content, sestring)}</h5><br/>
                                    <p className="card-text"><b>Depth : </b>{item.depth}</p>
                                    <p className="card-text"><b>Crawling Strategies : </b>{item.crawled_data_type}</p>
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title"></h5><br/>
                                    <p className="card-text"><b>Content : </b>{shortify(item.content, sestring)}</p>
                                </div>

                                <ul className="list-group list-group-flush group1">
                                    <li className="list-group-item">Root URL : <a href={item.root_url} className="card-link"> {item.root_url}</a></li>
                                    <li className="list-group-item">Content URL : <a href={item.current_url} className="card-link"> {item.current_url}</a></li>
                                </ul>
                                
                            </div>

                        );

                        
                    })}

                </div>

            </div>
        
        </>
        
    );
    
}

export default Search;