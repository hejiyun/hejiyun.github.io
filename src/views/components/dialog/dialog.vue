<script setup>
import { onMounted, ref } from "vue";
import successImg from "../../../assets/images/icon-success.png";
import deleteImg from "../../../assets/images/icon-delete.png";
import warningImg from "../../../assets/images/icon-warning.png";
import noticeImg from "../../../assets/images/icon-notice.png";

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    callBack: {
        type: Function, //成功回调
        default: null,
    },
    remove: {
        type: Function, //传入移除节点方法,这里是createApp中的方法
        default: null,
    },
    title: {
        type: String,
        default: "",
    },
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
        success();
    } else if (props.type === "delete") {
        imgName.value = deleteImg;
        todelete();
    } else if (props.type === "warning") {
        imgName.value = warningImg;
        warning();
    } else if (props.type === "notice") {
        imgName.value = noticeImg;
        notice();
    }
    document.onkeydown = (e) => {
        if (e.keyCode === "27" || e.key === "Escape") close();
    };
});

const _show = ref(false);

const open = () => {
    if (_show.value) return;
    _show.value = true;
};

const title = ref(props.title);
const content = ref(props.content);
const btnText = ref(props.btnText);

const success = () => {
    !title.value && (title.value = "successfully Saved");
    !content.value && (content.value = "Everything is Working Normally.");
    !btnText.value && (btnText.value = "continue");
    open();
};
const todelete = () => {
    !title.value && (title.value = "Delete Your Artwork");
    !content.value &&
        (content.value = "Are you sure to delete these Artworks?");
    !btnText.value && (btnText.value = "confirm");
    open();
};
const warning = () => {
    !title.value && (title.value = "Please fill in your details");
    !content.value &&
        (content.value =
            "Please Register an Account before You Can Publish Artworks.");
    !btnText.value && (btnText.value = "continue");
    open();
};
const notice = () => {
    !title.value && (title.value = "Coming soon");
    !content.value && (content.value = "are you ready?");
    !btnText.value && (btnText.value = "continue");
    open();
};

const loading = ref(false);

const close = () => {
    if (props.callBack && typeof props.callBack === "function") {
        props.callBack(loading, () => {
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

<template>
    <transition name="toast-box">
        <div v-show="_show" class="toast-box" @click.self="close">
            <transition name="toast">
                <div
                    v-show="_show"
                    :class="`toast ${loading ? 'toast-loading' : ''}`"
                >
                    <img :src="imgName" alt="" />
                    <p class="title">{{ title }}</p>
                    <p
                        :class="`content ${
                            props.type === 'warning' ? 'warning-content' : ''
                        }`"
                    >
                        {{ content }}
                    </p>
                    <div
                        class="toast-button"
                        @click="
                            () => {
                                !loading && close();
                            }
                        "
                    >
                        <div>{{ btnText }}</div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

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
    .toast {
        width: 564px;
        height: 364px;
        background: #ffffff;
        border-radius: 16px;
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
        .title {
            font-style: normal;
            font-weight: 800;
            font-size: 28px;
            line-height: 120%;
            text-align: center;
            text-transform: capitalize;
            color: rgba(0, 0, 0, 0.75);
            margin: 26px 0 12px 0;
        }
        .content {
            width: 421px;
            padding: 0 32px;
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 160%;
            text-align: center;
            text-transform: capitalize;
            color: #000000;
        }
        .warning-content {
            padding: 0 40px;
        }
        &-button {
            margin-top: 25px;
            box-sizing: border-box;
            width: 162px;
            height: 50px;
            border-radius: 50px;
            background: linear-gradient(90deg, #f365ac 9.19%, #3bdecd 87.87%);
            cursor: pointer;
            user-select: none;
            div {
                border-radius: 48px;
                width: 160px;
                height: 48px;
                background: #fff;
                margin: 1px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 160%;
                text-transform: capitalize;
                color: rgba(0, 0, 0, 0.75);
            }
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
        .toast {
            width: 322px;
            height: 284px;
            background: #ffffff;
            border-radius: 8px;

            img {
                width: 62px;
                height: 62px;
            }

            .title {
                font-size: 22px;
                line-height: 160%;
                margin: 17px 0 6px 0;
            }

            .content {
                width: 239px;
                padding: 0 !important;
                font-size: 15px;
            }

            &-button {
                margin-top: 9px;
                width: 168px;
                height: 50px;
                div {
                    width: 166px;
                    height: 48px;
                    font-weight: 700;
                    font-size: 15px;
                }
            }
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
