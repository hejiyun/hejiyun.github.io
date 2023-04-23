<template>
    <div
        class="modal-wrap"
        :class="{ active: active }"
        @click.stop
        @mousewheel.stop.prevent
    >
        <div class="modal-box" @click.stop @mousewheel.stop.prevent>
            <i class="modal-close">
                <ax-icon
                    :class="isMobile ? 'icon-arrow-left' : 'icon-times'"
                    @click.stop="hide()"
                ></ax-icon>
            </i>
            <div class="modal-header">
                <h2>{{ $t("docs.invite") }}</h2>
            </div>
            <div class="modal-content">
                <div
                    class="type-box scroll-box"
                    ref="scrollBox"
                    @mousewheel.stop
                >
                    <zh-tw v-if="/^zh/.test(locale)"></zh-tw>
                    <en-us v-else></en-us>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import AxIcon from "@/components/ax-dom/ax-icon.vue";
import { useI18n } from "vue-i18n";
import ZhTw from "@/views/components/docs/invite-zh-tw.vue";
import EnUs from "@/views/components/docs/invite-en-us.vue";
const { locale } = useI18n();

const active = ref(false);
const scrollBox = ref();
const show = (formData) => {
    active.value = true;
    scrollBox.value.scrollTop = 0;
};
const hide = () => {
    active.value = false;
};
defineExpose({ show, hide });

const isMobile = ref(false);
const resetHeight = () => {
    isMobile.value = ~~window.innerWidth <= 768;
};
resetHeight();
window.addEventListener("resize", resetHeight);
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
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 300ms, width 0s 300ms, height 0s 300ms;
    .modal-box {
        flex-shrink: 0;
        flex-grow: 0;
        width: 800px;
        height: 66%;
        background: #fff;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        z-index: 5002;
        transform: translateY(40px);
        transition: transform 300ms;
    }
    .modal-close {
        font-size: 24px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: block;
        padding: 8px;
        border-radius: 20px;
        position: absolute;
        top: 33px;
        right: 22px;
        &:hover {
            background: rgba(244, 244, 244, 0.9);
        }
    }
    .modal-header {
        padding: 40px 0;
        h2 {
            font-size: 26px;
            text-align: center;
            font-weight: 800;
            line-height: 120%;
            color: rgba(0, 0, 0, 0.75);
        }
    }
    .modal-content {
        height: calc(100% - 141px);
        overflow: hidden;
        transition: height 300ms 300ms;
    }
    &.active {
        opacity: 1;
        width: 100vw;
        height: 100vh;
        transition: opacity 300ms, width 0s, height 0s;
        .modal-box {
            transform: translateY(0);
        }
    }
}
.scroll-box {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
}
:deep(article) {
    font-size: 13px;
    line-height: 140%;
    padding: 0 30px;
    color: rgba(0, 0, 0, 0.75);
    * {
        font-size: inherit;
        line-height: inherit;
    }
    > * {
        padding: 4px 0;
    }
    .timer {
        text-align: center;
        padding-top: 0;
    }
    &:nth-child(1) {
        padding-top: 0;
    }
    h3 {
        padding: 24px 0 12px;
        font-weight: 800;
    }
    h3 + * {
        padding-top: 0;
    }
    li {
        padding: 6px 0;
        &:first-child {
            padding-top: 0;
        }
    }
}
@media screen and (max-width: 768px) {
    .modal-wrap {
        .modal-box {
            width: 100vw;
            height: 100vh;
            background: #fff;
            border-radius: 0;
            transform: translateX(10px);
            padding-top: constant(safe-area-inset-top); /* iOS < 11.2 */
            padding-top: env(safe-area-inset-top); /* iOS >= 11.2 */
            padding-bottom: constant(safe-area-inset-bottom); /* iOS < 11.2 */
            padding-bottom: env(safe-area-inset-bottom); /* iOS >= 11.2 */
        }
        .modal-close {
            font-size: 24px;
            width: 44px;
            height: 44px;
            padding: 10px;
            border-radius: 20px;
            margin-top: constant(safe-area-inset-top); /* iOS < 11.2 */
            margin-top: env(safe-area-inset-top); /* iOS >= 11.2 */
            top: 0;
            left: 5px;
            right: initial;
        }
        .modal-header {
            width: 218px;
            margin: 0 auto;
            padding: 10px 0 15.56px;
            h2 {
                font-weight: 900;
                font-size: 22px;
                line-height: 28px;
            }
        }
        .modal-content {
            overflow: hidden;
            transition: none;
            height: calc(100% - 48px);
        }
        &.active {
            opacity: 1;
            width: 100vw;
            height: 100vh;
            transition: opacity 300ms, width 0s, height 0s;
            .modal-box {
                transform: translateX(0);
            }
        }
    }
    :deep(article) {
        font-size: 15px;
        line-height: 140%;
        padding: 12px 16px;
        color: rgba(0, 0, 0, 0.75);
        * {
            font-size: inherit;
            line-height: inherit;
        }
        > * {
            padding: 6px 0;
        }
        h3 {
            padding: 18px 0 12px;
            font-size: 18px;
            font-weight: 900;
        }
        li {
            padding: 6px 0;
        }
    }
}
</style>
