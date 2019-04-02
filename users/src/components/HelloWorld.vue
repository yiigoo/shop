<template>
	<div class="hello">
		{{ currentDate }}
		<van-datetime-picker
			v-model="currentDate"
			type="year-month"
			:min-date="minDate"
			:max-date="maxDate"
			@confirm="confirm"
			/>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			minHour: 10,
			maxHour: 20,
			minDate: new Date(),
			maxDate: new Date(2019, 10, 1),
			currentDate: new Date(2019, 10, 1),
			}
		},
		methods: {
			confirm (value){
				alert( value )
			}
		}
	}
</script>
<style scoped>
</style>
