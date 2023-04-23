import {defineStore} from "pinia";
import {POST} from "/utils/api.js";
import router from "@/router/index.js";
import {nextTick} from "vue";
const useUserStore = defineStore('user',{
    state: () => {
        return {
            userinfo:{
                access_token:"",
                email:"",
                expires_in:0,
                headimg:"",
                // headimg:"https://artex-backend.s3.ap-southeast-1.amazonaws.com/test/userpost/face/1/face_unknown.png",
                is_new_user:0,
                need_apply:0,
                need_email:0,
                nickname:"",
                pfid:"",
                refresh_token:"",
                sex:0,
                u_secret_key:"",
                walletAddress:""
            }
        };
    },
    getters:{
        // 类似于 computer
        getUser(){
        }
    },
    actions:{
        //action内定义的是方法函数(methods)
        login(){
        },
        refresh(){
            // refresh_token
        },
        logout(){
            useUserStore().$reset();
            useWalletStore().$reset();
            useMyworksStore().$reset();
            useAddWorkStore().$reset();
            useUserBindStore().$reset();
            useInviteStore().$reset();
            useUserFormStore().$reset();
            nextTick().then(()=> {
                    router.replace('/');
                }
            )
        }
    },
    // 开启数据缓存
    persist: {
        //这里存储默认使用的是session
        enabled: true,
        strategies: [
            {
                //key的名称
                key: 'ax_user',
                //更改默认存储为localStorage
                storage: sessionStorage,
                // 设置存储key
                // paths: ['list']
            }
        ]
    }
})
const useWalletStore = defineStore('wallet',{
    state: () => {
        return {
            walletInfo:false
            /*walletInfo:{
                "eth": 0,
                "beat": 0,
                "artX": 0,
                "starry_night": 0,
                "canvas": 0
            }*/
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods),登录过期后的callback后的操作
        async getWalletInfo(getNew=false,callback){
            var {userinfo} = useUserStore();
            if( ( getNew || !this.walletInfo ) && userinfo.access_token){
                const _h = window.location.href;
                const _api = _h.indexOf('/event/index.html') >= 0 ? `${window.api.eapi}/event/2023/vote2earn/user_card` : `${window.api.api}/web/user/wallet_info`;
                const res = await POST(_api,null,{
                    'USER-PFID':userinfo.pfid,
                    'USER-TOKEN':userinfo.access_token
                });
                try{
                    if( res.ret_code === 0){
                        this.walletInfo=res.data
                    }else if(res.ret_code === 600){
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                        useUserStore().logout()
                        window.location.reload();
                    }else{
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                    }
                }catch (e){
                    window.toast('Network Error')
                }
            }
        }
    }
});
const useMyworksStore = defineStore('myWorks',{
    state: () => {
        return {
            workslist:false
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        async getMyworks(isRenew = false){
            var {userinfo} = useUserStore();
            if( userinfo.access_token && ( !this.workslist || isRenew )){
                const res = await POST(`${window.api.api}/web/user/works`,null,{
                    'USER-PFID':userinfo.pfid,
                    'USER-TOKEN':userinfo.access_token
                });
                try{
                    if( res.ret_code === 0){
                        this.workslist=res.data.list
                    }else if(res.ret_code === 600){
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                        useUserStore().logout()
                    }else{
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                    }
                }catch (e){
                    window.toast('Network Error')
                }
            }
        }
    }
});
const useAddWorkStore = defineStore('addWork',{
    state: () => {
        return {
            status:false
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        async addWork(formContent){
            var {userinfo} = useUserStore();
            if(userinfo.access_token){
                this.status='send';
                const res = await POST(`${window.api.api}/web/works/create`,formContent,{
                    'USER-PFID':userinfo.pfid,
                    'USER-TOKEN':userinfo.access_token
                });
                try{
                    if( res.ret_code === 0){
                        console.log('user.js change status Success')
                        this.status='success';
                        await useMyworksStore().getMyworks(true)
                    }else{
                        this.status='error';
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                    }
                }catch (e){
                    this.status='error';
                    window.toast('Network Error')
                }
            }
        }
    }
});
const useUserBindStore = defineStore('userbind',{
    state: () => {
        return {
            info:{
                u_name:'',
                headimg:'',
                country:'',
                website:'',
                instagram:'',
                twitter:'',
                email:'',
            },
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        // login(){}
        async getBindinfo(){
            var {userinfo} = useUserStore();
            if(false && userinfo.access_token){
                const res = await POST(`${window.api.api}/web/user/role_info`,null,{
                    'USER-PFID':userinfo.pfid,
                    'USER-TOKEN':userinfo.access_token
                });
                try{
                    if( res.ret_code === 0){
                        // res.data.list.splice(20);
                        if(res.data.length!==0){
                            this.info = res.data
                            this.info.u_name && (userinfo.nickname=this.info.u_name)
                        }
                    }else if(res.ret_code === 600){
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                        useUserStore().logout()
                    }else{
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                    }
                }catch (e){
                    window.toast('Network Error')
                }
            }
        }
    },
    // 开启数据缓存
    persist: {
        //这里存储默认使用的是session
        enabled: true,
        strategies: [
            {
                //key的名称
                key: 'ax_userbind',
                //更改默认存储为localStorage
                storage: sessionStorage,
                // 设置存储key
                // paths: ['list']
            }
        ]
    }
})
const useInviteStore = defineStore('userInvite',{
    state: () => {
        return {
            inviteInfo: false
        }
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        // login(){}
        async getInviteInfo(){
            var {userinfo} = useUserStore();
            if(!this.inviteInfo && userinfo.access_token){
                const res = await POST(`${window.api.api}/web/user/invite_info`,null,{
                    'USER-PFID':userinfo.pfid,
                    'USER-TOKEN':userinfo.access_token
                });
                try{
                    if( res.ret_code === 0){
                        // res.data.list.splice(20);
                        if( res.data.used_code
                            && res.data.used_code!=='0'
                            && res.data.used_code!==0
                        ){
                            this.inviteInfo = res.data.used_code
                        }
                    }else if(res.ret_code === 600){
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                        useUserStore().logout()
                    }else{
                        window.toast(`[${res.ret_code}]${res.ret_msg}`)
                    }
                }catch (e){
                    window.toast('Network Error')
                }
            }
        },

        async bindInvite(code){
            var {userinfo} = useUserStore();
            if(userinfo.access_token){
                const res = await POST(`${window.api.api}/web/user/bind_invite`,{
                    code
                },{
                    'USER-PFID':userinfo.pfid,
                    'USER-TOKEN':userinfo.access_token
                });
                try{
                    if( res.ret_code === 0){
                        // res.data.list.splice(20);
                        this.inviteInfo=code
                        return true;
                    }else{
                        window.toast(res.ret_msg)
                        return false
                    }
                }catch (e){
                    window.toast('Network Error')
                    return false
                }
            }
        }
    },
    // 开启数据缓存
    persist: {
        //这里存储默认使用的是session
        enabled: true,
        strategies: [
            {
                //key的名称
                key: 'ax_userInvite',
                //更改默认存储为localStorage
                storage: sessionStorage,
                // 设置存储key
                // paths: ['list']
            }
        ]
    }
})
const useUserFormStore = defineStore('userform',{
    state: () => {
        return {
            form:{
                access_token:"",
                email:"",
                expires_in:0,
                headimg:"",
                // headimg:"https://artex-backend.s3.ap-southeast-1.amazonaws.com/test/userpost/face/1/face_unknown.png",
                is_new_user:0,
                need_apply:0,
                need_email:0,
                nickname:"",
                pfid:"",
                refresh_token:"",
                sex:0,
                u_secret_key:"",
                walletAddress:""
            },
            formError:{

            },
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        // login(){}
    },
    // 开启数据缓存
    persist: {
        //这里存储默认使用的是session
        enabled: true,
        strategies: [
            {
                //key的名称
                key: 'ax_userform',
                //更改默认存储为localStorage
                storage: sessionStorage,
                // 设置存储key
                // paths: ['list']
            }
        ]
    }
})
export {
    useUserStore,
    useUserFormStore,
    useUserBindStore,
    useWalletStore,
    useAddWorkStore,
    useMyworksStore,
    useInviteStore
}


