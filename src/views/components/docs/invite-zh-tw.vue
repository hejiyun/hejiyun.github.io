<!-- CREATE by WangXinzhao at 2022/9/16 00:45 -->
<template>
    <article class="en-us">
        <p class="timer">Launch Time: 2022/11/XX</p>
        <h3>1. Period</h3>
        <p>From now on - A month after the app offcially launched.</p>
        <h3>2. Program Details</h3>
        <p>
            · HeartX will send "Artist-Invite-Artist Invitation Code" to 50
            selected OG artists to invite other excellent artists to register in
            our community, thus further upgrade the quantity and quality of
            HeartX community creations.
        </p>
        <p>· Each selected OG artist can get a personal exclusive invitation code, and each invitation code is limited to invite 10 excellent artists.</p>
        <p>· When the selected OG artist registers in HeartX, each OG artist will get 10 * HeartBeat Tix, and every time a new artist is successfully invited to register in through the invitation code and complete the platform certification, one more HeartBeat Tix can be added to the OG artist; the HeartBeat Tix will be used to upload artworks on the HeartX to participate in the HeartBeat Voting Pool.</p>
        <p>· New artists invited by OG artists need to fill in the invitation code when signing up, and publish at least 5 artworks. After being certified by platform quality control, each person will get 6 HeartBeat Tixes.</p>
        <p>· The rest of the artists who did not fill in the invitation code to register will get 3 HeartBeat Tixes each after being certified by the platform.</p>
        <h3>3. about HeartBeat Tix</h3>
        <p>· Each HeartX-certified artist will receive a certain amount of HeartBeat Tixes.</p>
        <p>· The Tix will be used to upload artworks on the HeartX platform to participate in the HeartBeat Voting Pool; artworks that uploaded without using Tixes can still be published, but will not enter the HeartBeat Voting System.</p>
        <p>· Works that enter the HeartBeat Voting Pool will participate in the HeartBeat Voting Program that HeartX randomly pushes to users every day. Users can swipe right or left to express whether they like or dislike each work. In order to ensure the fairness of voting, each work will only appear once in the same user’s vote, and the platform has set up a mechanism to prevent users from deliberately selecting all likes or all dislikes, so as to ensure that the evaluation of works comes from the user’s true aesthetic point of view as much as possible.</p>
        <p>· Every work participating in the HeartBeat Voting will accumulate the HeartBeat index, which will represent the popularity of the work in the HeartX community and directly affect the number of reward tokens embedded in the work. Users who invest in or collect this work in the future can get tokens rewarded by HeartX. With this mechanism, HeartX is able to promote the growth of platform users and encourage the transaction of works.</p>



        <p>&nbsp;</p>
    </article>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from "vue";

const isMobile = ref(window.innerWidth < 768);
onBeforeMount(() => {
    window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth < 768;
    });
});
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
