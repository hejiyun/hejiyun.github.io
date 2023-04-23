<template>
    <div class="hb-container hb-ele">
        <div class="slide-btn click-left" v-if="!currentIsLike&&voteSt">
            <div class="click-btn" :class="{click1: clickLeft=='left'}" @click.stop="toSlide('left')"></div>
            <img class="font" src="../assets/click-left4.png" alt="">
        </div>
        <!-- <div class="center" v-if="isGuide">
            <span></span>
        </div> -->
        <div class="center-img">
            <div class="center-imgcon" >
                <div 
                    class="hb-img"
                    :class="{
                        'slide-left': slideDirection=='left'&&(lastImgIndex==index), 
                        'slide-right': slideDirection=='right'&&(lastImgIndex==index),
                        'cur-img': currentImgIndex==(index+1),
                    }"
                    v-for="(item, index) in eventData&&eventData.works" 
                    :key="index+1" 
                    :style="{'z-index': index*(-1)}"
                    :ref="setRef"
                >
                    <div class="ovf-hidden">
                        <img class="hb-show" :src="imgResize(item.img_url,800,800)" alt="">
                        <img class="is-like-icon is-like-left" v-show="slideDirection=='left'" src="../assets/click-left3.png" alt="">
                        <img class="is-like-icon is-like-right" v-show="slideDirection=='right'" src="../assets/click-right3.png" alt="">
                    </div>
                </div>
                
            </div>
        </div>

        <div class="slide-btn click-right" v-if="!currentIsLike&&voteSt">
            <div class="click-btn" :class="{click2: clickLeft=='right'}" @click.stop="toSlide('right')" ></div>
            <img class="font" src="../assets/click-right4.png" alt="">
        </div>

        <div class="thumbnail">
            <div 
                class="thumbnail-item"
                v-for="(item, index) in eventData&&eventData.works" 
                :key="index+1" 
                :class="{'active': item.st, 'select-st': currentImgIndex==(index+1)}"
                @click="viewBigImg(index+1)"
            >
                <div class="item-con"><img :src="imgResize(item.img_url,200,200)" alt=""></div>
                <img v-if="item.st" class="select-icon" src="../assets/select-icon.png" alt="">
            </div>
        </div>
    </div>
    

    <!-- 完成以后分享的组件 -->
    <!-- <reminder ref="reminderRef"></reminder> -->
    
</template>

<script setup>
import {ref, toRefs, reactive, onMounted, onUpdated, nextTick, watch,inject} from 'vue'
import {POST} from "/utils/api.js";
import {imgResize} from "/utils/imgResize.js";
import {useUserStore, useWalletStore} from "@/store/user.js";
import {useEvent} from "../store/event.js"
import { storeToRefs } from 'pinia';
import $dialog from "./dialog";
// import reminder from "./reminder.vue"


// const reminderRef = ref();
// const toReminder = ()=>{
//     nextTick(()=>{
//         reminderRef.value.show();
//     })
// }
const toReminder = inject('toReminder');
// toReminder();
const getParam = inject('getParam');

const hbImgList = [];
const setRef = (el)=> {
    hbImgList.push(el)
};

const useEventStore = useEvent()
const walletStore = useWalletStore();
const userStore = useUserStore();
const {eventData} = storeToRefs(useEventStore)

const props = defineProps({
    isGuide: Boolean,
    hbList: Array,
})


// let client_id = localStorage.getItem("client_id")

let state = reactive({
    currentImgIndex: 1,
    lastImgIndex: -1,
    slideDirection: "",
    clickLeft: "",
    clickRight: "",
    currentIsLike: false,
    voteSt: false,  // 当天的投票状态，false今天没有投票机会(每天的3次和分享的2次，共5次都用完了)  true今天还有可投票的机会
})
const {currentImgIndex, lastImgIndex, slideDirection, clickLeft, clickRight, currentIsLike, voteSt} = toRefs(state)

state.voteSt = !eventData.value.today_share1_st||!eventData.value.today_share2_st||(eventData.value.remain_cnt>0)

const checkCurLikeSt = ()=>{
    if(eventData.value.works.length&&eventData.value.works[state.currentImgIndex-1].st){
        state.currentIsLike = true
    } else {
        state.currentIsLike = false
    }
}
checkCurLikeSt()

const checkVoteSt = ()=>{
    
    // console.log(useEventStore.eventData.today_share1_st, useEventStore.eventData.today_share2_st)
    // let tag = true
    if(eventData.value.remain_cnt<=0){
        // 没有登录, 弹登录框
        if(userStore.userinfo.access_token==""){
            window.openLogin(true)
            return false
        }

        // 今天可分享次数>0的时候，弹分享框
        if(!useEventStore.eventData.today_share1_st||!useEventStore.eventData.today_share2_st){
            toReminder();//调用完成分享的方法
            return false
        }

        // 一天的五次机会用完，like按钮消失
        state.voteSt = !eventData.value.today_share1_st||!eventData.value.today_share2_st||(eventData.value.remain_cnt>0)
        return false
    } else {
        return true
    }
    
}


let clickFlag = true
const toSlide = (direction, index)=>{
    if(!checkVoteSt()){
        return false
    }

    if(clickFlag){
        clickFlag = false
        setTimeout(()=>{
            clickFlag = true
        }, 800)
    } else {
        return false
    }

    if(state.currentImgIndex>useEventStore.eventData.works.length){
        return false
    }

    // todo
    // hb api 
    if(direction=="right"){
        try{
            POST(`${window.api.eapi}/event/2023/vote2earn/choose`,
            {
                client_id: localStorage.getItem("client_id"),
                w_id: useEventStore.eventData.works[state.currentImgIndex-1].w_id,
                type: direction=="left" ? 2 : 1,
                invite_pfid: getParam('invite_pfid')
            },
            {
                'USER-PFID':userStore.userinfo.pfid,
                'USER-TOKEN':userStore.userinfo.access_token
            }).then((res)=>{
                if(res.ret_code==0){
                    // if(res.data.beat>0){
                    //     useEventStore.$patch({
                    //         beat: res.data.beat
                    //     });
                    // }
                    res.data.beat>0&&useEventStore.$patch({ beat: res.data.beat});
                    res.data.click_cnt===3&&res.data.beat>0&&useEventStore.$patch(() =>{ eventData.value.new_reward_st =  1}); //为了点完三次的时候就去更新new_reward的标签气泡
                    // 投票喜欢成功后要给下方缩略图加上like的标识，并更新剩余投票次数remain_cnt
                    // useEventStore.$patch(() => {
                    //     eventData.value.works[state.lastImgIndex].st = 1
                    //     eventData.value.remain_cnt = res.data.remain_cnt;
                    // })
                    useEventStore.$patch(() => {
                        eventData.value.works = res.data.works
                        eventData.value.remain_cnt = res.data.remain_cnt;
                    })

                    if(res.data.click_cnt===3&&getParam('invite_pfid')&&userStore.userinfo.pfid){
                        window.gaPram('Binding_Wallet&&Slip_Finish');
                    }
                    
                    // 打点
                    switch(res.data.click_cnt){
                        case 3: window.gaPram('Slip_Finish3'); walletStore.getWalletInfo(true); break;
                        case 4: window.gaPram('Slip_Finish4'); break;
                        case 5: window.gaPram('Slip_Finish5'); break;
                    }

                    checkVoteSt()

                    if(!state.voteSt){
                        $dialog({
                            type: "taskFinish",
                            content: "Congrats! You've completed voting today.<br>Check your today's $HNX.<br>Please participate in voting tomorrow and share<br>1,000,000 $HNX!",
                            callBack: (closeFn) => {
                                closeFn();
                            },
                        });
                    }

                } else if(~~res.ret_code===600||~~res.ret_code===-2){ // 600:登录过期，-2:跨天choose或者活动结束choose，刷新页面
                    window.toast(res.ret_msg)
                    setTimeout(()=>{
                        window.location.reload();
                    },1000);
                }else {
                    window.toast(res.ret_msg)
                }

            });

        } catch (err){
            window.toast(err.ret_msg)
        }
    }
    
    nextTick(()=>{
        // setTimeout(()=>{
        //     useEventStore.$patch({
        //         hbState: 1
        //     });
        //     emit("upHBState")
        // }, 800)
        if(state.currentImgIndex==(useEventStore.eventData.works.length+1)){
            state.lastImgIndex = useEventStore.eventData.works.length - 1
            state.currentImgIndex=1
        } 
        
    }, )

    state.slideDirection=direction
    state.clickLeft = direction
    state.clickRight = direction
    state.lastImgIndex = state.currentImgIndex-1
    state.currentImgIndex = (state.currentImgIndex==(useEventStore.eventData.works.length)) ?  1 : state.currentImgIndex+1

    // 2.喜欢后的大图：next/&ike选择按钮消失；
    checkCurLikeSt()

    setTimeout(()=>{
        state.clickLeft = ""
        state.clickRight = ""
    }, 500)

    setTimeout(()=>{
        hbImgList[state.lastImgIndex].classList.remove("slide-left", "slide-right")
    }, 700)
    
}

const viewBigImg = (index)=>{
    if(index==state.currentImgIndex) return false
    state.currentImgIndex = index
    state.lastImgIndex = -1
    checkCurLikeSt()
}

onUpdated(()=>{
    checkCurLikeSt()
    state.voteSt = !eventData.value.today_share1_st||!eventData.value.today_share2_st||(eventData.value.remain_cnt>0)
})

</script>

<style lang="scss" scoped>

.hb-container{
    // position: absolute;
    // left: 50%;
    // top: 50%;
    position: relative;
    width: 1056rem;
    margin:0 auto;
    // height: 500rem;
    // height: 100vh;
    // transform: translate(-50%, -50%);
    

    &.hb-ele{
        .slide-btn{
            .click-btn{
                animation: none;
            }

            .click-btn{
                // transition: all .3s linear;
                cursor: pointer;
            }

            .click1, .click2{
                animation: btnscale .5s linear;
                animation-delay: none;
            }
            
        }

        .center{
            display: none;
        }

        .center-img{
            .center-imgcon{
                opacity: 1;
                transform: scale(1);
            }
        }
    }

    .slide-btn{
        position: absolute;
        top: 32%;
        z-index: 10;
        // margin-top: -119rem;

        .click-btn{
            width: 125rem;
            height: 125rem;
            border-radius: 50%; 
        }

        .font{
            position: absolute;

            left: 50%;
            transform: translateX(-50%);
            opacity: 1;
            transition: opacity .6s linear;
        }
        
    }

    .hover-btn{
        &:hover{
            .font{
                opacity: 1;
            }
        }
    }
    

    @keyframes btnscale {
        0%{
            transform: scale(1);
        }
        50%{
            transform: scale(1.1);
        }
        100%{
            transform: scale(1);
        }
    }

    .click-left{
        left: 0;
    
        .click-btn{
            background: url("../assets/click-left.png") no-repeat center center;
            background-size: 100%;
            animation: btnscale 2s ease  infinite;
        }

        .font{
            top: 157rem;
            width: 110rem;
        }
    }

    .click-right{
        right: 0;
        
        .click-btn{
            background: url("../assets/click-right.png") no-repeat center center;
            background-size: 100%;
            animation: btnscale 2s ease infinite;
            animation-delay:1s;
        }

        .font{
            top: 150rem;
            width: 100rem;
        }
    }

    
    @keyframes slide{
        0%{
            transform: translate(-30%, -58%) rotate(20deg);
            border: 2px solid rgba(255, 133, 196, 0.5);
            box-shadow: 0px 0px 60px rgba(254, 158, 218, 0.5);
            opacity: 1;
            background-image: url("../assets/click-right2.png");
        }

        25%{
            opacity: .3;
        }

        50%{
            transform: translate(-70%, -58%) rotate(-20deg);
            border: 2px solid rgba(59, 222, 205, 0.5);
            box-shadow: 0px 0px 54px rgba(59, 222, 205, 0.5);
            opacity: 1;
            background-image: url("../assets/click-left2.png");
        }

        75%{
            opacity: .3;
        }

        100%{
            transform: translate(-30%, -58%) rotate(20deg);
            border: 2px solid rgba(255, 133, 196, 0.5);
            box-shadow: 0px 0px 60px rgba(254, 158, 218, 0.5);
            opacity: 1;
            background-image: url("../assets/click-right2.png");
        }
    }
    
    .center{
        position: absolute;
        left: 50%;
        top: 50%;

        width: 490rem;
        height: 490rem;

        background: #000000;
        border-radius: 26px;
        transform: translate(-50%, -58%) rotate(0);
        transform-origin:center bottom;
        opacity: 1;
        background-size: 220rem 220rem;
        background-repeat: no-repeat;
        background-position: center center;

        animation: slide 2s ease infinite;
        
    }

    .center-img{
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);

        .center-imgcon{
            position: relative;
            width: 526rem;
            height: 526rem;
            margin:0 auto;

            border-radius: 26px;
            transition: all .4s ease;

            // background: pink;
            opacity: 0;
            
            transform: scale(0);
        }

        .hb-img{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 100%;
            height: 100%;
            
            overflow: hidden;
            transform: translate(-50%, -50%);
            transition: all .8s ease;
            opacity: 0;

            .ovf-hidden{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                // border-radius: 26px;
                // overflow: hidden;
            }

            .hb-show{
                max-width: 100%;
                max-height: 100%;
                // transform: scale(.6);
                transition: all .4s ease;
            }

            .is-like-icon{
                position: absolute;
                left: 50%;
                top: 50%;

                opacity: 0;
                transform: translate(-50%, -50%);
            }

            .is-like-left{
                width: 226rem;
            }

            .is-like-right{
                width: 257rem;
            }
        }

        // 左滑 不喜欢
        .slide-left{
            opacity: 0 !important;
            transform: translate(-90%, -50%) rotate(-12deg);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            filter: blur(4px);
            transform-origin:center bottom;

            .hb-show{
                transform: scale(1);
            }
            .is-like-icon{
                opacity: 1;
            }
        }

        .cur-img{
            opacity: 1 !important;

            &.hb-img{
                .hb-show{
                    transform: scale(1);
                }
            }
        }

        .slide-right{
            opacity: 0;
            transform: translate(-10%, -50%) rotate(12deg);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            filter: blur(4px);
            transform-origin:center bottom;

            .hb-show{
                transform: scale(1);
            }

            .is-like-icon{
                opacity: 1;
            }
        }
    }
}

.thumbnail{
    // position: absolute;
    // left: 50%;
    // bottom: -155rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    
    padding: 0 40rem;
    width: 982rem;
    height: 112rem;
    background: rgba(71, 71, 71, 0.4);
    backdrop-filter: blur(3px);
    border-radius: 12px;
    margin: 20rem auto 0;
    
    // transform: translate(-50%, 0);

    .thumbnail-item{
        position: relative;
        // margin-right: 20rem;
        width: 60rem;
        height: 60rem;
        cursor: pointer;

        &:last-child{
            margin-right: 0;
        }

        &.active, &.select-st{
            &:before{
                display: block;
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;

                width: 72rem;
                height: 72rem;

                border-radius: 10px;
                transform: translate(-50%, -50%);
            }

            &:after{
                display: block;
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                z-index: -1;

                width: 68rem;
                height: 68rem;

                filter: blur(7px);
                border-radius: 7px;

                transform: translate(-50%, -50%);
            }
        }

        &.active{
            &:before{
                border: 3px solid #FF00A0;
            }

            &:after{
                border: 4px solid #FF00A0;
                
            }
        }

        &.select-st{
            &:before{
                border: 3px solid #ffffff;
            }

            &:after{
                border: 4px solid rgba(255, 255, 255, 1);
            }
        }
    }

    .item-con{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        overflow: hidden;

        img{
            width: 100%;
            height: auto;
        }
    }

    .select-icon{
        position: absolute;
        right: -12rem;
        top: -18rem;

        width: 29rem;
    }
}

// @media only screen and (min-width: 2001px) {

    
// }

// @media only screen and (max-width: 2000px) {

// }

// @media only screen and (max-width: 1920px) {


// }

@media only screen and (max-width: 1600px) {
    .hb-container{
        // transform: translate(-50%, -45%);
        width: 860rem;
        // margin-top:90rem;
        // height: 710rem;

        // .center{
        //     width: 365px;
        //     height: 365px;
        //     background-size: 208px 209px;
        // }

        // .slide-msg{
        //     top: -15rem;
        //     font-size: 20rem;
        // }

        .slide-btn{
            top: 30%;
            margin-top: 0;
            
            .click-btn{
                width: 95rem;
                height: 95rem;
            }

            &.click-left{
                .font{
                    top: 124rem;
                    width: 90rem;
                }
            }

            &.click-right{
                .font{
                    top: 120rem;
                    width: 80rem;
                }
            }

        }

        // .center-img{
        //     transform: translate(-50%, -55%);
        // }

        .center-img{
            .center-imgcon{
                width: 380rem;
                height: 380rem;
            }
        }
    }

    .thumbnail{
        bottom: -40rem;
        padding: 0 28rem;
        width: 840rem;
        height: 90rem;

        .thumbnail-item{
            // margin-right: 22rem;
            width: 48rem;
            height: 48rem;

            &.active, &.select-st{
                &:before{
                    width: 61rem;
                    height: 61rem;
                }

                &:after{
                    width: 61rem;
                    height: 61rem;
                }
            }
        }

        .select-icon{
            top: -20rem;
        }
    }
    
}

@media only screen and (max-width: 1200px) {

}

@media only screen and (max-width: 1024px) {

}

</style>