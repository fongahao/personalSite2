const content = "## 数据持久化-二级标签\n" +
    "\n" +
    "[volume-configuration-reference](https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference)\n" +
    "\n" +
    "[云原生之Docker数据持久化实现](https://mp.weixin.qq.com/s/2YPcOPbyOfz5DHQSyyf-Dg)\n" +
    "\n" +
    "[挂载目录（bind mounts）和Volume是不同的](https://www.jianshu.com/p/23edfd959add)\n" +
    "\n" +
    "使用在docker-compose.yml 文件中 使用volumes\n" +
    "\n" +
    "```dockerfile\n" +
    "volumes:    # 数据持久化\n" +
    "\t- ../mysql/data:/var/lib/mysql\n" +
    "```\n" +
    "\n" +
    "## 数据库初始化-二级标签\n" +
    "\n" +
    "​\t数据库持久化可以用`bind mounts `或者 Volumes进行实现，初始化可以使用Navicat导出数据库` sql`语句 ,然后使用`mysql` 容器 提供的 初始化数据时可以将数据库语句 `COPY` 到 ` /docker-entrypoint-initdb.d/`目录下，可以一并进行初始化。这很好，但我们每次删除镜像时，为了确保文章存在，都要手动的从Navicat导出sql语句。略显的麻烦。\n" +
    "\n" +
    "​\t有什么办法可以爽快的删除，愉快的一键开启应用呢？（`doocker-compose up --build`）\n" +
    "\n" +
    "### Have A Try-三级标签\n" +
    "\n" +
    "#### idea 1-四级标签\n" +
    "\n" +
    "​\t既然之前的 `bind mounts` 可以将 `data` 目录和 `mysql`容器的进行挂载\n" +
    "\n" +
    "```dockerfile\n" +
    "volumes:    # 数据持久化\n" +
    "      - ../mysql/data:/var/lib/mysql\n" +
    "```\n" +
    "\n" +
    "​\t那我可以删除data中所有的数据只留我想要的数据库（react_blog）, 换句话说 下次构建镜像时，data目录下是有数据的，让我看看这个办法行不行。\n" +
    "\n" +
    "```sh\n" +
    "eact_blog_mysql | 2021-11-05T07:56:27.493964Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.0.27) initializing of server in progress as process 44\n" +
    "react_blog_mysql | 2021-11-05T07:56:27.497633Z 0 [ERROR] [MY-010457] [Server] --initialize specified but the data directory has files in it. Aborting.\n" +
    "react_blog_mysql | 2021-11-05T07:56:27.497658Z 0 [ERROR] [MY-013236] [Server] The designated data directory /var/lib/mysql/ is unusable. You can remove all files that the server added to it.\n" +
    "```\n" +
    "\n" +
    "**显然不行，挂载的目录下不能有数据。**\n" +
    "\n" +
    "\n" +
    "\n" +
    "#### idea  2-四级标签\n" +
    "\n" +
    "​\t既然第一次构建、运行、添加文章的数据都已经在数据中了（react_blog），已经有了react_blog,，那我第2次（n次）就不要初始化数据库了 ,直接将react_blog复制到data目录下？\n" +
    "\n" +
    "```dockerfile\n" +
    "FROM mysql\n" +
    "\n" +
    "# COPY ../sql/*.sql /docker-entrypoint-initdb.d/\n" +
    "```\n" +
    "\n" +
    "\n" +
    "\n" +
    "**不行，这个想法太危险了。**\n" +
    "\n" +
    "\n" +
    "\n" +
    "#### idea  3-四级标签\n" +
    "\n" +
    "## 数据库初始化1111111111111111111111111\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n" +
    "## 数据库初始化\n"
"​\t";

export { content }