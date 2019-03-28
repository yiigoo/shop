<template>
	<div>

		<el-container>
			<el-aside class="layout-aside" width="120px">
				<div class="logo">
					logo
				</div>
				<el-menu 
					class="layout-menu"
					:default-active="activeIndex"
					background-color="#333547"
					text-color="#8699ad"
					active-text-color="#b4c9de"
					router="router"
					@select="handleSelect">
					<el-menu-item index="/goods"> 商品 </el-menu-item>
					<el-menu-item index="/order"> 订单 </el-menu-item>
					<el-menu-item index="/users"> 用户 </el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header class="layout-header" height="50px">
					<div class="pull-left">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>商品</el-breadcrumb-item>
							<el-breadcrumb-item>商品列表</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="pull-right">
						<el-badge :value="4" :max="9" class="notify" v-popover:notify>
							<i class="el-icon-bell"></i>
						</el-badge>
						<el-popover
							ref="notify"
							placement="bottom"
							width="220"
							trigger="click">
							<div class="layout-notify-list">
								<ul>
									<li><a href="#"> 汕头吧 , 历史悠久，文化浓厚的潮汕大地欢迎你！</a></li>
									<li><a href="#"> 汕头吧 , 历史悠久，文化浓厚的潮汕大地欢迎你！</a></li>
									<li><a href="#"> 汕头吧 , 历史悠久，文化浓厚的潮汕大地欢迎你！</a></li>
								</ul>
							</div>
						</el-popover>

						<img class="avatar" src="../assets/avatar/avatar-5.png" alt="" height="30" v-popover:avatar />
						<el-popover
							ref="avatar"
							placement="bottom"
							width="120"
							trigger="click">
							<a href="" class="text-danger">退出登录</a>
						</el-popover>
					</div>
					
				</el-header>
				<el-header class="layout-page-nav" height="30px">
					<div class="main-nav">
						<ul>
							<li class="active">商品列表</li>
							<li>商品分类</li>
							<li>优惠券</li>
						</ul>
					</div>
					<div class="pull-right layout-pager">
						页码：
						<el-input-number 
							size="small" 
							v-model="num1" 
							@change="handleChange" 
							:min="1" 
							:max="10" 
							label="描述文字">
						</el-input-number>
					</div>
				</el-header>
				<el-main class="layout-main" :style="{ height : mainHeight + 'px' }">
					
					<el-table
						:data="tableData"
						border
						style="width: 100%">
						<el-table-column
							prop="date"
							label="日期"
							>
						</el-table-column>
						<el-table-column
							prop="name"
							label="姓名"
							>
						</el-table-column>
						<el-table-column
							prop="address"
							label="地址">
						</el-table-column>
						</el-table>
					<!-- <router-view></router-view> -->
				</el-main>
			</el-container>
		</el-container>

	</div>
</template>

<script>
	
	export default {
		name: 'layout',
		data() {
			return {
				activeIndex : '/goods' ,
				mainHeight : 300 ,
				tableData : [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}]
			}
		},
		methods: {
			handleSelect( n ) {
				
			}
		},
		created() {
			console.log( this.$router )
			// $axios( 'admin/cover/img' , { params : { aid : '47059776' } }).then(( data )=>{
			// 	this.cover = data
			// }).catch( error =>{

			// })
		},
		mounted() {
			this.mainHeight = document.querySelector('html').clientHeight - 120
			window.onresize = () => {
				this.mainHeight = document.querySelector('html').clientHeight - 120
			}
		}
	}
</script>
