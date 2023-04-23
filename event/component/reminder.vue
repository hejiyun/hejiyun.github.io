<template>
    <div
        class="modal-wrap"
        :class="{ active: active }"
        @click.stop="hide()"
        @mousewheel.stop.prevent
    >
        <div class="modal-box" @click.stop @mousewheel.stop.prevent>
            <div class="modal-header">
                <h2>Please share the game or vote tomorrow!</h2>
            </div>
            <div class="modal-content">
                <div
                    class="type-box scroll-box"
                    ref="scrollBox"
                    @mousewheel.stop
                >
                    <img src="./../assets/reminder.png" />
                    <p>Congratulations! You‘ve gotten <span>{{beat||eventData.today_beat}} $HNX</span> for voting "Like" on 3 artworks. <br/><span>Want more votes?</span></p>
                    <p>Share the following information on Twitter, and you will get 1 more vote after<br/> completing each sharing. </p>
                    <p>During the event, if you voted "Like" for the daily <i>Top 1</i> artwork, you will be entitled <br/>to share <span>7,000,000 $HNX</span> with other winners!</p>
                    <div class="btn-box">
                        <template v-for="i,k in 2" :key="k">
                            <a v-if="eventData[`today_share${i}_st`]" class="btn-disabled">
                                Get 1 extra vote <img src="../assets/icon-share.png" />
                            </a>
                            <socialShare v-else :pfid="userStore.userinfo.pfid" :txt="twitterArr[k]">
                                <a class="btn-empty" @click="share(i)">
                                    {{['Share HeartX Info','Share Artworks'][k]}} <img src="../assets/icon-share.png" />
                                </a>
                            </socialShare>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive,toRefs, inject } from "vue";
import { storeToRefs } from "pinia"
import {POST} from "/utils/api.js";
import {useUserStore} from "@/store/user.js";
import {useEvent} from "../store/event.js"
import socialShare from "./social-share.vue"
import $dialog from "./dialog";
const userStore = useUserStore();
const useEventStore = useEvent();
const {eventData,beat} = storeToRefs(useEventStore);
const active = ref(false);
const twitterArr = [
    "Share over 100,000 USDT rewards everyday!\nI got $HNX for my aesthetics!\nLike or not? Earn by art!",
    'Share over 100,000 USDT! Right Now！\nGot $HNX Bonus Everyday!\nLike or not? Earn by art!'
]

const getParam = inject('getParam');
// const scrollBox = ref();
const show = (formData) => {
    active.value = true;
    // scrollBox.value.scrollTop = 0;
};
const hide = () => {
    active.value = false;
};

//分享
//shareType 1
const share = (shareType) => {
    window.gaPram(['Click_Share_1','Click_Share_2'][shareType-1]);
    hide();
    const _shareType = shareType;
    setTimeout(()=>{
        $dialog({
            type: "notice",
            content: "Please make sure you've shared it<br> on Twitter.",
            callBack: (closeFn) => {
                todayShare(_shareType);
                closeFn();
            },
        });
    },3000)
};
//每天的分享结束 分享类型 1：广告落地页（首页引导）转发 2：HB完成后转发
const todayShare = (type)=>{
    POST(`${window.api.eapi}/event/2023/vote2earn/share`,{type,invite_pfid: getParam('invite_pfid')},
    {
        'USER-PFID': userStore.userinfo.pfid,
        'USER-TOKEN': userStore.userinfo.access_token
    }).then((res)=>{
        //因为不牵扯奖励，hb之类的更新，只是修改按钮状态，因此不调用首页接口
        //分享结束以后改按钮状态
        if(~~res.ret_code===0){
            useEventStore.$patch((state) => {
                eventData.value.remain_cnt = 1;
                eventData.value[`today_share${type}_st`] = 1;
            });
            $dialog({
                type: "success",
                content: `Shared successfully, get 1 extra vote.`
            });
        }else if(~~res.ret_code===600){
            window.toast(res.ret_msg)
            setTimeout(()=>{
                window.location.reload();
            },1000);
        }
        // emit('eventDataLoad');
        // walletStore.getWalletInfo(true);
    });
}
defineExpose({ show, hide,share });
</script>
<style lang="scss" scoped>
.modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 0;
    height: 0;
    z-index: 100000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 300ms, width 0s 300ms, height 0s 300ms;
    .modal-box {
        flex-shrink: 0;
        flex-grow: 0;
        // width: 842rem;
        // height: 696rem;
        padding:0 0 50rem;
        background: #474747;
        border-radius: 16rem;
        overflow: hidden;
        position: relative;
        z-index: 5002;
        transform: translateY(40rem);
        transition: transform 300ms;
    }
    .modal-header {
        padding: 30rem 0;
        h2 {
            text-align: center;
            font-weight: 800;
            font-size: 32px;
            line-height: 120%;
            color:#fff;
        }
    }
    .modal-content {
        height: calc(100% - 90rem);
        overflow: hidden;
        transition: height 300ms 300ms;
    }
    &.active {
        opacity: 1;
        // width: 100vw;
        width: 100%;
        height: 100vh;
        transition: opacity 300ms, width 0s, height 0s;
        .modal-box {
            transform: translateY(0);
        }
    }
}
.scroll-box{
    text-align: center;
    width:100%;
    padding:0 50px;
    box-sizing: border-box;
    margin:0 auto;
    >img{
        width:221rem;
        margin:0 auto 38rem;
        display: block;
    }
    p{
        font-weight: 400;
        line-height: 160%;
        text-align: center;
        font-size: 20px;
        color:rgba(255, 255, 255, 0.75);
        span{
            background: linear-gradient(90deg, #F365AC 9.19%, #3BDECD 87.87%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            font-style: italic;
            font-weight: 800;
            vertical-align: middle;
        }
        i{
            font-weight: 800;
            color:#fff;
        }
    }
    .btn-box{
        display: flex;
        justify-content: center;
        width:713rem;
        margin:33rem auto 0;
        :nth-child(2){
            margin-left:33rem;
        }
        img{
            display: inline-block;
            width:18rem;
            height:18rem;
            margin-left:10rem;
            vertical-align: middle;
        }
        button,a{
            cursor: pointer;
            display: block;
            height: 75rem;
            width: 340rem;
            border-radius: 88rem;
            font-size: 24rem;
            line-height: 120%;
            // min-width:340px;
            // min-height:75px;
            line-height: 75rem;
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
                border: 1rem solid rgba(219, 219, 219, 0.8);
                background: transparent;
                font-weight: 500;
                &:hover{
                    border: 1rem solid rgba(0, 0, 0, 0.7);
                }
            }
            &.btn-empty{
                background:url('../assets/btn-bg.png') no-repeat center center;
                background-size:contain;
                border:none;
                color:#fff;
                font-size:20rem;
                font-weight: 700;
                &:hover{
                    font-weight: 700;
                    transition: background 300ms;
                    background: linear-gradient(315deg, #3BDECD 12%, #F365AC 88%);
                }
            }
            &.btn-disabled{
                background:url('../assets/btn-bg.png') no-repeat center center;
                background-size:contain;
                border:none;
                color:#fff;
                font-size:20rem;
                font-weight: 700;
                opacity: .5;
                &:hover{
                    cursor: auto;
                }
            }
        }
    }
}
</style>
