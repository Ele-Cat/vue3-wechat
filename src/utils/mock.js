import Mock from "mockjs";

//拦截ajax生成伪数据
// Mock.mock("/v5/list/", {
//   name: "mumu",
//   age: 18,
// });

Mock.mock("/mock/api/userInfo", {
  code: 200,
  success: true,
  "data": {
    //生成随机id
    id: "@guid",
    //随机生成名字
    name: "@cname",
    //随机生成1-100之间的任意一个数
    "age|1-120": 1,
    "gender|1": ['male', 'famale'],
    //随机生成一行段落
    description: "@cparagraph",
    //随机生成一个带有正则的电话号码
    phone: /1\d{10}/,
    //随机生成一个邮箱
    email: /[a-z]{6,8}@(126|163|qq)\.(com|cn|net)/,
    //随机生成一个时间
    birthday: "@date('YYYY-MM-dd')",
    address: "@county(true)",
    //随机生成一个图片
    avatar: "@dataImage('50x50', '@name')",
  },
});

Mock.mock("/mock/api/friend", {
  code: 200,
  success: true,
  "data|500": [
    {
      //生成随机id
      id: "@guid",
      //随机生成名字
      name: "@cname",
      //随机生成1-100之间的任意一个数
      "age|1-120": 1,
      "gender|1": ['male', 'famale'],
      //随机生成一行段落
      description: "@cparagraph",
      //随机生成一个带有正则的电话号码
      phone: /1\d{10}/,
      //随机生成一个邮箱
      email: /[a-z]{6,8}@(126|163|qq)\.(com|cn|net)/,
      //随机生成一个时间
      birthday: "@date('YYYY-MM-dd')",
      address: "@county(true)",
      //随机生成一个图片
      avatar: "@dataImage('50x50', '@name')",
    },
  ],
});

Mock.mock("/mock/api/collect", {
  code: 200,
  success: true,
  "data|2-10": [
    {
      id: "@guid",
      title: "@ctitle(8,14)",
      content: "@cparagraph",
      author: "@cname",
      "tags|2-5": ["@integer(1, 100)"],
      time: "@date('yyyy-MM-dd')",
      cover: "@dataImage('44x44', '最近')",
    },
  ],
});

// 示例
const mockData = Mock.mock({
  "data|10": [
    {
      //生成随机id
      "id|+1": 1024,
      //随机生成名字
      name: "@cname",
      //随机生成1-100之间的任意一个数
      "age|1-100": 1,
      //随机生成一个小数，小数点后面有2-5位
      "price|25-50.2-5": 1,
      //随机生成1-5颗星
      "score|1-5": "*",
      //随机生成8-14个文字
      title: "@ctitle(8,14)",
      //随机生成一行段落
      description: "@cparagraph",
      //随机生成一个对象
      "des|2": {
        eye: 1,
        hand: 2,
        job: "teacher",
      },
      //随机生成一个带有正则的电话号码
      tel: /1\d{10}/,
      //随机生成一个邮箱
      email: /[a-z]{2,6}@(126|163|qq)\.(com|cn|net)/,
      //根据随机生成的age值返回一个布尔类型
      canMerry: function () {
        if (this.age > 22) {
          return true;
        } else {
          return false;
        }
      },
      //随机生成一个时间
      day: "@date('yyyy-MM-dd')",
      time: "@time('HH:mm:ss')",
      add: "@county(true)",
      //随机生成一个图片
      avatar: "@dataImage('200x100','')",
    },
  ],
});
// 解开下面的log就可以在浏览器中查看mockData的值
// console.log('mockData', mockData)
