<!-- CREATE by WangXinzhao at 2022/11/28 12:26 -->
<template>
    <span class="load-line"></span>
    <div class="fly-works">
        <div class="fly-row" v-for="i in 4" :key="i">
            <div class="fly-item" :ref="setFlyDoms">
                <ul>
                    <template v-for="m in 2">
                        <li v-for="(item,key) in users.slice((i-1)*5,i*5)" :key="key">
                            <i :class="[{noimg:!item.cover,loading:item.cover && item.loaded!==true},'work-'+((i-1)*5+key)]">
                                <img :src="imgResize(item.cover,200,200,true,true)">
                            </i>
                            <div class="detail">
                                <dl>
                                    <dt>{{item.u_name}}</dt>
                                    <dd>
                                        <div>{{item.w_name}}</div>
                                        <p>{{item.count}} works have been uploaded</p>
                                    </dd>
                                </dl>
                            </div>
                            <s></s>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'
import {imgResize} from "../../../../utils/imgResize.js";
const props = defineProps(['users'])
const flyDoms = reactive([])
const setFlyDoms = (el) => {
    el && flyDoms.push(el)
}
var flySize = {
        minTop: 0,
        maxTop: 0,
        item: []
    },
    renderStatus = false

const getFlySize = () => {
    //停止动画回调
    renderStatus && cancelAnimationFrame(renderStatus)
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
        urlKey = 'cover',
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
/** default style ----START---- **/
.fly-works {
    margin-top: 165px;
    user-select: none;
    -webkit-user-drag: none;
    .fly-row {
        width: 100%;
        height: 81px;
        margin-top: 33px;
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
                > li {
                    flex-shrink: 0;
                    flex-grow: 1;
                    padding: 0 11px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 545px;
                    > * {
                        flex-shrink: 0;
                        flex-grow: 0;
                        margin: 0 0 0 22px;
                        height: 81px;
                    }
                    > i {
                        margin: 0;
                        display: block;
                        width: 81px;
                        overflow: hidden;
                        border-radius: 7px;
                        background: rgba(0, 0, 0, 0.2) no-repeat center center /
                            cover;
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
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    > .detail {
                        width: 420px;
                        background: linear-gradient(
                            268.26deg,
                            #3bdecd 0%,
                            #f365ac 101.9%
                        );
                        border-radius: 41px;
                        padding: 2px;
                        overflow: hidden;
                        > dl {
                            background: #fff;
                            border-radius: 41px;
                            height: 77px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            > dt {
                                flex-grow: 0;
                                flex-shrink: 1;
                                padding-right: 5px;
                                max-width: 171px;
                                margin: 0 22px 0 35px;
                                font-style: italic;
                                font-weight: 900;
                                font-size: 34px;
                                line-height: 120%;
                                text-transform: capitalize;
                                color: #505050;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            > dd {
                                flex-grow: 1;
                                flex-shrink: 1;
                                width: 175px;
                                margin-right: 30px;
                                > div {
                                    font-weight: 700;
                                    font-size: 15px;
                                    line-height: 120%;
                                    text-transform: capitalize;
                                    color: #505050;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                                > p {
                                    margin-top: 5px;
                                    font-weight: 400;
                                    font-size: 12px;
                                    line-height: 120%;
                                    white-space: nowrap;
                                    color: rgba(0, 0, 0, 0.45);
                                }
                            }
                        }
                    }
                    &:nth-child(5n + 2),
                    &:nth-child(5n) {
                        width: 739px;
                        > s {
                            border-radius: 54px;
                            width: 172px;
                            background: url('@/assets/images/home/arrow.svg')
                                    no-repeat center center / 72% auto,
                                linear-gradient(
                                    259.7deg,
                                    #35c7b8 1.14%,
                                    #f365ac 98.43%
                                );
                        }
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
        &:first-child {
            margin-top: 0;
        }
    }
}
/** default style -----END----- **/
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
}
@media only screen and (max-width: 1200px) {
    // lg
    .fly-works {
        margin-top: 110px;
        .fly-row {
            height: 64px;
            margin-top: 31px;
            .fly-item {
                > ul {
                    > li {
                        padding: 0 11px;
                        width: 446px;
                        > * {
                            margin: 0 0 0 22px;
                            height: 64px;
                        }
                        > i {
                            width: 64px;
                            border-radius: 7px;
                        }
                        > .detail {
                            width: 340px;
                            border-radius: 41px;
                            padding: 2px;
                            > dl {
                                border-radius: 41px;
                                height: 60px;
                                > dt {
                                    padding-right: 5px;
                                    max-width: 170px;
                                    margin: 0 22px 0 35px;
                                    font-size: 28px;
                                }
                                > dd {
                                    width: 175px;
                                    margin-right: 28px;
                                    > div {
                                        font-size: 14px;
                                    }
                                    > p {
                                        margin-top: 5px;
                                        font-size: 12px;
                                    }
                                }
                            }
                        }
                        &:nth-child(5n + 2),
                        &:nth-child(5n) {
                            width: 607px;
                            > s {
                                border-radius: 54px;
                                width: 140px;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .fly-works {
        margin-top: 100px;
        .fly-row {
            height: 60px;
            margin-top: 30px;
            .fly-item {
                > ul {
                    > li {
                        padding: 0 11px;
                        width: 426px;
                        > * {
                            margin: 0 0 0 22px;
                            height: 60px;
                        }
                        > i {
                            width: 60px;
                            border-radius: 7px;
                        }
                        > .detail {
                            width: 322px;
                            border-radius: 41px;
                            padding: 1px;
                            > dl {
                                border-radius: 41px;
                                height: 58px;
                                > dt {
                                    padding-right: 4px;
                                    max-width: 171px;
                                    margin: 0 20px 0 30px;
                                    font-size: 26px;
                                }
                                > dd {
                                    width: 158px;
                                    margin-right: 30px;
                                    > div {
                                        font-size: 13px;
                                    }
                                    > p {
                                        margin-top: 4px;
                                        font-size: 12px;
                                    }
                                }
                            }
                        }
                        &:nth-child(5n + 2),
                        &:nth-child(5n) {
                            width: 579px;
                            > s {
                                border-radius: 30px;
                                width: 132px;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .fly-works {
        margin-top: 84px;
        .fly-row {
            height: 56px;
            margin-top: 30px;
            .fly-item {
                > ul {
                    > li {
                        padding: 0 10px;
                        width: 392px;
                        > * {
                            margin: 0 0 0 20px;
                            height: 56px;
                        }
                        > i {
                            width: 56px;
                            border-radius: 7px;
                        }
                        > .detail {
                            width: 296px;
                            border-radius: 41px;
                            padding: 1px;
                            > dl {
                                border-radius: 41px;
                                height: 54px;
                                > dt {
                                    padding-right: 5px;
                                    max-width: 171px;
                                    margin: 0 15px 0 24px;
                                    font-size: 24px;
                                }
                                > dd {
                                    width: 146px;
                                    margin-right: 30px;
                                    > div {
                                        font-size: 15px;
                                    }
                                    > p {
                                        margin-top: 3px;
                                        font-size: 12px;
                                    }
                                }
                            }
                        }
                        &:nth-child(5n + 2),
                        &:nth-child(5n) {
                            width: 532px;
                            > s {
                                border-radius: 54px;
                                width: 120px;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs

    .fly-works {
        margin-top: 72px;
        .fly-row {
            height: 54px;
            margin-top: 30px;
            .fly-item {
                > ul {
                    > li {
                        padding: 0 10px;
                        width: 374px;
                        > * {
                            margin: 0 0 0 20px;
                            height: 54px;
                        }
                        > i {
                            width: 54px;
                            border-radius: 7px;
                        }
                        > .detail {
                            width: 280px;
                            border-radius: 41px;
                            padding: 1px;
                            > dl {
                                border-radius: 41px;
                                height: 52px;
                                > dt {
                                    padding-right: 5px;
                                    max-width: 156px;
                                    margin: 0 15px 0 24px;
                                    font-size: 22px;
                                }
                                > dd {
                                    width: 146px;
                                    margin-right: 20px;
                                    > div {
                                        font-size: 12px;
                                    }
                                    > p {
                                        margin-top: 3px;
                                        font-size: 8px;
                                    }
                                }
                            }
                        }
                        &:nth-child(5n + 2),
                        &:nth-child(5n) {
                            width: 509px;
                            > s {
                                border-radius: 54px;
                                width: 115px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
