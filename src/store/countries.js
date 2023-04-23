import {defineStore} from "pinia";
import {GET, POST} from "/utils/api.js";

export const useContriesStore = defineStore('countries',{
    state: () => {
        return {
            countries:false
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        async getContriesList(locale){
            if(!this.countries){
                const res = await POST(`${window.api.api}/art/system/countries`,null,{locale});
                try{
                    if( res.ret_code === 0){
                        this.countries = res.data.country;
                    }else{
                        window.toast(res.ret_code)
                    }
                }catch (e){
                    window.toast('countries [ Network Error ]')
                }
            }
        }
    }
})
