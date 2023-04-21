# 设置基础镜像
FROM nginx-alpine
# 定义作者
MAINTAINER yao guan shou
#对外暴露的端口
EXPOSE 80

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
RUN echo '复制静态文件到nginx html目录中'
COPY dist/client  /usr/share/nginx/html/
RUN echo '复制成功'
# 覆盖默认配置
RUN echo '复制nginx.conf配置到容器中'
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo '复制成功'
 

RUN echo 'client镜像build打包成功'

