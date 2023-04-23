<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <ul class="attributes-list">
        <li v-for="v in list">
            <div>
                <i><ax-icon class="icon-true"></ax-icon></i>
                <span>{{v}}</span>
            </div>
        </li>
    </ul>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import {useI18n} from "vue-i18n"
import AxIcon from "./ax-dom/ax-icon.vue";
const {locale} = useI18n();
defineProps({
    list: Array
})
onMounted(()=>{

})
</script>
<style lang="scss" scoped>
.attributes-list{
    padding:0;
    margin:0 -.5em;
    list-style: none;
    width: initial;
    color: rgba(0,0,0,.45);
    font-size: 24px;
    line-height: 48px;
    font-weight: normal;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    //background: #CCC;
    >li{
        margin:0 .5em;
        >div{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >i,>span{
                display: block;
                color: inherit;
                font-size: inherit;
                line-height: inherit;
            }
            >i:first-child{
                padding-right: 8px;
            }
        }
    }
}
</style>
