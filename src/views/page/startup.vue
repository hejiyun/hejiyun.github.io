<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<!-- EDIT by Hejiyuyn at 2022/8/10 16:32 -->
<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="startup">
        Welcome HeartX.Art!
    </div>
    <ul class="router-list" v-if="isLocal">
        <li v-for="(v,i) in router" :key="i" >
            <router-link :to="v.path">
                <span>{{v.path}}</span>
                <p>{{v.meta.title?$t(v.meta.title):'HeartX'}}</p>
            </router-link>
            <i @click.stop="copy(v.path)">复制</i>
        </li>
    </ul>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter().getRoutes();
const isLocal = /^([\d.]+|localhost)$/.test(location.hostname);
const copy = (text)=>{
    if(/^[\d.]+$/.test(location.hostname)){
        alert('仅在使用https://localhost:4000 访问时有效')
    }
    navigator.clipboard && navigator.clipboard.writeText(text).then(res => {
        console.log('已复制')
    }).catch(err=> {
        alert('复制失败')
    })
}
onMounted(()=>{
})
</script>
<style lang="scss" scoped>
.startup{
    font-size: 75px;
    margin:0;
    padding:1em 0;
}
.router-list{
    width:10rem;
    list-style: none;
    text-align: left;
    padding:10px;
    background: rgba(0,0,0,.1);
    border-radius: 22px;
    >li{
        background: #FFF;
        font-size: 28px;
        line-height: 40px;
        color: rgba(0,0,0,.75);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 12px;
        padding:6px 12px;
        a{
            flex-shrink: 1;
            flex-grow: 1;
            color: inherit;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            text-decoration: none;
            >*{
                flex-grow: 0;
                flex-shrink: 0;
            }
            >span{
                font-weight: bold;
                width:5rem;
            }
            >p{
                padding:0;
                margin: 0;
                flex-grow: 1;
                flex-shrink: 1;
            }
        }
        i{
            flex-shrink: 0;
            flex-grow: 0;
            font-style: normal;
            font-size: 20px;
            line-height: 30px;
            display: block;
            padding:4px;
            width:60px;
            text-align: center;
            border-radius: 6px;
            background: #74747c;
            color: #FFF;
            cursor: pointer;
        }
        &:hover{
            color: #FFF;
            background: #1a1a1b;
        }
    }
}
@media (prefers-color-scheme: dark) {
/*    .router-list{
        background: rgba(255,255,255,.1);
        >li{
            background: rgba(0,0,0,.5);
            color: #FFF;
            i{
                background: #FFF;
                color: #74747c;
            }
            &:hover{
                color: #000;
                background: #b6b6bd;
            }
        }
    }*/
}
</style>
