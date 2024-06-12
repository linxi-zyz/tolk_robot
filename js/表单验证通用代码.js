/**
 * 对某一个对象验证的构造函数,类，类必须有constructor方法
 */
class filedValidator{
    /**
     * 
     * @param {String} wordtxt 文本框ID 
     * @param {Function} validatorFunc 验证规则，当对文本框验证时，会调用该函数，函数参数为文本框的值，返回值的值为验证的错误消息，若没有返回值表示无措
     */
    constructor(txtId,validatorFunc){
        this.input = $('#'+ txtId);
        this.p = this.input.nextElementSibling;
        this.validatorFunc = validatorFunc;      //调用规则函数，后面需要用到
        // 验证分两种情况，一是失去焦点的时候，一是点击提交的时候
        // onblur失去焦点
        this.input.onblur = ()=>{
            this.validate()
        }
    }
     /**
         * 验证，成功返回true，失败返回false; 方法在原型上，需要创建对象使用
         * 一、失去焦点时候验证
         */
     async validate(){
        // console.log('验证');
        // 该函数为回调函数，传值判断，做后续处理
       const err = await this.validatorFunc(this.input.value)
       if(err){
        this.p.innerText = err;
        return false
       }
        this.p.innerText = '';
        return true
    }
    /**
     * 对传入的所有验证器验证，如果所有验证均通过则返回true，否则返回false
     * @param {filedValidator[]} validators
     *  静态方法验证，写到构造函数上，不需要对象调用，可以将对象传入完成调用
     * 二、提交表单时候验证
     */
    static async validate(...validators){
        const proms = validators.map(v=>v.validate());
        const result = await Promise.all(proms);
        return result.every(r=>r);      //查看每一项是否为true
    }
    
}


// function test(){
//     filedValidator.validate(loginIdValidator,logingNicnameValidator).then((result)=>{
//         console.log(result);
//     })
// }