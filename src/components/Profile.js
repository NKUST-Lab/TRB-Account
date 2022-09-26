import React from 'react';
import { Grid, Paper } from '@material-ui/core'
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import ImageExist from '../function/ImageExist';

const Profile = () => {
    let navigate = useNavigate();

    const signInStatus = localStorage.getItem('sign-in-status');
    const signIn = localStorage.getItem('sign-in');
    const accountDetails = localStorage.getItem('account-details');
    const accountDetails_json = JSON.parse(accountDetails);

    const bodyStyle = {margin: "0.5rem"};
    const navbarStyle = {padding :'0.5rem', boxSizing: 'border-box', height:'max-content', width:'100%', margin:"0rem auto", display: 'flex', justifyContent: 'right'};
    const photoStyle = {width: '4rem', height: '4rem'};

    console.log(accountDetails);

    var profilePhoto = `https://toysrbooks.com/dev/v0.1/photo/${accountDetails_json.uid}.png`;
    if (ImageExist(profilePhoto) === false) {
        profilePhoto = accountDetails_json.photoURL;
    }

    const onLogout = () => {
        firebase.auth().signOut();
        navigate('/Login');
    }

    const onEditPhoto = () => {
        navigate('/PhotoCrop');
    }

    return(
        <Grid style={bodyStyle}>
            <Grid>
                <Paper elevation={10} style={navbarStyle}>
                    <Button onClick={onEditPhoto}>
                        <img src={profilePhoto} alt="" style={photoStyle}/>
                    </Button>
                </Paper>
            </Grid>
            <Grid>
                <Button variant="contained" onClick={onLogout}>登出</Button>
            </Grid>
        </Grid>
    )
}

export default Profile;