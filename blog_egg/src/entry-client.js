import "./utils/iconfont/iconfont.js"
// import hljs from "./utils/highlight/highlight.min.js";
// hljs.highlightAll();
// 将创建的实例进行挂载
import { createApp } from './app.js';

const { app, router, store } = createApp();

// 客户端在挂载到应用程序之前，同步store状态
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app');