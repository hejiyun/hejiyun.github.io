<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <ul class="feature">
        <li>
            <img src="@/assets/images/home/feature/1@3x.png" class="order">
            <img src="@/assets/images/home/feature/2-img@3x.png" class="photo">
            <div class="detail">
                <span text="HeartX"></span>
                <span text="Voting System"></span>
            </div>
<!--            <div class="detail">
                <span text="Global Artwork"></span>
                <span text="Community & Marketplace"></span>
            </div>-->
        </li>
        <li>
            <img src="@/assets/images/home/feature/2@3x.png" class="order">
            <img src="@/assets/images/home/feature/3-img@3x.png" class="photo">
<!--            <div class="detail">
                <span text="HeartX"></span>
                <span text="Voting System"></span>
            </div>-->
            <div class="detail">
                <span text="Tokenomic Rewarding"></span>
                <span text="System"></span>
            </div>
        </li>
        <li>
            <img src="@/assets/images/home/feature/3@3x.png" class="order">
            <img src="@/assets/images/home/feature/4-img@3x.png" class="photo">
<!--            <div class="detail">
                <span text="Tokenomics"></span>
            </div>-->
            <div class="detail">
                <span text="Ranking System"></span>
            </div>
        </li>
<!--        <li>
            <img src="@/assets/images/home/feature/4@3x.png" class="order">
            <img src="@/assets/images/home/feature/4-img@3x.png" class="photo">
            <div class="detail">
                <span text="Market Ranking"></span>
                <span text="Mechanism"></span>
            </div>
        </li>
        <li>
            <img src="@/assets/images/home/feature/5@3x.png" class="order">
            <img src="@/assets/images/home/feature/5-img@3x.png" class="photo">
            <div class="detail">
                <span text="Artwork Displaying"></span>
                <span text="Space"></span>
            </div>
        </li>-->
    </ul>
</template>
<script setup>
</script>
<style lang="scss" scoped>
/** default style ----START---- **/
.feature {
    width: 51.5625vw;
    margin: 3.125vw auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    li {
        flex-grow: 0;
        flex-shrink: 0;
        width: 23.4375vw;
        height: 17.1875vw;
        margin:0.78125vw;
        position: relative;
        //background: #CCC;
        > img {
            /* width: 100%;
            height: 100%; */
            position: absolute;
        }
        .order {
            position: absolute;
            left: 5%;
            top: 36%;
            width: 23.7%;
            height: auto;
            //background: rgba(0,0,0,.1);
        }
        .photo {
            position: absolute;
            width: 73.3333%;
            left: 22%;
            top: 2%;
            //background: rgba(0,0,0,.1);
        }
        .detail {
            position: absolute;
            left: 19%;
            bottom: 0;
            width: 80%;
            height: 25.5%;
            //background: rgba(0,0,0,.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        span {
            font-style: italic;
            font-weight: 900;
            font-size: 1.315vw;
            line-height: 160%;
            text-align: center;
            position: relative;
            display: block;
            &::before,
            &::after {
                content: attr(text);
                display: block;
                width: 100%;
            }
            &::before {
                background: linear-gradient(90deg, #f365ac 9.19%, #35c7b8 87.87%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                position: absolute;
                z-index: 0;
                left: 0;
                top: 0;
            }
            &::after {
                color: #fff;
                content: attr(text);
                display: block;
                -webkit-text-stroke: 8px #fff;
            }
        }
    }
}
/** default style -----END----- **/
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
    .feature {
        width: 960px;
        margin: 54px auto 0;
        li {
            width: 450px;
            height: 330px;
            margin:15px;
            span {
                font-size: 25px;
                &::after {
                    -webkit-text-stroke: 7px #fff;
                }
            }
        }
    }
}
@media only screen and (max-width: 1600px) {
    // xl
}
@media only screen and (max-width: 1200px) {
    // lg
}
@media only screen and (max-width: 1024px) {
    // md
    .feature {
        width: 100vw;
        margin: 5.625vw auto 0;
        li {
            width: 46.875vw;
            height: 34.375vw;
            margin:1.5625vw;
            span {
                font-size: 2.604166vw;
                &::after {
                    -webkit-text-stroke: .729vw #fff;
                }
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
}
@media only screen and (max-width: 600px) {
    // xs
    .feature {
        width: 100vw;
        margin: 5.625vw auto 0;
        li {
            width: 90vw;
            height: 66vw;
            margin:3vw 3vw 0;
            span {
                font-size: 5vw;
                &::after {
                    -webkit-text-stroke: 1.4vw #fff;
                }
            }
        }
    }
}
</style>
