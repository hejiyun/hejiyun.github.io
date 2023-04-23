<!-- CREATE by WangXinzhao at 2023/3/7 17:07 -->
<template>
    <div class="event-nav">
        <nav>
            <a class="logo" href="/" target="_bank">
<!--                <logo-svg></logo-svg>-->
                <!-- <img src="/src/assets/images/top-logo-color.png"> -->
            </a>
            <div class="nav-wrap">
                <div class="top-box">
                    <a v-if="eventData&&eventData.curr_date>1" href="#top-rank">Top</a>
                    <!-- <a v-if="eventData&&eventData.event_st>1" class="points" href="#top-points">Points Ranking</a> -->
                    <a v-if="eventData&&eventData.event_st>1" class="points" href="https://docs.google.com/spreadsheets/d/16DmS1B5pkry0iTuc6BgjEwFggTusg8PMWhXaQZU1ZAs/edit#gid=0" target="_blank">Points Ranking</a>
                    <a class="rules" href="#top-rules">Rules</a>
                    <a class="hnx-token" href="https://dexscreener.com/ethereum/0x4B974A821E100600C04c6371F11AdE229E7D8F76" target="_blank">$HNX Token <img src="../assets/HNX.png" alt=""></a>
                </div>
                <div class="wallet-box">
                    <img class="headimg" @click.stop="setUserBoxShow(true)" v-if="userStore.userinfo.pfid" :src="imgResize(userStore.userinfo.headimg,150,150,true, true)" />
                    <a class="wallet-icon" v-else href="javascript:void(0);" @click.stop="onConnect"><wallet></wallet></a>
                    <template v-if="!userStore.userinfo.access_token">
                        <template v-if="isDesktop">
                            <meta-mask v-if="state.desktopWallet==='metamask'" ref="desktopWallet" @connectWallet="connectWalletCallback"></meta-mask>
                            <okx        v-else-if="state.desktopWallet==='okx'" ref="desktopWallet" @connectWallet="connectWalletCallback"></okx>
                        </template>
                        <wallet-list-modal title="Connect Wallet To Earn $HNX !" :canClose="walletListCanClose" class="dark" ref="walletList" @selectWallet="selectWallet"></wallet-list-modal>
                        <!--<wallet-connect ref="wcWallet" v-else @sendLoginStatus="sendLoginStatus" @connectWallet="connectWalletCallback"></wallet-connect>-->
                    </template>
                </div>
                <img 
                v-if="eventData&&eventData.new_reward_st&&userStore.userinfo.access_token" 
                src="../assets/new-rewards.png" alt="" class="new-rewards" 
                ref="setStyle"
                :class="`new-st-${eventData.new_reward_st}`">
            </div>
            <event-user-box v-show="showUserBox" @logout="logout" :isShow="showUserBox" :setUserBoxShow="setUserBoxShow"></event-user-box>
            <i v-show="showUserBox" @click.stop="setUserBoxShow(false)" class="user-box-mask"></i>
        </nav>
    </div>
</template>
<script setup>
import {ref, onMounted, reactive, nextTick, inject} from 'vue'
import LogoSvg from "@/components/logo-svg.vue";
import Wallet from "@/components/icons/wallet.vue";
import {useUserStore,useUserBindStore,useWalletStore} from "@/store/user.js";
import MetaMask from "@/views/components/wallet/metaMask.vue";
import Okx from "@/views/components/wallet/okx.vue";
import WalletListModal from "@/views/components/wallet/wallet-list-modal.vue";
import WalletConnect from "@/views/components/wallet/walletConnect.vue";
import $dialog from "@/views/components/dialog/index.js";
import {imgResize} from "../../utils/imgResize.js";
import EventUserBox from "./event-user-box.vue";

import { storeToRefs } from "pinia"
import {useEvent} from "../store/event.js";

import {POST} from "../../utils/api.js"

const getParam = inject('getParam');

const useEventStore = useEvent();
const {eventData} = storeToRefs(useEventStore);

const emit = defineEmits(['loginCb','loginBefore'])
const logout = () => {
    emit('loginCb', false)
}
const userStore = useUserStore();
const isDesktop = ref(window.device.desktop())

const desktopWallet = ref(null)
const wcWallet = ref(null)
const walletList = ref(null);

const userBindStore = useUserBindStore();
const walletStore = useWalletStore();

var closeDialog=false;

const setStyle = ref();

const showUserBox = ref(false);
const setUserBoxShow = (active) => {
    showUserBox.value = active === 'auto'?!showUserBox.value:active;
    // showUserBox.value = active === 'auto'?!showUserBox.value:(active? enterMainPage () : active );
    
    if(showUserBox.value&&useEventStore.eventData.new_reward_st) dialogCallback(3)
}

const connectWalletCallback=(type,obj)=>{
    switch (type){
        case 2:
            // console.log('取消签名');
            break;
        default:
            if(type===0){

                let timerDelay=0;
                if(isDesktop.value){
                    walletList.value.hide();
                    timerDelay=300
                }
                setTimeout(()=>{
                    userStore.$patch({
                        userinfo:obj
                    });
                    if(closeDialog){
                        closeDialog();
                        closeDialog = false;
                    }
                    userBindStore.getBindinfo();
                    // walletStore.getWalletInfo();
                    emit('loginCb',true)

                    // if(obj.pfid && obj.need_apply===1){
                    //     $dialog({
                    //         type: "warning",
                    //         callBack(loading, closeFn){
                    //             // router.replace('/user/setting')
                    //             closeFn();
                    //         },
                    //     });
                    // }
                },timerDelay)
            }
    }
}

/* 新消息弹出框回调 type=3  */
const dialogCallback = (type)=>{
    POST(`${window.api.eapi}/event/2023/vote2earn/dialog_callback`,
        {client_id: localStorage.getItem("client_id"), type, invite_pfid: getParam('invite_pfid')},
        {
            'USER-PFID': userStore.userinfo.pfid,
            'USER-TOKEN': userStore.userinfo.access_token
        }).then((res)=>{
            if(~~res.ret_code===0){
                let _style='';
                _style = `opacity:0;animation:hideReward 5s;`
                // document.getElementById("setStyle").setAttribute('style',`${_style}`)
                setStyle.value.setAttribute('style',`${_style}`)
                
                /* 回调成功之后隐藏新奖励icon */
                setTimeout(()=> {
                    useEventStore.$patch((state) => {
                        state.eventData.new_reward_st = 0;
                    });
                },500);
            }
        })
    }

const state = reactive({
    menuclose:true,
    navOpacity:'0',
    routes:[],
    desktopWallet:'',
})
const selectWallet = (type) => {
    !!type && (state.desktopWallet="");
    nextTick(()=>{
        state.desktopWallet=type;
        if(type){
            nextTick(()=>{
                onConnect();
            })
        }
    })
}

const onConnect = () => {
    // console.log('logo-before');
    //登陆之前打点
    // emit('loginBefore');
    if(isDesktop.value){
        if(state.desktopWallet===''){
            walletList.value.show()
        }else{
            desktopWallet.value.onConnect()
        }
    }else{
        wcWallet.value.onConnect();
    }
}
const walletListCanClose = ref(true)
onMounted(() => {
})

const openLogin = (canClose=true) => {
    walletListCanClose.value = !!canClose;
    onConnect();
}
defineExpose({
    openLogin
})
</script>
<style lang="scss" scoped>
@keyframes hideReward
{
	0%   {opacity: 1;}
	100% {opacity: 0;}
}

.event-nav{
    position: fixed;
    top:0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.79) 51.04%, rgba(0, 0, 0, 0) 100%);
    nav{
        width: 1400rem;
        height: 90rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        a{
            color: #fff;
            text-decoration: none;
        }
        .logo{
            // font-size: 28rem;
            width: 130rem;
            height: 33rem;
            background: url("../assets/top-logo.png") no-repeat center center / cover;
            transition: 300ms linear;
            &:hover {
                background: url("../assets/top-logo-color.png") no-repeat center center / cover;
            }
            // img{
            //     height: 1em;
            //     filter: contrast(0) brightness(2);
            //     transition: filter 300ms linear;
            // }
            // &:hover{
            //     img{
            //         filter: contrast(1) brightness(1);
            //     }
            // }
        }
        .nav-wrap {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .top-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                >a {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 22rem;
                    line-height: 160%;
                    text-align: center;
                    &.points {
                        margin-left: 50rem;
                    }
                    &.rules {
                        margin: 0 42rem 0 50rem;
                    }
                    &.hnx-token{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 44rem;

                        img{
                            margin-left: 10rem;
                            width: 30rem;
                            height: 30rem;
                        }
                    }
                }
            }
            .wallet-icon {
                font-size: 35rem;
            }
            .headimg {
                width: 44rem;
                height: 44rem;
                cursor: pointer;
                border-radius: 50%;
            }
            .new-rewards {
                position: absolute;
                top: 63rem;
                right: 44rem;
                width: 219rem;
                height: 50rem;
                transition: all .4s ease-out;
            }
        }
        
    }
}
</style>
