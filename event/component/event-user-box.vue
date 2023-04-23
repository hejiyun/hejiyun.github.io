<template>
    <transition name="userBox">
        <div v-show="isShow" class="user-box" @touchmove.stop.prevent>
            <div class="close-btn" @click.stop="setUserBoxShow(false)">
                <i><ax-icon class="icon-close"></ax-icon></i>
            </div>
            <transition name="userInfo">
                <div v-show="isShow">
                    <img
                        v-if="userStore.userinfo.headimg"
                        class="header-img"
                        :src="imgResize(userStore.userinfo.headimg,300,300,true,true)"
                        alt=""
                    />
                    <p class="user-name">Hi~ {{userStore.userinfo.nickname}}</p>
                    <!-- <i class="line-top"></i> -->

                    <!-- <div class="won-pass" v-if="walletInfo.htx_reward_st">You have won<br/>1 HeartX Pass Whitelist!</div> -->
                    <div class="won-pass" v-if="walletInfo&&walletInfo.invite_code">
                        <p>Congratulations on getting<br/>HeartX Invitation Code.</p>
                        <p>{{walletInfo.invite_code}}</p>
                        <!-- <p>FEGGGT334546</p> -->
                    </div>

<!--                    <p class="user-btns invite"  @click.stop="goPage('/invitation')">Invitation Code</p>-->
<!--                    <p class="user-btns settings" @click.stop="goPage('/user/setting')">Settings</p>-->
                    <div class="account-box">
                        <p class="account-id">
                            <span @click.stop="copyID()">{{userStore.userinfo.walletAddress.replace(/([\da-z]{6})[^$]+([\da-z]{8})/,'$1...$2')}}</span
                            ><i @click.stop="copyID()"><ax-icon class="icon-copy"></ax-icon></i>
                        </p>
<!--                        "eth": 0,
                        "beat": 0,
                        "artX": 0,
                        "starry_night": 0,
                        "canvas": 0-->
                        <i class="line-bottom"></i>
                        <!-- <p class="account-info" @click.stop="goPage('/user/assets')">
                            <span>$HNX</span><span>{{walletInfo.hnx || 0}}</span>
                        </p>
                        <p class="account-info" @click.stop="goPage('/user/assets')">
                            <span>$HTX</span><span>{{walletInfo.htx || 0}}</span>
                        </p> -->
                        <div class="hnx-box">
                            <img src="../assets/HNX.png" alt="">
                            <div class="hnx-info">
                                <div>{{walletInfo.hnx || 0}}</div>
                                <div>$HNX</div>
                            </div>
                        </div>
                        <div class="ranking-rewards-box" :class="{'cur':walletInfo&&walletInfo.reward_log.length&&walletInfo.reward_log.length>3}">
                            <div class="scroll-list" v-if="walletInfo&&walletInfo.reward_log&&walletInfo.reward_log.length">
                                <div v-for="(item,index) in walletInfo.reward_log" :key="index">
                                    <div class="rewards-list">
                                        <!-- type 1 Voting Rewards, 2 Ranking Rewards, 3 Claim History, 4 4/6 Premint, 5 4/9 TaskOn-->
                                        <!-- <div>{{item.type===1?'Voting Rewards':(item.type===2?'Ranking Rewards':'Claim History')}}</div> -->
                                        <div>{{rewardItem[item.type-1]}}</div>
                                        <div :class="{'Hnxcur':item.type===3}">{{item.hnx}} $HNX</div>
                                    </div>
                                    <p>{{item.time}}</p>
                                </div>
                            </div>
                        </div>
<!--                        <p class="account-info" @click.stop="goPage('/user/assets')">
                            <span>HTX</span><span>{{walletInfo.artX}}</span>
                        </p>
                        <p class="account-info" @click.stop="goPage('/user/assets')">
                            <span>Starry Night</span><span>{{walletInfo.starry_night}}</span>
                        </p>-->
                    </div>
                    <p class="user-btns" @click.stop="claimRewards();">Claim Rewards</p>
                    <p class="user-btns log-out" @click.stop="logout">log out</p>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import AxIcon from "@/components/ax-dom/ax-icon.vue";
import copy from "/utils/clipboard";
import {storeToRefs} from "pinia";

import {POST} from "/utils/api.js";
import {useUserStore, useWalletStore, useUserBindStore, useInviteStore} from "@/store/user.js";
import {useCatStore} from "@/store/category.js";

import {nextTick, watch, ref, inject} from "vue";
import router from "@/router/index.js";
import $dialog from "./dialog";
import {imgResize} from "/utils/imgResize.js";
import { ethers } from "ethers";
const userStore = useUserStore();
const walletStore = useWalletStore();
const catStore =useCatStore()
const props = defineProps({
    setUserBoxShow: Function,
    isShow: Boolean,
});

const {walletInfo} = storeToRefs(walletStore);
const getRoleUser = async () => {
    await walletStore.getWalletInfo(true)
} 
getRoleUser()



const emit = defineEmits(['logout'])
const logout = () => {
    props.setUserBoxShow(false);
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("ax_user");
    sessionStorage.removeItem("ax_category");
    sessionStorage.removeItem("ax_userbind");
    sessionStorage.removeItem("ax_userInvite");
    catStore.$reset();
    userStore.logout();
    emit('logout')

}
const goPage = (Path)=>{
    /*props.setUserBoxShow(false);
    router.push(Path)*/
}
const copyID = () => {
    copy(userStore.userinfo.walletAddress, () => {
        window.toast('Copy succeeded');
    })
}

const getParam = inject('getParam');
const axWalletState = ref(false);

const rewardItem = ref(['Voting Rewards','Ranking Rewards','Claim History','4/6 Premint','4/9 TaskOn']);

//去提现，交gas费
const claimRewards = ()=>{
    if(walletStore.walletInfo.hnx_orig < 0){
        $dialog({
            type: "failed",
            content: "Insufficient $HNX balance."
        });
        return false;
    }
    // console.log(axWalletState.value);
    if(axWalletState.value){console.log(22222);return false;}
    window.gaPram('Click_Claim');
    if(!userStore.userinfo.access_token){return false;}
    // 
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
    axWalletState.value = true;
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
            axWalletState.value = false;
        }
    })
    .catch((err) => {
        // console.log(err);
        axWalletState.value  = false;
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
        
        // axWalletState = false;
        walletStore.getWalletInfo(true);
        
        // emit("showwait", 2);
        // window.client.toast("Withdrawal succeeded");
    } catch (err) {
        // emit("showwait", 1);
        // console.log(err, "errerrerrerr");
        ExchangeCallBack(0);
        axWalletState.value = false;
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
    // axwalletObj.isShow = false;
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
        // axWalletState = false;
        // console.log(res, "resresresres");
    }).catch((err) => {});
};

</script>

<style lang="scss" scoped>
.user-box {
    position: absolute;
    // width: 289px;
    width: 296rem;
    top: 90rem;
    right: 0;
    background: #474747;
    //box-shadow: 0 3px 8px 1px rgba(206, 206, 206, 0.3);
    border-radius: 10rem;
    z-index: 10002;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    // padding: 28px 24px;
    padding: 20rem;
    color:#FFF;
    .close-btn {
        display: none;
    }
    .header-img {
        width: 55rem;
        height: 55rem;
        border-radius: 50%;
        margin: auto;
    }
    .user-name {
        font-style: italic;
        font-weight: 800;
        font-size: 20rem;
        line-height: 160%;
        text-align: center;
        margin-top: 8rem;
    }
    $lineColor: rgba(255, 255, 255, 0.1);
    .line-top {
        display: block;
        width: 100%;
        height: 1rem;
        background: $lineColor;
        margin: 10rem 0 22rem;
    }
    .won-pass {
        margin: 3rem 0;
        font-weight: 400;
        font-size: 15rem;
        line-height: 120%;
        text-align: center;
        >p {
            background: linear-gradient(90deg, #F365AC 9.19%, #3BDECD 87.87%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            &:nth-child(2) {
                margin-top: 5rem;
            }
        }
    }
    .user-btns {
        font-style: normal;
        font-weight: 400;
        font-size: 18rem;
        // line-height: 160%;
        text-align: center;
        margin-top: 15rem;
        cursor: pointer;
        color: #9A9A9A;
        &:first-letter {
            text-transform: capitalize;
        }
    }
    .account-box {
        margin-top: 15rem;
        // width: 240px;
        width: 256rem;
        border: 1rem solid $lineColor;
        border-radius: 8rem;
        // padding: 11rem 17rem 10rem 15rem;
        padding: 15rem;
        .account-id {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                font-style: normal;
                font-weight: 400;
                font-size: 18rem;
                line-height: 160%;
                text-transform: capitalize;
                color: #fff;
                cursor: pointer;
            }
            >i {
                margin-left: 4rem;
                color: #9a9a9a;
                width: 14rem;
                height: 14rem;
                cursor: pointer;
            }
        }
        .line-bottom {
            display: block;
            width: 100%;
            height: 1rem;
            background: $lineColor;
            margin: 10rem 0 15rem;
        }
        .hnx-box {
            display: flex;
            text-align: center;
            >img {
                margin: 0 12rem 0 50rem;
                width: 46rem;
                height: 46rem;
                display: inline-block;
            }
            .hnx-info {
                div {
                    &:nth-child(1) {
                        font-style: italic;
                        font-weight: 900;
                        font-size: 18rem;
                        line-height: 140%;
                        text-align: center;
                        text-transform: capitalize;
                        color: #FFFFFF;
                    }
                    &:nth-child(2) {
                        font-size: 14rem;
                        color: #9A9A9A;
                    }
                }
            }
        }
        .ranking-rewards-box {
            &.cur {
                .scroll-list {
                    height: 135rem;
                    overflow-y: scroll;
                }
                ::-webkit-scrollbar {
                    width: 2rem;
                    height: 2rem;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(219, 219, 219, 0.8);
                    border-radius: 10rem;
                }
                ::-webkit-scrollbar-track {
                    background: #868686;
                    border-radius: 10rem;
                }
                // ::-webkit-scrollbar-button{
                //     width: 2rem;        
                //     height: 60rem;        
                // }
            }
            .scroll-list {
                >div {
                    margin-top: 10rem;
                    height: 35rem;
                }
            }
            .rewards-list {
                display: flex;
                justify-content: space-between;
                align-items: center;
                >div {
                    font-weight: 400;
                    font-size: 14rem;
                    line-height: 160%;
                    text-transform: capitalize;
                    &:nth-child(2) {
                        padding-right: 5rem;
                        color: #3BDECD;
                        &.Hnxcur {
                            color: #EA5B6B;
                        }
                    }
                }
            }
            p {
                font-weight: 400;
                font-size: 10rem;
                line-height: 160%;
                text-transform: capitalize;
                color: #9A9A9A;
            }
        }
        .account-info {
            //cursor: pointer;
            margin-bottom: 12rem;
            font-style: normal;
            font-weight: 400;
            font-size: 15rem;
            line-height: 160%;
            text-transform: capitalize;
            color: #9a9a9a;
            display: flex;
            align-items: center;
            justify-content: space-between;
            /*span:first-of-type {
                color: #9a9a9a;
            }*/
            span:last-of-type {
                color: #fff;
            }

            &:last-child{
                margin-bottom: 0;
            }
        }
    }
}
.userBox-enter-active {
    animation: tran 300ms;
}

.userBox-leave-active {
    animation: tran 300ms reverse;
}
.userInfo-enter-active {
    animation: tran 300ms;
}

.userInfo-leave-active {
    animation: tran 300ms reverse;
}
@keyframes tran {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
/*
@media only screen and (max-width: 600px) {
    .user-box {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        top: 0;
        right: 0;
        padding: 44px 27px 0;
        .close-btn {
            display: block;
            position: absolute;
            top: 6px;
            right: 11px;
            width: 40px;
            height: 40px;
            i {
                widows: 100%;
                height: 100%;
            }
        }
        .header-img {
            width: 90px;
            height: 90px;
        }
        .user-name {
            font-size: 22px;
            margin-top: 18px;
        }
        .line-top {
            margin: 15px 0 34px;
        }
        .user-btns {
            margin-bottom: 22px;
        }
        .account-box {
            margin-top: 34px;
            width: 100%;
            height: 205px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 11px 16px 11px 14px;
            .account-id {
                span {
                    font-size: 20px;
                }
                i {
                    margin-left: 3px;
                    width: 13px;
                    height: 14px;
                }
            }
        }
    }
    .userBox-enter-active {
        animation: fade 300ms;
    }

    .userBox-leave-active {
        animation: fade 300ms reverse;
    }
    @keyframes fade {
        0% {
            opacity: 0;
            !* transform: translateY(-20px); *!
        }
        100% {
            opacity: 1;
            !* transform: translateY(0); *!
        }
    }
    .userInfo-enter-active {
        animation: userMove 300ms;
    }

    .userInfo-leave-active {
        animation: userMove 300ms reverse;
    }
    @keyframes userMove {
        0% {
            transform: translateX(20px);
        }
        100% {
            transform: translateX(0);
        }
    }
}*/
</style>
