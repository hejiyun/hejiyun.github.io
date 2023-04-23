<template>
    <span class="load-line"></span>

    <div class="fly-works" v-if="users">
        <div class="fly-row" v-for="i in 2" :key="i">
            <div class="fly-item" :ref="setFlyDoms">
                <ul>
                    <template v-for="n in 2" :key="n">
                        <li v-for="(item,key) in users.slice((i-1)*10,i*10)" :key="key">
                            <div :class="['anchor-img',{noimg:!item.headimg},'work-'+((i-1)*10+key)]">
                                <img :src="imgResize(isDefaultHead(item.headimg)?item.cover:item.headimg,200,200,true,true)">
                            </div>
                            <img src="@/assets/images/explore/star-1.png" class="icon" alt="" v-if="item.u_label*1===1">
                            <img src="@/assets/images/explore/star-2.png" class="icon" alt="" v-else>
                            <div class="name">{{item.u_name || item.pfid}}</div>
                        </li>
                    </template>

                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, nextTick, onUnmounted } from 'vue'
import {imgResize} from "../../../../utils/imgResize.js";
const props = defineProps(['users'])
const flyDoms = reactive([])
const setFlyDoms = (el) => {
    el && flyDoms.push(el)
}
const isDefaultHead = (url)=>{
    return /\/userpost\/face\/1\/face_(man|women|unknown)\.png/.test(url);
}
var flySize = {
        rem2px: 0,
        minTop: 0,
        maxTop: 0,
        item: []
    },
    renderStatus = false
const getFlySize = () => {
    //停止动画回调
    renderStatus && cancelAnimationFrame(renderStatus)
    flySize.rem2px = parseFloat(
        document.querySelector('html').style.fontSize.replace(/[^\d.]/g, '')
    )
    for (let i = 0; i < flyDoms.length; i++) {
        let domSize = flyDoms[i].getBoundingClientRect()
        if (!flySize.item[i]) {
            flySize.item[i] = {
                width: 0,
                movePX: 0
            }
            flySize.item[i].width = domSize.width
        } else {
            let moveRatio = flySize.item[i].movePX / flySize.item[i].width
            flySize.item[i].width = domSize.width
            flySize.item[i].movePX = flySize.item[i].width * moveRatio
        }
        if (i === 0) {
            flySize.minTop = -1 - domSize.height
            flySize.maxTop = window.innerHeight
        }
    }
    setTimeout(() => {
        //执行动画
        flyRun()
    }, 20)
}
var speed = 2 //单位像素
const setFlyItem = () => {
    for (let i = 0; i < flyDoms.length; i++) {
        let _domPos = flyDoms[i].getBoundingClientRect()
        if (flySize.minTop < _domPos.top && _domPos.top < flySize.maxTop) {
            flySize.item[i].movePX += speed
            flySize.item[i].movePX %= flySize.item[i].width / 2
            flyDoms[i].setAttribute(
                'style',
                `transform:translateX(${i % 2 === 0 ? '-' : ''}${
                    (flySize.item[i].movePX / flySize.item[i].width) * 100
                }%)`
            )
        }
    }
}
var preTimer = new Date().getTime()
const flyRun = () => {
    renderStatus && cancelAnimationFrame(renderStatus)
    if (new Date().getTime() - preTimer > 25) {
        preTimer = new Date().getTime()
        setFlyItem()
    }
    renderStatus = requestAnimationFrame(flyRun)
}
var workload = document.createElement('img')
const photoZip = (list) => {
    let readImgIndex = 0,
        urlKey = 'headimg',
        imgSize = 240
    function imageReceived(img, index) {
        let canvas = [
                document.createElement('canvas'),
                document.createElement('canvas')
            ],
            ctx = [canvas[0].getContext('2d'), canvas[1].getContext('2d')]
        canvas[0].width =
            canvas[1].width =
            canvas[0].height =
            canvas[1].height =
                imgSize
        let sx = 0,
            sy = 0,
            sw = img.width,
            sh = img.height
        if (sw > sh) {
            sx = (sw - sh) / 2
            sw = sh
        } else if (sw < sh) {
            sy = (sh - sw) / 2
            sh = sw
        }
        ctx[0].drawImage(img, sx, sy, sw, sh, 0, 0, imgSize, imgSize)
        ctx[1].drawImage(img, sx, sy, sw, sh, 0, 0, imgSize, imgSize)
        let doms = document.querySelectorAll('.work-' + index)
        for (let i = 0; i < doms.length; i++) {
            //写dom
            doms[i].append(canvas[i])
        }
        list[index].loaded = true
    }

    function loaded(e) {
        if (e !== true) {
            imageReceived(workload, readImgIndex)
        }
        readImgIndex++
        readImg()
    }
    workload.addEventListener('load', loaded, false)
    function readImg() {
        if (readImgIndex < list.length) {
            if (list[readImgIndex][urlKey]) {
                workload.setAttribute('src', list[readImgIndex][urlKey])
            } else {
                loaded(true)
            }
        }
    }
    readImg()
}

const windowResize = () => {
    getFlySize()
}
window.addEventListener('resize', windowResize)
onMounted(() => {
    nextTick(() => {
        getFlySize()
        // photoZip(props.users)
    })
})
onUnmounted(() => {
    renderStatus && cancelAnimationFrame(renderStatus)
})
</script>
<style lang="scss" scoped>
.fly-works {
    margin-top: 82px;
    user-select: none;
    -webkit-user-drag: none;
    .fly-row {
        width: 100vw;
        height: 247.93px;
        margin-bottom: 37px;
        overflow: hidden;
        position: relative;
        .fly-item {
            position: absolute;
            top: 0;
            z-index: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            > ul {
                flex-shrink: 0;
                flex-grow: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                > * {
                    flex-shrink: 0;
                    flex-grow: 0;
                }
                > li {
                    flex-shrink: 0;
                    flex-grow: 1;
                    width: 180px;
                    position: relative;
                    margin-left: 57px;
                    .anchor-img {
                        margin: 0 auto;
                        display: block;
                        width: 180px;
                        height: 180px;
                        overflow: hidden;
                        border-radius: 50%;
                        background: rgba(0, 0, 0, 0.2);
                        /* background: #dbdada no-repeat center center / cover; */
                        &.noimg {
                            background: url('@/assets/images/home/logo-x.svg')
                                    no-repeat center center / 41.05% 48.148%,
                                linear-gradient(
                                    259.7deg,
                                    #35c7b8 1.14%,
                                    #f365ac 98.43%
                                );
                        }
                        > :deep(canvas) {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        >img{
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                    }
                    .icon {
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        right: 0;
                        top: 130px;
                    }
                    .name {
                        /* max-width: 163px; */
                        width: 100%;
                        margin-top: 28px;
                        font-style: italic;
                        font-weight: 900;
                        font-size: 30px;
                        height: 40px;
                        line-height: 120%;
                        /* or 36px */
                        text-align: center;
                        text-transform: capitalize;
                        color: #505050;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        &:nth-child(odd) {
            .fly-item {
                left: 0;
            }
        }
        &:nth-child(even) {
            .fly-item {
                right: 0;
            }
        }
    }
}
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
    .fly-works {
        .fly-row {
            height: 230px;
            .fly-item {
                ul > li {
                    margin-left: 50px;
                    width: 160px;
                    .anchor-img {
                        width: 160px;
                        height: 160px;
                    }
                    .icon {
                        width: 41.6666666px;
                        height: 41.6666666px;
                        top: 120px;
                        right: 7px;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 1200px) {
    // lg
    .fly-works {
        .fly-row {
            height: 210px;
            margin-bottom: 32px;
            .fly-item {
                ul > li {
                    margin-left: 46px;
                    width: 140px;
                    .anchor-img {
                        width: 140px;
                        height: 140px;
                    }
                    .icon {
                        width: 38.8888888px;
                        height: 38.8888888px;
                        top: 100px;
                        right: 0;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .fly-works {
        .fly-row {
            height: 190px;
            .fly-item {
                ul > li {
                    margin-left: 36px;
                    width: 120px;
                    .anchor-img {
                        width: 120px;
                        height: 120px;
                    }
                    .icon {
                        width: 33.3333333px;
                        height: 33.3333333px;
                        top: 86px;
                        right: 0;
                    }
                    .name {
                        font-size: 28px;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .fly-works {
        margin-top: 62px;
        .fly-row {
            height: 140px;
            margin-bottom: 26px;
            .fly-item {
                ul > li {
                    margin-left: 28.5px;
                    width: 100px;
                    .anchor-img {
                        width: 100px;
                        height: 100px;
                    }
                    .icon {
                        width: 27.7777777px;
                        height: 27.7777777px;
                        top: 70px;
                        right: 0;
                    }
                    .name {
                        margin-top: 14px;
                        font-size: 18px;
                        height: 21.6px;
                        line-height: 120%;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .fly-works {
        margin-top: 35px;
        .fly-row {
            height: 124px;
            .fly-item {
                ul > li {
                    width: 90px;
                    .anchor-img {
                        width: 90px;
                        height: 90px;
                    }
                    .icon {
                        width: 25px;
                        height: 25px;
                        top: 64px;
                        right: 0;
                    }
                    .name {
                        margin-top: 14px;
                        font-size: 18px;
                        line-height: 120%;
                    }
                }
            }
        }
    }
}
</style>
