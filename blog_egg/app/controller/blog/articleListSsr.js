'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer')

const htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../../public/template/index.template.html'), 'utf-8')
const serverBundle = require('../../public/dist/vue-ssr-server-bundle.json');
const clientManifest = require('../../public/dist/vue-ssr-client-manifest.json');
// 创建 renderer 对象实例
const renderer = createBundleRenderer(serverBundle, {
    template: htmlTemplate,
    runInNewContext: false,
    clientManifest,
    // inject: false,
})

class articleListController extends Controller {
    async initialize() {
        const { ctx } = this
        const context = {
            url: ctx.url
        }
        console.log('请求url以及参数', context, ctx.query)
        await new Promise((resolve, reject) => {
            renderer.renderToString(context, (err, html) => {
                if (err) {
                    if (err.code === 404) {
                        ctx.body = '404 Page not found';
                    } else {
                        ctx.body = '500 服务器错误'
                    }
                    console.log('服务端渲染错误', err)
                    reject()
                } else {
                    ctx.body = html;
                    resolve()
                }
            })
        })
    }
}

module.exports = articleListController;