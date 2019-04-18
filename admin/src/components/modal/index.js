import Vue from 'vue'
import _modal from './index.vue' // 子组件

class Modal {
    constructor(component = {}, option = {}, callback) {
        // on 属性为render属性的方法，给生成的元素添加事件
       
        this.instance = new Vue({
            el: document.createElement('div') ,
            render(createElement) {
                return createElement(
                    _modal ,
                    option , 
                    [
                        createElement(
                            component ,
                            {
                                props : option.data
                            }
                        )
                    ]
                )
            },
        })
        
        this.instance['modal'] = this.instance.$children[0]
        this.instance['modal'].callback = (data)=>{
            callback( data )
        }

        document.body.appendChild(this.instance.$el)
        $instanceModalArray.push(this)
    }

}
window.$instanceModalArray = []
export default Modal