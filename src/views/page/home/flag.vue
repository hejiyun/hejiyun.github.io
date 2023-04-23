<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="flag" v-if="deviceType === 'desktop'">
<!--        <img src="@/assets/images/home/flag-1-bak.jpg" style="width: 100vw;">-->
        <swiper class="flag-swiper"
                :class="slideColor[defaultIndex]"
                :modules="modules"
                :speed="1000"
                :autoplay="{ delay: 4000, disableOnInteraction: false }"
                navigation
                :slides-per-view="1"
                :pagination="{clickable: true, class:'black'}"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
                :loop="true">
            <swiper-slide :class="'flag-'+n" v-for="n in 3" :key="n"><i></i></swiper-slide>
        </swiper>
    </div>
    <div class="flag mobile" v-else>
        <img src="@/assets/images/home/m-flag-1.jpg">
        <img src="@/assets/images/home/m-flag-2.jpg">
        <img src="@/assets/images/home/m-flag-3.jpg">
<!--        <img src="@/assets/images/home/m-flag-4.jpg">-->
<!--        <img src="@/assets/images/home/m-flag-5.jpg">-->
    </div>
</template>
<script setup>
import {ref, onMounted, nextTick} from 'vue'
// import FlagArrow from "@/components/icons/flag-arrow.vue";
import {Swiper, SwiperSlide} from "swiper/vue";// 引入swiper组件
import 'swiper/css' // 引入swiper样式
import 'swiper/css/pagination' // 轮播图底面的小圆点
import 'swiper/css/navigation' // 轮播图两边的左右箭头
// 引入swiper核心和所需模块
import {Autoplay, Pagination, Navigation } from 'swiper'
// 在modules加入要使用的模块
const modules = [Autoplay, Pagination, Navigation];

var _Swiper = false,
    defaultIndex = ref(0);
const slideTo = (isNext) => {
    isNext ? _Swiper.slideNext() : _Swiper.slidePrev()
}
const onSwiper = (swiper) => {
    // console.log(swiper);
};
const slideColor=ref([
    '','black','black','black',''
])
const onSlideChange = (swiper) => {
    defaultIndex.value = swiper.realIndex;
};
const deviceType=ref('')
const windowResize = () => {
    deviceType.value = (window.innerWidth > 600 ? 'desktop' : 'mobile');
}
windowResize();
window.addEventListener('resize', windowResize)
</script>
<style lang="scss" scoped>
/** default style ----START---- **/
.flag {
    margin-top: 2.5vw;
    :deep(.flag-swiper){
        width: 100vw;
        height: 56.25vw;
        position: relative;
        overflow: hidden;
        color: #FFF;
        .swiper-slide {
            > i {
                display: block;
                height: 100%;
                background: no-repeat center center / cover;
            }
            &.flag-1 > i {
                background-image: url('@/assets/images/home/flag-1.jpg');
            }
            &.flag-2 > i {
                background-image: url('@/assets/images/home/flag-2.jpg');
            }
            &.flag-3 > i {
                background-image: url('@/assets/images/home/flag-3.jpg');
            }
            &.flag-4 > i {
                background-image: url('@/assets/images/home/flag-4.jpg');
            }
            &.flag-5 > i {
                background-image: url('@/assets/images/home/flag-5.jpg');
            }
        }
        img {
            width: 100%;
            height: 100%;
        }
        .swiper-pagination {
            width: 100vw;
            top: initial;
            bottom: 2.65vw;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 1vw;
            color: inherit;
            transition: color 400ms linear;
            .swiper-pagination-bullet {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 5.625vw;
                margin: 0 .234375vw;
                border-radius: initial;
                background: none;
                opacity: 0.2;
                transition: opacity 400ms linear;
                cursor: pointer;
                &::before {
                    content: '';
                    height: .15625vw;
                    background: currentColor;
                    display: block;
                    border-radius: .15625vw;
                }
                &.swiper-pagination-bullet-active {
                    opacity: 1;
                }
            }
        }
        .swiper-button-prev,.swiper-button-next{
            color: #000;
            transition: opacity 200ms;
            width: 3.125vw;
            height: 3.125vw;
            opacity: .2;
            &:hover{
                color:inherit;
                opacity: 1;
                &:after{
                    color:inherit;
                }
            }
            &:after{
                font-size: 2.25vw;
                transition: color 200ms;
            }
            /*position: relative;
            width: 100%;
            max-width: 1550px;
            margin: 0 auto;
            color: #000;
            > div {
                position: absolute;
                z-index: 50;
                opacity: 0.2;
                width: 60px;
                height: 60px;
                font-size: 60px;
                top: 510px;
                cursor: pointer;
                transition: color 200ms, opacity 200ms;
                &.left {
                    left: 30px;
                }
                &.right {
                    right: 30px;
                    transform: rotate(180deg);
                }
                &:hover {
                    color: #fff;
                    opacity: 1;
                }
            }*/
        }
        &.black {
            color:#000;
        }
    }
}
/** default style -----END----- **/
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
    .flag {
        :deep(.flag-swiper){
            min-height: 810px;
        }
    }
}
@media only screen and (max-width: 1200px) {
    // lg
    .flag {
        :deep(.flag-swiper){
            min-height: 720px;
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .flag {
        :deep(.flag-swiper){
            min-height: 540px;
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .flag {
        :deep(.flag-swiper){
            min-height: 495px;
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .flag{
        >img{
            width: 100%;
            height: auto;
        }
    }
}
</style>
