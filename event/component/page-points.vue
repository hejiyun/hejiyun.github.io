<template>
    <div class="page points-box" id="top-points">
        <div class="header-content">
            <div class="title">Points Ranking</div>
            <div class="text">Congratulations to the most discerning top 10 users for getting HeartX OG Connoisseur Role in Discord!</div>
        </div>
        <div class="toplist-box" v-if="pointList.length">
            <div class="list-left-box">
                <div class="list-top-box" v-for="(item,index) in pointList.slice(0,3)" :key="'key-'+index" :class="`list-box-${index+1}`">
                    <div class="crown-box">
                        <div :class="['crown-icon','crown-icon-'+(index+1)]"></div>
                        <div class="photo-box">
                            <img :src="imgResize(item.headimg,115,115,true,true)" alt="">
                        </div>
                    </div>
                    <div class="heart-box">
                        <div class="heart-top">
                            <img class="hb" src="../assets/HBP.png" alt="">
                            <div class="percent">{{item.point}}</div>
                        </div>
                        <div class="creator-name"><span>{{item.nickname}}</span></div>
                    </div>
                </div>
            </div>
            <!-- TOP3+ -->
            <div class="list-right-box">
                <div class="list-item" v-for="(item,k) in pointList.slice(3)" :key="'key-'+k">
                    <div class="rank-box">
                        <div class="rank">{{item.rank}}</div>
                        <div class="photo-box">
                            <img :src="imgResize(item.headimg,60,60,true,true)" alt="">
                        </div>
                        <div class="heart-box heart-box-2">
                            <div class="creator-name"><span>{{item.nickname}}</span></div>
                        </div>
                    </div>
                    <div class="heart-top">
                        <img class="hb" src="../assets/HBP.png" alt="">
                        <div class="percent">{{item.point}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, toRefs, onMounted, onBeforeMount, watch, nextTick} from 'vue'
import {imgResize} from "../../utils/imgResize.js"
import {POST} from "../../utils/api.js"
import {storeToRefs} from "pinia"


const isDefaultHead = (url)=>{
    return /\/userpost\/face\/1\/face_(man|women|unknown)\.png/.test(url);
}

let state = reactive({
    pointList: [],
})
let {pointList} = toRefs(state);


onMounted(()=> {
    pointTop();
});

/* Points Ranking*/
const pointTop = ()=>{
    POST(`${window.api.eapi}/event/2023/vote2earn/point_top`,{}).then((res)=>{
        if(~~res.ret_code === 0) {
            state.pointList = res.data.list || [];
        } else {
            window.toast(res.msg);
        }
    }).catch(err=>{
        window.toast(err.msg);
    })
}

</script>

<style lang="scss" scoped>
.page {
    color: #ffffff;
    // height: 800rem;
    // height: 100vh;
    // min-height: 1080rem;
    .header-content {
        padding-top: 60rem;
        margin-top: 106rem;
        .title {
            font-weight: 900;
            font-size: 68rem;
            font-style: italic;
            line-height: 120%;
            text-align: center;
        }
        .text {
            font-style: normal;
            font-weight: 400;
            font-size: 18rem;
            line-height: 160%;
            text-align: center;
            color: rgba(255, 255, 255, 0.75);
        }
    }
    .toplist-box {
        margin: 66rem auto 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 1090rem;
        // width: 1020rem;
        // width: 1400rem;
        // height: 708rem;
        // border: 1px solid #FECA84;
        // >div {
        //     flex: 1;
        // }
        .heart-top {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .hb {
                margin-left: 1rem;
                width: 36rem;
                height: 36rem;
            }
            .percent {
                margin-left: 12rem;
                width: 95rem;
                height: 27rem;
                font-weight: 700;
                font-size: 30rem;
                line-height: 27rem;
                text-transform: uppercase;
                flex-grow: 0;
            }
        }
        .heart-box {
            width: 249rem;
            &.heart-box-2 {
                width: 246rem;
                .creator-name {
                    margin-top: 0;
                }
            }
            .creator-name {
                margin-top: 15rem;
                span {
                    width: 249rem;
                    display: inline-block;
                    font-weight: 500;
                    font-size: 18rem;
                    line-height: 120%;
                    color: #ffffff;
                    // text-transform: uppercase;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    vertical-align: middle;
                    color: rgba(255, 255, 255, 0.75);
                }
            }
        }
        .list-left-box {
            .list-top-box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                // width: 364rem;
                min-height: 180rem;
                &.list-box-2 {
                    margin: 10rem 0;
                }
                .crown-box {
                    margin: 0 26rem 0 0;
                    width: 115rem;
                    .crown-icon {
                        margin: 0 auto;
                        width: 58rem;
                        height: 53rem;
                        &.crown-icon-1 {
                            background: url('../assets/icon-crown-1.png') no-repeat center center / cover;
                        }
                        &.crown-icon-2 {
                            background: url('../assets/icon-crown-2.png') no-repeat center center / cover;
                        }
                        &.crown-icon-3 {
                            background: url('../assets/icon-crown-3.png') no-repeat center center / cover;
                        }
                    }
                    .photo-box {
                        position: relative;
                        margin: 11rem 0 26rem 0;
                        width: 115rem;
                        height: 115rem;
                        border-radius: 100rem;
                        >img {
                            width: 115rem;
                            height: 115rem;
                            display: block;
                            border-radius: 100rem;
                        }
                    }
                }
                .heart-box {
                    margin-top: 40rem;
                }
            }
        }
        .list-right-box {
            margin-top: 30rem;
            // width: 563rem;
            width: 633rem;
            .list-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 23rem;
                // height: 60rem;
                // &:first-child {
                //     margin-top: 0;
                // }
                .rank-box {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .photo-box {
                        position: relative;
                        margin: 0 18rem 0 22rem;
                        width: 60rem;
                        height: 60rem;
                        border-radius: 100rem;
                        >img {
                            width: 60rem;
                            height: 60rem;
                            display: inline-block;
                            border-radius: 100rem;
                        }
                    }
                    .rank {
                        width: 21rem;
                        font-style: normal;
                        font-weight: 700;
                        font-size: 18rem;
                        line-height: 24rem;
                        text-align: center;
                        color: rgba(255, 255, 255, 0.5);
                    }
                }
                .heart-top {
                    margin-right: 70rem;
                }
            }
        }
    }
}
@media only screen and (min-width: 2001px) {

}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1920px) {
    
}
@media only screen and (max-width: 1600px) {
    // xl
    .points-box {
        .toplist-box {
            margin-top: 20rem;
            .list-left-box {
                .list-top-box {
                    // min-height: 170rem;
                    &.list-box-2 {
                        margin: 0;
                    }
                    .crown-box {
                        width: 110rem;
                        .crown-icon {
                            width: 53rem;
                            height: 49rem;
                        }
                        .photo-box {
                            margin: 0;
                            width: 110rem;
                            height: 110rem;
                            img {
                                width: 110rem;
                                height: 110rem;
                            }
                        }
                    }
                    .heart-box {
                        .creator-name {
                            margin-top: 10rem;
                        } 
                    }
                }
            }
            .list-right-box {
                margin-top: 0;
                .list-item {
                    // margin-top: 12rem;
                    margin-top: 15rem;
                    .rank-box {
                        .photo-box {
                            margin: 0 15rem 0 20rem;
                            >img {
                                width: 55rem;
                                height: 55rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 1200px) {
    // lg
    
}
@media only screen and (max-width: 1024px) {
    // md
    
}

</style>