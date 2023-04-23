<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="slogan main-content">
        Redefine the Value of Arts by the Community Consensus
    </div>
    <div class="slogan-description main-content">
        HeartX, a global artwork community and marketplace driven by community consensus for artists, collectors & art lovers, in the spirit of fostering emerging artists, redefines the value of art with concepts & technologies and intends to bring investment value to art creators and lovers worldwide.
    </div>
    <!--
                <div class="slogan-description">
                    As a global Web3 artworks community driven by<br class="mobile-only">
                    artists and collectors, HeartX aims to redefine<br class="mobile-only">
                    artworks for new value in Web3<br class="pc-only">
                    technology and<br class="mobile-only">
                    expose the world of art to all users who will be<br class="mobile-only">
                    able to get access to the valuable artworks<br class="mobile-only">
                    around the world.
                </div>-->
</template>
<script setup>
</script>
<style lang="scss" scoped>
/** default style ----START---- **/
.slogan {
    font-style: italic;
    font-weight: 900;
    font-size: 3.75vw;
    line-height: 3.75vw;
    text-align: center;
    background: linear-gradient(180deg, #000000 0%, #757575 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    width: 60%;
    margin: 0 auto;
}
.slogan-description {
    font-weight: 400;
    font-size: 1vw;
    line-height: 160%;
    text-align: center;
    color: #000000;
    margin: 2.6vw auto 0;
    width: 60%;
}
/** default style -----END----- **/
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
    .slogan {
        font-size: 75px;
        line-height: 75px;
        min-width: 1200px;
    }
    .slogan-description {
        font-size: 20px;
        line-height: 160%;
        margin: 52px auto 0;
        min-width: 1200px;
    }
}
@media only screen and (max-width: 1600px) {
    // xl
    .slogan {
        min-width: 1200px;
    }
    .slogan-description {
        min-width: 1200px;
    }
}
@media only screen and (max-width: 1200px) {
    // lg
    .slogan {
        width: 95%;
        min-width: initial;
    }
    .slogan-description {
        width: 95%;
        min-width: initial;
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .slogan {
        font-size: 61px;
        line-height: 61px;
        width: 100%;
    }
    .slogan-description {
        font-size: 20px;
        line-height: 160%;
        margin: 40px auto 0;
        width: 100%;
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .slogan {
        font-size: 46px;
        line-height: 46px;
    }
    .slogan-description {
        font-size: 20px;
        line-height: 160%;
        margin: 27px auto 0;
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .slogan {
        font-size: 32px;
        line-height: 36px;
    }
    .slogan-description {
        font-size: 15px;
        line-height: 24px;
        margin: 14px auto 0;
    }
}
</style>
