const loginIdValidator = new filedValidator('loginId',async function(val){
    // 判断规则
    if(!val){
        return '请输入账号'
    }
})
const loginPswValidator = new filedValidator('loginPwd',function(val){
    if(!val){
        return '请输入密码'
    }
})

const form = $('.form-area');
form.onsubmit = async function(e){
    // console.log('表单正在提交');        页面会刷新，并不会长时间显示打印文本
    e.preventDefault();
    const result = await filedValidator.validate(
        loginIdValidator,
        loginPswValidator,
        )
    if(!result){
        return
    }

// ForData,游览器提供，得到form表单dom数据对象,name为键，必须有name才能拿到键值，get拿到一个属性，entries拿到所欲键值对，类似数组（数组里面套数组；Object里面有方法fromEntries()可以还原成对象
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const resp = await API.login(data);
    console.log(data,resp);
    if(resp.code === 0){
        alert('登陆成功，点击确定，即将跳转首页')
        location.href = './聊天界面.html'      //页面跳转
    }else{
        alert('登录失败，请检查账号和密码')
        loginPswValidator.input.value = ''
    }
}
