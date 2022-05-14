// ===================== React Packages ============================

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// ==================== Components ======================

import UserSignUp from './Pages/UserSignUp';
import UserLogin from './Pages/UserLogin';
import UserDashboard from './Pages/UserDashboard';
import Home from './Pages/Home';
import Clusters from './Pages/Clusters';
import CreateCluster from './Pages/CreateCluster';
import Search from './Pages/Search';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import NewAdmin from './Pages/NewAdmin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path = '' element={<Home/>}/>
          <Route exact path = '/usersignup' element={<UserSignUp/>}/>
          <Route exact path = '/userlogin' element={<UserLogin/>}/>
          <Route exact path = '/userdashboard' element={<UserDashboard/>}/>
          <Route exact path = '/userclusters' element={<Clusters/>}/>
          <Route exact path = '/userclusters/createcluster' element={<CreateCluster/>}/>
          <Route exact path = '/usersearch' element={<Search/>}/>
          <Route exact path = '/adminlogin' element={<AdminLogin/>}/>
          <Route exact path = '/admindashboard' element={<AdminDashboard/>}/>
          <Route exact path = '/newadmin' element={<NewAdmin/>}/>
          
        </Routes>
      </Router>  
    </div>
  );
}

export default App;