<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
        <span class="view-more">
            <slot></slot><ax-icon class="icon-arrow-right"></ax-icon>
        </span>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import {useI18n} from "vue-i18n"
import AxIcon from "./ax-dom/ax-icon.vue";
const {locale} = useI18n();

onMounted(()=>{

})
</script>
<style lang="scss" scoped>
    .view-more{
        margin:20px 0 0;
        font-size: 28px;
        line-height: 30px;
        justify-content: center;
        align-items: center;
        color: #278BE5;
        text-transform: capitalize;
        font-weight: 700;
        display: inline-block;
        position: relative;
        padding: 18px 1.2em 0 0;
        .icon-arrow-right{
            position: absolute;
            color: #C4C4C4;
            right: 0;
            bottom:4px;
        }
    }
</style>
