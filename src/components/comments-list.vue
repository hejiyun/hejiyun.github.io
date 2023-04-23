<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="comments">
        <ul class="comments-list">
            <li>
                <div class="head-img"><ax-img :src="demoHead"></ax-img></div>
                <dl>
                    <dt><p>Sunny</p><ax-tag>作者</ax-tag></dt>
                    <dd>
                        <p>🔥🔥作品真的超級棒，每次看到都有一種心靈穿梭質感，說不出的震撼，喜歡😍</p>
                        <span>2022-01-04</span>
                    </dd>
                </dl>
                <div class="like-box">
                    <div class="likes-data">
                        <ax-icon class="icon-clap-active"></ax-icon>
                        <p>30</p>
                    </div>
                </div>
                <ul>
                    <li>
                        <div class="head-img"><ax-img :src="demoHead"></ax-img></div>
                        <dl>
                            <dt><p>Nahua</p><ax-tag>作者</ax-tag></dt>
                            <dd>
                                <p>作品真的超級棒</p>
                                <span>2022-01-04</span>
                            </dd>
                        </dl>
                        <div class="like-box">
                            <div class="likes-data">
                                <ax-icon class="icon-clap"></ax-icon>
                                <p>30</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import {useI18n} from "vue-i18n"
import AxImg from "./ax-dom/ax-img.vue";
import AxTag from "./ax-tag.vue";
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
.comments{
    ul{
        li{
            display: flex;
            padding:18px 0 0;
            flex-wrap: wrap;
            >*{
                flex-grow: 0;
                flex-shrink: 0;
            }
            .head-img{
                border-radius: 28px;
                overflow: hidden;
                width: 56px;
                height: 56px;
            }
            dl{
                width: 534px;
                flex-grow: 0;
                flex-shrink: 0;
                margin-left: 16px;
                dt{
                    font-size: 28px;
                    line-height: 34px;
                    font-weight: bold;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    p{
                        padding-right: 8px;
                    }
                }
                dd{
                    padding-top:8px;
                    font-weight: 400;
                    font-size: 28px;
                    line-height: 40px;
                    span{
                        display: block;
                        font-weight: 400;
                        font-size: 20px;
                        line-height: 140%;
                        color: rgba(0, 0, 0, 0.45);
                    }
                }
            }
            .like-box{
                position: relative;
                .likes-data{
                    //background: #979797;
                    width: 112px;
                    padding-left:4px;
                    position: absolute;
                    z-index: 2;
                    left:0;
                    top: 0;
                    font-size: 32px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    p{
                        font-size: 24px;
                        line-height: 34px;
                        font-weight: bold;
                        color: rgba(0, 0, 0, 0.75);
                    }
                }
            }
            >ul{
                width: 100%;
                padding:10px 0 0 72px;
                >li{
                    .head-img{
                        width: 48px;
                        height: 48px;
                    }
                    dl{
                        width: 470px;
                    }
                }
            }
        }
    }
}
</style>
