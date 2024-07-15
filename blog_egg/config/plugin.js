'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    gzip: true,
    enable: true,
  },
  // 开启跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 开启数据库
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};
