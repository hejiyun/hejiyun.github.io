<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="album">
        <ul class="works-list" :class="'items-1'">
            <li v-for="(value,i) in 1" :style="{backgroundImage:`url(${albumPhoto[i%4]})`}"></li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import {useI18n} from "vue-i18n"

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

.album{
    .works-list{
        padding-top:18px;
        li{
            border-radius: 20px;
            overflow: hidden;
            float: left;
            width: 220px;
            height: 220px;
            background: no-repeat center center / cover;
            margin: 14px 0 0 14px;
            &:first-child{
                margin: 0;
            }
        }
        &::after{
            content: "";
            display: block;
            clear: both;
        }
        &.items-1{
            li{
                width: 686px;
                height: 516px;
                margin: 0;
            }
        }
        &.items-2,&.items-4{
            li{
                width: 336px;
                height: 336px;
                &:nth-child(-n+2){
                    margin-top: 0;
                }
                &:nth-child(2n+1){
                    margin-left: 0;
                }
            }
        }
        &.items-3{
            li{
                width: 218px;
                height: 220px;
                &:first-child{
                    width: 454px;
                    height: 454px;
                }
                &:nth-child(-n+2){
                    margin-top: 0;
                }
            }
        }
        &.items-5{
            li{
                &:nth-child(-n+2){
                    width: 336px;
                    height: 336px;
                    margin-top: 0;
                }
                &:nth-child(3){
                    margin-left: 0;
                }
                &:nth-child(4){
                    margin-left: 12px;
                }
            }
        }
        &.items-6{
            li{
                &:nth-child(-n+3){
                    margin-top: 0;
                }
                &:nth-child(3n+1){
                    margin-left: 0;
                }
                &:nth-child(3n+2){
                    margin-left: 12px;
                }
            }

        }
    }
}
</style>
