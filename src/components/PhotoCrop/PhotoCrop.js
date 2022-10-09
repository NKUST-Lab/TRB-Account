import styles from "../../css/PhotoCrop.module.css";
import Crop from "./Crop.js";
import Preview from "./Preview.js";
import Personal from "./Personal.js";
import CropSettings from "./CropSettings.js";
import CropSlider from "./CropSlider.js";
import Upload from "./Upload.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from 'react';
import useSelectPhoto from '../../function/useSelectPhoto';

export const PhotoCrop = () => {
  let navigate = useNavigate();
  const { userID } = useParams();
  const [file, setFile] = useState(null);
  let selectPhoto = useSelectPhoto(file);

  const onBack = () => {
    navigate('/Profile');
}
  return (<>
    <div className={styles['indent']}>
      <div className={styles['title']}>Your Personal Photo</div>
      <div className={styles['indent']}>
        <div className={styles['canvas-flex']}>
          <div className={styles['canvas-container']}>
            <div className={`${styles['canvas']} ${styles['canvas-large']}`}>
                <Crop />
            </div>
            <div className={styles['canvas-bar']}>
              <div className={styles['row']}>
                <CropSettings />
              </div>
              <div className={styles['row']}>
                <CropSlider />
              </div>
            </div>
          </div>
          <div className={styles['canvas-container']}>
            <div className={`${styles['canvas']} ${styles['canvas-large']}`}>
                <Preview />
            </div>
          </div>
          <div className={styles['canvas-container']}>
            <div className={`${styles['canvas']} ${styles['canvas-small']}`}>
                <Personal />
            </div>
          </div>
        </div>
        <div className={styles['row']}>
            <Button variant="contained" onClick={onBack}>返回</Button>
            <Button className={styles.button} variant="outlined" component="label" >
                Select Photo
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} hidden />
            </Button>
            <Upload userID={userID} />
        </div>
      </div>
    </div>
  </>);
};
