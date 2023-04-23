<!-- CREATE by WangXinzhao at 2022/10/27 17:56 -->
<template>
    <div class="main-nav" ref="mainNav">
        <nav class="main-content">
            <div class="logo-box">
                <div class="logo" @click.stop="router.push('/')"></div>
            </div>
        </nav>
        <i :style="{opacity:state.navOpacity}"></i>
    </div>
</template>
<script setup>

import {ref, toRefs, onMounted, reactive, getCurrentInstance, nextTick} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter();
const allRoutes = router.getRoutes();
import Discord from "@/components/icons/discord.vue";
import Twitter from "@/components/icons/twitter.vue";
import Wallet from "@/components/icons/wallet.vue";
import IconMenu from "@/components/icons/icon-menu.vue";
import WalletConnect from "@/views/components/wallet/walletConnect.vue";
import MetaMask from "@/views/components/wallet/metaMask.vue";
import okx from "@/views/components/wallet/okx.vue"
import {useUserStore,useUserBindStore,useWalletStore} from "@/store/user.js";
const userStore = useUserStore();
const userBindStore = useUserBindStore();
const walletStore = useWalletStore();
import $dialog from "@/views/components/dialog";
import {imgResize} from "../../../utils/imgResize.js";
import Okx from "@/views/components/wallet/okx.vue";
import WalletListModal from "@/views/components/wallet/wallet-list-modal.vue";
import {POST,GET} from "../../../utils/api.js";
window.POST = POST;
window.GET = GET;
// imgResize()

const isDesktop = ref(window.device.desktop())

const mainNav=ref(null);
const state = reactive({
    menuclose:true,
    navOpacity:'0',
    routes:[],
    desktopWallet:'',
})
defineProps({
    setUserBoxShow: Function
})
const desktopWallet = ref(null)
const wcWallet = ref(null)
const walletList = ref(null);
const onConnect = () => {
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
//connect_state
var closeDialog=false;

const sendLoginStatus = (status) =>{
    $dialog({
        type: "notice",
        title: "Confirm identity",
        content: " ",
        btnText:'Confirm',
        callBack: (loading, closeFn) => {
            onConnect();
            closeDialog = closeFn;
            /*else{
                closeFn();
            }*/
        },
    });
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
                    walletStore.getWalletInfo();

                    if(obj.pfid && obj.need_apply===1){
                        $dialog({
                            type: "warning",
                            callBack(loading, closeFn){
                                router.replace('/user/setting')
                                closeFn();
                            },
                        });
                    }else if(router.currentRoute.value.query.redirect){
                        router.replace(router.currentRoute.value.query.redirect)
                    }
                },timerDelay)
            }
    }
}

allRoutes.forEach((item)=>{
    item.meta.showInMainNav===true && state.routes.push(item)
})

onMounted(() => {
    window.addEventListener('scroll',()=>{
        state.navOpacity = Math.max(0,Math.min(document.scrollingElement.scrollTop / mainNav.value.getBoundingClientRect().height,1)).toFixed(1)
    })
    router.beforeEach((to,from)=>{
        // console.log(to)
        if(to.meta.needLogin===true && userStore.userinfo.access_token===''){
            onConnect()
            router.replace('/?redirect='+to.fullPath)
            /*$dialog({
                type: 'warning',
                title: 'Sorry',
                content: 'Please login!',
                callBack: (loading, closeFn) => {
                    // console.log("我是自定义的！");
                    onConnect()
                    closeFn()
                }
            })*/
        }
    })
})
</script>
<style lang="scss" scoped>
.main-nav{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 90px;
    z-index: 10000;
    display: flex;
    align-items: center;
    transition: height 200ms;
    >i{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        background: rgba(255,255,255,.85);
        opacity: 1;
        transition: opacity 300ms;
        backdrop-filter: blur(10px);
    }
    nav{
        color: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin:0 auto;
        position: relative;
        z-index: 2;
        .logo-box{
            position: relative;
            height: 31px;
            .logo{
                width: 108px;
                height: 31px;
                position: absolute;
                left:0;
                top:0;
                cursor: pointer;
                &::before,&::after{
                    content: "";
                    display: block;
                    width: 100%;
                    height: 100%;
                    //mask: url("@/assets/images/logo-new.svg") no-repeat center top / contain;
                    //-webkit-mask: url("@/assets/images/logo-new.svg") no-repeat center top / contain;
                }
                &::before{
                    position: absolute;
                    top:0;
                    left:0;
                    z-index: 2;
                    opacity: 0;
                    transition: opacity 200ms;
                    background: url("@/assets/images/top-logo-color.png") no-repeat center top / contain;
                    //background: linear-gradient(86.2deg, #F365AC 0%, #3BDECD 100%);
                }
                &::after{
                    opacity: 1;
                    background: currentColor;
                    transition: background 100ms;
                    background: url("@/assets/images/top-logo-black.png") no-repeat center top / contain;
                }
                &:hover{
                    &::before{
                        opacity: 1;
                    }
                    &::after{
                        opacity: 0;
                        transition: opacity 100ms 100ms;
                    }
                }
            }
        }
        .links{
            display: flex;
            align-items: center;
            justify-content: space-between;
            a{
                color: inherit;
                flex-grow: 1;
                flex-shrink: 1;
                display: block;
                font-weight: 700;
                line-height: 120%;
                text-decoration: none;
                margin-left:50px;
                transition: all 200ms;
                &:hover{
                    color: rgba(0,0,0,.5);
                }
            }
            .main-menu-box{
                font-size: 22px;
                .main-menu-layer{
                    .menu-close-btn{
                        display: none;
                        .icon-menu{
                            font-size: 40px;
                        }
                    }
                    .main-menu-list{
                        display: flex;
                        align-items: center;
                    }
                }
            }
            .social{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: 35px;
                width: 255px;
                >i{
                    display: block;
                    flex-grow: 1;
                    flex-shrink: 1;
                }
                >span{
                    flex-grow: 0;
                    flex-shrink: 0;
                    margin-left: 42px;
                    width: 43px;
                    height:43px;
                    border-radius: 22px;
                    display: block;
                    overflow: hidden;
                    cursor: pointer;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
            }
        }
    }
}
/** default style ----START---- **/

/** default style -----END----- **/
@media only screen and (max-width: 2000px) {
}
@media only screen and (max-width: 1600px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 1024px) {
    .main-nav {
        height: 70px;
    }
}
@media only screen and (max-width: 768px) {
    .main-nav{
        nav{
            color: rgba(0, 0, 0, 0.75);
            .logo-box{
                .logo{
                    left:calc(50vw - 66px);
                }
            }
            .links{
                flex-grow: 1;
                flex-shrink: 0;
                width: 100%;
                .main-menu-box{
                    .main-menu-layer{
                        .menu-close-btn{
                            display: block;
                            position: relative;
                            z-index: 2;
                        }
                        .main-menu-list{
                            background: #FFF;
                            position: fixed;
                            z-index: 1;
                            left:0;
                            top:0;
                            width: 0;
                            height: 0;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            opacity: 0;
                            overflow: hidden;
                            transition: opacity 300ms, width 0s 300ms,height 0s 300ms;
                            >a{
                                width: 240px;
                                text-align: center;
                                flex-shrink: 0;
                                flex-grow: 0;
                                font-size: 26px;
                                line-height: 40px;
                                margin:30px 0 0 0;
                                font-weight: 900;
                                font-style: italic;
                                transform: translateX(1em);
                                opacity: 0;
                                transition: opacity 300ms, transform 300ms;
                                &.active,&.current{
                                    background: linear-gradient(88deg, #F365AC 36%, #3BDECD 64%);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                    text-fill-color: transparent;
                                }
                                &:first-child{margin:0;}
                            }
                            &.open{
                                width: 100%;
                                height: 100%;
                                opacity: 1;
                                transition: opacity 300ms, width 0s,height 0s;
                                >a{
                                    opacity: 1;
                                    transform: translateX(0);
                                }
                            }

                        }
                    }
                }
                .social{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 35px;
                    width: 100%;
                    >a{
                        margin-left: 18px;
                        position: relative;
                        &:first-child{
                            margin-left: 12px;
                        }
                        &::after{
                            content: "";
                            display: block;
                            position: absolute;
                            left:-.3em;
                            top:-.3em;
                            width: 1.6em;
                            height: 1.6em;
                        }
                    }
                    >i{
                        display: block;
                        width: 100%;
                        flex-grow: 1;
                        flex-shrink: 1;
                    }
                    >span{
                        margin-left: 7px;
                        width: 35px;
                        height: 35px;
                    }
                }
            }
        }
    }

}
@media only screen and (max-width: 600px) {
    .main-nav{
        height: 50px;
        nav{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 2400px;
            margin:0 auto;
            position: relative;
            z-index: 2;
            .logo-box{
                width: 86px;
                height: 22px;
                .logo{
                    left:calc(50vw - 55px);
                    width: 82px;
                    height: 21px;
                }
            }
            .links{
                .main-menu-box{
                }
                .social{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 24px;
                    width: 100%;
                    >a{
                        margin-left: 18px;
                        &:first-child{
                            margin-left: 12px;
                        }
                    }
                    >i{
                        display: block;
                        width: 100%;
                        flex-grow: 1;
                        flex-shrink: 1;
                    }
                    >span{
                        margin-left: 7px;
                        width: 22px;
                        height: 22px;
                    }
                }
            }
        }
    }
}
</style>
