import React from 'react'
import { Grid, Paper } from '@material-ui/core'

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebaseConfig from '../firebaseConfig';
import uiConfig from '../uiConfig';

import { useNavigate } from "react-router-dom";



const app = firebase.initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(app.auth());

const Login=()=>{
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
                    localStorage.setItem('sign-in-status', '已登入');
                    localStorage.setItem('sign-in', '登出');
                    localStorage.setItem('account-details', JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  '));
                    navigate('/Profile');
                });
            } else {
                // User is signed out.
                localStorage.setItem('sign-in-status', '已登出');
                localStorage.setItem('sign-in', '登入');
                localStorage.setItem('account-details', 'null');
                navigate('/Login');
            }
        }, function(error) {
            console.log(error);
        });
    };
    
    window.addEventListener('load', function() {
        initApp()
    });

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    const paperStyle={padding :'1rem',height:'70vh',width:'25vw', margin:"4rem auto"}
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid id="firebaseui-auth-container"></Grid>
            </Paper>
        </Grid>
    )
}

export default Login;