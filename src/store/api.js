import axios from 'axios'
let getTimestamp=new Date().getTime();//当前时间
const API_HOST="http://127.0.0.1:8080/console";//test
/**
 * 发送网络请求 host为API_HOST
 */
export function postRequest(action, obj, successFun,errorFun) {
  let exp = new Date();
  exp.setTime(exp.getTime() + 1800000);//每次调用后的token有效期为半个小时

  if(window.sessionStorage['Console-token']){//如果cookie的console-token存在的话

    axios.defaults.headers.common['Console-token'] =  window.sessionStorage['Console-token'];
    // console.log(`sendCookie--${document.cookie.split('=')[1]}`);
    console.log(`sendCookie--${window.sessionStorage['Console-token']}`);
  }

  axios.post(API_HOST + action + "?timestamp=" + getTimestamp , obj )//URL已增加时间戳
    .then(function (response) {

      // if(document.cookie.indexOf ('Console-token') < 0){//如果cookie的console-token不存在的话
      if(!window.sessionStorage['Console-token']){//如果cookie的console-token不存在的话

          if(action=="/gateway/user/login"||action=="/gateway/user/getCode"){
              if(!response.data.data){
                  successFun(response.data);
                  return;
              }
          }
          window.sessionStorage['Console-token'] = response.data.data.user.token;

      }

      if (typeof (response.data.data)==="string" && (/^[\[\],:{}\s]*$/).test(response.data.data) ){
        successFun(JSON.parse(response.data.data));
      }else{
        successFun(response.data);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      errorFun(error);
    });
}

/*******************************************************************************
 * 登陆获取验证码
 *
 * @param email
 *            电话号码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $downVerifyCode(email,souceFun,errorFun) {
    postRequest("/gateway/user/getCode", {
        'email':email,
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 用户登录
 *
 * @param email
 *            电话号码
 * @param pwd
 *            密码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $login(email, pwd,code, souceFun, errorFun) {
    postRequest("/gateway/user/login", {
        'email':email,
        'pwd':pwd,
        'code':code,
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取红包查询(列表)-王鑫
 *
 * @param pageNo
 *            页码
 * @param pageSize
 *            每页显示几个
 * @param name
 *            红包名称
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $queryRedpacket(pageNo,pageSize,name,souceFun, errorFun) {
    postRequest("/gateway/bizGift/queryRedpacket", {
        "pageNo":pageNo,
        "pageSize":pageSize,
        "name":name,
        "isDel":false
    }, souceFun, errorFun);
};
