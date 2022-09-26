import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";



const PhotoCrop = () => {
    let navigate = useNavigate();
    
    return (<>
        <Button  variant="contained" onClick={() => navigate('/Profile')}>
            返回
        </Button>
    </>)
}

export default PhotoCrop;


