<!-- CREATE by WangXinzhao at 2022/11/29 21:02 -->
<template>
    <div class="user-assets">
        <h2>My Assets</h2>
        <section>
            <ul class="assets-list">
                <li>
                    <i class="eth">
                        <img src="@/assets/my-assets-icons/eth.png">
                    </i>
                    <p>Eth</p>
                    <span>{{walletStore.walletInfo ? walletStore.walletInfo.eth: '0'}}</span>
                </li>
                <li>
                    <i class="st">
                        <img src="@/assets/my-assets-icons/starrynight.jpg">
                    </i>
                    <p>StarryNght priority pass</p>
                    <span>{{walletStore.walletInfo ? walletStore.walletInfo.starry_night: '0'}}</span>
                </li>
                <li>
                    <i class="canvas">
                        <img src="@/assets/my-assets-icons/canvas.png">
                    </i>
                    <p>HB Tix</p>
                    <span>{{walletStore.walletInfo ? walletStore.walletInfo.canvas: '0'}}</span>
                </li>
            </ul>
        </section>
    </div>
    <page-footer></page-footer>
</template>
<script setup>
import {onMounted} from 'vue'
import {useI18n} from "vue-i18n"
const { locale, t } = useI18n()
import {useWalletStore} from "@/store/user.js";
const walletStore = useWalletStore();

import PageFooter from "@/views/components/page-footer.vue";


onMounted(() => {
})
</script>
<style lang="scss" scoped>
/** default style ----START---- **/
.user-assets{
    padding-bottom: 80px;
    h2{
        padding-top: 167px;
        font-style: italic;
        font-weight: 900;
        font-size: 45px;
        line-height: 120%;
        text-align: center;
    }
    .assets-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        width: 1140px;
        margin:77px auto;
        li{
            flex-shrink: 0;
            flex-grow: 0;
            width: 270px;
            text-align: center;
            text-transform: capitalize;
            margin-left:20px;
            &:nth-child(1){
                margin-left:0;
            }
            >i{
                width: 270px;
                height: 270px;
                background: #F6F6F6;
                border-radius: 6.296296%;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                >img{
                    display: block;
                }
                &.eth   {>img{width: 61.48148%;} }
                &.st    {>img{width: 100%;} }
                &.canvas{>img{width: 61.48148%;border-radius: 5.3333%;box-shadow: 0 3px 8px 1px rgba(206, 206, 206, 0.25);} }
            }
            p{
                font-weight: 800;
                font-size: 20px;
                line-height: 24px;
                margin-top:20px;
            }
            span{
                display: block;
                margin-top:6px;
                font-size: 15px;
                line-height: 18px;
                color: #5D5D5B;
            }
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

}
@media only screen and (max-width: 1200px) {
    // lg
    .user-assets {
        padding-bottom: 60px;
        h2 {
            padding-top: 167px;
            font-style: italic;
            font-weight: 900;
            font-size: 45px;
            line-height: 120%;
            text-align: center;
        }
        .assets-list {
            width: 960px;
            margin: 65px auto;
            li {
                width: 225px;
                margin-left: 20px;
                > i {
                    width: 225px;
                    height: 225px;
                    &.canvas {
                        > img {
                            box-shadow: 0 3px 8px 1px rgba(206, 206, 206, 0.25);
                        }
                    }
                }
                p {
                    font-size: 18px;
                    line-height: 22px;
                    margin-top: 18px;
                }

                span {
                    margin-top: 6px;
                    font-size: 14px;
                    line-height: 18px;
                }
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .user-assets {
        padding-bottom: 60px;
        h2 {
            padding-top: 137px;
            font-style: italic;
            font-weight: 900;
            font-size: 40px;
            line-height: 120%;
            text-align: center;
        }
        .assets-list {
            width: 90vw;
            margin: 65px auto;
            li {
                width: 28vw;
                margin-left: 3vw;
                > i {
                    width: 28vw;
                    height: 28vw;
                    &.canvas {
                        > img {
                            box-shadow: 0 3px 8px 1px rgba(206, 206, 206, 0.25);
                        }
                    }
                }
                p {
                    font-size: 16px;
                    line-height: 20px;
                    margin-top: 16px;
                }
                span {
                    margin-top: 5px;
                    font-size: 13px;
                    line-height: 18px;
                }
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .user-assets {
        padding-bottom: 60px;
        h2 {
            padding-top: 107px;
            font-style: italic;
            font-weight: 900;
            font-size: 36px;
            line-height: 120%;
            text-align: center;
        }
        .assets-list {
            width: 90vw;
            margin: 65px auto;
            li {
                width: 28vw;
                margin-left: 3vw;
                > i {
                    width: 28vw;
                    height: 28vw;
                    &.canvas {
                        > img {
                            box-shadow: 0 3px 8px 1px rgba(206, 206, 206, 0.25);
                        }
                    }
                }
                p {
                    font-size: 16px;
                    line-height: 20px;
                    margin-top: 16px;
                }
                span {
                    margin-top: 5px;
                    font-size: 13px;
                    line-height: 18px;
                }
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    .user-assets {
        padding-bottom: 60px;
        h2 {
            padding-top: 86px;
            font-style: italic;
            font-weight: 900;
            font-size: 32px;
            line-height: 120%;
            text-align: center;
        }
        .assets-list {
            width: 90.4vw;
            margin: 11.7vw auto;
            li {
                width: 43.2vw;
                margin-left: 4vw;
                &:nth-child(2n+1){
                    margin-left: 0;
                }
                &:nth-child(n+3){
                    margin-top: 5vw;
                }
                > i {
                    width: 43.2vw;
                    height: 43.2vw;
                    &.canvas {
                        > img {
                            box-shadow: 0 3px 8px 1px rgba(206, 206, 206, 0.25);
                        }
                    }
                }
                p {
                    font-size: 10px;
                    line-height: 20px;
                    margin-top: 15px;
                }
                span {
                    margin-top: 2px;
                    font-size: 12px;
                    line-height: 18px;
                }
            }
        }
    }
}
</style>
