# Portrans
使用iframe嵌套非80/443端口网站，来代替端口转发。使用JavaScript来监听iframe路由变化，支持SPA的history路由。
## 用法
1. 在包装页中引入portrans.js，必须要加url参数指定要嵌套的网页。
```html
<html>
  <body>
    <iframe></iframe>
  </body>
  <script src="portrans.js?url=http://xxxx.com:9999"></script>
</html>
```
2. 可以将这个包装页放在对象存储或自己的服务器上，将404页面也指向该包装页。
3. 在 http://xxxx.com:9999 下的全部网页都要引入 portrans.js 不要加url参数。
