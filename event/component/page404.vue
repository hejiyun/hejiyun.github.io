<template>
    <div class="page">
        <!-- <div class="page-404">
            <div class="page404">404</div>
            <div class="page-txt">page not found</div>
        </div> -->
        <div class="page404-box">
            <img src="../assets/404.png" alt="">
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
</script>

<style lang="scss" scoped>
.page {
    position: relative;
    margin: 0 auto;
    // width: 100%;
    width: 100vw;
    height: 100vh;
    background:url(./assets/bg-icon-2.png) repeat 0 0;
    background-size: 650rem 577rem;
    // animation: bg-scrolling-reverse2 8s linear infinite;
    .page404-box {
        margin: 0 auto;
        width: 1400rem;
        height: 100%;
    }
    img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 650rem;
        height: 92rem;
    }
    // .page-404 {
    //     position: absolute;
    //     left: 0;
    //     right: 0;
    //     top: 0;
    //     bottom: 0;
    //     margin: auto;
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     width: 650rem;
    //     height: 92rem;
    //     font-style: italic;
    //     .page404 {
    //         font-weight: 900;
    //         font-size: 125rem;
    //         letter-spacing: 2rem;
    //         background: linear-gradient(90deg, #F365AC 9.41%, #3BDECD 95.53%);
    //         -webkit-background-clip: text;
    //         -webkit-text-fill-color: transparent;
    //         background-clip: text;
    //         text-fill-color: transparent;
    //     }
    //     .page-txt {
    //         font-weight: 800;
    //         font-size: 50rem;
    //         line-height: 75rem;
    //         text-align: center;
    //         letter-spacing: 2px;
    //         text-transform: capitalize;
    //         -webkit-background-clip: text; 
    //         color: transparent;
    //         -webkit-text-stroke: 2rem #F365AC;

    //     }
    // }
}

</style>