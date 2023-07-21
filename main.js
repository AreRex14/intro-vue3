const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true,
            // quantity_temp: 0,
        }
    },
    methods: {
        updateCart(item) {
            // this.quantity_temp = item.quantity
            if (item.quantity == 1) {
                this.cart.push(item.id)
                // not working to reduce quantity
                // item.quantity -= 1
                this.quantity_temp -= 1
                // this.inventory -= 1
            }
            else {
                this.cart.push(item.id)
                // not working to reduce quantity
                // item.quantity -= 1
                // this.quantity_temp = item.quantity
                // this.quantity_temp -= 1
                // this.inventory -= 1
            }
        },

        removeCart(item) {
            // this.quantity_temp = item.quantity
            if (this.cart.length >= 1) {
                this.cart.pop(item.id)
                // not working to readd quantity
                // item.quantity += 1
                // this.quantity_temp += 1
            }
        }
    },

})