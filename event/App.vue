<template>
        <event-nav @loginCb="loginCb" @loginBefore="loginBefore" ref="nav"></event-nav>
        <div :class="isBg&&(eventData.event_st>1?'event-app-bg2':'event-app')">
            <page-1 v-if="eventData" @emitGuideSt="emitGuideSt"></page-1>
            <template v-if="isGuideEnd">
                <page-2 ref="getDrawTop" v-if="eventData.curr_date>1"></page-2>
                <page-points v-if="eventData.event_st>1"></page-points>
                <page-3></page-3>
            </template>
            <div class="social-nav">
                <div class="social-box">
                    <a href="https://discord.com/invite/heartx" target="_blank"><discord></discord></a>
                    <a href="https://twitter.com/HeartX_art" target="_blank"><twitter></twitter></a>
                </div>
            </div>
        </div>
        <reminder ref="reminderRef"></reminder>
        <toast></toast>
</template>
<script setup>

import {ref, toRefs, reactive, onMounted, onBeforeMount, onUpdated, onUnmounted,nextTick,provide} from 'vue'
import Page1 from "./component/page1.vue"
import Page2 from "./component/page2.vue"
import Page3 from "./component/page3.vue"
import Page4 from "./component/page404.vue"
import PagePoints from "./component/page-points.vue"
import reminder from "./component/reminder.vue"
import { storeToRefs } from "pinia"

import {POST} from "/utils/api.js";
import {useUserStore,useWalletStore} from "@/store/user.js";
import SocialShare from "./component/social-share.vue";
import {useEvent} from "./store/event.js"
import EventNav from "./component/event-nav.vue";

import Discord from "@/components/icons/discord.vue";
import Twitter from "@/components/icons/twitter.vue";

import {useRankStore} from "./store/topRank.js";
const useTopRank = useRankStore();
// const {dayData} = storeToRefs(useTopRank);

const useEventStore = useEvent()
const userStore = useUserStore();
const walletStore = useWalletStore();
const {eventData} = storeToRefs(useEventStore)


import Toast from "@/views/components/modal/toast.vue";
// const userEventStore = useEvent()
// const _url = ref(location.href.replace(/^http(s)?:\/\//,''));
const _url = ref('www.heartx.art/');

const nav = ref(null)
window.openLogin = (canClose) => {
    nav.value.openLogin(canClose);
}

const getDrawTop = ref();

const reminderRef = ref();
const toReminder = ()=>{
    nextTick(()=>{
        reminderRef.value.show();
    })
}
provide('toReminder', toReminder)

//获取invite_pfid
const getParam = (name) => {
    var reg = new RegExp("[\?\&]+" + name + "=([^?^#^\&]+)");
    try { return decodeURIComponent(window.location.href.match(reg)[1]); } catch (e) { return null; }
}

provide('getParam', getParam)

//ga打点要传的参数
window.gaPram = (clickName='')=>{
    const _prams = {
        "invite_pfid":getParam('invite_pfid'),
        "client_id":localStorage.getItem("client_id"),
        "pfid":userStore.userinfo.pfid,
        "address":userStore.userinfo.walletAddress
    }

    // console.log(clickName,_prams);
    gtag(
        'event',
        clickName,
        _prams
    );
}

const loginBefore = ()=>{
    
}
const loginCb = (action) => {
    //true 登录成功， false 退出登录
    console.log(action?'login':'logout');
    let client_id = localStorage.getItem("client_id")
    if(action){
        window.gaPram('Binding_Wallet');
        POST(`${window.api.eapi}/event/2023/vote2earn/client_bind`,
        {client_id, invite_pfid: getParam('invite_pfid')},
        {
            'USER-PFID': userStore.userinfo.pfid,
            'USER-TOKEN': userStore.userinfo.access_token
        }).then(()=>{
            localStorage.removeItem("client_id");
            walletStore.getWalletInfo(true);
            eventDataLoad('login');
        }).catch((err)=>{
            window.toast(err.msg)
        })
    }else{
        getClientId();
    }
     //登录成功以及退出登录调取榜单top接口
    if(eventData.value.curr_date>1) {getDrawTop.value.getTopList(useTopRank.dayData)}
}


// const show = ref(false);
// const showUserBox = ref(false);

let state = reactive({
    isGuideEnd: false, // 引导页是否结束, true表示引导页已结束，false表示未结束
    isBg:false  //为了渲染完了再加背景的样式（解决safari飞速运行的bug，原因是还没走rem渲染，就走了动画）
})
const {isGuideEnd,isBg} = toRefs(state)
const rootDom = document.querySelector('html');
document.querySelector('body').setAttribute('style','font-size:14px;')
const setRem = () => {
    let w = window.innerWidth,r=1;
    do{
        if(w>1920){r=w/1920;break;}
        if(w<1460){r=w/1460;break;}
        r=1;
    }while (false)
    r = parseFloat(r.toFixed(6))
    rootDom.setAttribute('style',`font-size:${r}px`);
}
onBeforeMount(()=>{
    setRem();
    window.addEventListener('resize',setRem);
});
onMounted(()=>{
    let client_id = localStorage.getItem("client_id")
    if(!client_id||client_id==""){
        getClientId()
    } else {
        eventDataLoad()
    }
    state.isBg = true;
})
onUnmounted(()=>{
    window.removeEventListener('resize',setRem);
})

const getClientId = async ()=>{
    POST(`${window.api.eapi}/event/2023/vote2earn/apply_clientid`,null,{
        'USER-PFID':userStore.userinfo.pfid,
        'USER-TOKEN':userStore.userinfo.access_token
    }).then((rsq)=>{
        localStorage.setItem("client_id", rsq.data.client_id)
        eventDataLoad()
    }).catch(err=>{
        window.toast(err.ret_msg)
    })
}

const eventDataLoad = async (isLogin)=>{
    let client_id = localStorage.getItem("client_id")
    try {
        let data = await POST(`${window.api.eapi}/event/2023/vote2earn`,
        {client_id,invite_pfid: getParam('invite_pfid')},
        {
            'USER-PFID':userStore.userinfo.pfid,
            'USER-TOKEN':userStore.userinfo.access_token
        })

        // data.data.today_share1_st = 0
        // data.data.today_share2_st = 0
        // data.data.works[0].st = 1
        // data.data.works[1].st = 1
        // data.data.works[2].st = 1
        // data.data.top1_dialog_st = 1;
        // data.data.event_st = 2;
        // data.data.dialog_st = 0;

        // data.data.news = [
        //     {
        //         id: 1,
        //         title: "HeartX Whitepaper Launched",
        //         url: "https://finance.yahoo.com/news/heartx-launches-web3-marketplace-community-140201034.html",
        //     },
        //     {
        //         id: 1,
        //         title: "HeartX Whitepaper Launched",
        //         url: "https://finance.yahoo.com/news/heartx-launches-web3-marketplace-community-140201034.html",
        //     },
            
        // ]

        useEventStore.$patch({
            eventData: data&&data.data,
            beat:data&&data.data.today_beat,
        });

        // console.log(data.data.remain_cnt,!data.data.today_share1_st||!data.data.today_share2_st)

        if(!userStore.userinfo.access_token&&data.data.remain_cnt===0){
            window.openLogin(true);
            return false;
        }

        if(isLogin==='login'&&getParam('invite_pfid')&&data.data.remain_cnt===0){
            window.gaPram('Binding_Wallet&&Slip_Finish');
        }

        if(data.data.event_st!==2&&userStore.userinfo.access_token&&data.data.remain_cnt===0&&(!data.data.today_share1_st||!data.data.today_share2_st)){
             toReminder();
             return false;
        }
        


        // if(userStore.userinfo.access_token==""
        //     &&(data&&data.data.today_task_st==1)
        //     &&(data&&data.data.event_st===1)
        // ){// 未登录，并且当天的任务完成了，要弹登录框（只有在活动进行中的时候才会有此判断）
        //     window.openLogin(false)
        // }
    } catch(err){
        window.toast(err.ret_msg)
    }
}

const emitGuideSt = (booblean)=>{
    state.isGuideEnd = booblean
}
</script>
<style lang="scss">
::-webkit-scrollbar{
    width: 0;
    opacity: 0;
}
*{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
html{
    --main-background: #000;
    --main-color: #fff;
    *{
        font-family:"Gilroy",system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    }
}
html, body{
    margin: 0;
    padding: 0;
    color: var(--main-color);
    background:var(--main-background);
    overflow-x: hidden;
    touch-callout:none;
    -webkit-touch-callout:none;
    -ms-touch-callout:none;
    -moz-touch-callout:none;

    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    -moz-user-focus: none;
    -moz-user-select: none;
    scroll-behavior: smooth;
}
body{
    // transition: background-color 300ms linear;
    p{
        padding:0;margin:0;
    }
    &.en-US{
    }
    &.zh-TW{
    }
}
img{
    display: block;
}
ul,li,dl,dt,dd,p,h1,h2,h3,h4,h5{
    list-style: none;
    padding:0;
    margin:0;
}
input{
    outline: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
a,a:hover,a:active,a:visited,a:link,a:focus{
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    outline:none;
    background: none;
    text-decoration: none;
}
#app {
    width: 100%;
    margin:0 auto;
    position: relative;
    z-index: 2;
}
.full-bg{
    position: fixed;
    z-index: 1;
    width:100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background:var(--main-background);
}
.flex{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    >*{
        flex-grow: 0;
        flex-shrink: 0;
    }
}
.space{
    display: block;
}
.center{
    text-align: center;
}
.left{
    text-align: left;
}
.right{
    text-align: right;
}
.justify{
    text-align: justify;
}
/* 悬浮icon discord/twitter */
.social-nav {
    position: fixed;
    bottom: 30rem;
    left: 0;
    z-index: 1000;
    width: 100vw;
    .social-box {
        position: relative;
        margin: 0 auto;
        width: 1400rem;
        height: 35rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        >a{
            font-size: 35rem;
            color: inherit;
            flex-shrink: 1;
            display: block;
            font-weight: 700;
            line-height: 120%;
            text-decoration: none;
            transition: all 200ms;
            text-decoration: none;
            &:last-child{
                margin-left: 50px;
            }
            // &:hover{
            //     color: rgba(255,255,255,.5);
            // }
        }

    }
}

button{
    cursor: pointer;
    display: block;
    // height: 75rem;
    // width: 340rem;
    height: 70rem;
    width: 280rem;
    border-radius: 88rem;
    font-size: 24rem;
    line-height: 120%;
    &.btn-main{
        color: #FFFFFF;
        border:0;
        background: #1A1A1A;
        font-weight: 700;
        transition: background 300ms;
        background: linear-gradient(315deg, #3BDECD 12%, #F365AC 88%);
        border-radius: 50rem;
        font-size: 20rem;
        &:disabled{
            background: #C4C4C4;
        }
    }
    &.btn-cancel{
        color: rgba(0, 0, 0, 0.75);
        border: 2rem solid rgba(219, 219, 219, 0.8);
        background: transparent;
        font-weight: 500;
        &:hover{
            border: 2rem solid rgba(0, 0, 0, 0.7);
        }
    }
    &.btn-empty{
        background:url(./assets/btn-bg.png) no-repeat center center;
        background-size:contain;
        border:none;
        color:#fff;
        font-size: 20rem;
        font-weight: 700;
        &:hover{
            font-weight: 700;
            transition: background 300ms;
            background: linear-gradient(315deg, #3BDECD 12%, #F365AC 88%);
        }
    }
    &.btn-disabled{
        background:url(./assets/btn-bg.png) no-repeat center center;
        background-size:contain;
        border:none;
        color:#fff;
        font-size:20rem;
        font-weight: 700;
        opacity: .5;
    }
}
svg{
    display: block;
}

::selection {
    background: #393939;
    color: #fff !important;
}
::-moz-selection {
    background: #393939;
    color: #fff !important;
}
::-webkit-selection {
    background: #393939;
    color: #fff !important;
}
.required-chart{
    position: relative;
    line-height: inherit;
    font-size: inherit;
    width: 1em;
    &::after{
        line-height: inherit;
        font-size: inherit;
        content: " ";
        display: inline-block;
        width: 0.8em;
    }
    &::before{
        line-height: inherit;
        font-size: inherit;
        position: absolute;
        left:50%;
        transform: translateX(-50%);
        color:#EA415A;
        content: "*";

        font-style: normal;
    }
}





@media (prefers-color-scheme: dark) {
    /*html{
        --main-background: #0d0d0e;
        --main-color: #E8E8E8;
    }*/
}

@media screen and (max-width:768px){
    .ios{
        #walletconnect-wrapper .walletconnect-connect__buttons__wrapper{
            padding:10px 0 0;
            overflow: hidden;
            a:nth-of-type(2){
                display: none;
            }
        }
        #walletconnect-qrcode-text,.walletconnect-search__input{
            display: none;
        }
    }
    #walletconnect-wrapper .walletconnect-connect__buttons__wrapper{
        >p{
            font-size: 14px !important;
        }
    }
    #app {
        min-width: initial;
    }
    button{
        cursor: pointer;
        display: block;
        height: 47px;
        border-radius: 8px;
        font-size: 18px;
        &.btn-main{
            font-size: 18px;
            color: #FFFFFF;
            border:0;
            background: #1A1A1A;
            font-weight: 800;
            line-height: 120%;
        }
        &.btn-cancel{
            font-size: 18px;
            border: 1px solid rgba(219, 219, 219, 0.8);
            &:hover{
                border: 1px solid rgba(0, 0, 0, 0.7);
            }
        }
    }
}
/** default style ----START---- **/
.main-content{
    box-sizing: border-box;
    width: 100%;
    max-width: 2400px;
    padding:0 60px;
}
.main-width{
    box-sizing: border-box;
    width: 100%;
    max-width: 2400px;
}

.main-padding{
    padding:0 60px;
}

.user-box-mask{
    position: fixed;
    z-index: 10001;
    width: 100vw;
    height: 100vh;
    left: 0;
    top:0;
}

/** default style -----END----- **/
@media only screen and (min-width: 2001px) {

}
@media only screen and (max-width: 2000px) {

}
@media only screen and (max-width: 1600px) {
    .main-content{padding:0 40px;}
}
@media only screen and (max-width: 1200px) {
    .main-content{padding:0 20px;}
}
@media only screen and (max-width: 1024px) {
}
@media only screen and (max-width: 768px) {
    .main-content{padding:0 12px;}
}
@media only screen and (max-width: 600px) {
}

@keyframes bg-scrolling-reverse {
  to {
        background-position: calc(539.5rem * 1) calc(519rem * -1);
    }
}
@keyframes bg-scrolling-reverse2 {
  to {
        background-position: calc(650rem * 1) calc(577rem * -1);
    }
}
.event-app{
    background:url(./assets/bg-icon.png) repeat 0 0;
    background-size: 539.5rem 519rem;
    animation: bg-scrolling-reverse 8s linear infinite;
}
.event-app-bg2{
    background:url(./assets/bg-icon-2.png) repeat 0 0;
    background-size: 650rem 577rem;
    animation: bg-scrolling-reverse2 8s linear infinite;
}

</style>
