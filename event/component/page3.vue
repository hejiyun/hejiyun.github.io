<template>
    <div class="page" id="top-rules">
        <div class="page3-box">
            <div class="rules">Rules</div>
            <div>
                <div class="title">Time：</div>
                <div class="time-text time-text-1">April 6th - 15th</div>
            </div>
            <div>
                <div class="title">Entries：</div>
                <div class="time-text time-text-2">Voting Rewards</div>
                <div class="rule-text">
                    1. Each day you will be presented with 12 artworks from which you can vote for the works you prefer. <br/>
                    2. You will be given 3 "Like" votes per day and when you finish voting for the 12 artworks, you will receive 50 $HNX rewards. <br/>
                    3. The voting reward can be earned once per day per wallet address.
                </div>
                <div class="time-text time-text-3">Ranking Rewards</div>
                <div class="rule-text">
                    1. During the campaign, we will publish the voting rankings every day of the 12 artworks on the previous day. <br/>
                    2. If you voted "Like" for the Top 1 artwork on the previous day, you can share the 1,000,000 $HNX with all the winners who voted for the Top 1 artwork on that day.<br/>
                    3. By completing sharing tasks, you will gain more "Like" votes to increase your chance of voting for the daily Top 1 work. <br/>
                    4. 1 extra "Like" vote for every task completed. Up to 2 extra votes can be won per wallet address per day. <br/>
                    &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<span>Task 1 ：</span>Share HeartX Info<br/>
                    &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<span>Task 2 ：</span>Share Artworks
                </div>

                <div class="time-text time-text-4">HeartX Invitation Code</div>
                <div class="rule-text">
                    1. Each wallet address will receive the following points for voting "Like" for the daily Top 3 artworks.<br/>
                    &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;3000 points for voting for the Top 1<br/>
                    &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;2000 points for voting for the Top 2<br/>
                    &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;1000 points for voting for the Top 3<br/>
                    2. At the end of the event, we will calculate and rank the total points of every wallet.<br/>
                    3. The top 5000 players in the points ranking will receive the HeartX invitation code and have the right to participate in the app's beta testing.<br/>
                    4. In case of tie in points, all these winners will receive the reward.<br/>
                    5. Each wallet address corresponds to one HeartX invitation code.
                </div>

                <div class="time-text time-text-4">HeartX OG Connoisseur</div>
                <div class="rule-text">
                    1. All winners on the Points Ranking Top 10 List will get HeartX OG Connoisseur roles in Discord.<br/>
                    2. If there are multiple winners with the same points among the Top 10 list, all connoisseurs will get rewards!
                </div>

            </div>
            <div>
                <div class="attention-text">Attention!</div>
                <div class="rule-text">
                    1. Sybil attacks will not be tolerated.<br/>
                    2. The final interpretation right of the event belongs to the HeartX team.
                </div>  
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
</script>

<style lang="scss" scoped>
.page {
    margin: 0 auto;
    padding-bottom: 108rem;
    // width: 100vw;
    width: 1200rem;
    color: #ffffff;
    .page3-box {
        margin: 0 auto;
        // width: 1400rem;
    }
    .rules {
        padding-top: 60rem;
        margin: 90rem auto 50rem;
        font-weight: 900;
        font-style: italic;
        font-size: 68rem;
        line-height: 120%;
        text-align: center;
        text-transform: capitalize;
    }
    .title {
        font-weight: 800;
        font-size: 30rem;
        line-height: 120%;
    }
    .time-text {
        margin: 10rem 0;
        font-weight: 700;
        line-height: 160%;
        background: linear-gradient(90deg, #F365AC 0%, #35C7B8 30.36%);
        background-clip: text;
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        &.time-text-1 {
            font-size: 46rem;
        }
        &.time-text-2 {
            font-size: 43rem;
        }
        &.time-text-3,&.time-text-4 {
            font-size: 38rem;
        }
    }
    .attention-text {
        margin: 10rem 0 20rem;
        font-weight: 800;
        font-size: 30px;
        line-height: 120%;
    }
    .rule-text {
        font-weight: 400;
        font-size: 20rem;
        line-height: 160%;
        color: rgba(255, 255, 255, 0.75);
        span {
            font-weight: 600;
        }
    }
}

@media only screen and (min-width: 2001px) {

}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1920px) {
    
}
@media only screen and (max-width: 1600px) {
    // xl
    // .page3-box {
    //     .rules {
    //         margin: 0rem auto 50rem;
    //     }
    // }
}
@media only screen and (max-width: 1200px) {
    // lg
    
}
@media only screen and (max-width: 1024px) {
    // md
    
}

</style>