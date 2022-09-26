function ImageExist(url) {
    var img = new Image();
    img.src = url;
    return img.height !== 0;
}
export default ImageExist;