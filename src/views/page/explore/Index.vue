<template>
    <div class="explore" :class="locale">
        <div class="first-wrapper">
            <headline :firstLine="'New Arrivals'" :secondLine="''"></headline>
<!--            <div class="regist-count pc-style">
                <span>&nbsp;{{total.artists}}&nbsp;</span>creators in residence
                <span>&nbsp;{{total.works}}&nbsp;</span>pieces of artwork.
            </div>-->
            <div class="regist-count pc-style">&nbsp;</div>
            <div class="bg-vague"></div>

            <fly-works :users="roleRegUserlist" v-if="roleRegUserlist"></fly-works>
            <div class="regist-count m-style">&nbsp;</div>
<!--            <div class="regist-count m-style">
                <span>&nbsp;{{total.artists}}&nbsp;</span><br>creators already in residence<br><br>
                <span>&nbsp;{{total.works}}&nbsp;</span><br>pieces of artwork.
            </div>-->
        </div>
        <div class="second-wrapper">
            <middle-title :text="'Latest Artworks'" id="swiperTop"></middle-title>
            <works-swiper-item v-if="roleUserlist" :listData="roleUserlist" :showDelete="false" :onlyShowTit="false"
                :titleStyle="{'textAlign': 'left', 'white-space': 'nowrap','overflow': 'hidden','text-overflow': 'ellipsis'}"></works-swiper-item>
        </div>
        <page-footer></page-footer>

    </div>
</template>
<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { POST } from '/utils/api.js'
import Headline from '@/views/components/common-title/headline.vue'
import MiddleTitle from '@/views/components/common-title/middle-title.vue'
import WorksSwiperItem from '@/views/components/works-swiper-item/index.vue'
import FlyWorks from '@/views/page/explore/fly-works.vue'
import PageFooter from '@/views/components/page-footer.vue'

import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

import { useRoleUsersStore,useRoleRegUsersStore } from '@/store/role.js'
// import { reactive } from '@vue/reactivity'
const roleUsersStore = useRoleUsersStore()
const roleRegUsersStore = useRoleRegUsersStore()

const { roleUserlist} = storeToRefs(roleUsersStore)
const { roleRegUserlist } = storeToRefs(roleRegUsersStore)

const getRoleUser = async () => {
    await roleUsersStore.getRoleUsersList()
}
const getRoleRegUser = async () => {
    await roleRegUsersStore.getRoleRegUsersList()
}

const worksList = ref([])
onMounted(() => {
    getRoleUser()
    getRoleRegUser();
})
</script>
<style lang="scss" scoped>
.explore {
    .first-wrapper {
        width: 100vw;
        height: 1080px;
        background: url('@/assets/images/page-bg/color-light-b.jpg') no-repeat
            center center/cover;
        padding-top: 167px;
        position: relative;
        z-index: 2;
        .bg-vague {
            position: absolute;
            top: 476px;
            left: 0;
            width: 100vw;
            height: 428.03px;
            background: url('@/assets/images/explore/bg-vague.png') no-repeat
                center center/cover;
            opacity: 1;
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
    .second-wrapper {
        margin-block: 50px;
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
        .first-wrapper {
            height: 1020px;
        }
    }
}
@media only screen and (max-width: 1200px) {
    // lg
    .explore {
        .first-wrapper {
            height: 1000px;
            .bg-vague {
                top: 450px;
            }
        }
        .second-wrapper {
            margin-block: 40px;
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .explore {
        .first-wrapper {
            height: 930px;
            .regist-count {
                span {
                    font-size: 39px;
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
            height: 760px;
            padding-top: 160px;
            .regist-count {
                span {
                    font-size: 33px;
                }
            }
            .bg-vague {
                height: 328px;
                top: 380px;
            }
        }
        .second-wrapper {
            margin-block: 36px;
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
                url('@/assets/images/explore/explore-m-bg.png') no-repeat center
                    center/cover;
            .bg-vague {
                width: 639.06px;
                height: 285px;
                background: url('@/assets/images/explore/m-bg-vague.png')
                    no-repeat center center/cover;
                top: 134px;
                left: 50%;
                transform: translateX(-50%);
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
        .second-wrapper {
            margin-top: 30px;
        }
    }
}
</style>
