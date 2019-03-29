<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="商品名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="商品分类">
				<el-select v-model="form.region" placeholder="请选择商品分类">
					<el-option label="分类一" value="shanghai"></el-option>
					<el-option label="分类二" value="beijing"></el-option>
				</el-select>
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
			}
		},
		data() {
			return {
				loading : false ,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {

			},
			
		},
		created() {
		}
	}
</script>
