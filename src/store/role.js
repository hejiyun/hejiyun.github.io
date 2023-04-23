import {defineStore} from "pinia";
import {POST} from "/utils/api.js";


const useRoleUsersStore = defineStore('roleUser',{
    state: () => {
        return {
            roleUserlist:false,
            serverTime:false,
            total:{
                artists:false,
                works:false,
            },
            preGetTime:0
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        async getRoleUsersList(){
            let _t = new Date().getTime();
            if(!this.roleUserlist || ( _t - this.preGetTime> 1800000 )){
                // const res = await POST(`${window.api.api}/art/role/users`);
                const res = await POST(`${window.api.api}/art/role/reg_works`);
                try{
                    if( res.ret_code === 0){
                        // res.data.list.splice(20);
                        this.roleUserlist = res.data.list;
                        this.serverTime = res.data.time;
                        this.total.artists = ~~(this.serverTime / 40399.7 - 41203)
                        this.total.works = ~~(this.serverTime / 20479.7 - 81225)
                        this.preGetTime = _t;
                    }else{
                        window.toast(res.ret_code)
                    }
                }catch (e){
                    window.toast('Network Error')
                }
            }
        }
    },// 开启数据缓存
    persist: {
        //这里存储默认使用的是session
        enabled: true,
        strategies: [
            {
                //key的名称
                key: 'ax_role',
                //更改默认存储为localStorage
                storage: sessionStorage,
                // 设置存储key
                // paths: ['list']
            }
        ]
    }
})
const useRoleRegUsersStore = defineStore('roleRegUser',{
    state: () => {
        return {
            roleRegUserlist:false,
            serverTime:false,
            total:{
                artists:false,
                works:false,
            },
            preGetTime:0
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        async getRoleRegUsersList(){
            let _t = new Date().getTime();
            if(!this.roleRegUserlist || ( _t - this.preGetTime> 1800000 )){
                const res = await POST(`${window.api.api}/art/role/reg_users`);
                try{
                    if( res.ret_code === 0){
                        // res.data.list.splice(20);
                        this.roleRegUserlist = res.data.list;
                        this.serverTime = res.data.time;
                        this.total.artists = ~~(this.serverTime / 40399.7 - 41203)
                        this.total.works = ~~(this.serverTime / 20479.7 - 81225)
                        this.preGetTime = _t;
                    }else{
                        window.toast(res.ret_code)
                    }
                }catch (e){
                    window.toast('Network Error')
                }
            }
        }
    },// 开启数据缓存
    persist: {
        //这里存储默认使用的是session
        enabled: true,
        strategies: [
            {
                //key的名称
                key: 'ax_reg_role',
                //更改默认存储为localStorage
                storage: sessionStorage,
                // 设置存储key
                // paths: ['list']
            }
        ]
    }
})

export {
    useRoleUsersStore,
    useRoleRegUsersStore,
}
