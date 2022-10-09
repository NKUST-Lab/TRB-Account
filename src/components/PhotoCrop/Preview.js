import React, { useEffect } from 'react';
import face_outline_inside from "./crop/face_outline_inside.png";
import { useSelector } from 'react-redux';

export const UpdatePreview = prop => {
    // const data = useSelector(state => state.reducer);
    // const file = data?.file;
    const preview_canvas = document.getElementById('previewCanvas');
    if (!preview_canvas) return;
    const preview_canvas_context = preview_canvas.getContext('2d')
    preview_canvas.width = 1200;
    preview_canvas.height = 1200;
    const preview_canvas_width = preview_canvas.width;
    const preview_canvas_height = preview_canvas.height;
    
    // 重設畫布
    preview_canvas_context.clearRect(0, 0, preview_canvas_width, preview_canvas_height);
    putMask();

    // 設定灰底背景
    preview_canvas_context.fillStyle = "rgba(0, 0, 0, 0.5)";
    preview_canvas_context.fillRect(0, 0, preview_canvas_width, preview_canvas_height);

    // 重設畫布
    preview_canvas_context.clearRect(0, 0, preview_canvas_width, preview_canvas_height);
    putMask();
    
    // 複製 Crop 畫布
    const crop_canvas = document.getElementById('cropCanvas');
    const image = new Image();
    image.src = crop_canvas.toDataURL();
    if (image.complete) {
        preview_canvas_context.drawImage(image, 0, 0);
        putMask();
    } else {
        image.onload = function () {
            preview_canvas_context.drawImage(image, 0, 0);    
            putMask();
        };
    }

    function putMask() {
        // 遮罩與圖片合併，裁剪出內容
        const mask2 = document.getElementById('mask2');
        const image = new Image();
        image.src = mask2.src;
        if (image.complete) {
            preview_canvas_context.globalAlpha = 1; // 設定透明度
            preview_canvas_context.drawImage(image, 0, 0); // 遮罩
        } else {
            image.onload = function () {
                preview_canvas_context.globalAlpha = 1; // 設定透明度
                preview_canvas_context.drawImage(image, 0, 0); // 遮罩
            };
        }
    }
}

const Preview = props => {
    // const updatePreviw = useUpdatePreview();

    // useEffect(() => {
    //     updatePreviw();
    // }, )

    return (<>
        <canvas id="previewCanvas" style={{width: '100%', height: '100%'}} />
        <img id="mask2" alt="" src={face_outline_inside} hidden />
    </>)
}
export default Preview;