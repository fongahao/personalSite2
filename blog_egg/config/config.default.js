/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const ENV = process.env.NODE_ENV
console.log('配置环境变量',ENV, process.env.NODE_ENV)
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 跨域设置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };
  // If the origin is set, the plugin will follow it to set the Access-Control-Allow-Origin and ignore the security.domainWhiteList. 
  // Otherwise, the security.domainWhiteList which is default will take effect as described above.
  config.cors = {
    // origin: '*',
    credentials: true,   // 允许Cookie可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  if (ENV === "development") {
    config.mysql = {
      // 单数据库信息配置
      client: {
        // host host.docker.internal
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'react_blog',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    };
  } else {
    config.mysql = {
      // 单数据库信息配置
      client: {
        // host host.docker.internal
        host: 'fongahao_mysql',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'personal_site_db',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    };
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1652947933685_5864';

  // add your middleware config here
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  config.middleware = ['gzip'];
  // 配置 gzip 中间件的配置
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };
  // config.cluster = {
  //   listen: {
  //     path: '',
  //     port: 8001,
  //     hostname: '127.0.0.1', // 0.0.0.0
  //   }
  // }

  // add your user config here
  const userConfig = {
    utils: {
      directory: 'app/utils',
      inject: 'app',
    },
    // myAppName: 'egg',
  };




  return {
    ...config,
    ...userConfig,
  };
};
