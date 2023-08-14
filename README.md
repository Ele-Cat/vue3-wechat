# Vue3 WeChat

- 使用 Vite + Vue3 + AntDesignVue + Pinia + MockJS 搭建的复刻新版微信项目
- [查看演示](https://ele-cat.gitee.io/vue3-wechat/)

## 功能截图

![功能截图](./snapshot/interface.jpg)

## 功能点

- [x] 界面主体
- [x] 工具栏
- [x] 聊天列表
- [x] 用户列表
- [x] 收藏列表
- [x] 聊天操作联动
- [x] 通讯录操作联动
- [ ] 收藏笔记操作联动
- [ ] 右键菜单联动
- [x] Mock 通讯录信息
- [x] Mock 用户消息
- [ ] Mock 收藏消息
- [ ] 拖拽、缩放聊天窗口
- [ ] 锁屏功能
- [ ] 预设[小爱同学API](http://jiuli.xiaoapi.cn/i/chat/xiaoai_tts.php?msg=你好)

## 使用

### 安装

```
npm install
```

### 运行

```
yarn serve
```

### 打包

```
yarn build
```

## 使用的插件

- [pinia](github.com/vuejs/pinia)
- [pinia-plugin-persist](github.com/Seb-L/pinia-plugin-persist)
- [mockjs](github.com/nuysoft/Mock)
- [axios](github.com/axios/axios)
- [js-pinyin](github.com/waterchestnut/pinyin)
- [perfect-scrollbar](https://github.com/mdbootstrap/perfect-scrollbar)

## 参考文档、博客

- [一文搞懂 pinia 状态管理（保姆级教程）](https://zhuanlan.zhihu.com/p/533233367)
- [Vue3 + Pinia 持久化存储](https://blog.csdn.net/weixin_36757282/article/details/127226319)
- [mockjs 官网示例](http://mockjs.com/examples.html)
- [mockjs——mockjs 定义、mockjs 安装、mockjs 使用、mockjs 方法、mockjs 语法、代码示例](https://blog.csdn.net/TKY666/article/details/126215513)
- [正确开启 Mockjs 的三种姿势：入门参考（一）](https://www.cnblogs.com/soyxiaobi/p/9846057.html)
- [Vue 模拟通讯录列表用 js-pinyin 获取汉字首字母，形成字母索引](https://blog.csdn.net/m0_67063430/article/details/128951993)
