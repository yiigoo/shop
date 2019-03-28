<template>
	<div>
		<div @click="show">1111</div>
		
	</div>
</template>

<script>
	import List from './list'
	export default {
		name: 'Goods',
		data() {
			return {
				
			}
		},
		
		methods: {
			show() {
				new this.$modal( List , {
					title : '新建会议室2' ,
					width : '90%' ,
					top : '0px' ,
					'show-close' : true ,
					props: {
						test : { a : 1 }
					}
				}, ( data ) => {
					
				})
			}
		},
		created() {
		}
	}
</script>
