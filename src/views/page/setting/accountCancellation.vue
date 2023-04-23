<!-- CREATE by Hejiyun at 2022/8/10 15:15 -->
<template>
    <div class="account-cancellation">
        <span class="title-text">{{$t("account.accountCancellation")}}</span>
        <p class="text-tips">{{$t("account.textAnchor")}}</p>
        <div class="msg-box">
            <p>
                <input  v-model="email" type="text">
            </p>
            <p>
                <input class="test-input" type="text"  v-model="verfication" :placeholder="$t('account.testAnchor')">
                <span v-if="!hasSendVer" @click="sendVer">{{$t("account.GetVerification")}}</span>
                <!-- 这里还需要重新发送,  60秒间隔 -->
                <span class="re-send" v-else>{{$t("account.reSend")}}({{time}})</span>
            </p>
        </div>
        <p class="helptips">{{$t("account.HelpText")}}<span @click="openTips(3)">{{$t("account.HelpTip")}}</span> </p>
        <div class="next-page-box">
            <div>
                <img v-if="verfication" src="@/assets/page-ui/next-btn-is.png" alt="">
                <img v-else src="@/assets/page-ui/next-btn.png" alt="">
                <span @click="toNextPage"></span>
            </div>
        </div>
        <!-- 设置提示弹窗 -->
        <div v-show="dialogOpen" class="dialog-box">
            <div class="center-dialog">
                <header>
                    <span v-if="dialogType == 3">{{$t("account.noGetVer")}}</span>
                    <span v-else>{{$t("account.OperationTips")}}</span>
                </header>
                <main>
                    <div v-if="dialogType == 3">
                        <p class="tips-text">
                            {{$t("account.verTip")}}
                        </p>
                        <p>
                            {{$t("account.verText1")}}
                        </p>
                        <p>
                            {{$t("account.verText2")}}
                        </p>
                        <p>
                            {{$t("account.verText3")}}
                        </p>
                    </div>
                    <div v-else>
                        <p v-if="dialogType == 1" class="tips-text" style="text-align:center">{{$t("account.testAnchor")}}</p>
                        <p v-else-if="dialogType == 2" class="tips-text" style="text-align:center">{{$t("account.VerError")}}</p>
                        <p v-else-if="dialogType == 4" class="tips-text" style="text-align:center">{{$t("account.mailError")}}</p>
                    </div>
                </main>
                <footer>
                    <span @click="dialogOpen=false">{{$t("account.conform")}}</span>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive,nextTick } from 'vue'
import { useRouter } from 'vue-router';
import {POST} from "/utils/api"


let blockRender = ref(false)
onMounted(()=>{
    nextTick(() => {
        setTimeout(() => {
            blockRender.value = true
        }, 100)
    })
    // 初始化阶段, 需要自动获取用户邮箱信息
    sessionStorage.getItem('email') && (email.value = sessionStorage.getItem('email'))
})

// 记录邮箱
const email = ref(null)

// 记录验证码
const verfication = ref(null)

// 记录是否发送验证码
const hasSendVer = ref(false)

// 发送间隔倒计时
const time = ref(60)

// 记录定时器
const timer = reactive({
    timerInterval: null
})

// 发送验证码
const  sendVer =  () => {
    if (!email.value) return openTips(4)
    // 是否需要验证邮箱格式正确性/ 不需要
    POST(`/test/art/email/send_code`,{
        type: '7'
    }, {
        'USER-TOKEN' : sessionStorage.getItem('access_token'),
        'USER-PFID': sessionStorage.getItem('pfid')
    })
    //成功之后, 替换成倒计时, 并且隐藏获取验证码, 并且更新hasSendVer状态
    hasSendVer.value = true
    timer.timerInterval = setInterval(() => {
        // 每隔一秒, time减一, 减到0时, 更新状态, 并释放定时器
        time.value = time.value - 1
        if (time.value == 0) {
            hasSendVer.value = false
            time.value = 60
            clearInterval(timer.timerInterval)
        }
    }, 1000)
}

// 设置弹窗控制变量
const dialogOpen = ref(false)


// 设置弹窗类型变量
const dialogType = ref(1)


// 设置提示窗类型
const openTips = (num) => {
    dialogType.value = num
    dialogOpen.value = true
}

const router = useRouter()
// 进入下一个页面
const toNextPage = () => {
    if (!verfication.value) return openTips(1)

    // 首先需要验证验证码是否正确, 正确则进入下一页, 不正确则提示验证码错误.
    POST(`/test/art/email/check_code`,{
        code: verfication.value,
        type: '7'
    }, {
        'USER-TOKEN' : sessionStorage.getItem('access_token'),
        'USER-PFID': sessionStorage.getItem('pfid')
    }).then(res => {
        // 如果验证码错误, 同样提示, 并结束进程
        if (res.ret_code !== 0) return openTips(2)
        sessionStorage.setItem('tmp_auth_code', res.data.tmp_auth_code)
        // 如果验证码通过, 则跳转下一个页面
        router.push('/account/reminder')
    })
}
</script>

<style lang="scss" scoped>
.account-cancellation {
   position: relative;
   padding-top:1rem;
   height: 100vh;
}
.title-text{
    font-size: .64rem;
    font-weight: 900;
}
.text-tips{
    font-size: .32214rem;
    margin-top:.268rem;
    color:rgba(0, 0, 0, 0.45)
}
.msg-box{
    margin-top:.853rem;
    input{
        width: 100%;
        height: 1.5rem;
        background: #F4F4F4;
        border:none;
        border-radius: 10px;
        padding: 0 .53rem;
        font-size: .3758rem;
        font-weight: 900;
    }
    p{
        position: relative;
        margin-bottom: .64rem;
        span{
            position: absolute;
            top:.6rem;
            right:.26rem;
            font-size: .3758rem;
            color:#278BE5;

        }
        .re-send{
            color:#999
        }
    }
    .test-input{
        padding-right: 2.4rem ;
    }
}
.helptips{
    position: absolute;
    bottom:.6rem;
    width: 100%;
    text-align: center;
    span{
        color:#278BE5
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
.dialog-box{
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content:center;
    align-items: center;
    .center-dialog{
        width: 85vw;
        background: #ffff;
        border-radius: 25px;
        header{
            text-align: center;
            height: 1.44rem;
            border-bottom: 1px solid #DBDBDB;
            span{
                font-size: .48rem;
                font-weight: 500;
                line-height: 1.44rem;
            }
        }
        footer{
            text-align: center;
            line-height: 1.3rem;
            height: 1.3rem;
            span{
                font-size: .373rem;
                font-weight: 500;
            }
        }
        main{
            min-height: 2rem;
            padding: .537rem;
            border-bottom: 1px solid #DBDBDB;
            .tips-text{
                font-size: .3758rem;
                font-weight: 500;
            }
            p{
                font-size: .3758rem;
                margin-bottom: .2133rem;
            }
        }
    }
}
</style>
