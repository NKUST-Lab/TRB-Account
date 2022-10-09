
import { useDispatch } from 'react-redux';
import { SetData } from "../actions/SetData.js";
export default function useSelectPhoto(file) {
    const dispatch = useDispatch();
    
    if (!file) return;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        dispatch(SetData({file: reader.result}))
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}