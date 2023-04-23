<template>

    <router-view v-if="show" name="nav" :setUserBoxShow="setUserBoxShow"></router-view>
    <router-view v-if="show"></router-view>
    <user-box v-show="showUserBox" :isShow="showUserBox" :setUserBoxShow="setUserBoxShow"></user-box>
    <i v-show="showUserBox" @click.stop="setUserBoxShow(false)" class="user-box-mask"></i>
    <toast></toast>
</template>
<script setup>

import { ref, onMounted } from 'vue'
import Toast from "@/views/components/modal/toast.vue";
import UserBox from "@/views/components/user-box/index.vue";

const show = ref(false);
const showUserBox = ref(false);

onMounted(()=>{
    setTimeout(()=>{
        show.value=true;
    },200)
})

const setUserBoxShow = (active) => {
    showUserBox.value = active==='auto'?!showUserBox.value:active;
}
</script>
<style lang="scss">
html{
    --main-background: #fff;
    --main-color: #0d0d0e;
    *{
        font-family:"Gilroy",system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    }

}
html, body{
    margin: 0;
    padding: 0;
    color: var(--main-color);
    background:var(--main-background);
    overflow-x: hidden;
    touch-callout:none;
    -webkit-touch-callout:none;
    -ms-touch-callout:none;
    -moz-touch-callout:none;

    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    -moz-user-focus: none;
    -moz-user-select: none;
}
body{
    transition: background-color 300ms linear;
    p{
        padding:0;margin:0;
    }
    &.en-US{
    }
    &.zh-TW{
    }
}
img{
    display: block;
}
ul,li,dl,dt,dd,p,h1,h2,h3,h4,h5{
    list-style: none;
    padding:0;
    margin:0;
}
input{
    outline: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
a,a:hover,a:active,a:visited,a:link,a:focus{
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    outline:none;
    background: none;
    text-decoration: none;
}
#app {
    width: 100%;
    margin:0 auto;
    position: relative;
    z-index: 2;
}
.full-bg{
    position: fixed;
    z-index: 1;
    width:100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background:var(--main-background);
}
.flex{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    >*{
        flex-grow: 0;
        flex-shrink: 0;
    }
}
.space{
    display: block;
}
.center{
    text-align: center;
}
.left{
    text-align: left;
}
.right{
    text-align: right;
}
.justify{
    text-align: justify;
}
button{
    cursor: pointer;
    display: block;
    height: 75px;
    width: 340px;
    border-radius: 88px;
    font-size: 24px;
    line-height: 120%;
    &.btn-main{
        color: #FFFFFF;
        border:0;
        background: #1A1A1A;
        font-weight: 700;
        transition: background 300ms;
        background: linear-gradient(315deg, #3BDECD 12%, #F365AC 88%);
        border-radius: 50px;
        &:disabled{
            background: #C4C4C4;
        }
    }
    &.btn-cancel{
        color: rgba(0, 0, 0, 0.75);
        border: 2px solid rgba(219, 219, 219, 0.8);
        background: transparent;
        font-weight: 500;
        &:hover{
            border: 2px solid rgba(0, 0, 0, 0.7);
        }
    }
}
svg{
    display: block;
}

::selection {
    background: #393939;
    color: #fff !important;
}
::-moz-selection {
    background: #393939;
    color: #fff !important;
}
::-webkit-selection {
    background: #393939;
    color: #fff !important;
}
.required-chart{
    position: relative;
    line-height: inherit;
    font-size: inherit;
    width: 1em;
    &::after{
        line-height: inherit;
        font-size: inherit;
        content: " ";
        display: inline-block;
        width: 0.8em;
    }
    &::before{
        line-height: inherit;
        font-size: inherit;
        position: absolute;
        left:50%;
        transform: translateX(-50%);
        color:#EA415A;
        content: "*";

        font-style: normal;
    }
}





@media (prefers-color-scheme: dark) {
    /*html{
        --main-background: #0d0d0e;
        --main-color: #E8E8E8;
    }*/
}

@media screen and (max-width:768px){
    .ios{
        #walletconnect-wrapper .walletconnect-connect__buttons__wrapper{
            padding:10px 0 0;
            overflow: hidden;
            a:nth-of-type(2){
                display: none;
            }
        }
        #walletconnect-qrcode-text,.walletconnect-search__input{
            display: none;
        }
    }
    #walletconnect-wrapper .walletconnect-connect__buttons__wrapper{
        >p{
            font-size: 14px !important;
        }
    }
    #app {
        min-width: initial;
    }
    button{
        cursor: pointer;
        display: block;
        height: 47px;
        border-radius: 8px;
        font-size: 18px;
        &.btn-main{
            font-size: 18px;
            color: #FFFFFF;
            border:0;
            background: #1A1A1A;
            font-weight: 800;
            line-height: 120%;
        }
        &.btn-cancel{
            font-size: 18px;
            border: 1px solid rgba(219, 219, 219, 0.8);
            &:hover{
                border: 1px solid rgba(0, 0, 0, 0.7);
            }
        }
    }
}
/** default style ----START---- **/
.main-content{
    box-sizing: border-box;
    width: 100%;
    max-width: 2400px;
    padding:0 60px;
}
.main-width{
    box-sizing: border-box;
    width: 100%;
    max-width: 2400px;
}

.main-padding{
    padding:0 60px;
}

.user-box-mask{
    position: fixed;
    z-index: 10001;
    width: 100vw;
    height: 100vh;
    left: 0;
    top:0;
}

/** default style -----END----- **/
@media only screen and (min-width: 2001px) {

}
@media only screen and (max-width: 2000px) {

}
@media only screen and (max-width: 1600px) {
    .main-content{padding:0 40px;}
}
@media only screen and (max-width: 1200px) {
    .main-content{padding:0 20px;}
}
@media only screen and (max-width: 1024px) {
}
@media only screen and (max-width: 768px) {
    .main-content{padding:0 12px;}
}
@media only screen and (max-width: 600px) {
}

</style>
