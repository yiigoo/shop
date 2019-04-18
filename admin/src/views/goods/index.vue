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
			<div slot="_opt" size="mini" slot-scope="column">
				<el-button type="primary" @click="show( column.scope.row , column.scope.$index )">修改</el-button>
			</div>

		</site-table>
		
	</div>
</template>

<script>
	import goodsDetail from './goodsDetail'
	export default {
		name: 'Goods',
		data() {
			return {
				tableData : [
					
				],
				tableColumn : [
					{
						prop : 'name' ,
						label : '名字' ,
						width : '500'
					},
					{
						prop : 'sex' ,
						label : '性别' 
					},
					{
						prop : 'date' ,
						label : '日期' 
					},
					{
						prop : '_opt' ,
						label : '操作' 
					}
				]
			}
		},
		
		methods: {
			show( item , index ) {
				new this.$modal( goodsDetail , {
					props: {
						title : item.name ,
						width : '700px' ,
						top : '120px' ,
						'show-close' : false ,
					},
					data: {
						item : item
					},
				}, ( data ) => {
					item = data
				})
			},
			change( value , index ){
			}
		},
		created() {
		},
		mounted() {
			
		}
	}
</script>
