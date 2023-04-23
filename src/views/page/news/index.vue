<template>
    <div class="news" :class="locale">
        <div class="first-wrapper">
            <headline :firstLine="'News'" :secondLine="''"></headline>
        </div>
        <div class="second-wrapper">
            <ul class="news-box">
                <li @click="newsDetail(newsArr.length-key)" v-for="item,key in newsArr" :key="key">
                    <header>
                        <img :src="item.banner">
                    </header>
                    <section>
                        <header>{{item.title}}</header>
                        <section>{{item.content}}</section>
                        <footer v-html="item.date"></footer>
                    </section>
                </li>
            </ul>
        </div>
        <page-footer></page-footer>
    </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Headline from '@/views/components/common-title/headline.vue'
import PageFooter from '@/views/components/page-footer.vue'
import router from '@/router/index.js'

// $dialog({type: "success"});
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const newsDetail = function (i){
    const url = router.resolve({
        path: `/newsDetial/${i}`,
    });
    window.open(url.href, '_blank') //关键在此
}

// const bannerArr=ref([ 
//     new URL('../../../assets/images/news/detial1/banner.jpg',import.meta.url).href,
//     new URL('../../../assets/images/news/detial2/banner.jpg',import.meta.url).href,
// ])
//注意每次新加新闻在最前面
const newsArr = ref([
    {
        banner:new URL('../../../assets/images/news/detial2/banner.jpg',import.meta.url).href,
        title: 'HeartX Unveils Token Airdrop Game “Vote-to-Earn” to Warm Up the Launch of the Platform',
        content: 'HeartX, a Web3.0 art trading marketplace and community platform, is set to change the game for the art market. The team just announced their pre-launch Vote-to-Earn Game is live now. This new experience allows users to earn tokens ($HNX) through voting on artwork pieces by swiping right or left as Like and Next, giving them a chance to engage with the core feature of the platform in advance and get rewarded from showing their preferences on the arts.',
        date: '<span>Singapore</span> , 2023/04/06'
    },
    {
        banner:new URL('../../../assets/images/news/detial1/banner.jpg',import.meta.url).href,
        title: 'HeartX Launches Web3 Marketplace and Community Aim to Revolutionize Digital Art Industry',
        content: 'HeartX, a trailblazer in the digital art industry, has recently rebranded and unveiled a groundbreaking web3 marketplace and community that empowers artists, collectors, art consultants and art lovers to redefine the value of digital art. The HeartX platform provides a secure, immersive, and transparent space for creating, sharing, and trading digital artworks, catering to artists, collectors, and the web 3 community alike.',
        date: '<span>Singapore</span> , 2023/03/20'
    }
])
</script>
<style lang="scss" scoped>
.news {
    background: linear-gradient(
            to bottom,
            rgb(255, 255, 255, 0) 25%,
            rgb(255, 255, 255, 0.98) 75%
    ),
    url('@/assets/images/creation/bg.png') no-repeat center top/100% auto;
    .first-wrapper {
        width: 100vw;
        padding-top: 167px;
        overflow: hidden;
    }
    .second-wrapper {
        width:100vw;
        .news-box{
            width:100%;
            max-width:1140px;
            min-height: 915px;
            margin:76px auto 0;
            li{
                display: flex;
                margin-bottom:100px;
                // height:259px;
                width:100%;
                cursor: pointer;
                >header{
                    // height:259px;
                    margin-right:45px;
                    img{
                        width:380px;
                        height: 259px;
                        border-radius: 8px;
                        // box-shadow: 0px 3px 8px 1px rgba(206, 206, 206, 0.3);
                    }
                }
                >section{
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 160%;
                    >header{
                        line-height: 160%;
                        font-weight: 800;
                        // height:153px;
                        font-size: 32px;
                        overflow: hidden; //超出的文本隐藏
                        display: -webkit-box;
                        -webkit-line-clamp: 3; // 超出多少行
                        -webkit-box-orient: vertical;
                    }
                    >section{
                        margin:6px 0;
                        overflow: hidden; //超出的文本隐藏
                        display: -webkit-box;
                        -webkit-line-clamp: 2; // 超出多少行
                        -webkit-box-orient: vertical;
                    }
                    >footer{
                        span{
                            font-weight: 800;
                        }
                    }
                }
            }
        }
    }
    .add-wrapper {
        margin-top: -265px;
    }
}
@media only screen and (min-width: 2001px) {
    // xxxl
    .news {
        .second-wrapper {
            //margin-top: -240px;
        }
    }
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
}
@media only screen and (max-width: 1200px) {
    // lg
    .news {
        .first-wrapper {
        }
        .second-wrapper {
            :deep(.works-box) {
                .works-box-swiper {
                    height: 29.83333333vw;
                }
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .second-wrapper{
       
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .news {
        .first-wrapper {
        }
        .second-wrapper {
            :deep(.works-box) {
                .works-box-swiper {
                    height: 39.5360725vw;
                }
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .news {
        background: linear-gradient(
                to bottom,
                rgb(255, 255, 255, 0) 25%,
                rgb(255, 255, 255, 0.98) 75%
        ),
        url('@/assets/images/creation/creation-m-bg.png') no-repeat
        center top/100% auto;
        .first-wrapper{
            padding-top: 86px;
        }
        .second-wrapper {
            .news-box{
                // max-width: 335px;
                margin:0 auto;
                max-width: none;
                padding:35px 20px;
                box-sizing: border-box;
                min-height: 400px;
                li{
                    margin-bottom:35px;
                    >header{
                        margin-right:13px;
                        img{
                            width:142px;
                            height: 114px;
                            border-radius: 8px;
                        }
                    }
                    >section{
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 160%;
                        >header{
                            font-weight: 700;
                            height:96px;
                            font-size: 15px;
                            overflow: hidden; //超出的文本隐藏
                            display: -webkit-box;
                            -webkit-line-clamp: 4; // 超出多少行
                            -webkit-box-orient: vertical;
                        }
                        >section{
                            display: none;
                        }
                        >footer{
                        }
                    }
                }
            }
        }
    }
}
</style>
