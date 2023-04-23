<template>
    <div class="wallet">
        <button type="button" :class="{waitBtn:!nonce&&connect_state>0}" class="tied-wallet flex" :disabled="getNonceStatus === true" @click.stop="onConnect()">
            <img src="@/assets/images/logo-metamask.svg">
            <div>
                <span>{{ $t(connect_state === 0 ?'wallet.bindWallet':'wallet.confirmAccount')}}</span><i class="required-chart"></i>
            </div>
        </button>

    </div>
</template>

<script setup>
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { convertUtf8ToHex } from "@walletconnect/utils";
import { onMounted, ref, reactive, toRefs, onBeforeMount,nextTick} from "vue";
import {POST} from "/utils/api.js"

const state = reactive({
    address: "",
    nonce: "",
    access_token:'',  //已经签名成功才会有值
    connect_state:0,   //0初始状态点击唤醒钱包    1拿到钱包地址，还没有签名或者是拒绝签名  2唤醒钱包签名弹框，未确认签名    3签名成功
    sign:"",
    getNonceStatus:false,
});
const { connect_state,nonce,getNonceStatus} = toRefs(state);
const emit = defineEmits(['connectWallet'])
onBeforeMount(()=>{
    window.localStorage.removeItem('walletconnect')
})
// onMounted(() => {
// });


const _h = window.location.href;
let _api = _h.indexOf('/event/index.html') >= 0 ? window.api.eapi : window.api.api;



let walletConnector = "";
// // 链接钱包  唤醒钱包
const onConnect = async () => {
    if(state.connect_state === 0){
        //未获取地址  去获取地址
        // 在浏览器和客户端都没有缓存token的情况下，重新创建'
        walletConnector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
            qrcodeModalOptions: {
                desktopLinks:['metamask'],
                mobileLinks: ["metamask", "rainbow"]
            }
        });
        console.log(walletConnector.connected,"walletConnector.connected")
        if (!walletConnector.connected) {
            // create new session
            walletConnector.createSession();
        }else{//已经链接成功  待确认签名
            state.address = walletConnector.accounts[0];
            onSign();
        }
        if (walletConnector) {
            // 确认连接的响应事件
            walletConnector.on("connect", (error, payload) => {
                if (error) {
                    throw error;
                }
                // Get provided accounts and chainId
                const { accounts, chainId } = payload.params[0];
                console.log(payload, "payload");
                //拿到钱包地址
                state.address = accounts[0];
                state.connect_state = 1;
                getNonce(state.address);
                // emit('connectWallet',0,{walletAddress:state.address});
            });
            // 当DApp连接上钱包后，若钱包的信息发生变化（大部分情况是 chainId 或者 address），会触发 session_update 的回调
            walletConnector.on("session_update", (error, payload) => {
                if (error) {
                    throw error;
                }
                console.log(payload, "payload120");
            });
            // 断开连接的响应事件
            walletConnector.on("disconnect", (error, payload) => {
                if (error) {
                    throw error;
                }
                //app主动断开，删除本地的token,并且通知客户端删除缓存的token
                localStorage.removeItem("walletconnect");
            });
        }
    }else if(state.connect_state===1){//已获取地址  但拒绝签名
        onSign();
    }else if(state.connect_state===2){//已获取地址  已经申请签名，等待确认签名
        emit('connectWallet',3);
    }
};
// 获取nonce
function getNonce(address) {
    state.getNonceStatus = true;
    POST(`$_api}/art/login/wallet_nonce`, {
        address: address
    }).then((res) => {
        state.getNonceStatus = false;
        if (res.ret_code === 0) {
            state.nonce = res.data.nonce;
            // state.connect_state = 1;
            console.log('getNonce: Success');
            if(window.location.search.indexOf('debug')>=0){
                nextTick(()=>{
                    console.log('getNonce: View Layout rendered');
                    onSign()
                    setTimeout(()=>{
                        console.log('getNonce: click');
                        // window.location.href='https://metamask.app.link/wc'

                        var aTag = document.querySelector('a.checkSign');
                        aTag.click();

                        /*
                        var btn = document.querySelector('.tied-wallet');
                        var event = document.createEvent('Events');
                        event.initEvent('touchstart', false, true);
                        btn.dispatchEvent(event);
                        setTimeout(()=>{
                            event.initEvent('touchend', false, true);
                            btn.dispatchEvent(event);
                        },100)*/
                        // document.querySelector('.tied-wallet').click();
                    },200 + (~~(Math.random()*10)))
                })
            }
        }else{
            window.toast(`[${res.ret_code}]${res.ret_msg}`)
        }
    }).catch(err=>{
        state.getNonceStatus = false;
        if(err.ret_code===99999){
            window.toast(`[Network Timeout]`)
        }else if(err.ret_code){
            window.toast(`[${res.ret_code}]${res.ret_msg}`)
        }
    });
}
// 签名
const onSign = async() =>{
    state.connect_state = 2;
    if(!state.nonce){
        return false;
    }
    const message =
        "Sign this message to validate that you are the owner of the account. Random string: " +
        state.nonce;
    // $message = "Sign this message to validate that you are the owner of the account. Random string: " . $nonce['nonce'];
    const msgParams = [
        convertUtf8ToHex(message), // Required
        state.address // Required
    ];
    try {
        walletConnector
            .signPersonalMessage(msgParams)
            .then((result) => {
                state.sign = result;
                state.connect_state = 3;
                onCheck();
            })
            .catch((error) => {
                console.log(error, "sdfsdfdsf");
                emit('connectWallet',2,error);
            });
    } catch (error) {
        console.log(error, "error");
        //拒绝签名,重置连接按钮，变成可点击
        state.connect_state = 1;
        emit('connectWallet',3,error);
    }
}
// 和后端验证签名
function onCheck(){
    POST(`${_api}/art/login/wallet_login`,{
            address:state.address,
            signature:state.sign
        }
    ).then((res)=>{
        if(res.ret_code === 0){
            res.data['walletAddress'] = state.address;
            state.access_token = res.data.access_token;
            emit('connectWallet',0,res.data);
        }else if(res.ret_code == 604){
            window.toast(`${res.ret_msg}`)
        }
    })
}


</script>

<style lang="scss" scoped>
.wallet {
    .waitBtn{
        border: 1px solid rgba(26, 26, 26, 0.3);
        span{
            color: rgba(0, 0, 0, 0.45);
        }
    }

    .tied-wallet{
        width: 248px;
        height: 65px;
        font-size: 18px;
        line-height: 120%;
        font-weight: 800;
        border: 2px solid #1A1A1A;
        border-radius: 88px;
        background: transparent;
        margin: 40px auto 0;
        justify-content: center;
        align-items: center;
        img{
            width: 35px;
            height: 33px;
        }
        div{
            margin-left: 12px;
            span{
                //display: block;
                text-align: left;
                margin-top:4px;
                &:nth-child(2){
                    font-size: 12px;
                    line-height: 120%;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.45);
                }
            }
        }
        &:hover{
            border: 2px solid rgba(26, 26, 26, 0.3);
        }
        &:disabled{
            filter: grayscale(30%);
            opacity: .6;
        }
    }
}
@function rem($pxNum){
    @return calc($pxNum / 37.5) * 1px;
}
@media screen and (max-width:768px){
    .wallet {
        .waitBtn{
            border: 1px solid rgba(26, 26, 26, 0.3);
            span{
                color: rgba(0, 0, 0, 0.45);
            }
        }
        .tied-wallet{
            width: 200px;
            height: 51px;
            font-size: 18px;
            line-height: 120%;
            font-weight: 800;
            border: 1px solid #1A1A1A;
            border-radius: 88px;
            margin: 24px auto 0;
            img{
                width: 35px;
                height: 33px;
            }
            div{
                margin-left: 12px;
                span{
                    margin-top:4px;
                    color:rgba(0,0,0,.75);
                    &:nth-child(2){
                        font-size: 12px;
                        margin-top:4px;
                    }
                }
            }
            &:hover{
                border: 1px solid rgba(26, 26, 26, 0.3);
            }
        }
    }
}
</style>
