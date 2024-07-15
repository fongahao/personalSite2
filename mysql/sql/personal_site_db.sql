/*
 Navicat Premium Data Transfer

 Source Server         : PS
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : react_blog

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 30/07/2022 22:39:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
BEGIN;
INSERT INTO `admin_user` VALUES (1, 'fongahao', '123456');
COMMIT;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL,
  `tag_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `addtime` int NOT NULL,
  `view_count` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (12, 0, 0, '重构', '## 14.4  初始化实例属性\n\n### initLifecycle 的作用\n\n​		在 Vue.js 的整个⽣命周期中，初始化实例属性是第⼀步。需要实例化的属性既有 Vue.js 内部需要⽤到的属性（例如13.3.2节中提到的 vm._watcher ），也有提供给外部使⽤的属性（例如vm.$parent ）。\n\n> 注意 以 $ 开头的属性是提供给⽤户使⽤的外部属性，以 _ 开头的属性是提供给内部使⽤的内部属性。\n\n### **initLifecycle 代码**\n\n```js\nexport function initLifecycle (vm: Component) {\n  const options = vm.$options\n\n  // locate first non-abstract parent\n  let parent = options.parent\n  if (parent && !options.abstract) {\n    while (parent.$options.abstract && parent.$parent) {\n      parent = parent.$parent\n    }\n    parent.$children.push(vm)\n  }\n\n  vm.$parent = parent\n  vm.$root = parent ? parent.$root : vm\n\n  vm.$children = []\n  vm.$refs = {}\n\n  vm._watcher = null\n  vm._inactive = null\n  vm._directInactive = false\n  vm._isMounted = false\n  vm._isDestroyed = false\n  vm._isBeingDestroyed = false\n}\n```\n\n\n', '重构填满填满重构填满填满重构填满填满重构填满填满重构填满填满重构填满填满重构填满填满重构填满填满重构填满填满重构填满填满', 1667577976, 79877);
INSERT INTO `article` VALUES (13, 1, 5, '14.5  初始化事件', '## 14.5  初始化事件\n\n​		简单来说，如果v-on 写在组件标签上，那么这个事件会注册到⼦组件  Vue.js 事件系统中；如果是写在平台标签上，例如 div ，那么事件会被注册到浏览器事件中。\n\n```vue\n <div id=\"counter-event-example\">\n 		<p>{{ total }}</p>\n    <button-counter v-on:increment=\"incrementTotal\"></buttoncounter>\n    <button-counter v-on:increment=\"incrementTotal\"></buttoncounter>\n </div>\n\n<script>  \nVue.component(\'button-counter\', {\n    template: \'<button v-on:click=\"incrementCounter\">{{ counter }}</button>\',\n    data: function () {\n        return {\n            counter: 0\n        }\n    },\n    methods: {\n        incrementCounter: function () {\n            this.counter += 1\n            this.$emit(\'increment\')\n        }\n    },\n})\nnew Vue({\n    el: \'#counter-event-example\',\n    data: {\n        total: 0\n    },\n    methods: {\n        incrementTotal: function () {\n            this.total += 1\n        }\n    }\n})\n</script>\n```\n\n### initEvents 函数\n\n- 执⾏初始化事件相关的逻辑\n\n```js\n// src/core/instance/events.js\nexport function initEvents(vm) {\n    vm._events = Object.create(null)\n    // 初始化⽗组件附加的事件\n    const listeners = vm.$options._parentListeners\n    if (listeners) {\n        updateComponentListeners(vm, listeners)\n    }\n}\n```\n\n### updateComponentListeners 函数\n\n- 如果 vm.$options.\\_parentListeners 不为空，则调⽤ updateComponentListeners ⽅法，将⽗组件向⼦组件注册的事件注册到⼦组件实例中。\n- updateComponentListeners 的逻辑很简单，只需要循环 vm.$options.\\_parentListeners 并使⽤ vm.$on 把事件都注册到this.\\_events 中即可。\n\n```js\nlet target\nfunction add(event, fn, once) {  // 新增事件\n    if (once) {\n        target.$once(event, fn)\n    } else {\n        target.$on(event, fn)\n    }\n}\nfunction remove(event, fn) {     // 删除事件\n    target.$off(event, fn)\n}\nexport function updateComponentListeners(vm, listeners, oldListeners) {\n    target = vm\n    updateListeners(listeners, oldListeners || {}, add, remove, vm)\n}\n```\n\n### updateListeners 函数\n\n​		如果 listeners 对象中存在某个 key （也就是事件名）在 oldListeners 中不存在，那么说明这个事件是需要新增的事件；反过来，如果 oldListeners 中存在某些 key （事件名）在 listeners 中不存在，那么说明这个事件是需要从事件系统中移除的。\n\n```js\n// src/core/vdom/helpers/update-listeners.js\nexport function updateListeners(on, oldOn, add, remove, vm) {\n    let name, cur, old, event\n    for (name in on) {\n        cur = on[name]\n        old = oldOn[name]\n        event = normalizeEvent(name)\n        if (isUndef(cur)) {\n            process.env.NODE_ENV !== \'production\' && warn(\n                `Invalid handler for event \"${event.name}\": got ` + String(cur),\n                vm\n            )\n        } else if (isUndef(old)) {\n            if (isUndef(cur.fns)) {\n                cur = on[name] = createFnInvoker(cur)\n            }\n            add(event.name, cur, event.once, event.capture, event.passive)\n        } else if (cur !== old) {\n            old.fns = cur\n            on[name] = old\n        }\n    }\n    for (name in oldOn) {\n        if (isUndef(on[name])) {\n            event = normalizeEvent(name)\n            remove(event.name, oldOn[name], event.capture)\n        }\n    }\n}\n```\n\n​		分为两部分，第⼀部分是循环on ，第⼆部分是循环 oldOn 。第⼀部分的主要作⽤是判断哪些事件在oldOn 中不存在，调 ⽤add 注册这些事件。第⼆部分的作⽤是循环oldOn ，判断哪些事件 在on 中不存在，调⽤remove 移除这些事件。\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', '	简单来说，如果v-on 写在组件标签上，那么这个事件会注册到⼦组件  Vue.js 事件系统中；如果是写在平台标签上，例如 div ，那么事件会被注册到浏览器事件中。', 1655308800, 1045);
INSERT INTO `article` VALUES (17, 2, 8, 'ENTRYPOINT 相关', '## ENTRYPOINT 相关\n\n### Docker run 命令、CMD指令和ENTRYPOINT指令\n\n参考：\n\n[CMD命令官方文档](https://docs.docker.com/engine/reference/builder/#cmd)\n\n[ENTRYPOINT命令官方文档](https://docs.docker.com/engine/reference/builder/#entrypoint)\n\n[【docker】CMD ENTRYPOINT 区别 终极解读！](https://blog.csdn.net/u010900754/article/details/78526443)\n\n[Dockerfile: ENTRYPOINT和CMD的区别](https://zhuanlan.zhihu.com/p/30555962)\n\n> CMD 和 ENTRYPOINT 的作用都是在容器启动之后指定需要运行的命令。\n\n> CMD 和 ENTRYPOINT 都有 shell 和 exec 两种格式，这个等下再讲，先知道如何使用他们。\n\n#### 前提\n\n- 会使用Dockerfile\n\n#### 举个例子\n\n##### CMD\n\n目录\n\n```\ndemo\n	Dockerfile\n```\n\n\n\nDockerfile内容\n\n```dockerfile\nFROM ubuntu:trusty\n\n# exec格式 第一个参数必须是命令的全路径\nCMD [\"/bin/ping\",\"localhost\"]\n```\n\n[CMD命令官方文档](https://docs.docker.com/engine/reference/builder/#cmd)\n\n构建镜像( cd 到 demo 目录下), 镜像名 pingdemo:v1\n\n- -t:  镜像名和标签\n\n```shell\n$ docker build -t pingdemo:v1 .\n```\n\n\n\n运行容器, 容器叫做 pingname1\n\n```shell\n$ docker run -it --name pingname1 pingdemo:v1\n\nPING localhost (127.0.0.1) 56(84) bytes of data.\n64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.036 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=2 ttl=64 time=0.057 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=3 ttl=64 time=0.095 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=4 ttl=64 time=0.101 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=5 ttl=64 time=0.044 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=6 ttl=64 time=0.286 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=7 ttl=64 time=0.093 ms\n^C\n--- localhost ping statistics ---\n7 packets transmitted, 7 received, 0% packet loss, time 6143ms\nrtt min/avg/max/mdev = 0.036/0.101/0.286/0.079 ms\n```\n\n可以看到运行成功了\n\n\n\n按照这个逻辑，我再run一个名叫 pingname2 的容器，我想要保持容器保持运行 加上了 /bin/bash\n\n[docker run -it centos /bin/bash 后面的 bin/bash的作用](https://blog.csdn.net/persistencegoing/article/details/93713869)\n\n```shell\n$ docker run -it --name pingname2 pingdemo:v1 /bin/bash\n\nroot@c2fed38ead5b:/# \n```\n\n可以看到容器确实保持运行了，却没有ping localhost。 这是为什么呢？\n\n因为 CMD的命令 被/bin/bash 替换了，这就是许多文章中所说的 “覆盖（override）”\n\n##### ENTRYPOINT\n\n[ENTRYPOINT命令官方文档](https://docs.docker.com/engine/reference/builder/#entrypoint)\n\nENTRYPOINT 命令也可以被覆盖，但不建议这么做 --entrypoint 命令\n\n\n\n##### CMD+ENTRYPOINT\n\n既然 CMD命令和ENTRYPOINT 都是在容器启动之后执行的命令，那两者有啥子区别和联系呢？\n\n###### 区别\n\n> CMD: 一个默认命令，用于被覆盖（**The main purpose of a `CMD` is to provide defaults for an executing container.** ）\n>\n> ENTRYPOINT：最好不要被覆盖（An `ENTRYPOINT` allows you to configure a container that will run as an executable.）\n\n###### 联系\n\n当CMD，ENTRYPOINT一起使用时，那就很神奇了。\n\nCMD中的参数会被传入ENTRYPOINT命令中，当做ENTRYPOINT的参数\n\n```dockerfile\n# ENTRYPOINT [\"yarn\"]\n# CMD [\"start\" ]   \n# 相当于 ENTRYPOINT [\"yarn\",\"start\"]\nENTRYPOINT [\"yarn\",\"start\"]\n```\n\n###### 区别+联系\n\n> const theFinal = ENTRYPOINT  +  ( overRide|| CMD  )\n\n解释：最终命令 = ENTRYPOINT + docker run 后面跟着的命令 || CMD\n\n### find / -name \"docker-entrypoint.sh\"\n\n查找 docker-entrypoint.sh文件\n\n/usr/local/bin/docker-entrypoint.sh\n\n\n\n容器的启动脚本', 'CMD 和 ENTRYPOINT 的作用都是在容器启动之后指定需要运行的命令。', 1655654400, 1044);
INSERT INTO `article` VALUES (18, 3, 11, '目录结构', '## 12.1  目录结构\n\n### Vue.js 的 2.5.2 目录结构\n\n```apl\n├── scripts      # 与构建相关的脚本和配置⽂件\n├── dist         # 构建后的⽂件\n├── flow         # Flow 的类型声明\n├── packages     # vue-server-renderer 和 vue-templatecompiler，它们作为单独的 NPM 包发布\n│            		\n├── test           		# 所有的测试代码\n├── src            		# ***源代码***\n│ ├── compiler     		# 与模板编译相关的代码      -- 第3篇内容\n│ ├── core         		# 通⽤的、与平台⽆关的运⾏时代码\n│ │ ├── observer   		# 实现变化侦测的代码		  	 -- 第1章内容\n│ │ ├── vdom       		# 实现虚拟DOM的代码 			  -- 第2篇内容\n│ │ ├── instance   		# Vue.js 实例的构造函数和原型⽅法\n│ │ ├── global-api 		# 全局API的代码\n│ │ └── components 		# 通⽤的抽象组件\n│ ├── server       		# 与服务端渲染相关的代码\n│ ├── platforms    		# 特定平台代码\n│ ├── sfc          		# 单⽂件组件（* .vue⽂件）解析逻辑\n│ └── shared       		# 整个项⽬的公⽤⼯具代码\n└── types          		# TypeScript 类型定义\n  └── test         		# 类型定义测试\n```\n\n### 不同的Vue.js构建版本的区别   \n\n|                               |        UMD         |       CommonJS        |     ES Module      |\n| :---------------------------: | :----------------: | :-------------------: | :----------------: |\n|            完整版             |       vue.js       |     vue.common.js     |     vue.esm.js     |\n|       只包含运⾏时版本        |   vue.runtime.js   | vue.runtime.common.js | vue.runtime.esm.js |\n|      完整版（⽣产环境）       |     vue.min.js     |           —           |         —          |\n| 只包含运⾏时版本 （⽣产环境） | vue.runtime.min.js |           —           |         —          |\n\n#### 编译器、运⾏时、完整版\n\n- 编译器：负责将模板字符串编译成 JavaScript 渲染函数，这部分内容在第三篇中介绍过。\n\n- 运⾏时：负责创建 Vue.js 实例，渲染视图和使⽤虚拟 DOM 实现重新渲染，基本上包含除编译器外的所有部分。\n\n- 完整版：构建后的⽂件同时包含编译器和运⾏时 。\n\n#### UMD、Common.js、ES Module\n\n- UMD：UMD 版本的⽂件可以通过 标签直接在浏览器中使 \\<script> ⽤。jsDelivr CDN 提供的可以在线引⼊ Vue.js 的地址 （https://cdn.jsdelivr.net/npm/vue ），就是运⾏时 + 编译器的 UMD 版本。 \n- CommonJS：CommonJS 版本⽤来配合较旧的打包⼯具，⽐如 Browserify 或 webpack 1，这些打包⼯具的默认⽂件（pkg.main）只包含运⾏时的 CommonJS 版本（vue.runtime.common.js）。 \n- ES Module ：ES Module 版本⽤来配合现代打包⼯具，⽐如 webpack 2 或 Rollup，这些打包⼯具的默认⽂件（pkg.module）只包含运⾏时的 ES Module 版本（vue.runtime.esm.js）。\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', 'Vue.js 的 2.5.2 目录结构', 1655654400, 1034);
INSERT INTO `article` VALUES (19, 4, 15, ' 架构设计', '## 12.2  架构设计\n\n> made，这本看的我如雷贯耳！爽！！！ \n\n### 底 —> 顶\n\nVue 整体分为三个部分： 核⼼代码、跨平台相关和公⽤⼯具函\n\n<img src=\"/Users/ahaofong/Library/Application Support/typora-user-images/image-20220314115430800.png\" alt=\"image-20220314115430800\" style=\"zoom:50%;\" />\n\n#### 核心代码\n\n- 构造函数\n- prototype\n\n- 全局 API\n\n核心代码三部分从下到上，低层为上层服务。\n\n#### 跨平台代码\n\n- 平台\n- 渲染\n- 入口\n\n跨平台代码三部分在核心代码的基础上从下到上，低层为上层服务\n\n#### 公共代码\n\n- shared\n\n### 顶 —>底\n\n​		从整体结构上看，下⾯三层的代码是与平台⽆关的核⼼代码，上⾯三 层是与平台相关的代码。 \n\n![image-20220314155546833](/Users/ahaofong/Library/Application Support/typora-user-images/image-20220314155546833.png)\n\n**例子：**构建Web平台下运⾏的⽂件\n\n​		如果我们构建的是完整版本， 那么会选择Web平台的⼊⼜⽂件开始构建，这个⼊⼜⽂件最终会导出⼀ 个Vue 构造函数。在导出之前，会向Vue 构造函数中⾯添加⼀些⽅ 法，其流程是：先向Vue 构造函数的prototype 属性上添加⼀些⽅ 法，然后向Vue 构造函数⾃⾝添加⼀些全局API，接着将平台特有的代 码导⼊进来，最后将编译器导⼊进来。最终将所有代码同Vue 构造函 数⼀起导出去。', 'made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ made，这本看的我如雷贯耳！爽！！！ ', 1655654400, 1099);
INSERT INTO `article` VALUES (20, 0, 1, 'aergfaerg', 'garegaerwgfera', 'aerfgawefgaewf', 1659196800, 1043);
INSERT INTO `article` VALUES (21, 3, 11, '测试测试测试', '测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试', '测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试测试测试测试测测试', 1659196800, 1002);
INSERT INTO `article` VALUES (22, 6, 26, '测试测试测试', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', 1658505600, 1056);
INSERT INTO `article` VALUES (23, 5, 18, '11111', '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', 1657987200, 1086);
INSERT INTO `article` VALUES (24, 4, 16, '测试测试测试测试', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', 1691510400, 1002);
INSERT INTO `article` VALUES (25, 4, 17, '测试测试测试测试', 'nodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenode', 'nodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenodenode', 1658851200, 1001);
INSERT INTO `article` VALUES (26, 7, 30, '业务业务业务业务业务', '#业务业务业务业务业务\n业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务', '业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务业务', 1690905600, 1046);
COMMIT;

-- ----------------------------
-- Table structure for articlet_tag_connect
-- ----------------------------
-- DROP TABLE IF EXISTS `articlet_tag_connect`;
-- CREATE TABLE `articlet_tag_connect` (
--   `id` int NOT NULL,
--   `article_id` int DEFAULT NULL,
--   `tag_id` int DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of articlet_tag_connect
-- ----------------------------
-- BEGIN;
-- INSERT INTO `articlet_tag_connect` VALUES (1, 12, 1);
-- INSERT INTO `articlet_tag_connect` VALUES (2, 12, 2);
-- INSERT INTO `articlet_tag_connect` VALUES (3, 13, 1);
-- INSERT INTO `articlet_tag_connect` VALUES (4, 18, 0);
-- COMMIT;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int NOT NULL,
  `tagName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tag
-- ----------------------------
BEGIN;
INSERT INTO `tag` VALUES (0, '变量&&类型');
INSERT INTO `tag` VALUES (1, '原型&&原型链');
INSERT INTO `tag` VALUES (2, '作用域&&闭包');
INSERT INTO `tag` VALUES (3, '运行机制');
INSERT INTO `tag` VALUES (4, '语法和API');
INSERT INTO `tag` VALUES (5, 'HTML');
INSERT INTO `tag` VALUES (6, 'CSS');
INSERT INTO `tag` VALUES (7, 'HTML、CSS手写');
INSERT INTO `tag` VALUES (8, '编译原理');
INSERT INTO `tag` VALUES (9, '网络协议');
INSERT INTO `tag` VALUES (10, '设计模型');
INSERT INTO `tag` VALUES (11, 'JavaScript编程');
INSERT INTO `tag` VALUES (12, '实现前端轮子');
INSERT INTO `tag` VALUES (13, '数据结构');
INSERT INTO `tag` VALUES (14, '算法');
INSERT INTO `tag` VALUES (15, '浏览器API');
INSERT INTO `tag` VALUES (16, '浏览器原理');
INSERT INTO `tag` VALUES (17, 'Node');
INSERT INTO `tag` VALUES (18, 'Typescript');
INSERT INTO `tag` VALUES (19, 'React');
INSERT INTO `tag` VALUES (20, 'Vue');
INSERT INTO `tag` VALUES (21, '多端开发');
INSERT INTO `tag` VALUES (22, '数据流管理');
INSERT INTO `tag` VALUES (23, '实用库');
INSERT INTO `tag` VALUES (24, '开发和调试');
INSERT INTO `tag` VALUES (25, '项目构建');
INSERT INTO `tag` VALUES (26, 'Nginx');
INSERT INTO `tag` VALUES (27, '开发提速');
INSERT INTO `tag` VALUES (28, '版本控制');
INSERT INTO `tag` VALUES (29, '持续集成');
INSERT INTO `tag` VALUES (30, '后端技能');
INSERT INTO `tag` VALUES (31, '性能优化');
INSERT INTO `tag` VALUES (32, '前端安全');
INSERT INTO `tag` VALUES (33, '业务相关');
COMMIT;

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  -- `id` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `typeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `orderNum` int NOT NULL,
  PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of type
-- ----------------------------
BEGIN;
INSERT INTO `type` VALUES (0, 'JavaScript基础', 0);
INSERT INTO `type` VALUES (1, 'HTML&&CSS', 1);
INSERT INTO `type` VALUES (2, '计算机基础', 2);
INSERT INTO `type` VALUES (3, '数据结构&&算法', 3);
INSERT INTO `type` VALUES (4, '运行环境', 4);
INSERT INTO `type` VALUES (5, '框架&&类库', 5);
INSERT INTO `type` VALUES (6, '前端工程', 6);
INSERT INTO `type` VALUES (7, '项目&&业务', 7);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
