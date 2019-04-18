<template>
	<div>
		<el-dialog
			 v-loading="loading"
			:title="title"
			:width="width"
			:visible.sync="visible"
			:top="top"
			:show-close="showClose"
			center>
			<slot></slot>
			<div slot="footer" class="dialog-footer">
				<el-button 
					:type="btn.type || 'primary'"
					v-for="(btn , index) in btns" 
					@click="btn.click()"
					:key="index">
					{{ btn.label }}
				</el-button>
			</div>
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
				default : '测试'
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
				btns: [],
				visible: true ,
				loading: false
			}
		},
		methods: {
			hide() {
				this.visible = !this.visible
			},
			setBtns(btns) {
				this.btns = btns
			},
			toggleLoading() {
				this.loading = !this.loading
			}
		},
		beforeDestroy: function() {},
		destroyed: function() {
			document.body.removeChild(this.$el)
		}
	}
</script>
