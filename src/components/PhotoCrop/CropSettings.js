
import { useSelector, useDispatch } from 'react-redux';
import styles from "../../css/PhotoCrop.module.css";
import { SetData } from "../../actions/SetData.js";
import rotate_left from "./crop/rotate-left.png";
import rotate_right from "./crop/rotate-right.png";
export default function CropSettings(props) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.photoReducer);
    const rotate = data?.rotate;

    function handleRotate(value) {
        if (value === 360) { // 將旋轉重置
            dispatch(SetData({rotate: 0}))
        } else { // 調整旋轉，將角度維持在 0 ~ 359
            dispatch(SetData({rotate: (360 + rotate + value) % 360}))
        }
    }
    
    return (<>
        <button className={styles.rotateBtn} onClick={(e) => handleRotate(-5)}>
            <input type='image' className={styles.rotateImg} alt='' src={rotate_left} />
        </button>
        <button className={styles.rotateBtn} onClick={(e) => handleRotate(5)}>
            <input type='image' className={styles.rotateImg} alt='' src={rotate_right} />
        </button>
        <button className={styles.rotateBtn} onClick={(e) => handleRotate(360)}>
            Reset
        </button>
    </>)
}