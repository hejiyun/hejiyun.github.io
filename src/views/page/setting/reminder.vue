<!-- CREATE by Hejiyun at 2022/8/10 15:15 -->
<template>
    <div class="Important-Reminder">
        <span class="title-text">{{$t("account.reminder")}}</span>
        <p class="text-tips">{{$t("account.reminderRedTips")}}</p>
        <div class="text-box">
            <p>{{$t("account.reminderText1")}}</p>
            <p>{{$t("account.reminderText2")}}</p>
            <p>{{$t("account.reminderText3")}}</p>
            <p>{{$t("account.reminderText4")}}</p>
            <p>{{$t("account.reminderText5")}}</p>
            <p>{{$t("account.reminderText6")}}</p>
            <p>{{$t("account.reminderText7")}}</p>
            <p>{{$t("account.reminderText8")}}</p>
        </div>

        <div class="helptips">
            <div>
                <img v-if="!hasRead"  src="@/assets/page-ui/chose-no.png" alt="" @click="chose">
                <img v-else src="@/assets/page-ui/chose-is.png" alt="" @click="chose">
                <p :class="language == 'zh-CN' ? 'mt-top' : ''">{{$t("account.ReminderKnow")}}<span>{{$t("account.ReminderRule")}}</span> </p>
            </div>
        </div>
        <div class="next-page-box">
            <div>
                <img v-if="hasRead" src="@/assets/page-ui/next-btn-is.png" alt="">
                <img v-else src="@/assets/page-ui/next-btn.png" alt="">
                <span @click="toNextPage"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive,nextTick, toRaw } from 'vue'
import { useRouter } from 'vue-router';
console.log(window.navigator.language)
const language = toRaw(window.navigator.language)
let blockRender = ref(false)
onMounted(()=>{
    nextTick(() => {
        setTimeout(() => {
            blockRender.value = true
        }, 100)
    })
})

const router = useRouter()

const hasRead = ref(false)

const chose = (e) => {
    console.log(e)
    hasRead.value =  !hasRead.value
}
// 进入下一个页面
const toNextPage = () => {
    if (!hasRead.value) return
    router.push('/account/reason')
}
</script>

<style lang="scss" scoped>
.Important-Reminder {
   position: relative;
   padding-top:1rem;
   height: 100vh;
}
.title-text{
    font-size: .64rem;
    font-weight: 900;
}
.text-tips{
    font-size: .375rem;
    margin-top:.4rem;
    color:#EA415A
}
.helptips{
    position: absolute;
    bottom:.6rem;
    // text-align: center;
    span{
        color:#278BE5
    }
    >div{
        width: 68vw;
        margin: 0 auto;
        margin-left: 16%;
        display: flex;
        justify-content: center;
        img{
            width: .464rem;
            height: .464rem;
            margin-right: .312rem;
            margin-top:.1rem;
        }
        .mt-top{
            line-height: .65rem;
        }
    }
}
.text-box{
    margin-top:.536rem;
    height: 70vh;
    overflow-x: hidden;
    overflow-y: auto;
    p{
        font-size: .375rem;
        margin-top:.4265rem;
    }
}
.next-page-box{
    position: absolute;
    bottom:1.12rem;
    right:0;
    border-radius: 50%;
    >div{
        position: relative;
        display: flex;
        justify-content: center;
        span{
            position: absolute;
            top:.533rem;
            width: 1.36rem;
            height: 1.36rem;
            display: block;
            border-radius: 50%;
        }
    }
}
</style>
