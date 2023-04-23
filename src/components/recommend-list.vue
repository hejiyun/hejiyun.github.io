<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="recommend-list">
        <ul class="column-a">
            <li>
                <div class="work-photo">
                    <ax-img-flag emoji="🔥">nft</ax-img-flag>
                    <ax-img :src="albumPhoto[0]"></ax-img>
                </div>
                <div class="work-info">
                    <h3>奈良美智 #5233</h3>
                    <div class="anchor flex">
                        <p>Genesis kakira</p><ax-icon class="icon-verify"></ax-icon>
                    </div>
                    <div class="work-price flex">
                        <ax-icon class="icon-price"></ax-icon>0.37 ETH
                    </div>
                </div>
                <div class="heart-likes heart">
                    30天 ｜ 82 人心動
                </div>
            </li>
            <li>
                <div class="work-photo">
                    <ax-img-flag emoji="🔥">nft</ax-img-flag>
                    <ax-img :src="albumPhoto[2]"></ax-img>
                </div>
                <div class="work-info">
                    <h3>奈良美智 #5233</h3>
                    <div class="anchor flex">
                        <p>Genesis kakira</p>
                    </div>
                    <div class="work-price flex">
                        $ 1,327
                    </div>
                </div>
            </li>
        </ul>
        <ul class="column-b">
            <li>
                <div class="work-photo">
                    <ax-img-flag emoji="🔥">nft</ax-img-flag>
                    <ax-img :src="albumPhoto[1]"></ax-img>
                </div>
                <div class="work-info">
                    <h3>奈良美智 #5233</h3>
                    <div class="anchor flex">
                        <p>Genesis kakira</p><ax-icon class="icon-verify"></ax-icon>
                    </div>
                    <div class="work-price flex">
                        <ax-icon class="icon-price"></ax-icon>0.37 ETH
                    </div>
                </div>
                <div class="heart-likes likes">
                    2345 次點贊
                </div>
            </li>
            <li>
                <div class="work-photo">
                    <ax-img-flag emoji="🔥">nft</ax-img-flag>
                    <ax-img :src="albumPhoto[3]"></ax-img>
                </div>
                <div class="work-info">
                    <h3>奈良美智 #5233</h3>
                    <div class="anchor flex">
                        <p>Genesis kakira</p><ax-icon class="icon-verify"></ax-icon>
                    </div>
                    <div class="work-price flex">
                        $ 1,327
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import {useI18n} from "vue-i18n"
import AxImg from "./ax-dom/ax-img.vue";
import AxIcon from "./ax-dom/ax-icon.vue";
import AxImgFlag from "./ax-img-flag.vue";
const demoHead=new URL('@/assets/images/headimg.jpg',import.meta.url).href;
const {locale} = useI18n();
const albumPhoto=ref([
    new URL('@/assets/images/demo-recommend-1.jpg',import.meta.url).href,
    new URL('@/assets/images/demo-recommend-2.jpg',import.meta.url).href,
    new URL('@/assets/images/demo-recommend-3.jpg',import.meta.url).href,
    new URL('@/assets/images/demo-recommend-4.jpg',import.meta.url).href,
])
onMounted(()=>{

})
</script>
<style lang="scss" scoped>
.recommend-list{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 26px;
    opacity: 1;
    ul{
        width: 352px;
        li{
            border-radius: 20px;
            overflow: hidden;
            margin-top:16px;
            background: #fff;
            .work-photo{
                border-radius: 20px;
                overflow: hidden;
            }
            .work-info{
                padding:12px 16px;
                h3{
                    margin:0;
                    padding:0;
                    font-size: 26px;
                    line-height: 40px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 0.75);
                }
                .anchor{
                    p{
                        font-size: 20px;
                        line-height: 32px;
                        color: rgba(0, 0, 0, 0.45);
                    }
                    .ax-icon{
                        margin-left: 8px;
                        font-size: 28px;
                    }
                }
                .work-price{
                    font-size: 24px;
                    line-height: 44px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 0.75);
                    .ax-icon{
                        margin-right:8px;
                    }
                }
            }
            .heart-likes{
                width: 300px;
                margin:0 auto;
                text-align: center;
                line-height: 60px;
                color: rgba(0, 0, 0, 0.45);
                border-top: 1.2px solid rgba(219, 219, 219, 0.5);
                font-size: 24px;
                font-weight: 400;
                &.heart{
                    color: #EA415A;
                }
            }
            &:first-child{
                margin-top: 0;
            }
        }
    }
}
</style>
