<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="home" :class="locale">
        <top-logo></top-logo>
<!--        <slogan-bak></slogan-bak>-->
        <slogan></slogan>
        <feature></feature>
        <flag></flag>
        <fly-works :users="roleRegUserlist" v-if="roleRegUserlist"></fly-works>
<!--        <div class="regist-count" v-if=" total.artists!==false">
            More than<span>&nbsp;{{total.artists}}&nbsp;</span>Artists and<br class="mobile-only">
            <span>&nbsp;{{total.works}}&nbsp;</span>Artworks<br class="mobile-only">
            have been settled.
        </div>-->
        <page-footer></page-footer>
<!--        <page-footer-bak></page-footer-bak>-->
    </div>
</template>
<script setup>
import {ref, onMounted, onBeforeMount, nextTick, reactive} from 'vue'
import {storeToRefs} from 'pinia';
const emit = defineEmits(['setNewUser', 'getNewUser'])
import { useI18n } from 'vue-i18n'
import TopLogo from '@/views/page/home/top-logo.vue'
import Slogan from "@/views/page/home/slogan.vue";
import Feature from "@/views/page/home/feature.vue";
import Flag from "@/views/page/home/flag.vue";
import FlyWorks from "@/views/page/home/fly-works.vue";
import PageFooter from "@/views/components/page-footer.vue";
const { locale, t } = useI18n()

import {useRoleRegUsersStore} from "@/store/role.js";
// import SloganBak from "@/views/page/home/slogan-bak.vue";
// import PageFooterBak from "@/views/components/page-footer-bak.vue";
const roleRegUsersStore = useRoleRegUsersStore();
const {roleRegUserlist} = storeToRefs(roleRegUsersStore);
const getRoleUser = async () => {
    await roleRegUsersStore.getRoleRegUsersList();
}


onBeforeMount(() => {
    document.querySelector('html').scrollTop = 0
    document.querySelector('body').scrollTop = 0
})
onMounted(() => {
    getRoleUser()
})

</script>
<style lang="scss" scoped>
.home {
    background: linear-gradient(
            to bottom,
            rgb(255, 255, 255, 0) 25%,
            rgb(255, 255, 255, 0.98) 50%
    )
    repeat-x left top,
    url('@/assets/images/home/home-bg.png') calc(50% - 100px) 76px / 200px 210px;

    .regist-count {
        margin: 90px 0 0;
        text-align: center;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 160%;
        vertical-align: baseline;
        color: #000;
        > span {
            font-style: italic;
            font-weight: 900;
            font-size: 60px;
            line-height: 120%;
            color: #505050;
            vertical-align: baseline;
        }
    }
}

@function rem($pxNum) {
    @return calc($pxNum / 37.5) * 1rem;
}
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media screen and (min-width: 769px) {
    .mobile-only {
        display: none;
    }
}
@media screen and (max-width: 768px) {
    .pc-only {
        display: none;
    }
    .home {
        background: #fff;
        .regist-count {
            margin: 75px 0 60px;
            font-size: 20px;
            > span {
                font-size: 32px;
                background: linear-gradient(270.99deg, #3bdecd 1.42%, #f365ac 93.49%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }
        }
    }
}
.zh-TW {
    :deep(.required-chart) {
        &::before {
        }
    }
}
</style>
