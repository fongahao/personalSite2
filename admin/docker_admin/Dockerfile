FROM nginx

# 删除 Nginx 的默认配置
RUN rm /etc/nginx/conf.d/default.conf
# COPY ./build /usr/share/nginx/html 不要复制 直接使用挂载

EXPOSE 8000