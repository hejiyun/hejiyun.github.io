<template>
    <!-- <div class="page page2-box" id="top-rank" v-if="topList.length"> -->
    <div class="page page2-box" id="top-rank">
        <div class="header-content">
            <div class="title">Top</div>
            <div class="text">If you voted "Like" for the <span class="top1">Top 1</span> artwork on the previous day, <br/>you can share the <span class="htx">1,000,000 $HNX</span> with all the winners who voted for the <span class="top1">Top 1</span> artwork.</div>
        </div>
        <div class="select-content" v-if="dateIndex != -1">
            <div :class="['select-btn','select-left',{'cur':dateIndex===0}]" @click.stop="selectEvent(0)"></div>
            <div class="select-val">
                <div>{{formatDate(topicDate[dateIndex].title)}}</div>
                <div>Day {{topicDate[dateIndex].day}}</div>
            </div>
            <div :class="['select-btn', 'select-right',{'cur':((dateIndex+2)<curDate)}]" @click.stop="selectEvent(1)"></div>
        </div>
        <div class="toplist-box">
            <div class="list-content">
            <!-- TOP3 -->
                <div class="list-left-box">
                    <div class="list-top-box" v-for="(item,index) in topList.slice(0,3)" :key="'key-'+index" :class="`list-box-${index+1}`">
                        <div class="crown-box">
                            <div :class="['crown-icon','crown-icon-'+(index+1)]"></div>
                            <!-- <img :src="imgResize(isDefaultHead(item.cover)?item.cover:item.cover,65,65,true,true)"> -->
                            <div class="photo-box" :class="{'cur':item.st}">
                                <img :src="imgResize(item.cover,110,110,true,true)" alt="">
                                <!-- <img src="../assets/img-1.png" alt=""> -->
                                <i class="nbimg" v-if="item.st"></i>
                            </div>
                        </div>
                        <div class="heart-box">
                            <div class="heart-top">
                                <img class="hb" src="../assets/HB.png" alt="">
                                <div class="percent">{{item.heat}}%</div>
                            </div>
                            <div class="works-box">
                                <div class="works-name"><span>{{item.w_name}}</span></div>
                                <div class="creator-name"><span>{{item.creator}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- TOP3+ -->
                <div class="list-right-box">
                    <div class="list-item" v-for="(item,k) in topList.slice(3)" :key="'key-'+k">
                        <div class="rank-box">
                            <div class="rank">{{item.rank}}</div>
                            <!-- <img :src="imgResize(isDefaultHead(item.cover)?item.cover:item.cover,60,60,true,true)"> -->
                            <div class="photo-box" :class="{'cur':item.st}">
                                <img :src="imgResize(item.cover,55,55,true,true)" alt="">
                                <!-- <img src="../assets/img-2.png" alt=""> -->
                                <i class="nbimg" v-if="item.st"></i>
                            </div>
                            <div class="heart-box heart-box-2">
                                <div class="works-box">
                                    <div class="works-name"><span>{{item.w_name}}</span></div>
                                    <div class="creator-name"><span>{{item.creator}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="heart-top">
                            <img class="hb" src="../assets/HB.png" alt="">
                            <div class="percent">{{item.heat}}%</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div v-else class="no-data"></div> -->
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, toRefs, onMounted, onBeforeMount, watch, nextTick} from 'vue'
import {imgResize} from "../../utils/imgResize.js"
import {POST} from "../../utils/api.js"
import {storeToRefs} from "pinia"
import {useRankStore} from "../store/topRank.js"
import {useUserStore} from "@/store/user.js";


const useTopRank = useRankStore();
const {listData} = storeToRefs(useTopRank);
const userStore = useUserStore();

const isDefaultHead = (url)=>{
    return /\/userpost\/face\/1\/face_(man|women|unknown)\.png/.test(url);
}

let state = reactive({
    curDate: 1, //当前日期id
    dateIndex: -1, //左右选择日期id
    topList: [], //list
    topicDate: [], //select日期
    topListData: null, //all toplist
})
let {topicDate,topList,curDate,dateIndex,dateDay} = toRefs(state);


/* 重置 */
// useTopRank.$reset();
// localStorage.removeItem("ax_rank");

onMounted(()=> {
    getTopList(0);
});

/* 转换英文年月日  2023-03-08 ==>15 March*/
const formatDate = (str) => {
    let monthName = new Array("","January","February","March","April","May","June","July","August","September","October","November","December");
    let dateStrs = str.split(" ")[0].split("-");
    let [day,month,year] = [parseInt(dateStrs[2]),parseInt(dateStrs[1]),parseInt(dateStrs[0])];
    return day + " " + monthName[month];
}

/* 向左向右 type 0向左 1向右 */
const selectEvent = (type) => {
    if(!type&&(state.dateIndex===0)){
        return false;
    }
    if(type&&(parseInt(state.dateIndex)>=(state.topicDate.length-1))){
        return false;
    }
    state.dateIndex = type?parseInt(state.dateIndex+1):parseInt(state.dateIndex-1);
    
    // getTopList(state.topicDate[state.dateIndex].day === state.curDate ? 0 : state.topicDate[state.dateIndex].title);
    getTopList(state.topicDate[state.dateIndex].title);
}

const getTopList = (day)=>{
    POST(`${window.api.eapi}/event/2023/vote2earn/top`,
    {day},
    {
        'USER-PFID':userStore.userinfo.pfid,
        'USER-TOKEN':userStore.userinfo.access_token
    }).then((res)=>{
        if(~~res.ret_code === 0) {

            state.topicDate = res.data.filter.topicDate || []
            state.curDate = res.data.filter.curDate 
            state.topList = res.data.list || []

            useTopRank.$patch({
                dayData: day ? day: state.topicDate[state.curDate-2].title
            })

            nextTick(()=>{
                if (state.dateIndex === -1) {
                    // state.dateIndex = (state.topicDate).findIndex((item)=>{return item.id===state.curDate});/* 当前日期curDate=topicDate里面的某一天 */
                    state.dateIndex = state.curDate-1;
                    selectEvent(0);
                }
            })
        } else {
            window.toast(res.msg);
        }
    }).catch(err=>{
        window.toast(err.msg);
    })
}

defineExpose({getTopList})
</script>

<style lang="scss" scoped>
.page {
    // font-family: 'Gilroy','Microsoft YaHei',"WenQuanYi Micro Hei",'PingFang TC','PingFang HK', sans-serif;
    color: #ffffff;
    // height: 888rem;
    // height: 100vh;
    // min-height: 1080rem;
    .header-content {
        padding-top: 60rem;
        .title {
            margin: 10rem auto;
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
            span {
                font-style: italic;
                font-weight: 700;
                &.top1 {
                    color: #ffffff;
                }
                &.htx {
                    background: linear-gradient(90deg, #F365AC 0%, #3BDECD 90%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
            }
        }
    }
    .select-content {
        margin: 34rem auto;
        padding: 8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 265rem;
        height: 60rem;
        border: 1rem solid transparent;
        border-radius: 50rem;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to right, #000, #000), linear-gradient(90deg, #F365AC, #3BDECD);
        .select-val {
            >div {
                font-style: normal;
                font-weight: 700;
                font-size: 18rem;
                line-height: 120%;
                text-align: center;
                &:nth-child(2) {
                    font-weight: normal;
                }
            }
        }
        .select-btn {
            width: 11rem;
            height: 16rem;
            cursor: pointer;
            &.select-left {
                margin-left: 7.85rem;
                background: url("../assets/arrow-left.png") no-repeat center center / cover;
                &.cur {
                    visibility: hidden
                }
            }
            &.select-right {
                margin-right: 7.85rem;
                background: url("../assets/arrow-right.png") no-repeat center center / cover;
                visibility: hidden;
                &.cur {
                    visibility: inherit;
                }
            }
        }
    }
    // .toplist-box {
    //     width: 100vw;
    // }
    .list-content {
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        // width: 1020rem;
        width: 1090rem;
        // width: 1400rem;
        // height: 708rem;
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
                margin-left: 11.88rem;
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
            // width: 350rem;
            &.heart-box-2 {
                width: 246rem;
            }
            .works-name {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-weight: 700;
                font-size: 18rem;
                line-height: 120%;
                span {
                    display: inline-block;
                    &:nth-child(1) {
                        // max-width: 190rem;
                        // min-width: 30rem;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    &:nth-child(2) {
                        margin-left: 3rem;
                    }
                }
            }
            .creator-name {
                margin-top: 6rem;
                span {
                    width: 180rem;
                    display: inline-block;
                    font-weight: 500;
                    font-size: 14rem;
                    line-height: 120%;
                    color: #ffffff;
                    // text-transform: uppercase;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    vertical-align: middle;
                    color: rgba(255, 255, 255, 0.7);
                }
            }
        }
        .list-left-box {
            .list-top-box {
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                // width: 364rem;
                min-height: 180rem;
                &.list-box-2 {
                    margin: 20rem 0;
                }
                .crown-box {
                    margin: 0 23rem 5rem 0;
                    width: 125rem;
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
                        width: 125rem;
                        height: 125rem;
                        border-radius: 12rem;
                        &.cur {
                            border: 4rem solid #FF00A0;
                            box-shadow: 0 0 20rem 1rem rgb(255 0 160 / 64%);
                        }
                        >img {
                            position:absolute;
                            top:0;
                            left:0;
                            right:0;
                            bottom:0;
                            margin:auto;
                            width: 109rem;
                            height: 109rem;
                            display: block;
                            border-radius: 9rem;
                        }
                        .nbimg {
                            position: absolute;
                            top: -25%;
                            right: -22%;
                            width: 55rem;
                            height: 55rem;
                            background: url("../assets/hb1.png") no-repeat center center / cover;
                        }
                    }
                }
                .heart-box {
                    .works-box {
                        margin: 20rem 0 15rem;
                    }
                }
            }
        }
        .list-right-box {
            // width: 563rem;
            width: 633rem;
            .list-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 23rem;
                height: 60rem;
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
                        width: 65rem;
                        height: 65rem;
                        border-radius: 12rem;
                        &.cur {
                            border: 3rem solid #FF00A0;
                            box-shadow: 0 0 18rem 1rem rgb(255 0 160 / 64%);
                        }
                        >img {
                            position:absolute;
                            top:0;
                            left:0;
                            right:0;
                            bottom:0;
                            margin:auto;
                            width: 53rem;
                            height: 53rem;
                            display: inline-block;
                            border-radius: 9rem;
                            // margin: 0 18rem 0 22rem;
                        }
                        .nbimg {
                            position: absolute;
                            top: -32%;
                            right: -29%;
                            width: 38rem;
                            height: 38rem;
                            background: url("../assets/hb2.png") no-repeat center center / cover;
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
                    // img {
                    //     margin: 0 18rem 0 22rem;
                    //     width: 60rem;
                    //     height: 60rem;
                    //     display: inline-block;
                    //     border-radius: 9rem;
                    // }
                }
                .heart-top {
                    margin-right: 70rem;
                }
            }
        }
    }
    .no-data {
        margin: 297rem auto 426rem;
        width: 595rem;
        height: 75rem;
        background: url("../assets/no-data.png") no-repeat center center / cover;
        // transition: all .4s ease-out;
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
    .page {
        .header-content {
            .title {
                margin: 0 auto;
            }
        }
        .select-content {
            margin: 10rem auto;
        }
        .toplist-box {
            // height: 610rem;
            // overflow-y: scroll;
            ::-webkit-scrollbar {
                width: 2rem;
                height: 2rem;
            }
            ::-webkit-scrollbar-thumb {
                background: rgba(219, 219, 219, 0.8);
                border-radius: 30rem;
            }
            ::-webkit-scrollbar-track {
                background: #868686;
                border-radius: 30rem;
            }
            ::-webkit-scrollbar-button{
                width: 2rem;        
                height: 60rem;        
            }
            .list-content {
                // height: 610rem;
                height: 470rem;
                // height: 400rem;
                overflow-y: scroll;
                .list-left-box {
                    .list-top-box {
                        min-height: 165rem;
                        &.list-box-2 {
                            margin: 0;
                        }
                        .crown-box {
                            margin: 0 23rem 0 0;
                            width: 110rem;
                            .crown-icon {
                                width: 53rem;
                                height: 49rem;
                            }
                            .photo-box {
                                margin: 0;
                                width: 110rem;
                                height: 110rem;
                                // &.cur {
                                //     border: 4rem solid #FF00A0;
                                //     box-shadow: 0 0 15rem 1rem rgb(255 0 160 / 64%);
                                // }
                                img {
                                    width: 95rem;
                                    height: 95rem;
                                }
                                .nbimg {
                                    width: 50rem;
                                    height: 50rem;
                                }
                            }
                        }
                        .heart-box {
                            .works-box {
                                margin: 10rem 0 10rem;
                                .creator-name {
                                    margin-top: 3rem;
                                }
                            }
                        }
                    }
                }
                .list-right-box {
                    .list-item {
                        margin-top: 11rem;
                        .rank-box {
                            .photo-box {
                                margin: 0 15rem 0 20rem;
                                width: 60rem;
                                height: 60rem;
                                border-radius: 10rem;
                                &.cur {
                                    border: 3rem solid #FF00A0;
                                    box-shadow: 0 0 15rem 1rem rgb(255 0 160 / 64%);
                                }
                                >img {
                                    width: 49rem;
                                    height: 49rem;
                                    border-radius: 8rem;
                                }
                                .nbimg {
                                    width: 35rem;
                                    height: 35rem;
                                }
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