<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <ul class="consultant-list">
        <li>
            <div>
                <span><ax-img :src="demoHead"></ax-img></span>
                <h4>那花</h4>
                <ax-icon class="icon-verify"></ax-icon>
            </div>
            <div class="detail">
                <p>這幅⽔彩畫是由作家、畫家和夢想家威廉·布萊克完成的。在圖書館和⼤學⾥，只有 13 件這樣的作在圖書館和⼤學⾥，只有 13 件這樣的作...</p>
                <i class="icon-msg"><ax-icon class="icon-message"></ax-icon></i>
            </div>
        </li>
        <li>
            <div>
                <span><ax-img :src="demoHead"></ax-img></span>
                <h4>小白</h4>
            </div>
            <div class="detail">
                <div class="work-img"><ax-img :src="albumPhoto[1]"></ax-img></div>
                <p>這幅⽔彩畫是由作家、畫家和夢想家威廉·布萊克完成的...</p>
                <i class="icon-msg"><ax-icon class="icon-message"></ax-icon></i>
            </div>
        </li>
        <li>
            <div>
                <span><ax-img :src="demoHead"></ax-img></span>
                <h4>Sunny</h4>
            </div>
            <div class="detail">
                <div class="work-img"><ax-img :src="albumPhoto[1]"></ax-img></div>
                <p>這幅⽔彩畫是由作家、畫家和夢想家威廉·布萊克完成的...</p>
                <i class="icon-msg"><ax-icon class="icon-message"></ax-icon></i>
            </div>
        </li>
    </ul>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import {useI18n} from "vue-i18n"
import AxImg from "./ax-dom/ax-img.vue";
import AxIcon from "./ax-dom/ax-icon.vue";
const demoHead=new URL('@/assets/images/headimg.jpg',import.meta.url).href;
const {locale} = useI18n();
const albumPhoto=ref([
    new URL('@/assets/images/demo-1.jpg',import.meta.url).href,
    new URL('@/assets/images/demo-2.jpg',import.meta.url).href,
    new URL('@/assets/images/demo-3.jpg',import.meta.url).href,
    new URL('@/assets/images/demo-4.jpg',import.meta.url).href,
])
onMounted(()=>{

})
</script>
<style lang="scss" scoped>
.consultant-list{
    li{
        margin-top:40px;
        >div{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            >*{
                flex-grow: 0;
                flex-shrink: 0;
            }
            span{
                width: 44px;
                height:44px;
                border-radius: 22px;
                overflow: hidden;
            }
            h4{
                padding:0;
                margin:0 0 0 15px;
                font-size: 28px;
                font-weight: 700;
                color: rgba(0, 0, 0, 0.75);
            }
            .work-img{
                width: 124px;
                height: 124px;
                border-radius:20px;
                overflow: hidden;
            }
            p{
                flex-grow: 1;
                flex-shrink: 1;
                font-size: 24px;
                line-height: 36px;
                white-space: normal;
                color: rgba(0, 0, 0, 0.6);
                text-align: justify;
                margin-left: 24px;
                padding:24px 0;
            }
            i.icon-msg{
                display: block;
                width: 116px;
                font-size: 36px;
                color: #979797;
                .icon-message{
                    margin:0 auto;
                }
            }
            .icon-verify{
                font-size: 28px;
                margin-left: 10px;
            }
            &:first-child{
                padding:8px 0;
            }
            &.detail{
                //margin-top:8px;
                border-radius: 20px;
                overflow: hidden;
                min-height:124px;
                background: rgba(100, 99, 244, 0.1);
                background: #f5f5f5;
            }
        }
        &:first-child{
            margin-top:0;
        }
    }
}
</style>
