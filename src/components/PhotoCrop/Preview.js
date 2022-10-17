import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import face_outline_inside from "./crop/face_outline_inside.png";

export const UpdatePreview = prop => {
    const preview_canvas = document.getElementById('previewCanvas');
    if (!preview_canvas) return;
    const preview_canvas_context = preview_canvas.getContext('2d')
    preview_canvas.width = 1200;
    preview_canvas.height = 1200;
    const preview_canvas_width = preview_canvas.width;
    const preview_canvas_height = preview_canvas.height;
    
    putMask();
    
    // 複製 Crop 畫布
    const crop_canvas = document.getElementById('cropCanvas');
    const image = new Image();
    image.src = crop_canvas.toDataURL();
    if (image.complete) {
        preview_canvas_context.clearRect(0, 0, preview_canvas_width, preview_canvas_height);
        preview_canvas_context.drawImage(image, 0, 0);
        putMask();
    } else {
        image.onload = function () {
            preview_canvas_context.clearRect(0, 0, preview_canvas_width, preview_canvas_height);
            preview_canvas_context.drawImage(image, 0, 0);    
            putMask();
        };
    }

    function putMask() {
        // 遮罩與圖片合併，裁剪出內容
        const image = new Image();
        image.src = face_outline_inside;
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
    const dispatch = useDispatch();
    const data = useSelector(state => state.photoReducer);
    const x = data?.x;
    const y = data?.y;
    const file = data?.file;
    const size = data?.size;
    const rotate = data?.rotate;

    var crop_image_parameters = {x: x, y: y, imageFile: file, rotate: rotate, size: size};

    useEffect(() => {
        drawPreview();
    }, [x, y, file, size, rotate])

    function drawPreview() {
        const preview_canvas = document.getElementById('previewCanvas');
        if (!preview_canvas) return;
        if (file === null) return;
        const preview_canvas_context = preview_canvas.getContext('2d');
        preview_canvas.width = 1200;
        preview_canvas.height = 1200;
        const preview_canvas_width = preview_canvas.width;
        const preview_canvas_height = preview_canvas.height;

        // 讓圖片可以按原比例呈現
        const {x, y, imageFile, size} = crop_image_parameters;
        var resize_image_width, resize_image_height;
        const image =new Image();
        image.src = imageFile;
        image.onload = function() {
            const { width, height } = image;
            const crop_image_ratio = width / height;
            if (crop_image_ratio >= 1) {
                resize_image_width = preview_canvas_width * size;
                resize_image_height = preview_canvas_height * size / crop_image_ratio;
            } else {
                resize_image_width = preview_canvas_width * size * crop_image_ratio;
                resize_image_height = preview_canvas_height * size; 
            }
            const offsetX = (preview_canvas_width / 2) - (resize_image_width / 2);
            const offsetY = (preview_canvas_width / 2) - (resize_image_height / 2);
            // 重設畫布
            preview_canvas_context.clearRect(0, 0, preview_canvas_width, preview_canvas_height);
            preview_canvas_context.drawImage(image, 0, 0, width, height, x + offsetX, y + offsetY, resize_image_width, resize_image_height);
            putMask();
        }
        function putMask() {
            // 遮罩與圖片合併，裁剪出內容
            const image = new Image();
            image.src = face_outline_inside;
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

    return (<>
        <canvas id="previewCanvas" style={{width: '100%', height: '100%'}} />
        <img id="mask2" alt="" src={face_outline_inside} hidden />
    </>)
}
export default Preview;