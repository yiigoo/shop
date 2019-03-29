<template>
	<div>
		<el-dialog
			:title="title"
			:width="width"
			:visible.sync="visible"
			:top="top"
			:show-close="showClose"
			center>
			<slot></slot>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary">确定</el-button>
				<el-button @click="visible = false">取消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		components: {},
		props : {
			// 默认查询参数
			width : {
				type: String ,
				default : '80%'
			},
			title : {
				type: String ,
				default : '80%'
			},
			top : {
				type: String ,
				default : '15vh'
			},
			showClose : {
				type: Boolean ,
				default : true
			}
		},
		data() {
			return {
				visible : true ,
			}
		},
		methods: {
			setDefault( option = {} ) {
				option.width && ( this.width = option.width )
				option.title && ( this.title = option.title )
				option.top &&  ( this.top = option.top )
				if ( typeof option['show-close'] === 'boolean' ){
					this.showClose = option['show-close']
				}
			}
		},
		beforeDestroy: function() {},
		destroyed: function() {
			document.body.removeChild(this.$el)
		}
	}
</script>
