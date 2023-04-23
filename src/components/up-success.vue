<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <section class="success">
        <ax-icon class="icon-true-fill-circle"></ax-icon>
        <h3>{{$t('success.title')}}</h3>
        <p>{{$t('success.text')}}</p>
    </section>
</template>
<script setup>
import AxIcon from "./ax-dom/ax-icon.vue";
</script>
<style lang="scss" scoped>
.success{
    margin:50rem auto 0;
    width: 1300rem;
    background: #FFF;
    border-radius: 16rem;
    padding:80rem;
    .icon-true-fill-circle{
        font-size: 88rem;
        margin:0 auto;
    }
    h3{
        margin-top:24rem;
        font-weight: 800;
        font-size: 24rem;
        line-height: 120%;
        text-align: center;
        color: rgba(0, 0, 0, 0.75);
    }
    p{
        margin-top:24rem;
        font-weight: 500;
        font-size: 16rem;
        line-height: 120%;
        text-align: center;
        color: rgba(0, 0, 0, 0.45);
    }
}

@function rem($pxNum){
    @return calc($pxNum / 37.5) * 1rem;
}
@media screen and (max-width:768px){
    .success{
        margin:0 auto;
        width: 10rem;
        border-radius: 0;
        padding:rem(35) 0;
        .icon-true-fill-circle{
            font-size: rem(42);
        }
        h3{
            margin-top:rem(15);
            font-size: rem(16);
        }
        p{
            padding:0 .5rem;
            margin-top:rem(8);
            font-weight: 400;
            font-size: rem(14);
        }
    }
}
</style>
