import Mock from "mockjs";

//拦截ajax生成伪数据
// Mock.mock("/v5/list/", {
//   name: "mumu",
//   age: 18,
// });

const data = Mock.mock({
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
console.log("data: ", data);
