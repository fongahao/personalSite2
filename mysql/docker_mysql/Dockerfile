FROM mysql

#  docker-entrypoint-initdb.d下的目录会默认执行 sql语句
COPY ../sql/*.sql /docker-entrypoint-initdb.d/ 
# COPY ./sql/*.sql /docker-entrypoint-initdb.d/  云服务器上要这样