<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <header class="top-flag">
        <div>
            <img src="@/assets/images/logo.png">
            <dl>
                <dt>HeartX</dt>
                <dd>{{$t('topFlagText')}}</dd>
            </dl>
            <div class="download"><ax-button class="min line-border">{{$t('download')}}</ax-button></div>
        </div>
    </header>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import {useI18n} from "vue-i18n"
import AxButton from "./ax-dom/ax-button.vue";
const {locale} = useI18n();

onMounted(()=>{

})
</script>
<style lang="scss" scoped>
.top-flag{
    >div{
        padding:18px 24px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
            width: 64px;
            height:64px;
            flex-shrink: 0;
            flex-grow: 0;
        }
        dl{
            width: 80%;
            padding:0 24px;
            flex-shrink: 1;
            flex-grow: 1;
            dt{
                font-style: italic;
                font-weight: 800;
                font-size: 32px;
                line-height: 120%;
            }
            dd{
                font-style: normal;
                font-weight: 400;
                font-size: 22px;
                line-height: 120%;
                text-transform: capitalize;
                color: rgba(0, 0, 0, 0.45);
            }
        }
        .download{
            flex-shrink: 1;
            flex-grow: 1;
        }
    }
}
</style>
