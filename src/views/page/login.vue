<template>
    <div class="startup">
        <h4> Welcome HeartX.Art!</h4>
        <div class="login-box">
            <p>
                <span class="star">*</span>
                <span>{{$t('login.Username')}} :</span><br>
                <input type="text" v-model="Username">
            </p>
            <p>
                <span class="star">*</span>
                <span>{{$t('login.Password')}} :</span><br>
                <input :type="show ? `text` : 'password'" v-model="Password">
                <img v-if="show" class="eyes-Box" @click="toggleShow" src="@/assets/page-ui/open-eyes.png" alt="">
                <img v-else class="eyes-Box" @click="toggleShow" src="@/assets/page-ui/close-eyes.png" alt="">
            </p>
            <p>
                <span class="star">*</span>
                <span>{{$t('login.Nickname')}} :</span><br>
                <input type="text" v-model="Nickname" >
            </p>
            <p> <input type="checkbox">{{$t('login.RememberMe')}}</p>
            <div class="btn">
                <button @click="toHome">{{$t('login.Submit')}}</button>
                <button @click="RegisterMail">{{$t('login.Register')}}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from "vue-router";
import {POST} from "/utils/api.js"
onMounted(()=>{
    //作为登录页, 加载时可以查看是否包含对应登录信息
})
// 密码切换显示
let show = ref(false)
const toggleShow = () => {
    show.value = !show.value
}

const Nickname = ref()
const Password = ref()
const Username = ref()

// 注册邮箱
const RegisterMail = () =>{
    POST(`https://ArteX-api-dev.lv-audio.com/art/email/register`,{
        email: Username.value,
        pwd: Password.value,
        nickname: Nickname.value,
        code: 1234
    }).then((res) => {
        console.log(res, '注册')
        // router.push('/home');
    })
}



//登录成功自动跳转到主页
const router = useRouter();
const toHome = () =>{
    POST(`https://ArteX-api-dev.lv-audio.com/art/email/login`,{
        email: Username.value,
        pwd: Password.value
    }).then((res) => {
        if (res.ret_code == '0') {
            // 记录后续需要参数
            sessionStorage.setItem('pfid', res.data.pfid)
            sessionStorage.setItem('access_token', res.data.access_token)
            sessionStoragsessionStoragee.setItem('email', res.data.email)
            router.push('/home');
        }
    })
}
</script>
<style lang="scss" scoped>
.startup{
    font-size: 75px;
    margin:0;
    padding:1em 0;
}
.login-box{
    font-size: 40px;
    width: 80%;
    margin: 0 auto;
    text-align: left;
    margin-top: 1rem;
    p{
        position: relative;
        margin-bottom: .5rem;
        .star{
            color:red;
        }
        input{
            margin-left: 1rem;
            margin-top:.2rem;
        }
        .eyes-Box{
            position: absolute;
            top:.8rem;
            right: 0;
            display: inline-block;
            width: 50px;
            margin-left: .1rem;
        }
    }
    .btn{
        text-align: center;
        button{
            background:#1890ff;
            color:white;
            border:none;
            padding: .2rem .4rem;
            border-radius: 10px;
        }
        button:nth-child(2) {
            margin-left: 5px;
        }
    }
}
</style>
