<!-- CREATE by WangXinzhao at 2022/11/28 15:37 -->
<template>
    <footer>
        <div class="footer-content">
            <h3>get in touch where we are</h3>
            <ul class="footer-list">
                <li>
                    <h4>HeartX Preferred Artist<br>
                        Registration Starts Now!</h4>
                    <!--                        <router-link to="/pre-regist">Artist Registration</router-link>-->
                    <a href="#/user/setting">Artist Registration</a>
                </li>
                <li>
                    <h4>StarryNight-Priority pass<br>
                        airdrop</h4>
                    <a href="https://www.premint.xyz/StarryNight-Priority-PASS/" target="_blank">Premint</a>
                </li>
                <li>
                    <h4>StarryNight:<br class="only-xs">
                        A 8,888 NFTs Project as<br>
                        the<br class="only-xs"> VIP Pass of HeartX Community</h4>
                    <a href="https://www.starrynight.art/" target="_blank">Visit</a>
                </li>
            </ul>
            <p class="join">Join the HeartX Community</p>
            <div class="footer-socials">
                <a href="https://discord.gg/yQ29mSE7MZ" target="_blank">
                    <discord></discord>
                </a>
                <a href="https://twitter.com/HeartX_art" target="_blank">
                    <twitter></twitter>
                </a>
            </div>
        </div>
    </footer>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue'
import Discord from "@/components/icons/discord.vue";
import Twitter from "@/components/icons/twitter.vue";

onMounted(() => {
})
</script>
<style lang="scss" scoped>
/** default style ----START---- **/
.only-xs{
    display: none;
}
footer {
    width: 100%;
    height: 700px;
    background: linear-gradient(261.4deg, #3bdecd 0%, #f365ac 101.27%);
    padding: 161px 0 80px;
    margin-top: 76px;
    .footer-content {
        max-width: 1092px;
        margin: 0 auto;
        color: #ffffff;
        text-transform: capitalize;
        h3 {
            font-style: italic;
            font-weight: 900;
            font-size: 45px;
            line-height: 120%;
        }
        ul {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 55px;
            > li {
                flex-shrink: 0;
                flex-grow: 0;
                &:nth-child(1) {
                    width: 297px;
                }
                &:nth-child(2) {
                    width: 297px;
                }
                &:nth-child(3) {
                    width: auto;
                    flex-shrink: 1;
                }
                h4 {
                    font-style: italic;
                    font-weight: 800;
                    font-size: 22px;
                    line-height: 120%;
                }
                a {
                    margin-top: 34px;
                    display: block;
                    width: 205px;
                    height: 50px;
                    border: 1px solid #ffffff;
                    border-radius: 33px;
                    font-weight: 500;
                    font-size: 20px;
                    line-height: 48px;
                    color: rgb(255, 255, 255);
                    //background-color: rgba(255,255,255,0);
                    text-decoration: none;
                    text-align: center;
                    transition: background-color 200ms, color 200ms;
                    &:hover {
                        background-color: rgba(255, 255, 255, 1);
                        color: rgb(80, 80, 80);
                    }
                }
            }
        }
        .join {
            margin-top: 76px;
            font-style: italic;
            font-weight: 900;
            font-size: 22px;
            line-height: 120%;
        }
        .footer-socials {
            margin-top: 7px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            a {
                color: #fff;
                display: block;
                font-size: 30px;
                &:nth-child(n + 2) {
                    margin-left: 30px;
                }
                &:hover {
                    transition: color 200ms;
                    color: rgba(255, 255, 255, 0.75);
                }
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
}
@media only screen and (max-width: 1600px) {
    // xl
}
@media only screen and (max-width: 1200px) {
    // lg
    footer {
        .footer-content {
            max-width: 980px;
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    footer {
        width: 100%;
        height: auto;
        padding-top: 10vw;
        margin-top: 5vw;
        .footer-content {
            //max-width: 90%;
            padding:0 30px;
            h3 {
                font-size: 32px;
                line-height: 120%;
                text-align: left;
            }
            ul {
                margin-top: 50px;
                > li {
                    &:nth-child(1) {
                        width: 27%;
                    }
                    &:nth-child(2) {
                        width: 27%;
                    }
                    &:nth-child(3) {
                        width: 38%;
                    }
                    h4 {
                        font-size: 16px;
                    }
                    a {
                        margin-top: 34px;
                        width: 160px;
                        height: 40px;
                        font-size: 16px;
                        line-height: 38px;
                    }
                }
            }
            .join {
                margin-top: 50px;
                font-size: 18px;
            }
            .footer-socials {
                margin-top: 7px;
                a {
                    font-size: 24px;
                    &:nth-child(n + 2) {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    footer {
        width: 100%;
        height: auto;
        padding-top: 10vw;
        margin-top: 5vw;
        .footer-content {
            // max-width: 90%;
            h3 {
                font-size: 32px;
                text-align: center;
            }
            ul {
                margin-top: 57px;
                flex-wrap: wrap;
                > li {
                    margin-top:74px;
                    &:nth-child(1) {
                        width: 100%;
                        margin-top:0;
                    }
                    &:nth-child(2) {
                        width: 100%;
                    }
                    &:nth-child(3) {
                        width: 100%;
                    }
                    h4 {
                        font-size: 22px;
                        text-align: center;
                        br{
                            display: none;
                        }
                    }
                    a {
                        margin:30px auto;
                        width: 220px;
                        height: 50px;
                        font-size: 15px;
                        line-height: 48px;
                    }
                }
            }
            .join {
                margin: 58px auto;
                max-width: 90%;
                // margin-top: 58px;
                font-size: 22px;
                text-align: center;
            }
            .footer-socials {
                margin-top: 7px;
                justify-content: center;
                padding-top: 30px;
                a {
                    font-size: 40.6px;
                    &:nth-child(n + 2) {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .only-xs{
        display: initial !important;
    }
    footer {
        padding-top: 52px;
        margin-top: 50px;
        .footer-content {
            // max-width: 90%;
            h3 {
                font-size: 32px;
                width: 280px;
                margin:0 auto;
            }
            ul {
                margin-top: 57px;
                display: block;
                > li {
                    margin: 74px auto 0;
                    &:nth-child(1) {
                        width: 280px;
                        margin-top:0;
                    }
                    &:nth-child(2) {
                        width: 250px;
                    }
                    &:nth-child(3) {
                        width: 310px;
                    }
                    h4 {
                        font-size: 22px;
                        text-align: center;
                    }
                    a {
                        margin:30px auto;
                        width: 220px;
                        height: 50px;
                        font-size: 15px;
                        line-height: 48px;
                    }
                }
            }
        }
    }
}
</style>
