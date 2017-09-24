new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [{ title: 'prueba 1'}, { title: 'prueba 2'}, { title: 'prueba 3'}],
	},
	methods:{
		addItem:function(){
			this.total += 9.99;
		}
	}
});
