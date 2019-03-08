<template>
    <div id="app">
        <Simple />
    </div>
</template>

<script>
	import Simple from './components/Map.vue';

	export default {
		name: 'app',
		components: {
			Simple
		},
		mounted() {
			setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);
		}
	}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
