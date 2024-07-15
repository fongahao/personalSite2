
module.exports = options => {
    
    return async function adminauth(ctx, next) {
        console.log('中台守卫:', '\n', 'ctx.originalUrl', ctx.originalUrl, '\n', 'ctx.session.openId', ctx.session.openId)
        if (ctx.session.openId) {
            await next()
        } else {
            ctx.body = { data: "没有登录" };
        }
    }
}