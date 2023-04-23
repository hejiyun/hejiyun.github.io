<template>
    <div class="page-app" :class="locale">
        <div class="first-wrapper">
            <div class="main-content">
                <div class="get-box">
                    <!-- <headline :firstLine="'Get the HeartX App'" :secondLine="''"></headline> -->
                    <div class="title">Get the HeartX App</div>
                    <div class="text-box" :isMobile="isMobile">
                        <div class="dec" v-if="isMobile">If you want a better experience, <br/>please download our <span>iOS / Android</span> App<br/> by scanning the QR code or clicking the link provided.</div>
                        <div class="dec" v-else>If you want a better experience, please download our <span>iOS / Android</span> App by scanning the QR code or clicking the link provided.</div>
                        <img class="QRcode" src="@/assets/images/app/QRcode.png" alt="">
                    </div>
                </div>
                <img class="download" src="@/assets/images/app/download.png" alt="">
            </div>
        </div>
        <page-footer></page-footer>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import Headline from '@/views/components/common-title/headline.vue'
import PageFooter from '@/views/components/page-footer.vue'


import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

const router = useRouter();

//是否手机端
const isMobile = ref(false);
const resetHeight = () => {
    isMobile.value = ~~window.innerWidth <= 768;
};
resetHeight();

onMounted(()=>{

})

</script>

<style lang="scss" scoped>
.page-app {
    .main-down {
        display: inline-block;
        width: 100vw;
        display: flex;
        justify-content: center;
        -webkit-transition: all 750ms;
        transition: all 750ms;
        .main-down-btns {
            display: inline-block;
            display: flex;
            flex-direction: column;
            height: 184px;
            justify-content: space-between;
            margin-right: 19px;
            .main-down-and,.main-down-ios {
                box-sizing: border-box;
                width: 183px;
                height: 64px;
                background: rgba(217, 96, 101, 0.2);
                border: 1px solid #d96065;
                backdrop-filter: blur(20px);
                border-radius: 12px;
                line-height: 25px;
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                color: #fff;
                display: flex;
                align-items: center;
                padding: 0 16px;
                img {
                    width: 32px;
                    height: 32px;
                    margin-right: 14px;
                }
            }
        }
    }
    .first-wrapper {
        width: 100vw;
        height: 1080px;
        background: url("@/assets/images/page-bg/color-light-b.jpg") no-repeat center center/cover;
        padding-top: 167px;
        position: relative;
        z-index: 2;
        >div {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 0 auto;
            padding: 0 160px;
        }
        .get-box {
            .title {
                font-style: italic;
                font-weight: 900;
                font-size: 75px;
                line-height: 75px;
                text-align: center;
                background: linear-gradient(180deg, #000000 0%, #757575 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                padding: 8px 0;
            }
            .text-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 67px;
                .dec {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 160%;
                    color: #000000;
                    max-width: 379px;
                    width: 379px;
                    span {
                        font-weight: bold;
                    }
                }
                img.QRcode {
                    margin-left: 43px;
                    width: 229px;
                    height: 205px;
                }
            } 
        }
        img.download {
            width: 545px;
            height: 542px;
        }
    }
}
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
    .page-app {
        .first-wrapper {
            padding-top: 120px;
            // height: 900px;
            height: 700px;
            .get-box {
                .title {
                    font-size: 60px;
                    text-align: left;
                }
                .text-box {
                    margin-top: 57px;
                    .dec {
                        max-width: 350px;
                        width: 350px;
                        font-size: 18px;
                    }
                    img.QRcode {
                        margin-left: 23px;
                        width: 200px;
                        height: 179px;
                    }
                } 
            }
            img.download {
                width: 500px;
                height: 497px;
            }
        }
    }
}
@media only screen and (max-width: 1200px) {
    // lg
    .page-app {
        .first-wrapper {
            // height: 900px;
            .get-box {
                .title {
                    font-size: 50px;
                    line-height: 50px;
                    text-align: left;
                }
                .text-box {
                    margin-top: 30px;
                    .dec {
                        max-width: 310px;
                        width: 310px;
                        font-size: 16px;
                    }
                    img.QRcode {
                        margin-left: 10px;
                        width: 170px;
                        height: 152px;
                    }
                } 
            }
            img.download {
                width: 470px;
                height: 467px;
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .page-app {
        .first-wrapper {
            padding-top: 150px;
            // height: 800px;
            height: 770px;
            .get-box {
                .title {
                    font-size: 50px;
                    line-height: 45px;
                    text-align: left;
                }
                .text-box {
                    margin-top: 30px;
                    .dec {
                        max-width: 300px;
                        width: 300px;
                        font-size: 15px;
                    }
                    img.QRcode {
                        margin-left: 10px;
                        width: 150px;
                        height: 134px;
                    }
                } 
            }
            img.download {
                width: 440px;
                height: 437px;
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .page-app {
        .first-wrapper {
            height: 800px;
            .get-box {
                .title {
                    position: absolute;
                    top: 100px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    font-size: 32px;
                    line-height: 37px;
                    text-align: center;
                }
                .text-box {
                    .dec {
                        position: absolute;
                        top: 510px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        font-size: 18px;
                        line-height: 160%;
                        text-align: center;
                        max-width: 380px;
                        width: 380px;
                    }
                    img.QRcode {
                        position: absolute;
                        top: 590px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 150px;
                        height: 134px;
                    }
                } 
            }
            img.download {
                position: absolute;
                top: 180px;
                left: 0;
                right: 0;
                // bottom: 0;
                margin: auto;
                width: 280px;
                height: 278px;
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .page-app {
        .first-wrapper {
            // height: 740px;
            // height: 683px;
            height: 610px;
            .get-box {
                .title {
                    position: absolute;
                    top: 86px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    font-size: 32px;
                    line-height: 37px;
                    text-align: center;
                }
                .text-box {
                    .dec {
                        position: absolute;
                        top: 390px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        font-size: 14px;
                        line-height: 160%;
                        text-align: center;
                        // width: 334px;
                        width: 100%;
                    }
                    img.QRcode {
                        position: absolute;
                        top: 490px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 140px;
                        height: 125px;
                    }
                } 
            }
            img.download {
                position: absolute;
                top: 145px;
                left: 0;
                right: 0;
                // bottom: 0;
                margin: auto;
                width: 220px;
                height: 219px;
            }
        }
    }
}
</style>
