<template>
	<div>
		<el-header class="layout-page-nav" height="30px">
			<div class="main-nav">
				<ul>
					<li class="active">商品列表</li>
					<li>商品分类</li>
					<li>优惠券</li>
				</ul>
			</div>
		</el-header>

		

		<site-table
			ref="table"
			size="mini"
			:action = "'api'"
			:tableColumn = "tableColumn"
			:text-text="true"
			:tableData = "tableData">

			<div slot="name" slot-scope="column">
				<el-button type="primary" @click="show( column.scope.row.name )">{{ column.scope.row.name }}</el-button>
			</div>
			<div slot="date" slot-scope="column">
				<el-date-picker
				 	@change="change( $event , cc.scope.$index )"
					v-model="column.scope.row.date"
					type="date"
					size="mini"
					value-format ="yyyy-MM-dd"
					placeholder="选择日期">
				</el-date-picker>
			</div>

		</site-table>
		
	</div>
</template>

<script>
	import List from './list'
	export default {
		name: 'Goods',
		data() {
			return {
				tableData : [
					
				],
				tableColumn : [
					{
						prop : 'name' ,
						label : '名字' 
					},
					{
						prop : 'sex' ,
						label : '性别' 
					},
					{
						prop : 'date' ,
						label : '日期' 
					}
				]
			}
		},
		
		methods: {
			show( name = '') {
				new this.$modal( List , {
					title : name ,
					width : '90%' ,
					top : '0px' ,
					'show-close' : true ,
					props: {
						test : { a : 1 }
					}
				}, ( data ) => {
					
				})
			},
			change( value , index ){
			}
		},
		created() {
		},
		mounted() {
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
			} , 3000)
		}
	}
</script>
