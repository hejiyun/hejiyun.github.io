import {defineStore} from "pinia";
import {POST} from "/utils/api.js";

const userStore = defineStore('user', {
    state:()=>{
        return {
            detail:{},
            works:{},
        }
    }
})

