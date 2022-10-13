import React from 'react'
import { Grid, Paper } from '@material-ui/core'

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebaseConfig from '../firebaseConfig';
import uiConfig from '../uiConfig';

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN, LOGOUT } from '../actions/Login';


const app = firebase.initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(app.auth());

const Login=()=>{
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
    
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;
                user.getIdToken().then(function(accessToken) {
                    const data = {
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }
                    dispatch(LOGIN(data));
                    navigate('/Profile');
                });
            } else {
                // User is signed out.

                dispatch(LOGOUT());
                navigate('/Login');
            }
        }, function(error) {
            console.log(error);
        });
    };
    
    useEffect(() => {
        initApp()
        
        ui.start('#firebaseui-auth-container', uiConfig);
    }, [])

    const paperStyle = { padding :'1rem', height:'70vh', width:'25vw', margin:"4rem auto" }
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid id="firebaseui-auth-container"></Grid>
            </Paper>
        </Grid>
    )
}

export default Login;