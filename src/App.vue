<script>
import AppSidebar from './components/AppSidebar.vue';

export default {
	components: {
		AppSidebar
	}
};
</script>

<template>
	<div class="app">
		<div class="container py-3">
			<div class="row">
				<div class="col-3">
					<app-sidebar></app-sidebar>
				</div>
				<div class="col-9">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	body {
		background-color: #f4f6f9;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
		color: #333333;
	}

	.card {
		border: 1px solid #e3e6f0 !important;
		border-radius: 8px !important;
		background-color: #ffffff;
	}

	.form-control, .form-select {
		border: 1px solid #d1d3e2 !important;
		border-radius: 6px !important;
		padding: 10px 12px;
	}

	.form-control:focus, .form-select:focus {
		border-color: #4e73df !important;
		box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.2) !important;
	}

	.btn {
		border-radius: 6px !important;
		font-weight: 500;
	}

	.btn-link {
		font-size: 14px;
	}
</style>