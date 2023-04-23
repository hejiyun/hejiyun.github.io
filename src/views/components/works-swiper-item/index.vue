<template>
    <span class="load-line"></span>
    <div class="works-box" v-if="newList.length">
        <div class="works-box-swiper" v-for="(item, index) in newList" :key="'item-'+index">
            <div class="swiper-wrapper">
                <!-- @slideChange="slideChange($event, index)" -->
                <swiper class="swiper-container" v-if="item.works.length>1" :loop="true" :pagination="{clickable: false }" :autoplay="{delay: 3000,disableOnInteraction: false}" :modules="modules"
                        :slides-per-view="1" @swiper="onSwiper($event, index)" @mouseenter="palyStart($event, index)" @mouseleave="palyEnd($event, index)"
                        @touchStart="touchSwiper($event, index)" @touchEnd="touchEnd($event, index)">
                    <swiper-slide v-for="(n,i) in item.works.slice(0,10)" :key="i">
                        <video v-if="('1' ===  ( n.w_type ? n.w_type : item.w_type ))&&videoFormats.some(format => (n.cover?n.cover:n).endsWith(format))" :src="n.cover?n.cover:n" controls controlslist="nodownload noplaybackrate" disablePictureInPicture></video>
                        <img class="center-box" v-else-if=" '1' ===  ( n.w_type ? n.w_type : item.w_type ) " :src="imgResize(n.cover?n.cover:n,540,540,true,true)" @click.stop="toBig(n.cover?n.cover:n)">
                        <i class="nft-work" v-else>
                            <img src="@/assets/images/top-logo-color.png">
                            <span @click.stop="!!(n.contract_address || item.contract_address) && copy(n.contract_address ? n.contract_address : item.contract_address)">{{shorten(hasContract(n.contract_address ? n.contract_address : item.contract_address))}}&nbsp;</span>
                        </i>
                    </swiper-slide>
                </swiper>
                <div class="no-box" v-else>
                    <div class="box" v-for="(n,i) in item.works" :key="'box-'+i">
                        <video v-if="('1' ===  ( n.w_type ? n.w_type : item.w_type ))&&videoFormats.some(format => (n.cover?n.cover:n).endsWith(format))" :src="n.cover?n.cover:n" controls controlslist="nodownload noplaybackrate" disablePictureInPicture></video>
                        <img class="center-box" v-else-if=" '1' ===  ( n.w_type ? n.w_type : item.w_type ) "  :src="imgResize(n.cover?n.cover:n,540,540,true,true)" :aaa = "n.cover?n.cover:n" @click.stop="toBig(n.cover?n.cover:n)">
                        <i class="nft-work" v-else>
                            <img src="@/assets/images/top-logo-color.png">
                            <span @click.stop="!!(n.contract_address || item.contract_address) && copy(n.contract_address ? n.contract_address : item.contract_address)">{{shorten(hasContract(n.contract_address ? n.contract_address : item.contract_address))}}&nbsp;</span>
                        </i>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="title" :style="titleStyle">{{newList[index].w_name}}</div>
                <template v-if="props.onlyShowTit === false">
                    <div class="info">
                        <div class="left"><i><img :src="imgResize(item.headimg,56,56,true)" alt=""></i><span>{{item.u_name || item.pfid}}</span></div>
                        <a v-if="item.twitter" class="icon" :href="item.twitter" target="_blank">
                            <twitter></twitter>
                        </a>
                    </div>
                    <!-- <div class="num">
                        Number of works
                        <span>{{item.count}}</span>
                    </div> -->
                </template>
            </div>
        </div>
    </div>
    <pagination-x v-if="props.showDelete===false" :total="newListData.length" :pagesize="pageInfo.pagesize" :currentPage="pageInfo.curPage" @change-page="changePage"></pagination-x>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Twitter from '@/components/icons/twitter.vue'
import PaginationX from '@/views/components/pagination/index.vue'
import $BigImg from "@/views/components/bigImg/index.js";


import { Autoplay, Navigation, Pagination } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { imgResize } from '/utils/imgResize.js'

var modules = ref([Autoplay, Navigation, Pagination])
const props = defineProps({
    listData: Array,
    showDelete: Boolean,
    titleStyle: Object,
    onlyShowTit: Boolean
})
const pageInfo = ref({
    pagesize: 20,
    curPage: 1
})

const videoFormats = ['.mp4', '.avi', '.mov'];
const pageSize = {
    max: 20,
    mid: 18,
    min: 16
}
const newListData = ref([])
const newList = ref([])
const state = ref(0) // 0:播放 1:暂停
const boxRefs = ref('') // 当前操作过的video实例
const swiperRefs = ref([])
const copy = (text)=>{
    if(/^[\d.]+$/.test(location.hostname)){
        alert('仅在使用https://localhost:4000 访问时有效')
    }
    navigator.clipboard && navigator.clipboard.writeText(text).then(res => {
        window.toast('This Contract Address copied to clipboard');
    }).catch(err=> {
        window.toast('Could not copy text: ' + err);
    })
}
const hasContract = (address)=>{
    if(address){
        address = address.match(/(^|\/)?(0x[0-9a-f]{40})($|\/)?/i);
    }
    return address?address[2]:false;
}
const shorten = (str)=>{
    str===false && (str="")
    return !!str && str.length>10?str.replace(/^(\S{4})[^$]+(\S{4})$/,'$1****$2'):str;
}
onMounted(() => {
    newListData.value = JSON.parse(JSON.stringify(props.listData))
    handleList()
})
let curSwiperRef = null
const palyStart = (e, index) => {
    curSwiperRef = setTimeout(() => {
        swiperRefs.value[index].slideNext()
        swiperRefs.value[index].autoplay.start()
    }, 1000)
}
const palyEnd = (e, index) => {
    clearTimeout(curSwiperRef)
    swiperRefs.value[index].autoplay.stop()
}

const onSwiper = (swiper, index) => {
    swiper.autoplay.stop()
    swiperRefs.value[index] = swiper
}

// const slideChange = (swiper, index) => {
//     if (props.onlyShowTit === false) {
//         console.log(newList.value);
//         newList.value[index].works.length > 1 &&
//         (newList.value[index].w_name =
//             newList.value[index].works[swiper.realIndex || 0].w_name)
//     }
// }

const changePage = (param) => {
    if (pageInfo.value.curPage != param.curPage) {
        newList.value = []
        swiperRefs.value = []
        pageInfo.value.curPage = param.curPage
        // newList.value.forEach((e, index) => {
        //     swiperRefs.value[index].destroy(false)
        // })

        nextTick(() => {
            handleList()
            nextTick(() => {
                swiperRefs.value.forEach((e, index) => {
                    // swiperRefs.value[index].init()
                    // swiperRefs.value[index].update(true)
                    swiperRefs.value[index].slideToLoop(0, 0, false)
                })
            })
        })
    }
}

const touchSwiper = (swiper, index) => {
    curSwiperRef && clearTimeout(curSwiperRef)
    swiperRefs.value[index].autoplay.start()
}
const touchEnd = (swiper, index) => {
    if (getOs().isPc === false) {
        curSwiperRef && clearTimeout(curSwiperRef)
        swiperRefs.value[index].autoplay.stop()
    }
}
const getOs = () => {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet =
            /(?:iPad|PlayBook)/.test(ua) ||
            (isAndroid && !/(?:Mobile)/.test(ua)) ||
            (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    }
}

const checkVideo = (e, type) => {
    const v = e.path[2].children[1]
    boxRefs.value && boxRefs.value != v && boxRefs.value.pause()
    boxRefs.value = v
    if (type === 'open') {
        state.value = 1
        v.play()
    } else {
        state.value = 0
        v.pause()
    }
}
const checkFileVideo = (fileValue) => {
    let index = fileValue.indexOf('.'), //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
        fileValueSuffix = fileValue.substring(index) //截断"."之前的，得到后缀
    if (!/(.*)\.(mp4|rmvb|avi|ts|gif)$/.test(fileValueSuffix)) {
        //根据后缀，判断是否符合视频格式
        return false
    }
    return true
}
const resizeWidth = () => {
    let winWidth =
        window.innerWidth || (document.body && document.body.clientWidth)
    let nowSize = 0

    if (winWidth > 768) nowSize = pageSize.max
    else if (winWidth > 600 && winWidth <= 768) nowSize = pageSize.mid
    else if (winWidth <= 600) nowSize = pageSize.min
    pageInfo.value = { ...pageInfo.value, pagesize: nowSize }

    nextTick(() => {
        handleList()
    })
}

// resizeWidth()

// window.onresize = resizeWidth

const deleteItem = () => {
    console.log('delete')
}
var imgList = [] // 所有的swiper图片地址

const handleList = () => {
    let arr = []
    if (newListData.value.length > 0) {
        if (newListData.value.length > pageInfo.value.pagesize) {
            let start =
                    pageInfo.value.curPage === 1
                        ? 0
                        : (pageInfo.value.curPage - 1) *
                        pageInfo.value.pagesize,
                end = pageInfo.value.pagesize * pageInfo.value.curPage
            arr = newListData.value.slice(start, end)
        } else {
            arr = newListData.value
        }
        newList.value = arr
    }

    // nextTick(() => {
    //     drawSwiperImage()
    // })
}
const drawSwiperImage = () => {
    let swiperCanvas = document.querySelectorAll('.swiperCanvas'),
        swiperImg = document.querySelector('.works-box-swiper'),
        ctx = [],
        img = [],
        imgSize = 0
    imgSize = swiperImg.clientWidth * 2
    Array.from(swiperCanvas).forEach((item, i) => {
        ctx[i] = item.getContext('2d')
        img[i] = new Image()
        var g = ctx[i].createLinearGradient(0, 0, 400, 400)
        g.addColorStop(0, '#ffffff')
        g.addColorStop(1, '#000000')
        ctx[i].fillStyle = g
        ctx[i].fillRect(0, 0, 400, 400)
        img[i].src = filterImgUrl(
            imgList[i].cover ? imgList[i].cover : imgList[i],
            imgSize
        )
        ctx[i].canvas.width = img[i].width
        ctx[i].canvas.height = img[i].height
        img[i].onload = function () {
            ctx[i].drawImage(img[i], 0, 0, imgSize, imgSize)
        }
    })
}
const filterImgUrl = (url, size) => {
    let testUrl = 'https://artex-imgproxy-test.artx.land/test/resize:fit:'
    return `${testUrl}${size}:${size}:0/plain/${url}`
}
const toBig = (Img,type) => {
    // console.log(Img,type);
    $BigImg({Img});
    

}
</script>
<style lang="scss" scoped>
/** default style ----START---- **/

.works-box {
    margin: 70px auto 0;
    padding: 0 10px 0;
    width: 1200px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    > * {
        flex-shrink: 0;
        flex-grow: 0;
    }
    .works-box-swiper {
        margin-left: 20px;
        margin-bottom: 38px;
        width: 270px;
        height: 370px;
        background: #fff;
        mix-blend-mode: normal;
        box-shadow: 0px 3px 8px 1px rgba(206, 206, 206, 0.3);
        border-radius: 17.28px;
        overflow: hidden;
        position: relative;
        .delete-icon {
            box-sizing: border-box;
            position: absolute;
            right: 13px;
            top: 13px;
            width: 30px;
            height: 30px;
            z-index: 1;
            display: none;
            cursor: pointer;
        }
        .swiper-wrapper {
            width: 100%;
            height: 270px;
            overflow: hidden;
            background: linear-gradient(
                    360deg,
                    rgba(0, 0, 0, 0.2) 0%,
                    rgba(255, 255, 255, 0) 36.3%
            );
            border-radius: 17.28px 17.28px 0px 0px;
            .no-box {
                width: 100%;
                .box {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    img {
                        // pointer-events: none;
                    }
                    // video{
                    //     width:100%;
                    //     height:100%;
                    // }
                }
            }
            :deep(.swiper) {
                width: 100%;
                .swiper-slide {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    /* display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                > * {
                    flex-shrink: 0;
                } */
                    > div {
                        height: 100%;
                    }
                    .swiperCanvas {
                        width: 100%;
                        height: 100%;
                    }
                    .slide-box {
                        width: 150%;
                        height: 150%;
                        filter: blur(30px);
                        position: absolute;
                        left: -25%;
                        top: -25%;
                        z-index: 1;
                        opacity: 0.4;
                    }

                    .play-btn {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 20;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        cursor: pointer;
                        background: rgba(0, 0, 0, 0.5);
                        .play {
                            position: absolute;
                            top: 50%;
                            left: 57%;
                            transform: translate(-50%, -50%);
                            width: 0;
                            height: 0;
                            border-left: 20px solid #ffffff;
                            border-top: 14px solid transparent;
                            border-bottom: 14px solid transparent;
                        }
                        .pause {
                            position: absolute;
                            top: 50%;
                            left: 84%;
                            transform: translate(-50%, -50%);
                            width: 50px;
                            height: 20px;
                            border-style: double;
                            border-width: 0px 0px 0px 15px;
                            border-color: #ffffff;
                        }
                    }
                }
                .swiper-pagination {
                    bottom:10px;
                    display: flex;
                    justify-content: center;
                    .swiper-pagination-bullet {
                        width: 3px;
                        height: 3px;
                        background: rgba(255, 255, 255, 0.5);
                    }
                    .swiper-pagination-bullet-active {
                        background: #ffffff;
                    }
                }
            }
            video{
                width:100%;
                height:100%;
            }
            video::-webkit-media-controls-fullscreen-button {
                // display: none;
            }
            .center-box {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
                width: initial;
                height: initial;
                max-width: 100%;
                max-height: 100%;
            }
            .nft-work{
                width: 100%;
                height: 100%;
                display: block;
                position: relative;
                background: linear-gradient(180deg, #FFFFFF 0%, #E9E9E9 100%);
                >img{
                    width: 42.592593%;
                    height: auto;
                    position: absolute;
                    z-index: 1;
                    left:9.259259%;
                    top:10.37037%;
                }
                >span{
                    display: block;
                    font-size: 14px;
                    line-height: 22.4px;
                    font-style: normal;
                    position: absolute;
                    z-index: 1;
                    left:9.259259%;
                    bottom:5%;
                    &::before{
                        content: "Contract Address:";
                        display: block;
                        font-size: 10px;
                        line-height: 16px;
                        font-weight: 700;
                    }
                }
            }
        }
        .content {
            padding: 16px 18px 0;
            .title {
                font-style: normal;
                font-weight: 800;
                font-size: 20px;
                line-height: 24px;
                text-transform: capitalize;
                color: #000000;
                width: 100%;
            }
            .info {
                margin-top: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                > * {
                    flex-shrink: 0;
                    flex: none;
                    order: 1;
                    flex-grow: 0;
                }
                .left {
                    display: flex;
                    align-items: center;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 21px;
                    color: #000000;
                    mix-blend-mode: normal;
                    span {
                        width: 162px;
                        overflow: hidden; /*超出部分隐藏*/
                        text-overflow: ellipsis; /* 超出部分显示省略号 */
                        white-space: nowrap; /*规定段落中的文本不进行换行 */
                    }
                    i {
                        margin-right: 8px;
                        display: inline-block;
                        width: 28px;
                        height: 28px;
                        flex: none;
                        order: 0;
                        flex-grow: 0;
                        background-color: #eeeeee;
                        border-radius: 50%;
                        overflow: hidden;
                        img {
                            /* width: 100%;
                            height: 100%; */
                            width: initial;
                            height: initial;
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                }
                .icon {
                    color: #000000;
                    font-size: 22px;
                    display: block;
                    cursor: pointer;
                    &:hover {
                        opacity: 0.3;
                    }
                }
            }
            .num {
                margin: 18px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-style: normal;
                font-weight: 400;
                font-size: 15px;
                line-height: 18px;
                color: #5d5d5b;
                > * {
                    flex-shrink: 0;
                }
                span {
                    color: #000000;
                }
            }
        }
        &:hover {
            .delete-icon {
                &.show {
                    display: block;
                }
            }
        }
    }
}

/** default style -----END----- **/
@media only screen and (min-width: 2001px) {
    // xxxl
    .works-box {
        width: 1494px;
    }
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
}
@media only screen and (max-width: 1200px) {
    // lg
    .works-box {
        width: 100vw;
        padding: 0 0.8333333vw;
        .works-box-swiper {
            width: 22.5vw;
            height: 30.833333vw;
            margin-left: 1.6666666vw;
            margin-bottom: 3.1666666vw;
            border-radius: 1.44vw;
            .swiper-wrapper {
                height: 22.5vw;
                border-radius: 1.44vw 1.44vw 0px 0px;
            }
            .content {
                padding: 1.333333vw 1.5vw 0;
                .title {
                    font-size: 1.6666666vw;
                    line-height: 2vw;
                }
                .info {
                    margin-top: 1.25vw;
                    .left {
                        font-size: 1.25vw;
                        line-height: 1.75vw;
                        i {
                            margin-right: 0.6666666vw;
                            width: 2.3333333vw;
                            height: 2.3333333vw;
                        }
                        span {
                            width: 13.5vw;
                        }
                    }
                    .icon {
                        font-size: 1.8333333vw;
                    }
                }
                .num {
                    margin: 1vw 0 0;
                    font-size: 1.25vw;
                    line-height: 1.5vw;
                }
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .works-box {
        margin: 4.1666666vw auto 0;
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .works-box {
        width: 100vw;
        padding: 0 1.5625vw;
        .works-box-swiper {
            width: 29.8177083vw;
            margin-left: 1.953125vw;
            height: 40.861304vw;
            .swiper-wrapper {
                height: 29.8177083vw;
            }
            .content {
                .title {
                    font-size: 2.60416vw;
                    line-height: 3.125vw;
                }
                .info {
                    margin-top: 1.3020833vw;
                    .left {
                        font-size: 1.953125vw;
                        i {
                            width: 3.6458333vw;
                            height: 3.6458333vw;
                        }
                        span {
                            width: 17vw;
                        }
                    }
                    .icon {
                        font-size: 2.8645833vw;
                    }
                }
                .num {
                    margin: 1.5625 0 0;
                    font-size: 1.953125vw;
                    line-height: 2.34375vw;
                }
            }
            .delete-icon {
                width: 3.90625vw;
                height: 3.90625vw;
                right: 1.3020833vw;
                top: 1.3020833vw;
                &.show {
                    display: block;
                }
            }
        }
    }
}
@function newVw($pxNum) {
    @return calc($pxNum / 3.75) * 1vw;
}
@media only screen and (max-width: 600px) {
    // xs

    .works-box {
        margin-top: 7.5vw;
        padding: 0 0.5vw;
        .works-box-swiper {
            margin-left: newVw(15);
            width: newVw(162);
            height: newVw(235);
            overflow: hidden;
            .swiper-wrapper {
                height: newVw(162);
                :deep(.swiper-pagination) {
                    .swiper-pagination-bullet {
                        width: newVw(1.8);
                        height: newVw(1.8);
                    }
                }
            }
            .delete-icon {
                width: newVw(16);
                height: newVw(16);
                right: newVw(7);
                top: newVw(7);
                /* &.show {
                    display: block;
                } */
            }
            .content {
                padding: newVw(13) newVw(8) 0;
                .title {
                    font-size: newVw(15);
                    line-height: 120%;
                }
                .info {
                    margin-top: newVw(11);
                    .left {
                        font-size: newVw(12);
                        line-height: newVw(12.6);
                        i {
                            width: newVw(16.8);
                            height: newVw(16.8);
                        }
                        span {
                            width: newVw(100);
                        }
                    }
                    .icon {
                        font-size: newVw(13.44);
                    }
                }
                .num {
                    margin-top: newVw(9.2);
                    font-size: newVw(12);
                    line-height: newVw(11);
                }
            }
        }
    }
}
</style>
