<template>
	<div>
		<el-form ref="form" :model="form" label-width="140px">
			<el-form-item label="名字">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="商品分类">
				<el-select v-model="form.sex" placeholder="请选择性别">
					<el-option label="男" value="男"></el-option>
					<el-option label="女" value="女"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="日期">
				<el-date-picker
					v-model="form.date"
					type="date"
					size="mini"
					value-format ="yyyy-MM-dd"
					placeholder="选择日期">
				</el-date-picker>
				</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props : {
        // 默认查询参数
			test : {
				type: Object ,
				default(){
					return  {
					}
				}
			},
			item : {
				type: Object ,
				default(){
					return {}
				}
			},
		},
		data() {
			return {
				loading : false ,
				form : {}
			}
		},
		methods: {
			submit() {
				this.$root['modal'].toggleLoading()
				
				setTimeout( ()=>{
					this.$root['modal'].toggleLoading()
					this.$message({
						showClose: true,
						message: `保存成功！`,
						type: 'success'
					});
					this.$root['modal'].hide()
					this.$root['modal'].callback( this.form )
				},2000)
			},
			cancel(){
				this.$message({
					showClose: true,
					message: '这是一条消息提示',
					type: 'success'
				});
				this.$root['modal'].hide()
				
			}
		},
		created() {
			this.form = JSON.parse(JSON.stringify( this.item ))
			// 设置弹出窗按钮以及事件
			this.$root['modal'].setBtns([
				{ label : "确定" , click : this.submit },
				{ label : "取消" , type: 'success' , click : this.cancel }
			])
		}
	}
</script>
