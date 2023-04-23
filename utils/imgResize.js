export function imgResize(url,w=600,h=600,isCut=false,isZoom=false) {
    // url 图片原始url
    // w 需要的宽度
    // h 需要的高度
    // isCut 是否需要裁切，当比例不一样的时候这个设置true, 就会裁掉超出比例以外的部分
    // isZoom, 当设置的宽高大于图片原始宽高时，图片放大像素数输出
    return !!url?`${window.api.imgproxy}/resize:${isCut?'fill':'fit'}:${w}:${h}:${isZoom?1:0}/plain/${url}`:'';
}
