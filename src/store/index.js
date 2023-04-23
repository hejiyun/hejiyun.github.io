import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'// 引入持久化插件
const store = createPinia()
// 使用该插件
store.use(piniaPluginPersist)
//导出
export default store
