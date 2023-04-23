<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="top-logo main-content">
        <img src="@/assets/images/home/x.png" class="big-x">
        <img src="@/assets/images/top-logo-new.png" class="main-logo">
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
/** default style ----START---- **/
.top-logo{
    height: 32vw;
    position: relative;
    margin:0 auto;
    >img{
        position: absolute;
        left:50%;
        top:58%;
        transform: translate(-50%,-50%);
    }
    .big-x{
        z-index: 1;
        width: 20.8333vw;
        height: 22.13541vw;
    }
    .main-logo{
        z-index: 2;
        width: 36.71875vw;
        height: 9.21875vw;
        transform: translate(-45%,-60%);
    }
}
/** default style -----END----- **/
@media only screen and (min-width: 2001px) {
    // xxxl

}
@media only screen and (max-width: 2000px) {
    // xxl
    .top-logo{
        height:615px;
        .big-x{
            width:400px;
            height:425px;
        }
        .main-logo{
            width:705px;
            height:177px;
        }
    }
}
@media only screen and (max-width: 1600px) {
    // xl

}
@media only screen and (max-width: 1200px) {
    // lg
    .top-logo{
        height:51.25vw;
        .big-x{
            width:33.333333vw;
            height:35.416667vw;
        }
        .main-logo{
            width:50vw;
            height:12.553191vw;
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .top-logo{
        height:61.5vw;
        .big-x{
            width:40vw;
            height:42.5vw;
        }
        .main-logo{
            width:60vw;
            height:15.06383vw;
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .top-logo{
        height: 500px;
        >img{
            top:60%;
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .top-logo{
        height: 100vw;
        .big-x{
            width: 57.6vw;
            height: 61.3333vw;
        }
        .main-logo{
            width: 73.3333vw;
            height: 18.4113475vw;
        }
    }
}
</style>
