// 验证是否登录，没有登录跳转登录页，如果登录，获取登录信息

(async function(){
    const resp =  await API.profile()   // 为了得到taken
    const user = resp.data;
    if(!user){
        alert('未登录或登录已过期，请重新登陆')
        location.href = './登录页面.html';
        return
    }
    const doms = {
        picture:{
            nickname: $('.nickname'),
            loginId: $('.loginId'),
        },
        close: $('.close'),
        dialogbox: $('.dialogbox'),
        inputTxt: $('.input-txt'),
        dialogbox: $('.dialogbox'),
        form : $('.formitem')
    }

    // 下面的状态一定是登陆状态
    // 注册事件
    doms.close.onclick = function(){
        API.loginOut();
        location.href = './登录页面.html'
    }

    // 注册事件
    await loadHistory();
    async function loadHistory(){
        const resp = await API.getHistory();
        for (const item of resp.data) {
         addChat(item)
       }
       scrollBottom()
    }

    const button = $('.sending')
    button.onclick = function(){
        console.log('点击');
    }
    // 发送事件
    doms.form.onsubmit = function(e){
        e.preventDefault();
        sendChat();
    }

    // 设置用户信息
    setUserInfo()
    function setUserInfo(){
        doms.picture.nickname.innerText = user.nickname;
        doms.picture.loginId.innerText = user.loginId;
    }

    // 根据消息对象，将其添加到页面中
    /**
     * content: '你几岁了？'
     * createdAt: 
     * from: 'linxi'
     * to: null
     */
    function addChat(chatInfo){
        const div = $$$('div')
        div.classList.add('item')
        if(chatInfo.from){
            div.classList.add('me')
        }

        const img = $$$('img');
        img.className = 'contentimg'
        img.src = chatInfo.from ? '../imgs/用户头像.png' : '../imgs/机器人.png'

        const content = $$$('span');
        content.innerText = chatInfo.content;

        // const data = $$$('div');
        // data.className = 'chat-data';
        // data.innerText = 'formatDate(chatInfo.createdAt)';

        div.appendChild(img);
        div.appendChild(content);
        // div.appendChild(data);
        doms.dialogbox.appendChild(div)
    }
    // function formatDate(itemstamp){
    //     const data = new Date(itemstamp)
    //     const year = date.getFullYear();
    // }

    // 让滚动条滚动到最后
    function scrollBottom(){
        doms.dialogbox.scrollTop = doms.dialogbox.scrollHeight;
        console.log(doms.dialogbox.scrollHeight);
    }
    
    // 发送消息
    async  function sendChat(){
        const content = doms.inputTxt.value.trim();
        if(!content){
            return
        }
        // 第一时间在页面上创建一个元素
        addChat({
            from: user.loginId,
            to: null,
            createdAt: Date.now(),     // 创建当前时间戳
            content
        });
        doms.inputTxt.value = '';
        scrollBottom();

        const resp = await API.sendChat(content)
        addChat({
            from: null,
            to: user.loginId,
            ...resp.data
        });
        scrollBottom()
    }
    window.sendChat = sendChat;
})()
