<template>
    <div class="explore" :class="locale">
        <div class="first-wrapper">
            <button @Click="click1">按钮success</button>
            <button @Click="click2">按钮delete</button>
            <button @Click="click3">按钮warning</button>
            <button @Click="click4">按钮notice</button>
            <button @Click="click5">按钮自定义</button>
            <button @click.stop="invite.show()">打开invite文本弹框</button>
        </div>
        <artist-invite-artist ref="invite"></artist-invite-artist>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount, nextTick } from "vue";
import Headline from "@/views/components/common-title/headline.vue";
import { useI18n } from "vue-i18n";
import { POST } from "/utils/api.js";
import $dialog from "@/views/components/dialog";
import ArtistInviteArtist from "@/views/components/docs/artist-invite-artist.vue";
const click1 = () => {
    $dialog({
        type: "success",
    });
};
const click2 = () => {
    $dialog({
        type: "delete",
        callBack: (loading, closeFn) => {
            loading.value = true;
            setTimeout(() => {
                console.log("我才关");
                closeFn();
            }, 2000);
        },
    });
};
const click3 = () => {
    $dialog({
        type: "warning",
    });
};
const click4 = () => {
    $dialog({
        type: "notice",
    });
};
const click5 = () => {
    $dialog({
        type: "success",
        title: "恭喜成功",
        content: "啦啦啦啦啦啦",
        callBack: (loading, closeFn) => {
            console.log("我是自定义的！");
            closeFn();
        },
    });
};
const invite = ref()
</script>
<style lang="scss" scoped>
.explore {
    .first-wrapper {
        width: 100vw;
        height: 1080px;
        background: url("@/assets/images/page-bg/color-light-b.jpg") no-repeat center center/cover;
        padding-top: 167px;
        position: relative;
        z-index: 2;
        .bg-vague {
            height: 428.03px;
            background: url("@/assets/images/explore/bg-vague.png") no-repeat
                center center/cover;
            position: absolute;
            top: 476px;
            left: 0;
            width: 100vw;
            opacity: 0.55;
            z-index: 1;
        }
    }
    .regist-count {
        margin: 37px 0 0;
        text-align: center;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 160%;
        vertical-align: baseline;
        color: #000000;
        > span {
            font-style: italic;
            font-weight: 900;
            font-size: 45px;
            line-height: 120%;
            color: #505050;
            vertical-align: baseline;
        }
        &.m-style {
            display: none;
        }
    }
    .fly-works {
        margin-top: 88px;
        user-select: none;
        -webkit-user-drag: none;
        .fly-row {
            width: 100vw;
            height: 247.93px;
            margin-bottom: 37px;
            overflow: hidden;
            position: relative;
            .fly-item {
                position: absolute;
                top: 0;
                z-index: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                > ul {
                    flex-shrink: 0;
                    flex-grow: 1;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    > * {
                        flex-shrink: 0;
                        flex-grow: 0;
                    }
                    > li {
                        flex-shrink: 0;
                        flex-grow: 1;
                        width: 180px;
                        position: relative;
                        margin-left: 57px;

                        .anchor-img {
                            margin: 0 auto;
                            display: block;
                            width: 180px;
                            height: 180px;
                            overflow: hidden;
                            border-radius: 50%;
                            background: rgba(0, 0, 0, 0.2) no-repeat center
                                center / cover;
                            &.noimg {
                                background: url("@/assets/images/home/logo-x.svg")
                                        no-repeat center center / 41.05% 48.148%,
                                    linear-gradient(
                                        259.7deg,
                                        #35c7b8 1.14%,
                                        #f365ac 98.43%
                                    );
                            }
                            > :deep(canvas) {
                                display: block;
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .icon {
                            width: 50px;
                            height: 50px;
                            position: absolute;
                            right: 0;
                            top: 130px;
                        }
                        .name {
                            max-width: 163px;
                            margin-top: 28px;
                            font-style: italic;
                            font-weight: 900;
                            font-size: 30px;
                            line-height: 120%;
                            /* or 36px */
                            text-align: center;
                            text-transform: capitalize;
                            color: #505050;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            text-align: center;
                        }
                    }
                }
            }
            &:nth-child(odd) {
                .fly-item {
                    left: 0;
                }
            }
            &:nth-child(even) {
                .fly-item {
                    right: 0;
                }
            }
        }
    }
}

/** default style ----START---- **/

/** default style -----END----- **/
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
    .explore {
        .fly-works {
            .fly-row {
                .fly-item {
                    ul > li {
                        margin-left: 50px;
                        width: 160px;
                        .anchor-img {
                            width: 160px;
                            height: 160px;
                        }
                        .icon {
                            width: 41.6666666px;
                            height: 41.6666666px;
                            top: 120px;
                            right: 7px;
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 1200px) {
    // lg
    .explore {
        .first-wrapper {
            height: 1020px;
        }
        .fly-works {
            .fly-row {
                .fly-item {
                    ul > li {
                        margin-left: 46px;
                        width: 140px;
                        .anchor-img {
                            width: 140px;
                            height: 140px;
                        }
                        .icon {
                            width: 38.8888888px;
                            height: 38.8888888px;
                            top: 100px;
                            right: 0;
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .explore {
        .fly-works {
            .fly-row {
                .fly-item {
                    ul > li {
                        margin-left: 36px;
                        width: 120px;
                        .anchor-img {
                            width: 120px;
                            height: 120px;
                        }
                        .icon {
                            width: 33.3333333px;
                            height: 33.3333333px;
                            top: 86px;
                            right: 0;
                        }
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 769px) {
    .mobile-only {
        display: none;
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .explore {
        .first-wrapper {
            height: 912px;
        }
        .fly-works {
            .fly-row {
                height: 150px;
                margin-bottom: 33px;
                .fly-item {
                    ul > li {
                        margin-left: 28.5px;
                        width: 100px;
                        .anchor-img {
                            width: 100px;
                            height: 100px;
                        }
                        .icon {
                            width: 27.7777777px;
                            height: 27.7777777px;
                            top: 70px;
                            right: 0;
                        }
                        .name {
                            margin-top: 14px;
                            font-size: 18px;
                            line-height: 120%;
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .explore {
        .first-wrapper {
            height: 690px;
            padding-top: 86px;
            background: linear-gradient(
                    to bottom,
                    rgb(255, 255, 255, 0) 25%,
                    rgb(255, 255, 255, 0.98) 50%
                ),
                url("@/assets/images/explore/explore-m-bg.png") no-repeat center
                    center/cover;
            .bg-vague {
                width: 639.06px;
                height: 228.14px;
                background: url("@/assets/images/explore/m-bg-vague.png")
                    no-repeat center center/cover;
                top: 134px;
            }
        }
        .regist-count {
            margin: 33px 0 0;
            font-size: 15px;
            span {
                font-size: 32px;
            }
            &.pc-style {
                display: none;
            }
            &.m-style {
                display: block;
            }
        }
        .fly-works {
            margin-top: 35px;
            .fly-row {
                height: 124px;
                .fly-item {
                    ul > li {
                        width: 90px;
                        .anchor-img {
                            width: 90px;
                            height: 90px;
                        }
                        .icon {
                            width: 25px;
                            height: 25px;
                            top: 64px;
                            right: 0;
                        }
                        .name {
                            margin-top: 14px;
                            font-size: 18px;
                            line-height: 120%;
                        }
                    }
                }
            }
        }
    }
}
</style>
