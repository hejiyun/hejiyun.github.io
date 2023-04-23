import { createApp } from "vue";
import BigImg from "./bigImg.vue";
// 使用vue3的createApp,以及mount,unmount方法创建挂载实例

/*
 * @service
 * @desc 服务方式调用
 * @param options 对象 - 注入的值
 * @param {Img} 字符串，弹出的图片
 */

export default function ImgToast(options) {
    // 创建一个节点，并将组件挂载上去
    const mountNode = document.createElement("div");
    document.body.appendChild(mountNode);
    const app = createApp(BigImg, {
        ...options,
        visible: true,
        remove() {
            app.unmount(mountNode); //创建完后要进行销毁
            document.body.removeChild(mountNode);
        },
    });
    return app.mount(mountNode);
}
