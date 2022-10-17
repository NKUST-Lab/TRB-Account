import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import imageExist from '../function/imageExist';

const Profile = () => {
    let navigate = useNavigate();
    const data = useSelector(state => state.loginReducer);
    const signInStatus = data?.signInStatus;
    const signIn = data?.signIn;
    const accountDetails = data?.accountDetails;
    const uid = accountDetails?.uid;
    const email = accountDetails?.email;
    const photoURL = accountDetails?.photoURL;
    const providerData = accountDetails?.providerData;
    const phoneNumber = accountDetails?.phoneNumber;
    
    const bodyStyle = {margin: "0.5rem"};
    const navbarStyle = {padding :'0.5rem', boxSizing: 'border-box', height:'max-content', width:'100%', margin:"0rem auto", display: 'flex', justifyContent: 'center'};
    const photoStyle = {width: '4rem', height: '4rem', borderRadius: '50%'};

    // 如果系統沒有找到資料，則返回到登入畫面
    useEffect(() => {
        if (signInStatus === '未登入') {
            navigate('/Login');
        }
    }, [])

    // 如果使用者是未曾上傳過圖片，就使用它第三方登入帳號的大頭貼作為個人資料的照片
    var profilePhoto = `https://toysrbooks.com/dev/v0.1/photo/${uid}.png`;
    useEffect(() => {
        if (imageExist(profilePhoto) === false) {
            profilePhoto = photoURL;
        }
    }, [])
    

    const onLogout = () => {
        firebase.auth().signOut();
        navigate('/Login');
    }

    const onEditPhoto = () => {
        navigate(`/PhotoCrop/${uid}`);
    }

    return(
        <Grid style={bodyStyle}>
            <Grid>
                <Paper elevation={10} style={navbarStyle}>
                    <Stack>
                        <Button onClick={onEditPhoto}>
                            <img src={profilePhoto} alt="" style={photoStyle}/>
                        </Button>
                        <p>User ID：{uid}</p>
                        <p>E-mail：{email}</p>
                        <p>Provider：{providerData?.map(x => x.providerId).join(", ")}</p>
                        <p>PhoneNumber：{phoneNumber}</p>
                    </Stack>
                </Paper>
            </Grid>
            <Grid>
                <Button variant="contained" onClick={onLogout}>{signIn}</Button>
            </Grid>
        </Grid>
    )
}

export default Profile;