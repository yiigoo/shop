<template>
	<div>
		<el-table 
			:data="tableData" 
			stripe 
			style="width: 100%">

			<el-table-column
				v-for="item in tableColumn" 
				:key="item.label"
				:prop="item.prop"
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
		{{ tableData }}
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
			tableData : {
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
			}
		},
		methods: {
			currentChange ( currentPage ){
			}
		},
		mounted() {
			
		},
		created() {
			
		}
	}
</script>
