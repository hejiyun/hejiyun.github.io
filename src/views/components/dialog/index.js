import { createApp } from "vue";
import Dialog from "./dialog.vue";
// 使用vue3的createApp,以及mount,unmount方法创建挂载实例

/*
 * @service
 * @desc 服务方式调用
 * @param options 对象 - 注入的值
 * @param {type} 字符串，弹出框状态
 * @param {title} 字符串，弹出框标题
 * @param {content} 字符串，弹出框内容
 * @param {btnText} 字符串，弹出框按钮内容
 * @param {callback} 函数，按钮回调函数，传入参数loading，执行页面loading状态，传入参数closeFn，执行关闭弹出框
 */

export default function TipsToast(options) {
    // 创建一个节点，并将组件挂载上去
    const mountNode = document.createElement("div");
    document.body.appendChild(mountNode);
    const app = createApp(Dialog, {
        ...options,
        visible: true,
        remove() {
            app.unmount(mountNode); //创建完后要进行销毁
            document.body.removeChild(mountNode);
        },
    });
    return app.mount(mountNode);
}
