import Vue from 'vue'
import _modal from './index.vue' // 子组件

class Modal {
    constructor(component = {}, option = {}, callback) {
        // on 属性为render属性的方法，给生成的元素添加事件
        option.on = option.on || {}

        this.instance = new Vue({
            el: document.createElement('div'),
            render: function(createElement) {
                return createElement(
                    _modal, [
                        createElement(
                            component,
                            option,
                            this.$slots.default
                        ),
                    ]
                )
            }
        })

        // 挂到第一节点,第一节点就是_modal
        this.pageInstance = this.instance.$children[0]

        // 初始化传值，title 等
        this.pageInstance.setDefault(option)
        document.body.appendChild(this.instance.$el)
        $instanceModalArray.push(this)
    }

}
window.$instanceModalArray = []
export default Modal