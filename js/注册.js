const loginIdValidator = new filedValidator('loginId',async function(val){
    // 判断规则
    if(!val){
        return '请输入账号'
    }
       const resp = await API.exists(val);
       if(resp.data === true){
       return '账号已存在'
       }
})
const logingNicnameValidator = new filedValidator('nickname',async function(val){
    if(!val){
        return '请输入昵称'
    }
       const resp = await API.exists(val);
       if(resp.data === true){
       return '昵称已存在'
       }
})
const loginPswValidator = new filedValidator('loginPwd',function(val){
    if(!val){
        return '请输入密码'
    }
})
const loginPswAgainValidator = new filedValidator('aginpsw',function(val){
    if(!val){
        return '请再次输入密码'
    }
    if(loginPswValidator.input.value !== val){
        return '两次密码不一致'
    }
})

const form = $('.form-area');
form.onsubmit = async function(e){
    // console.log('表单正在提交');        页面会刷新，并不会长时间显示打印文本
    e.preventDefault();
    const result = await filedValidator.validate(
        loginIdValidator,
        logingNicnameValidator,
        loginPswValidator,
        loginPswAgainValidator
        )
    if(!result){
        return
    }
// 得到应该对象方法一
//     const data = {
//         loginid: loginIdValidator.input.value,
//         loginpsw: loginPswValidator.input.value,
//         loginname: logingNicnameValidator.input.value
//     }
//     console.log(data);
// 得到对象方法二：
// ForData,游览器提供，得到form表单dom数据对象,name为键，必须有name才能拿到键值，get拿到一个属性，entries拿到所欲键值对，类似数组（数组里面套数组；Object里面有方法fromEntries()可以还原成对象
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const resp = await API.reg(data);
    console.log(data,resp);
    if(resp.code===0){
        alert('注册成功，点击确定，即将跳转登录页')
        location.href = './登录页面.html'      //页面跳转
    }
}
