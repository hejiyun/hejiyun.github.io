<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="wallet-list" :class="{show:state.active}" @click.stop="props.canClose && hide()" @mousewheel.stop.prevent @touchmove.stop>
        <div class="list-container" @click.stop>
            <header>
                <h3 v-text="props.title?props.title:'Connect a wallet'"></h3>
                <i class="btn-close" v-if="props.canClose!==false" @click.stop="hide()"><ax-icon class="icon-times"></ax-icon></i>
            </header>
            <section>
                <ul>
                    <li v-for="(item) in state.walletlist" @click.stop="emit('selectWallet',item.name)">
                        <img :src="item.icon">
                        <p>{{item.title}}</p>
                        <span v-if="item.installStatus"></span>
                    </li>
                </ul>
            </section>

        </div>
    </div>
</template>
<script setup>
import {ref, nextTick, reactive, onMounted} from 'vue'
import {useI18n} from "vue-i18n"
import AxIcon from "@/components/ax-dom/ax-icon.vue";
const {locale} = useI18n();
import okxIcon from "./icon/okx.svg"
import metamaskIcon from "./icon/metamask.svg"
const emit = defineEmits(['selectWallet'])
const state=reactive({
    active:false,
    walletlist:[],
});
const props = defineProps(['title','canClose'])
const getWalletList = ()=>{
    return [
        {
            icon:okxIcon,
            name:"okx",
            title:"OKX Wallet",
            installStatus:!!window.okxwallet && window.okxwallet.isOkxWallet,
            dapplink:'https://metamask.app.link/dapp' + location.href
        },
        {
            icon:metamaskIcon,
            name:"metamask",
            title:"MetaMask",
            installStatus: !!window.ethereumDUP && window.ethereumDUP.isMetaMask,
            dapplink:'https://metamask.app.link/dapp/' + location.href
        }
    ]
}

const show = (content)=>{
    state.walletlist = getWalletList();
    state.active=true;
    // timedelay.value && clearTimeout(timedelay.value)
    // active.value = '';
    // nextTick(()=>{
    //     timedelay.value = setTimeout(()=>{
    //         text.value = content
    //         active.value = 'show';
    //         nextTick(()=>{
    //             timedelay.value = setTimeout(()=>{
    //                 active.value = 'hide';
    //                 nextTick(()=>{
    //                     timedelay.value = setTimeout(()=>{
    //                         text.value = ''
    //                         timedelay.value = 0
    //                     },500)
    //                 })
    //             },3500)
    //         })
    //     },50)
    // })
}
const hide = ()=>{
    emit('selectWallet','');
    state.active=false;
}
onMounted(()=>{
    // show();
})
defineExpose({show,hide})

</script>
<style lang="scss" scoped>
.wallet-list{
    font-family: Gilroy,'Microsoft YaHei',"WenQuanYi Micro Hei",'PingFang TC','PingFang HK', sans-serif;
    position: fixed;
    z-index: 2000;
    top:0;
    left:0;
    width: 0;
    height: 0;
    background: rgba(0,0,0,.3);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    opacity: 0;
    transition: opacity .3s linear, width 0s .3s, height 0s .3s;
    .list-container{
        width: 360px;
        background: #FFF;
        overflow: hidden;
        border-radius: 12px;
        padding:10px 0;
        transform: translateY(30px);
        transition: transform .3s cubic-bezier(.45,.7,.6,1);
        header{
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 60px;
            h3{
                padding:0 20px;
                font-size: 24px;
                width: 100%;
            }
            .btn-close{
                cursor: pointer;
                color:#999;
                font-size: 24px;
                width: 60px;
                height: 60px;
                padding: 18px;
                position: absolute;
                z-index: 1;
                right:0;
                top:0;
            }
        }
        section{
            padding: 0 10px 10px;
            ul{
                display: block;
                padding: 10px 0;
                >li{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: 60px;
                    border-radius: 10px;
                    cursor: pointer;
                    padding: 10px 30px 10px 20px;
                    margin-top:10px;
                    >*{
                        flex-shrink: 0;
                        flex-grow: 0;
                    }
                    >img{
                        width: 40px;
                        height: 40px;
                        padding:5px;
                        margin-right:10px;
                    }
                    >p{
                        font-size: 18px;
                        flex-shrink: 1;
                        flex-grow: 1;
                    }
                    >span{
                        padding-left: 20px;
                        font-size: 12px;
                        line-height: 20px;
                        display: block;
                        background:
                            radial-gradient(at 10px 10px, rgba(58, 204, 0, 0.5) 3px, transparent 3.1px) no-repeat left top / 20px 20px,
                            radial-gradient(at 10px 10px, rgba(58, 204, 0, 0.3) 5px, transparent 5.1px) no-repeat left top / 20px 20px;
                        &::after{
                            color: rgba(0,0,0,.5);
                            content: "Installed";
                            display: block;
                            white-space: nowrap;
                        }
                    }
                    &:first-child{
                        margin-top: 0;
                    }
                    &:hover{
                        background: rgba(0,0,0,.03);
                    }
                }
            }
        }
    }
    &.show{
        width: 100vw;
        height: 100vh;
        opacity: 1;
        transition: opacity .3s linear, width 0s, height 0s;
        .list-container{
            transform: translateY(0);
        }
    }
    /*&.hide{
        top:50%;
        left:50%;
        height: initial;
        padding:0;
        transform: translate(-50%, calc(-50% + 1em));
        opacity: 0;
        transition: opacity .5s cubic-bezier(.4,0,.55,3), transform .5s cubic-bezier(.4,0,.55,3),padding 0s .5s;
    }*/

    &.dark{

        .list-container{
            background: #474747;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
            header{
                h3{
                    font-weight: 800;
                    font-size: 20px;
                    text-align: center;
                }
                .btn-close{
                    display: none;
                }
            }
            section{
                padding: 0 10px 10px;
                ul{
                    display: block;
                    padding: 10px 0;
                    >li{
                        >img{
                            width: 40px;
                            height: 40px;
                            padding:5px;
                            margin-right:10px;
                        }
                        >p{
                            font-size: 20px;
                        }
                        >span{
                            background:
                                radial-gradient(at 10px 10px, rgba(70, 204, 3, 0.5) 3px, transparent 3.1px) no-repeat left top / 20px 20px,
                                radial-gradient(at 10px 10px, rgba(70, 204, 3, 0.3) 5px, transparent 5.1px) no-repeat left top / 20px 20px;
                            &::after{
                                color: rgba(255,255,255,.7);
                            }
                        }
                        &:first-child{
                            margin-top: 0;
                        }
                        &:hover{
                            background: rgba(0,0,0,.1);
                        }
                    }
                }
            }
        }
        &.show{
            width: 100vw;
            height: 100vh;
            opacity: 1;
            transition: opacity .3s linear, width 0s, height 0s;
            .list-container{
                transform: translateY(0);
            }
        }
        /*&.hide{
            top:50%;
            left:50%;
            height: initial;
            padding:0;
            transform: translate(-50%, calc(-50% + 1em));
            opacity: 0;
            transition: opacity .5s cubic-bezier(.4,0,.55,3), transform .5s cubic-bezier(.4,0,.55,3),padding 0s .5s;
        }*/
    }
}


@function rem($pxNum){
    @return calc($pxNum / 37.5) * 1rem;
}
@media screen and (max-width:768px) {
    .toast {
        max-width: 100vw;
    }
}
</style>
