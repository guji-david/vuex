<template>
  <div class="login-wrap">
    <div class="ms-title">金投手后台管理系统</div>
    <div class="ms-login">
      <el-form :model="loginObj" label-width="80px"  ref="loginObj":rules="rules">
        <el-form-item label="用户名：" prop="name">
          <el-input type="text" v-model.trim="loginObj.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd">
          <el-input type="password" v-model.trim="loginObj.pwd" placeholder="请输入密码" @keyup.enter.native="signIn('loginObj')"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="code">
          <el-input type="code" class="login-input" v-model.trim="loginObj.code" placeholder="请输入验证码"@keyup.enter.native="signIn('loginObj')" ></el-input>
          <div class="login_code">
            <el-button class="login_code_btn"
                       :plain="true"
                       size="mini"
                       type="info"
                       @click ="sendCode()"
                       :disabled="getVerifyCodeDisabled"
            >{{getVerifyCodeText}}</el-button>
          </div>
        </el-form-item>
        <div class="login-btn">
        <el-button type="primary"@click="signIn('loginObj')">登录</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog title="提示" v-model="errorMsgDialogVisible" size="tiny">
      <span >{{resultMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="default" @click="msgBtn">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Axios from 'axios'
  import * as API from '../../store/api'
  import * as TOOLS from '../../assets/js/tools'
  let intervalId;
  export default{
    data(){
      var validateName=(rule, value, callback)=>{
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (value.length > 30) {
            callback(new Error('您输入的长度不能超过30个字符!'));
          } else {
            callback();
          }
        }, 100);
      };
      var validatePwd=(rule, value, callback)=>{
        if (!value) {
          return callback(new Error('密码不能为空'));
        }else{
          callback();
        }

      };
      var validateCode=(rule, value, callback)=>{
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else{
            callback();
        }

        /*setTimeout(() => {
          if (!TOOLS.checkVerifyCode(value)) {
            callback(new Error('验证码必须为6位数字!'));
          } else {
            callback();
          }
        }, 100);*/
      };
      return{
        errorMsgDialogVisible:false,
        getVerifyCodeDisabled:false,
        borderColor: "",
        count:60,
        getVerifyCodeText: "获取验证码",
        loginDiabled:false,
        resultMsg:'',
        loginObj:{
          name:'',
          pwd:'',
          code:''
        },
        rules: {
          name: [
            {required: true,validator: validateName, trigger: 'blur' }
            ],
          pwd: [
            {required: true,validator: validatePwd, trigger: 'blur' },
          ],
          code: [
            {required: true,validator: validateCode, trigger: 'blur' },
          ]

        },
      }
    },
    methods:{
        /*//处理公共数据 增加全部选项
        addLabelAll(obj){
          let allLabelObj={"label":"全部","value":""};
          for(let key in obj){
            obj[key].unshift(allLabelObj);
          }
          return obj;
        },*/
      /*
       * 发送验证码
       * */
      sendCode: function() {
        this.$refs.loginObj.validateField("name",(valid) => {
          if (!valid) {
            API.$downVerifyCode(this.loginObj.name, res=> {
              if(res.success){
                this.borderColor = "#eee";
                this.getVerifyCodeDisabled = true;
                this.countDown();
              }else {
                this.resultMsg=res.resultMsg;
                this.errorMsgDialogVisible=true;
              }

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      numInterval:function() {
        this.getVerifyCodeText = this.count + '秒后重发';
        this.count--;
        if (this.count<=0) {
          clearInterval(intervalId);
          this.getVerifyCodeText = '获取验证码';
          this.getVerifyCodeDisabled = false;
          this.borderColor="#ff9959";
          this.count=6;
        }
      },
      countDown: function() { // 倒计时
        var _this = this;
        intervalId = setInterval(function () {
          _this.numInterval();
        },1000);

      },
      reset(formName){
        this.$refs[formName].resetFields();
      },
      signIn(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.$login(this.loginObj.name,this.loginObj.pwd,this.loginObj.code,res=>{
              if(res.success){
                 /* if(res.data.permissionTrees.length!=0){
                    TOOLS.setList("subnavData",res.data.permissionTrees);
                    let JSONlist=TOOLS.getNavDateToSimpleJson(TOOLS.getList("subnavData"));//将树形导航嵌套的json转换成单层json
                    TOOLS.setList("simpleJsonSubnavData",JSONlist);
                    TOOLS.setUser(res.data.user.nickName);
                  }*/
                this.$router.push({ name: 'Dispatch'});

//                window.sessionStorage['Console-token'] = res.data.user.token;

              }else{
                this.resultMsg=res.resultMsg;
                this.errorMsgDialogVisible=true;
                this.loginDiabled=false;
                this.fullscreenLoading = false;
              }
            },res=>{
                console.log("错误提示 ")
                console.log(res)
            })
          } else {
            this.fullscreenLoading = false;
            return false;
          }
        });


      },
      msgBtn(){
        this.errorMsgDialogVisible = false;
        this.loginDiabled=false;
      }
    }
  }
</script>
<style scoped lang="less">
 @import "./login.less";
</style>
