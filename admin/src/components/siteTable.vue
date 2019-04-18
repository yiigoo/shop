<template>
	<div v-loading="loading">
		<el-table 
			:data="tableData" 
			stripe 
			style="width: 100%">

			<el-table-column
				v-for="item in tableColumn" 
				:key="item.label"
				:prop="item.prop"
				:width="item.width"
				:label="item.label">
					<template slot-scope="scope">
						<slot :name="item.prop" :scope="scope">
							{{ scope.row[item.prop] }} 
						</slot>
					</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="text-center mt20"
			layout="prev, pager, next"
			@current-change="currentChange"
			:total="1000">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'Goods',
		props : {
			tableColumn : {
				type : Array ,
				default : []
			},
			textText : {
				type : Boolean ,
				default : false
			}
		},
		data() {
			return {
				loading : false ,
				tableData :[]
			}
		},
		methods: {
			currentChange ( currentPage ){
				this.getTable()
			} ,
			getTable(){
				this.loading = true
				setTimeout( ()=>{
					let data = [{
							name : '测试',
							sex : '男' ,
							date : '2019-01-21 00:00:44'
						},
						{
							name : '测试2',
							sex : '男2' ,
							date : '2019-01-24 00:00:33'
						},{
							name : '测试3',
							sex : '女' ,
							date : '2019-01-21 00:00:44'
						},
						{
							name : '测试4',
							sex : '男2' ,
							date : '2019-01-24 00:00:33'
						}]
					this.tableData = data
					this.loading = false
				} , 500)
			}
		},
		mounted() {
			
		},
		created() {
			this.getTable()
		}
	}
</script>
