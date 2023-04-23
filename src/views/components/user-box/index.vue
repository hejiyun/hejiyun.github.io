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
                    <i class="line-top"></i>
                    <p class="user-btns invite"  @click.stop="goPage('/invitation')">Invitation Code</p>
                    <p class="user-btns settings" @click.stop="goPage('/user/setting')">Settings</p>
                    <p class="user-btns log-out" @click.stop="logout">log out</p>
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
                        <p class="account-info" @click.stop="goPage('/user/assets')">
                            <span>Eth</span><span>{{walletInfo.eth}}</span>
                        </p>
                        <p class="account-info" @click.stop="goPage('/user/assets')">
                            <span>HNX</span><span>{{walletInfo.beat}}</span>
                        </p>
                        <p class="account-info" @click.stop="goPage('/user/assets')">
                            <span>HTX</span><span>{{walletInfo.artX}}</span>
                        </p>
                        <p class="account-info" @click.stop="goPage('/user/assets')">
                            <span>Starry Night</span><span>{{walletInfo.starry_night}}</span>
                        </p>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import AxIcon from "../../../components/ax-dom/ax-icon.vue";
import copy from "../../../../utils/clipboard";
import {storeToRefs} from "pinia";
import {useUserStore, useWalletStore, useUserBindStore, useInviteStore} from "@/store/user.js";
import {useCatStore} from "@/store/category.js";

import {nextTick, watch} from "vue";
import router from "@/router/index.js";
import {imgResize} from "../../../../utils/imgResize.js";
const userStore = useUserStore();
const walletStore = useWalletStore();
const catStore =useCatStore()
const props = defineProps({
    setUserBoxShow: Function,
    isShow: Boolean,
});

const {walletInfo} = storeToRefs(walletStore);
const getRoleUser = async () => {
    await walletStore.getWalletInfo()
}
getRoleUser()

const logout = () => {
    props.setUserBoxShow(false);
    localStorage.removeItem("walletconnect");
    sessionStorage.removeItem("ax_user");
    sessionStorage.removeItem("ax_category");
    sessionStorage.removeItem("ax_userbind");
    sessionStorage.removeItem("ax_userInvite");
    catStore.$reset();
    userStore.logout();
}
const goPage = (Path)=>{
    props.setUserBoxShow(false);
    router.push(Path)
}
const copyID = () => {
    copy(userStore.userinfo.walletAddress, () => {
        window.toast('Copy succeeded');
    })
}
</script>

<style lang="scss" scoped>
.user-box {
    position: fixed;
    width: 289px;
    height: 513px;
    top: 109px;
    right: 9.375%;
    background: #ffffff;
    box-shadow: 0px 3px 8px 1px rgba(206, 206, 206, 0.3);
    border-radius: 8px;
    z-index: 10002;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    padding: 27px 24px 28px;
    .close-btn {
        display: none;
    }
    .header-img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin: auto;
    }
    .user-name {
        font-style: italic;
        font-weight: 800;
        font-size: 20px;
        line-height: 160%;
        text-align: center;
        color: #000000;
        margin-top: 12px;
    }
    .line-top {
        display: block;
        width: 100%;
        height: 1px;
        background: #e0e0e0;
        margin: 10px 0 22px;
    }
    .user-btns {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 160%;
        text-align: center;
        color: #000000;
        margin-bottom: 9px;
        cursor: pointer;
    }
    .account-box {
        margin-top: 23px;
        width: 240px;
        height: 205px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 11px 17px 10px 15px;

        .account-id {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 160%;
                text-transform: capitalize;
                color: #454545;
            }
            i {
                margin-left: 4px;
                color: #9a9a9a;
                width: 12px;
                height: 13px;
                cursor: pointer;
            }
        }
        .line-bottom {
            display: block;
            width: 100%;
            height: 1px;
            background: #e0e0e0;
            margin: 11px 0;
        }
        .account-info {
            cursor: pointer;
            margin-bottom: 12px;
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 160%;
            text-transform: capitalize;
            color: #454545;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span:first-of-type {
                color: #9a9a9a;
            }
            span:last-of-type {
                color: #454545;
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
            /* transform: translateY(-20px); */
        }
        100% {
            opacity: 1;
            /* transform: translateY(0); */
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
}
</style>
