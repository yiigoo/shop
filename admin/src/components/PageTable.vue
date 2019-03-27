<template>
	<div>
		<div class="search-bar run-search-bar" style="background:none;" v-show="!searchBarHide">
			<div>
				<slot name="handle-bar"></slot>
			</div>
			<div>
				<slot name="search-bar"></slot>
			</div>
		</div>
		<div class="single-table-con">
			<div class="table-bar" v-show="!tableBarHide">
				<slot name="table-bar"></slot>
			</div>
			<Table size="small" ref="table" :loading="loading" @on-current-change="onCurrentChange" :highlight-row="highlightRow" :data="tableData" :columns="tableColumns" @on-selection-change="selectionChange" @on-sort-change="sortHandle" @on-row-click="rowClickHandle"
			    @on-row-dblclick="rowDbclickHandle" stripe></Table>
			<div style="margin: 10px;overflow: hidden" v-if="isPage">
				<div class="text-center">
					<Page transfer :placement="placement" :show-elevator="showElevator" :total="total" :show-total="showTotal" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" :page-size="param.commonPageDTO.pageSize" :current="param.commonPageDTO.currentPage" @on-change="changePage"
					    size="small" @on-page-size-change="changePageSize"></Page>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>

</style>
<script>
	export default {
		name: "PageTable",
		components: {},
		props: {
			resource: {
				type: Array,
				default () {
					return [];
				}
			},
			highlightRow: {
				type: Boolean,
				default () {
					return false;
				}
			},
			action: {
				type: String,
				default () {
					return "";
				}
			},
			columns: {
				type: Array,
				default () {
					return [];
				}
			},
			columnsFn: {
				type: Function
			},
			initParam: {
				type: Object,
				default () {
					return {};
				}
			},
			autoFirst: {
				type: Boolean,
				default () {
					return true;
				}
			},
			pageSize: {
				type: Number,
				default () {
					return 10;
				}
			},
			showTotal: {
				type: Boolean,
				default () {
					return true;
				}
			},
			showSizer: {
				type: Boolean,
				default () {
					return true;
				}
			},
			pageSizeOpts: {
				type: Array,
				default () {
					return [10, 20, 50, 100];
				}
			},
			isPage: {
				type: Boolean,
				default () {
					return true;
				}
			},
			onSelectionChange: {
				type: Function
			},
			rowClickHandle: {
				type: Function,
			},
			rowDbclickHandle: {
				type: Function,
			},
			showElevator: {
				type: Boolean,
				default () {
					return true;
				}
			},
			// 拓展回调请求完成后回调事件
			loadReady: {
				type: Function
			},
			// 拓展是否显示searchbar
			searchBarHide: {
				type: Boolean,
				default () {
					return false
				}
			},
			// 拓展是否显示tablebar
			tableBarHide: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		data() {
			return {
				tableData: [],
				tableColumns: [],
				total: 0,
				currentPage: 1,
				selection: [],
				loading: false,
				param: {
					commonPageDTO: {
						currentPage: 1,
						pageSize: this.pageSize
					},
					sortDTO: {
						fieldName: "",
						orderBy: ""
					}
				},
				messageJob: undefined,
				isSelectionChange: false,
				currentRow: undefined
			};
		},
		computed: {
			placement() {
				let pageTotal = 0;
				if (this.total % this.pageSize == 0) {
					pageTotal = this.total / this.pageSize;
				} else {
					pageTotal = this.total / this.pageSize + 1;
				}
				pageTotal = parseInt(pageTotal);
				return this.total % this.pageSize < 3 && this.currentPage == pageTotal ?
					"bottom" :
					"top";
			},
			lang() {
				return $store.state.lang;
			}
		},
		created: function() {
			if (!!this.action && this.autoFirst) {
				this.load(this.initParam);
			} else {
				this.loadLocal();
			}
			for (let c of this.columns) {
				if (!~"selection".indexOf(c.type)) {
					c.ellipsis = true;
				}
			}
			this.getColumns();
		},
		beforeMount: function() {},
		mounted: function() {},
		beforeDestroy: function() {},
		destroyed: function() {},
		methods: {
			onCurrentChange(currentRow, oldCurrentRow) {
				this.currentRow = Object.assign({}, currentRow);
			},
			getHighlightRow() {
				return this.currentRow;
			},
			getColumns() {
				if (typeof this.columnsFn == "function") {
					this.tableColumns = [].concat(this.columnsFn());
				} else {
					this.tableColumns = [].concat(this.columns);
				}
			},
			refresh() {
				this.param.commonPageDTO.currentPage = 1;
				this.$nextTick(() => {
					this.load();
				});
			},
			load(param = {}, page) {
				this.selection = [];
				for (let p in param) {
					this.param[p] = param[p];
				}
				this.loading = true;
				if (!!page && typeof page == "number") {
					this.param.commonPageDTO.currentPage = page;
				}
				this.param.commonPageDTO.recordCount = this.total;
				!!this.action ? this.loadAjax() : this.loadLocal();
			},
			loadLocal() {
				if (!this.isPage) {
					this.$nextTick(() => {
						this.tableData = [].concat(this.resource);
						this.loading = false;
					});
					return;
				}
				this.total = this.resource.length;
				let start =
					(this.param.commonPageDTO.currentPage - 1) *
					this.param.commonPageDTO.pageSize;
				let end = start + this.param.commonPageDTO.pageSize;
				end = this.resource.length > end ? end : this.resource.length;
				this.tableData = [];
				for (let i = start; i < end; i++) {
					this.tableData.push(this.resource[i]);
				}
				this.$nextTick(() => {
					this.loading = false;
				});
			},
			loadAjax() {
				$store.dispatch(this.action, this.param).then(res => {
					this.loading = false;
					if (!res) return;
					this.currentPage = res.currentPage;
					this.total = res.recordCount;
					this.tableData = [];
					let _list = [];
					for (let item of res.recordList) {
						this.tableData.push(item);
						_list.push(item.userName);
					}
					this.loadReady && this.loadReady(res)
				});
			},
			changePage(page) {
				this.param.commonPageDTO.currentPage = page;
				this.load();
			},
			changePageSize(page) {
				this.param.commonPageDTO.pageSize = page;
				this.load();
			},
			selectionChange(selection) {
				this.isSelectionChange = true;
				this.selection = selection;
				if (typeof this.onSelectionChange == "function") {
					this.onSelectionChange(selection);
				}
			},
			getSelectioned() {
				return this.isSelectionChange ? this.selection : undefined;
			},
			sortHandle(obj) {
				this.param.sortDTO.fieldName = obj.key;
				this.param.sortDTO.orderBy = obj.order;
				if (this.param.sortDTO.orderBy == "normal") {
					this.param.sortDTO = {
						fieldName: "",
						orderBy: ""
					};
				}
				this.refresh();
			},
			getSortData() {
				return this.param.sortDTO;
			},
			getTableObj() {
				return this.$refs["table"];
			},
			// 重新设置列
			setColumns(tableColumns) {
				this.tableColumns = tableColumns
			}
		},
		watch: {
			lang() {
				this.getColumns();
			},
			resource(newVal, oldVal) {
				this.resource = newVal;
			}
		},
		directives: {}
	};
</script>
