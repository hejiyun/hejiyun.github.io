<template>
<!--    <div class="wallet">
        <button type="button" class="tied-wallet flex" @click="onConnect()">
            <img src="@/assets/images/logo-metamask.svg">
            <div>
                <span>{{ $t(connect_state === 0 ?'wallet.bindWallet':'wallet.confirmAccount')}}</span><i class="required-chart"></i>
                &lt;!&ndash;        <span v-if="connect_state === 0">{{$t('form.optional')}}</span>&ndash;&gt;
            </div>
        </button>
    </div>-->
</template>

<script setup>
import {onMounted, ref, reactive, toRefs, onDeactivated,} from "vue";
import {POST} from "/utils/api.js"
import {pluginChangeEvent} from "./pluginChange.js";

const state = reactive({
    address: "",
    nonce: "",
    isMetaMask:false,
    access_token:'',  //已经签名成功才会有值
    connect_state:0,   //0初始状态点击唤醒钱包    1拿到钱包地址，还没有签名或者是拒绝签名  2唤醒钱包签名弹框，未确认签名    3签名成功
});
const { connect_state} = toRefs(state);
const emit = defineEmits(['connectWallet'])

const _h = window.location.href;
let _api = _h.indexOf('/event/index.html') >= 0 ? window.api.eapi : window.api.api;


onMounted(() => {
    if(window.ethereumDUP && window.ethereumDUP.isMetaMask){
        state.isMetaMask = window.ethereumDUP.isMetaMask;
        // 连接
        ethereumDUP.on('connect',  (connectInfo) => {
            console.log(connectInfo,"connectInfo1")
        });
        // 断开
        ethereumDUP.on('disconnect',  (connectInfo) => {
            console.log(connectInfo,"connectInfo2")
        });
        // 帐户已更改
        ethereumDUP.on('accountsChanged',  (connectInfo) => {
            console.log(connectInfo,"connectInfo3")
            state.account = connectInfo[0];
        });
        // 当当前连接的链发生变化时，MetaMask 提供程序会发出此事件。
        ethereumDUP.on('chainChanged',  (connectInfo) => {
            console.log(connectInfo,"connectInfo4")
        });
    }
});
onDeactivated(()=>{

})
// 获取nonce
function getNonce(address) {
    POST(`${_api}/art/login/wallet_nonce`, {
        address: address
    }).then((res) => {
        if (res.ret_code === 0) {
            state.nonce = res.data.nonce;
            onSign();
        }
    });
}
// 签名
const onSign = async()=>{
    state.connect_state = 2;
    try {
        const exampleMessage = state.nonce;
        const from = state.address;
        /*console.log(state.nonce)
        console.log(state.address)*/
        // const msg = `為了確保您是該賬戶的真實持有人，HeartX將會驗證您的錢包簽名: ${exampleMessage}`;
        // const msg = `Sign this message to validate that you are the owner of the account. Random string:${exampleMessage}`;
        const msg =
            "Sign this message to validate that you are the owner of the account. Random string: " +
            state.nonce;
        const sign = await ethereumDUP.request({
            method: 'personal_sign',
            params: [msg, from, 'Example password'],
        }).catch(err=>{

        });
        state.connect_state = 3;
        onCheck(sign)
    } catch (error) {
        emit('connectWallet',2,error);
        //拒绝签名,重置连接按钮，变成可点击
        state.connect_state = 1;
    }
}
// 和后端验证签名
function onCheck(sign){
    POST(`${_api}/art/login/wallet_login`,{
            address:state.address,
            signature:sign
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
// 链接钱包  唤醒钱包
const onConnect = async () => {
    if(state.isMetaMask){  //浏览器已安装钱包插件
        if(state.connect_state === 0){ //未获取地址  去获取地址
            console.log('onConnect',1)
            //登录的时候判断是不是在以太网
            // if((window.location.href.indexOf('heartx.art') >= 0) && window.ethereumDUP.chainId != '0x1'){
            //      window.toast(`To claim $HNX, please switch to Ethereum's mainnet.`)
            //      return false;
            // }
            try {
                const newAccounts = await ethereumDUP.request({
                    method: 'eth_requestAccounts',
                });
                state.address = newAccounts[0];
                //拿到钱包地址，按钮不可点击
                state.connect_state = 1;
                getNonce(newAccounts[0])
                // emit('connectWallet',0,{walletAddress:newAccounts[0]});
            } catch (error) {
                emit('connectWallet',1,error);
            }
        }else if(state.connect_state===1){//已获取地址  但拒绝签名
            console.log('onConnect',2)
            await onSign();
        }else if(state.connect_state===2){//已获取地址  已经申请签名，等待确认签名
            emit('connectWallet',3);
        }
    }else{//浏览器没有安装钱包插件

        let ua = navigator.userAgent,jumpUrl='';
        if(/ Edg\//i.test(ua)){
            jumpUrl="https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US";
        }else if(/ Firefox\//i.test(ua)){
            jumpUrl="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
        }else{
            jumpUrl="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
        }
        pluginChangeEvent()
        window.open(jumpUrl);

        // window.open("https://metamask.io/download/");
    }
};
defineExpose({
    onConnect
})

</script>

<style lang="scss" scoped>
.wallet {
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
    }
}
@function rem($pxNum){
    @return calc($pxNum / 37.5) * 1px;
}
@media screen and (max-width:768px){
    .wallet {
        .tied-wallet{
            width: rem(200);
            height: rem(51);
            font-size: rem(18);
            line-height: 120%;
            font-weight: 800;
            border: rem(1) solid #1A1A1A;
            border-radius: rem(88);
            margin: rem(24) auto 0;
            img{
                width: rem(35);
                height: rem(33);
            }
            div{
                margin-left: rem(12);
                span{
                    margin-top:rem(4);
                    &:nth-child(2){
                        font-size: rem(12);
                        margin-top:rem(4);
                    }
                }
            }
            /*
            :nth-child(n+2){
              margin-left: rem(8);
            }*/
            &:hover{
                border: rem(1) solid rgba(26, 26, 26, 0.3);
            }
        }
    }
}
</style>
