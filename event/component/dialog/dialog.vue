
<template>
    <transition name="toast-box" @click.stop="(type==='congrats'&&confirm())||(type==='taskFinish'&&close())">
        <div v-show="_show" class="toast-box" :class="{'toast-notice':type==='notice'||type==='congrats', 'toast-task-finish':type==='taskFinish'}">
            <transition name="toast">
                <div v-show="_show" class="toast">
                    <img :src="imgName" alt="" />
                    <p class="content" v-html="content"></p>
                    <div class="toast-button-box" v-if="type==='notice'">
                        <div class="toast-button" @click="close()">
                            <div>Cancel</div>
                        </div>
                        <div class="toast-button" @click="confirm()">
                            <div>confirm</div>
                        </div>
                    </div>
                    <div class="toast-button-box" v-if="type==='congrats'">
                        <a href="#top-rank" class="toast-button" @click.stop="confirm()">
                            <div>View Top</div>
                        </a>
                        <socialShare :pfid="userStore.userinfo.pfid" :txt="txt" class="toast-button">
                            <div @click.stop="confirm()">
                                <div>Share</div>
                            </div>
                        </socialShare>
                    </div>
                    <div class="toast-button-box" v-if="type==='taskFinish'">
                        <div class="toast-button" @click="close()">
                            <div>I will be back!</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {useUserStore} from "@/store/user.js";
import successImg from "../../assets/icon-success.png";
import failedImg from "../../assets/icon-failed.png";
import noticeImg from "../../assets/icon-notice.png";
import congratsImg from "../../assets/icon-congrats.png";
import socialShare from "../social-share.vue"
const txt = "Share over 100,000 USDT rewards everyday!\nI got $HNX for my aesthetics!\nLike or not? Earn by art!";
const userStore = useUserStore();
const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    closeCallBack: {
        type: Function, //关闭回调
        default: null,
    },
    callBack: {
        type: Function, //成功回调
        default: null,
    },
    remove: {
        type: Function, //传入移除节点方法,这里是createApp中的方法
        default: null,
    },
    //可用html标签内容
    content: {
        type: String,
        default: "",
    },
    btnText: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "success",
    },
});

const imgName = ref(null);

onMounted(() => {
    if (props.type === "success") {
        imgName.value = successImg;
        open('remove');
    }else if (props.type === "failed") {
        imgName.value = failedImg;
        open('remove');
    } else if (props.type === "notice") {
        imgName.value = noticeImg;
        open();
    } else if (props.type === "congrats") {
        imgName.value = congratsImg;
        open();
    } else if (props.type === "taskFinish") {
        imgName.value = congratsImg;
        open();
    }
});

const _show = ref(false);

const open = (err) => {
    if (_show.value) return;
    _show.value = true;
    err==='remove'&&setTimeout(close,3000);
};

const content = ref(props.content);


const close = () => {
    if (props.closeCallBack && typeof props.closeCallBack === "function") {
        props.closeCallBack( () => {
            _show.value = false;
            setTimeout(props.remove, 300);
        });
    } else {
        _show.value = false;
        setTimeout(props.remove, 300);
    }
};
const confirm = () =>{
    if (props.callBack && typeof props.callBack === "function") {
        props.callBack( () => {
            _show.value = false;
            setTimeout(props.remove, 300);
        });
    } else {
        _show.value = false;
        setTimeout(props.remove, 300);
    }
};

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
.toast-box {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    overflow: hidden;
    z-index: 5000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    &.toast-notice{
       .toast{
            height:332rem;
       }
    }

    &.toast-task-finish{
        .toast{
            height:382rem;

            .content{
                line-height: 170%;
            }
        }

        .toast-button{
            width: 214rem;
            
            div{
                width: 212rem;
                text-transform: none;
            }
        }
    }
    .toast {
        width: 564rem;
        min-height: 252rem;
        background: #474747;
        border-radius: 16rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* transform: translateY(40px);
        transition: 300ms; */
        img {
            width: 75px;
            height: 75px;
        }
        .content {
            font-size: 20rem;
            line-height: 120%;
            text-align: center;
            // text-transform: capitalize;
            color: #fff;
            margin: 23rem auto;
        }
        .toast-button-box{
            display: flex;
        }
        &-button {
            margin:0 10rem;
            box-sizing: border-box;
            width: 162rem;
            height: 50rem;
            border-radius: 50rem;
            background: linear-gradient(90deg, #f365ac 9.19%, #3bdecd 87.87%);
            cursor: pointer;
            user-select: none;
            div {
                border-radius: 48rem;
                width: 160rem;
                height: 48rem;
                background: #474747;
                margin: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                font-weight: 400;
                font-size: 20rem;
                line-height: 160%;
                // text-transform: capitalize;
                color: #fff;
                &:hover{
                    transition: background 300ms;
                    background: linear-gradient(90deg, #f365ac 9.19%, #3bdecd 87.87%);
                }

            }
        }
    }
}

</style>
