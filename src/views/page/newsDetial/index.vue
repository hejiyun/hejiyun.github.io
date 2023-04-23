<template>
    <div class="news-detial" :class="locale">
        <div class="second-wrapper">
            <component :is="comName"></component>
        </div>
        <page-footer></page-footer>
    </div>
</template>
<script setup>
import { } from 'vue'
import MiddleTitle from '@/views/components/common-title/middle-title.vue'

import PageFooter from '@/views/components/page-footer.vue'
import router from '@/router/index.js'

import com1 from '@/views/page/newsDetial/list/1.vue'
import com2 from '@/views/page/newsDetial/list/2.vue'
// import com3 from '@/views/page/newsDetial/list/3.vue'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

const id = router.currentRoute.value.params.id;
const listArr =  [com1,com2]
const comName = listArr[id-1];

</script>
<style lang="scss" scoped>
.news-detial {
    background: linear-gradient(
            to bottom,
            rgb(255, 255, 255, 0) 25%,
            rgb(255, 255, 255, 0.98) 75%
    ),
    url('@/assets/images/creation/bg.png') no-repeat center top/100% auto;
    .second-wrapper {
        padding-top: 167px;
        width:100vw;
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .news-detial {
        background: linear-gradient(
                to bottom,
                rgb(255, 255, 255, 0) 25%,
                rgb(255, 255, 255, 0.98) 75%
        ),
        url('@/assets/images/creation/creation-m-bg.png') no-repeat
        center top/100% auto;
        .second-wrapper {
             padding-top: 86px;
        }
    }
}
</style>
<style lang="scss">
.list-detial{
    width:100%;
    max-width: 1140px;
    margin:0 auto;
    line-height: 160%;
    font-weight: 400;
    font-size: 20px;
    >header{
        line-height: 160%;
        font-weight: 800;
        font-size: 45px;
    }
    >nav{
        font-size: 20px;
        margin:30px 0 45px;
        span{
            font-weight: 800;
        }
    }
    >section.detial-cont{
        img{
            display: block;
            width:76%;
            border-radius: 14px;
            margin:45px auto;
            box-shadow: 0px 3px 8px 1px rgba(206, 206, 206, 0.3);
        }
        p{
            margin:30px 0;
        }
        a{
            outline: none;
            color:#000;
            text-decoration: underline;
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .list-detial {
        padding:0 20px;
        font-size: 15px;
        >header{
            font-size: 22px;
        }
        >nav{
            margin:8px 0 30px;
            font-weight: 400;
            font-size: 15px;
        }
         >section.detial-cont{
            img{
                width:100%;
                margin:30px auto;
                box-shadow: 0px 3px 8px 1px rgba(206, 206, 206, 0.3);
            }
            p{
                margin:30px 0;
            }
            a{
                outline: none;
                text-decoration: #f00 1PX solid;
                color:#000;
                &:hover{
                
                }
            }
        }
    }
}
</style>