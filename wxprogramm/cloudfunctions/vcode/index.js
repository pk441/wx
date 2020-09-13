// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
let getCode=function() {
  var num = parseInt(Math.random() * 9000) + 1000;
  return num;
}
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  //随机生成4位验证码数字的函数
  let code=getCode();
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  //   code:getcode()
  // }
  return {
    code
  }
}