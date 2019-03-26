<template>
	<div>

		<el-container>

			<el-header>Header</el-header>

			<el-container>

				<el-aside width="200px">
					<el-menu 
						:default-active="activeIndex"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b"
						class="el-menu-demo" 
						router="router"
						@select="handleSelect">
						<el-menu-item index="/goods">　xx　</el-menu-item>
						<el-menu-item index="/users">　xx2　</el-menu-item>
					</el-menu>
				</el-aside>

				<el-container>
					<el-main><router-view></router-view></el-main>
					<el-footer>copyright @2019</el-footer>
				</el-container>

			</el-container>
		</el-container>
	</div>
</template>

<script>
	
	export default {
		name: 'layout',
		data() {
			return {
				activeIndex : '/goods'
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
		}
	}
</script>
