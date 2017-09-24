var PRICE = 9.99;
var LOAD_NUM = 5;

new Vue({
	el: '#app',
	data: {
		total: 0,
		result: [],
		items: [],
		cart: [],
		newSearch: 'anime',
		lastSearch: '',
		loading: false,
		price: PRICE
	},
	computed:{
		noMoreItems: function(){
			return this.items.length === this.result.length & this.result.length > 0;
		}
	},
	methods:{
		addItem:function(index){
			this.total += PRICE;
			var item = this.items[index];
			var found = false;

			for(var i=0; i< this.cart.length; i++){
				if(this.cart[i].id === item.id){
					found = true;
					this.cart[i].qty++;
					break;
				}

			}

			if(!found){
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: PRICE
				});
			}
		},
		inc: function(item){
			this.total += PRICE;
			item.qty ++;
		},
		dec: function(item){
			this.total -= PRICE;
			item.qty --;

			if(item.qty <= 0){
				for(var i=0; i< this.cart.length; i++){
					if(this.cart[i].id === item.id){
						this.cart.splice(i, 1);
						break;
					}
				}
			}
		},
		onSubmit: function(){
			if(this.newSearch.length){
				this.items = [];
				this.lastSearch = '';
				this.loading = true;
				this.$http
					.get('/search/'.concat(this.newSearch))
					.then(function(response){
						this.loading = false;
						this.result = response.data;
						this.lastSearch = this.newSearch;
						this.items = response.data.slice(0, LOAD_NUM);
					});
			}
		},
		appendItems: function(){
			if(this.items.length < this.result.length){
				var append = this.result.slice(this.items.length, this.items.length + LOAD_NUM);
				this.items = this.items.concat(append);
			}
		}
	},
	filters: {
		currency: function(price){
			return '$'.concat(price.toFixed(2));
		}
	},
	mounted: function(){
		this.onSubmit();

		var elem = document.getElementById('product-list-bottom');
		var vueInstance = this;
		var watcher = scrollMonitor.create(elem);
		watcher.enterViewport(function(){
			vueInstance.appendItems();
		});
	}
});
