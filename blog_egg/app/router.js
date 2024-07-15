'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  /* blog 路由匹配 */
  require('./router/blog')(app);

  /* admin 接口 */
  require('./router/admin')(app);

};
