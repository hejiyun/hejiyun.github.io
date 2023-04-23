<template>
    <div class="page page1">
        <transition name="fade">
            <!-- 引言页，每天显示一次，活动结束不显示 -->
            <div class="guide-con" v-if="isGuide&&eventData.event_st!=2">
                <div>
                    <img class="logo" src="../assets/logo.png" alt="">
                    <div class="title">What is HeartX？</div>
                    <p class="font-info">
                        HeartX is a web3 community of marketplace and social media platform that empowered by artists, collectors, <br>
                        art consultants, and art lovers. By redefining the value of art with our hearts, we hope to create a vibrant community<br>
                        where everyone can come together to share their love of art.
                    </p>
                    <img class="guide-info" src="../assets/guide-info.png" alt="">
                    <div class="btn-area">
                        <div class="guide-btn come-soon" v-if="eventData.event_st===0">Coming Soon</div>
                        <button class="guide-btn btn-empty vote-btn" v-if="eventData.event_st==1" @click="enterMainPage">Vote to Earn NOW!!</button>
                        <!-- <div class="guide-btn come-soon">Coming Soon</div> -->
                    </div>
                </div>
            </div>
        </transition>
        <div class="active-container" :class="{'hb-box':eventData.event_st===1}" v-if="!isGuide">
            <news :setting="newSetting" v-if="eventData.news&&eventData.news.length"></news>
            <template v-if="eventData.event_st===1">
                <section class="times" v-if="eventData.count_down>0" >
                    <countdown :timestamp="eventData.count_down" />
                </section>
                <p class="slide-msg">Vote <i>3 artworks</i> you like & earn <span>50 $HNX</span></p>
                <hb :hbList="hbList"></hb>
                <div class="bottom-font">
                    Share the game later on Twitter to <span>get more votes!</span>
                </div>
            </template>
            <template v-if="eventData.event_st===2">
                <div class="total-box" v-if="eventData.join_st">
                    <picture>
                        <source srcset="../assets/beatcoin.webp" type="image/webp" class="act-over-img" >
                        <source srcset="../assets/active-over-img.png" type="image/jpeg" class="act-over-img" >
                        <img src="../assets/active-over-img.png" alt="" class="act-over-img" >
                    </picture>
                    <div class="beat">
                        <img src="../assets/should.png" class="total" />
                        <span>LOVE or PRICE?</span>
                    </div>
                </div>
                <div v-else class="iphone-box">
                    <div class="stay-tuned">
                        <img src="../assets/should2.png" />
                    </div>
                    <img src="../assets/iphone-img.png" class="iphone-img" />
                    <div class="season2">LOVE<br> or PRICE?</div>
                </div>
                <div class="beat-txt">The event ended. You can download the <span>HeartX App</span> to continue your journey of vote-2-earn.<br>You've earned <span>{{eventData.beat}} $HNX</span> in total.</div>
                <div class="btn-box">
                    <!-- <button v-if="eventData.join_st" :class="walletStore.walletInfo&&walletStore.walletInfo.hnx_orig>0&&!axWalletState?'btn-empty':'btn-disabled'" :disabled="walletStore.walletInfo.hnx_orig>0&&!axWalletState?false:true" @click="claimRewards()">{{walletStore.walletInfo&&walletStore.walletInfo.hnx_orig?'Claim Rewards':'Claimed'}}</button> -->
                    <!-- <button v-if="eventData.join_st" class="btn-disabled">Claim Rewards</button> -->
                    <!-- <button class="btn-empty" @click="download">Download HeartX App</button> -->

                    <button v-if="eventData.join_st" :class="walletStore.walletInfo&&walletStore.walletInfo.hnx_orig>0&&!axWalletState?'btn-empty':'btn-disabled'" :disabled="walletStore.walletInfo.hnx_orig>0&&!axWalletState?false:true" @click="claimRewards()">{{walletStore.walletInfo&&walletStore.walletInfo.hnx_orig?'Claim Rewards':'Claimed'}}</button>
                    <button class="btn-empty btn-ios" @click="download"><a href="https://apps.apple.com/app/heartx/id1662081886" target="_blank"><i></i></a></button>
                    <button class="btn-empty btn-android" @click="download"><a href="https://backend-prod.artx.land/nft/Heartx115.apk" target="_blank"><i></i></a></button>

                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, toRefs, onMounted, nextTick, watch, inject} from 'vue'
import { storeToRefs } from "pinia"
import news from "./news.vue"
import hb from "./hb.vue"
import socialShare from "./social-share.vue"

import countdown from "./count-down.vue"


import $dialog from "./dialog";

import {useUserStore,useWalletStore} from "@/store/user.js";
import {useEvent} from "../store/event.js"

import {POST} from "/utils/api.js";

import { ethers } from "ethers";
// console.log(ethers);

const useEventStore = useEvent()
const userStore = useUserStore();
const walletStore = useWalletStore();
const {eventData,beat} = storeToRefs(useEventStore)

const emit = defineEmits(['emitGuideSt'])

const getParam = inject('getParam');

const newSetting ={
    size:{//最大尺寸
        x:40,
        y:180
    },
    unit:"rem",//size的尺寸单位
    duration:3000,//单个item动画时长,单位ms
    step:999,//两个item 间的时间间隔,单位ms,
    fps:20, // 刷新速度，值越小，视觉效果越好，性能消耗越大，值越大，视觉效果越差，性能消耗越小，单位ms
};

let state = reactive({
    loadingNum: 0,
    isGuide: true, // 是否在引导页，true在引导页，false不在引导页
    hbList: [
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
        new URL('../assets/hb-img.png', import.meta.url).href,
    ],
    axWalletState:false //用于提现的过程中锁定按钮

})
let {loadingNum, isGuide, hbList,axWalletState} = toRefs(state)

//今日引导页已经弹过了
if(useEventStore.eventData.dialog_st){
    state.isGuide = false;
    emit("emitGuideSt", true);
}
//引导页已弹过了，但是top1还没弹过
if(useEventStore.eventData.dialog_st&&useEventStore.eventData.top1_dialog_st){
    $dialog({
        type: "congrats",
        content: "Congrats! You voted for the Top 1<br> artwork yesterday.",
        callBack: (closeFn) => {
            closeFn();
            dialogCallback(2,false);//告诉后端top1已经弹出了，在关闭的时候就调用
        },
    });
}


//活动结束不显示
// const onFinish = (time)=>{
//     emit('eventDataLoad');
// }

// 判断isMobile
const isMobile= ()=>{
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

//点击进入活动
let enterMainPage = ()=>{
    if(isMobile()){ // 如果是手机端，提示用户在pc打开
        window.toast("Please join the game from the webpage on your PC.")
        return false
    }

    const callback = function(res){
        if(res.ret_code=="0"){
            state.isGuide = false
            emit("emitGuideSt", true);

            if(useEventStore.eventData.top1_dialog_st){
                $dialog({
                    type: "congrats",
                    content: "Congrats! You voted for the Top 1<br> artwork yesterday.",
                    callBack: (closeFn) => {
                        closeFn();
                        dialogCallback(2,false);//告诉后端top1已经弹出了，在关闭的时候就调用
                    },
                });
            }
        } else {
            state.isGuide = true
        }
    }

    dialogCallback(1, callback)
    state.isGuide = false

}

const dialogCallback = (type, callback)=>{
    POST(`${window.api.eapi}/event/2023/vote2earn/dialog_callback`,
    {client_id: localStorage.getItem("client_id"), type, invite_pfid: getParam('invite_pfid')},
    {
        'USER-PFID': userStore.userinfo.pfid,
        'USER-TOKEN': userStore.userinfo.access_token
    }).then((rsq)=>{
        callback(rsq)
    }).catch(err=>{
        callback&&callback(err)
    })
}
//下载页面
const download = ()=>{
    window.gaPram('Click_Download');
}
//去提现，交gas费
const claimRewards = ()=>{
    window.gaPram('Click_Claim');
    if(!userStore.userinfo.access_token){return false;}
    if((window.location.href.indexOf('heartx.art') >= 0) && (window.ethereum.isOkxWallet ? window.ethereum.chainId != '0x1' : window.ethereumDUP.chainId != '0x1')){
        // console.log('err,wallet test');
        $dialog({
            type: "failed",
            content: "To claim $HNX, <br>please switch to Ethereum's mainnet."
        });
        return false;        
    }
    createOrder();
    // console.log('调用钱包去交gas费吧');
    //分回来以后去调用首页接口
    // emit('eventDataLoad');
}

//以下是创建订单-》提现
let withdrawObj = {};
const createOrder = () => {
    state.axWalletState = true;
    let url = "";
    // console.log(props.type, "props.typeprops.typeprops.type");
    url = `${window.api.eapi}/art/wallet/gst/withdraw/create`;
    POST(url, {
        wallet_addr:userStore.userinfo.walletAddress,
        from:'web',
        act_id:'1',
        invite_pfid: getParam('invite_pfid')
    },{
        'USER-PFID': userStore.userinfo.pfid,
        'USER-TOKEN': userStore.userinfo.access_token
    }).then((res) => {
        // console.log(res, "res");
        if (~~res.ret_code === 0) {
            withdrawObj = res.data;
            Exchange();
        }else{
            $dialog({
                type: "failed",
                content: res.ret_msg
            });
            state.axWalletState = false;
        }
    })
    .catch((err) => {
        // console.log(err);
        state.axWalletState  = false;
    });
};

const abiArtHNX = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "nonce",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "tag",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes"
            }
        ],
        name: "claimHNX",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
];
let conHNX = window.location.href.indexOf('heartx.art') >= 0  ? "0xA46B3E109b176eCef4f76F173e4170ceA660F454" : "0x1F2Bb1A8D95B0C5Eba2e730675D8cdf88fd11597";
const Exchange = async () => {
    try {
        let nonce = withdrawObj.nonce;
        let wei = ethers.utils.parseEther(withdrawObj.amount);
        let amount = wei.toString(10);
        let tag = withdrawObj.tag;
        let signature = withdrawObj.signature;
        // let mnemonicWallet = await new ethers.Wallet('fbe4d5702d61db27df3b3ac4bf720dd164e74cacfaf9bea500b4dd48a8d86248');
        // let wallet = mnemonicWallet.connect(prov);
       
       
       let provider = new ethers.providers.Web3Provider(window.ethereum.isOkxWallet?window.ethereum: window.ethereumDUP);
        const wallet = provider.getSigner();
        let artx = "";
        let tx = "";
        // console.log(amount, "amountamountamountamount");
        artx = new ethers.Contract(conHNX, abiArtHNX, wallet);
        tx = await artx.claimHNX(nonce, amount, tag, signature);

        ExchangeCallBack(1, tx.hash);
        let bx = await tx.wait();

        // console.log(tx, "txtx");
        // console.log(bx, "bxbx");
        // console.log("Withdrawal succeeded");
        
        // state.axWalletState = false;
        walletStore.getWalletInfo(true);
        
        // emit("showwait", 2);
        // window.client.toast("Withdrawal succeeded");
    } catch (err) {
        // emit("showwait", 1);
        // console.log(err, "errerrerrerr");
        ExchangeCallBack(0);
        state.axWalletState = false;
        //交易失败，请稍后再试
        $dialog({
            type: "failed",
            content: 'Trading failed,<br>please try again.'
        });
        // state.loadingShow = false;
        // walletToast(2); //交易失败，请稍后再试
        // window.client.closeWebview();
    }
};
const ExchangeCallBack = (type, transactionHash) => {
    // state.axwalletObj.isShow = false;
    let url = "";
    url = `${window.api.eapi}/art/wallet/gst/withdraw/callback`;
    POST(url, {
        order_sn: withdrawObj.order_sn,
        wallet_addr: userStore.userinfo.walletAddress,
        tx: transactionHash || "",
        op_type: type,
        invite_pfid: getParam('invite_pfid')
    },{
        'USER-PFID': userStore.userinfo.pfid,
        'USER-TOKEN': userStore.userinfo.access_token
    }).then((res) => {
        // axwallet.value.axClose();
        // state.loadingShow = false;
        // state.axWalletState = false;
        // console.log(res, "resresresres");
    }).catch((err) => {});
};


</script>

<style lang="scss" scoped>
.page1{
    position: relative;
    height: 100vh;
    // min-height: 1080rem;
    

    .fade-enter-active {
        animation: fade 200ms;
    }

    .fade-leave-active {
        animation: fade 200ms reverse;
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    // .fade-leave-to{
    //     opacity: 0;
    // }


    // 引言页，每天显示一次
    .guide-con{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1001;
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100vw;
        height: 100vh;

        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);

        img{
            -webkit-user-drag: none;
            -moz-user-drag: none;
            -ms-user-drag: none;
        }
       

        .logo{
            margin: -20rem auto 0;
            width: 427rem;
        }

        .title{
            margin: 40rem auto 10rem;
            text-align: center;
            font-size: 32px;
        }

        .font-info{
            line-height: 160%;
            text-align: center;
            font-size: 20px;
            color: rgba(255, 255, 255, 0.75);
            // -webkit-user-select: none;
            // -moz-user-select: none;
            // -ms-user-select: none;
            // -khtml-user-select: none;
            // user-select: none;
        }

        .guide-info{
            margin: 0 auto;
            width: 980rem;
        }

        .btn-area{
            margin: 40rem auto 0;
            height: 75rem;

            .guide-btn{
                margin: 0 auto;
            }

            .come-soon{
                cursor: default;
                display: block;
                height: 75rem;
                width: 340rem;
                border-radius: 88rem;
                font-size: 24rem;
                line-height: 75rem;
                background:url(../assets/btn-bg.png) no-repeat center center;
                background-size:contain;
                border:none;
                color:#fff;
                font-size:20rem;
                font-weight: 700;
                text-align: center;
            }
        }

    }
    //活动外面的大盒子
    .active-container{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        height: auto;
        transform: translate(-50%, -50%);
        &.hb-box{
            height: calc(100vh - 120rem);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .times{
            // position: absolute;
            width: 100%;
            // top: 90rem;
            // left: 50%;
            z-index: 100;
            // transform: translateX(-50%);
            text-align: center;
            font-size: 20px;
        }
        .slide-msg{
            // position: absolute;
            // left: 0;
            // top: -70rem;
            // z-index: 10;
            // width: 100%;
            // line-height: 30px;
            margin-bottom: 5rem;
            font-size: 24rem;
            text-align: center;
            color: rgba(255, 255, 255, 0.75);

            i{
                color: rgba(255, 255, 255, 1);
                font-weight: 600;
            }

            span{
                background: linear-gradient(90deg, #F365AC 9.19%, #3BDECD 87.87%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                font-style: italic;
                font-weight: 600;
            }
        }
        .bottom-font{
            // position: absolute;
            // left: 50%;
            // bottom: 48rem;
            // z-index: 1;

            // text-align: center;
            // color: rgba(255, 255, 255, 0.75);
            font-size: 24rem;
            margin-top:10rem;
            text-align: center;
            // transform: translateX(-50%);

            span{
                background: linear-gradient(90deg, #F365AC 9.19%, #3BDECD 87.87%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                font-style: italic;
                font-weight: 600;
            }

        }

        //参加
        .act-over-img{
            width: 470rem;
            height: 458rem;
            margin:0 auto;
        }
        .total-box{
            position: relative;
            .beat{
                position:absolute;
                top:50%;
                margin-top:-62.5rem;
                left:50%;
                transform: translateX(-50%);
                text-align: center;
                .total{
                    width: 1280rem;
                    margin-bottom:40rem;
                }
                >span {
                    background: linear-gradient(90deg, #F365AC 9.19%, #3BDECD 87.87%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    font-style: italic;
                    font-weight: 900;
                    font-size: 70rem;
                    line-height: 70rem;
                    vertical-align: middle;
                    padding:0 5rem;
                    font-size:125rem;
                }
            }
        }
        .btn-box{
            display: flex;
            justify-content: center;
            // width:713rem;
            width:883rem;
            margin:33rem auto 0;
            // :nth-child(2){
            //     margin-left:33rem;
            // }
            .btn-android {
                i {
                    margin: 0 auto;
                    display: block;
                    width: 136rem;
                    height: 41rem;
                    background: url("../assets/android.png") no-repeat center center;
                    background-size:contain;
                    z-index: 1;
                }
            }
            .btn-ios {
                i {
                    margin: 0 auto;
                    display: block;
                    width: 119rem;
                    height: 41rem;
                    background: url("../assets/ios.png") no-repeat center center;
                    background-size:contain;
                }
            }
            :nth-child(2){
                margin: 0 20rem;
            }
            img{
                display: inline-block;
                width:18rem;
                height:18rem;
                margin-left:10rem;
                vertical-align: middle;
            }
        }
        .beat-txt{
            margin-top:40rem;
            text-align: center;
            font-size: 20px;
            line-height: 160%;
            font-weight: 400;
            span{
                font-weight: 800;
            }
        }
        //未参加
        .iphone-box{
            position:relative;
            width:465.8rem;
            height:600.5rem;
            margin:0 auto 48rem;
            >img{
                position: relative;
                width:460rem;
                height:590rem;
                margin:0 auto;
                z-index: 3;
            }
            .stay-tuned{
                position:absolute;
                width: 580rem;
                top:132rem;
                left:-400rem;
                text-align: left;
                z-index: 2;
                font-weight: 400;
                font-size: 20rem;
                img{
                    width:580rem;
                }
            }
            .season2{
                position:absolute;
                width: 583rem;
                bottom:60rem;
                text-align: left;
                z-index: 2;
                right:-440rem;
                background: linear-gradient(90deg, #F365AC 1.83%, #35C7B8 23.88%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                font-style: italic;
                font-weight: 900;
                line-height: 90%;
                vertical-align: middle;
                padding:0 5rem;
                font-size: 100rem;
            }
        }
    }
}
@media only screen and (min-width: 2001px) {
    // .bottom-font{
    //     img{
    //         width: 1326px;
    //     }
    // }
}
@media only screen and (max-width: 2000px) {
    // .bottom-font{
    //     img{
    //         width: 1126px;
    //     }
    // }

}
@media only screen and (max-width: 1920px) {
    // .bottom-font{
    //     img{
    //         width: 826px;
    //     }
    // }
}

@media only screen and (max-width: 1600px) {
    .page1{
        .guide-con{
            .logo{
                margin: 0rem auto 0;
                width: 360rem;
            }

            .title{
                margin: 20rem auto 10rem;
                text-align: center;
                font-size: 30rem;
            }

            .font-info{
                line-height: 150%;
                font-size: 18rem;
            }

            .guide-info{
                margin: 0 auto;
                width: 860rem;
            }

            .btn-area{
                margin: 20rem auto 0;
                .guide-btn{
                    width: 260rem;
                    height: 62rem;
                    font-size: 14rem;
                }

                .come-soon{
                    line-height: 62rem;
                }

                .vote-btn{
                    &:hover{
                        width: 260rem !important;
                        height: 62rem !important;
                        font-size: 14rem !important;
                    }
                }
            }
        }

        .active-container{
            .slide-msg{
                font-size: 22rem;
            }
        }
    
    }

}

@media only screen and (max-width: 1200px) {

}

@media only screen and (max-width: 1024px) {

}

@media only screen and (max-height: 900px) {
    .page1{
        .active-container{
            .act-over-img{
                width:400rem;
                height: auto;
            }
            .total-box{
                .beat{
                    .total{
                        width: 1200rem;
                        margin-bottom:20rem;
                    }
                    >span{
                        font-size: 80rem;
                    }
                }
            }
            .beat-txt{
                margin-top:10rem;
                span{
                    font-weight: 800;
                }
            }
            //未参加
            .iphone-box{
                width:300rem;
                height:385rem;
                margin:0 auto 20rem;
                >img{
                    width:300rem;
                    height:385rem;
                    margin:0 auto;
                    z-index: 3;
                }
                .stay-tuned{
                    width: 380rem;
                    top:50rem;
                    left:-245rem;
                    img{
                        width:380rem;
                    }
                }
                .season2{
                    font-size: 60rem;
                    right:-500rem;
                }
            }
            
        }
    }
}


@media only screen and (max-height: 727px){
    .page1{
        // .guide-con{
        //     .logo{
        //         margin: 0rem auto 0;
        //         width: 420rem;
        //     }

        //     .title{
        //         margin: 20rem auto 10rem;
        //         text-align: center;
        //         font-size: 28rem;
        //     }

        //     .font-info{
        //         line-height: 150%;
        //         font-size: 18rem;
        //     }

        //     .guide-info{
        //         margin: 0 auto;
        //         width: 920rem;
        //     }

        //     .btn-area{
        //         margin: 10rem auto 0;
        //         .guide-btn{
        //             width: 240rem;
        //             height: 70rem;
        //         }
        //     }

            
        // }
    
    }
}


</style>
