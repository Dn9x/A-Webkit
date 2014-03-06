global.$ = jQuery;

var Users = require('./model/users');
var gui = require('nw.gui');

//使用jquery
$(document).ready(function() {

  $("#login").click(function(){

    var login = $('input[name="login"]').val();
    var pswd = $('input[name="password"]').val();

    //简单验证登录名
    if(login.length == 0){
      $("#error").html('登录名输入错误').show();
      return;
    }

    //简单验证密码
    if(pswd.length == 0){
      $("#error").html('密码输入错误').show();
      return;
    }

    //查找用户
    Users.getUser(login, function(err, user){ 
      if(user.length > 0){ 
        //如果存在，就返回用户的所有信息，取出password来和post过来的password比较
        if(user[0].pswd == pswd){ 

          //获取当前窗口
          var win = gui.Window.get();

          //关闭当前窗口
          win.close();

          //打开新窗口
          gui.Window.open("view/main.html?name="+user[0].name, {
            position: 'center',
            width: 800,
            height: 600
          });
        }else{ 
          //密码错误
          $("#error").html('密码错误').show();
        } 
      }else{ 
        //用于不存在
        $("#error").html('用户不存在').show();
      } 
    }); 

  });
});