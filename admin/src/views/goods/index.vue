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
				<el-button type="primary" @click="show( column.scope.row.name )">修改</el-button>
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
			show( name = '') {
				new this.$modal( goodsDetail , {
					title : name ,
					width : '700px' ,
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
			
		}
	}
</script>
