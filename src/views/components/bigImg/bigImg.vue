<template>
    <transition name="toast-box">
        <div v-show="_show" class="toast-box" @click.self="close"  @click.stop @mousewheel.stop.prevent>
            <transition name="toast">
                <div
                    v-show="_show"
                    :class="`toastImg ${loading ? 'toast-loading' : ''}`"
                >
                    <img :src="imgResize(Img,800,800,false,true)" alt="" />
                </div>
            </transition>
        </div>
    </transition>
</template>
<script setup>

import {imgResize} from "/utils/imgResize.js";
import { onMounted, ref } from "vue";
const props = defineProps({
    Img: {
        type: String,
        default: "",
    },
    remove: {
        type: Function, //传入移除节点方法,这里是createApp中的方法
        default: null,
    },
});
onMounted(() => {
    _show.value = true;
});

const _show = ref(false);
const Img = ref(props.Img);
const loading = ref(false);

const close = () => {
    _show.value = false;
    setTimeout(props.remove, 300);
};

defineExpose({ close });
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
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    .toastImg {
        max-width: 30vw;
        max-height: 30vw;
        background: #fff;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        /* transform: translateY(40px);
        transition: 300ms; */
        img {
            width: 100%;
            height: 100%;
        }
    }
    .toast-loading {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }
}

.toast-box-enter-active {
    animation: fade 300ms;
}

.toast-box-leave-active {
    animation: fade 300ms reverse;
}

@keyframes fade {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.toast-enter-active {
    animation: tran 300ms;
}

.toast-leave-active {
    animation: tran 300ms reverse;
}
@keyframes tran {
    0% {
        transform: translateY(40px);
    }
    100% {
        transform: translateY(0);
    }
}

@media only screen and (max-width: 600px) {
    .toast-box {
        .toastImg {
            width: 60vw;
            height: 60vw;
        }
    }
    .toast-mob-enter-active {
        animation: tranX 300ms;
    }

    .toast-mob-leave-active {
        animation: tranX 300ms reverse;
    }
    @keyframes tranX {
        0% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(0);
        }
    }
}
</style>
