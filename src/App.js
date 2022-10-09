import Login from './components/Login.js';
import Profile from './components/Profile.js';
import { PhotoCrop } from './components/PhotoCrop/PhotoCrop.js';
import { Grid } from '@material-ui/core'

import { Routes, Route } from 'react-router-dom';


function App() {
    console.log('I render 😁');
    return (<>
        <Routes>
            <Route path="/" element={<p>http://localhost:3000/Login<br />http://localhost:3000/Profile</p>}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/PhotoCrop/:userID" element={<PhotoCrop />}/>
        </Routes>
    </>);
}

export default App;
