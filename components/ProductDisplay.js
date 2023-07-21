app.component('product-display', {
    template:
        /*html*/
        `<div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <a v-bind:href="url"><img v-bind:src="image" :class="{ 'out-of-stock-img' : inStock == 0}"
                            v-bind:alt="description"></a>
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p v-if="inStock > 10">In Stock</p>
                    <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out</p>
                    <p v-else>Out of Stock</p>
                    <p>{{ sale }}</p>
                    <product-details :details="details"></product-details>
                    <div>
                        <b>Available Variants:</b>
                        <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
                            class="color-circle" :style="{ 'background-color': variant.color }"></div>
                    </div>
                    <div>
                        <b>Available Sizes:</b>
                        <div v-for="size in sizes">{{size}}</div>
                    </div>
                    <p>Shipping: {{ shipping }} </p>
                    <button class="button" :class="{ disabledButton: inStock == 0 }" v-on:click="addToCart"
                        :disabled="inStock == 0 || !onSale">Add to Cart</button>
                    <button class="button" :disabled="!onSale" @click="removeFromCart">Remove Item</button>
                </div>
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>`,

    emits: ['add-to-cart', 'remove-from-cart'],

    props: {
        premium: {
            type: Boolean,
            required: true
        },
        // quantity_temp: {
        //     type: Number,
        //     required: true
        // }
    },
    data() {
        return {
            product: 'Sandals',
            brand: 'Vue Mastery',
            description: 'A pair of elegant Christmas sandals',
            selectedVariant: 0,
            url: 'https://www.amazon.com/blue-socks/s?k=blue+socks',
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 10 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', {
                'id': this.variants[this.selectedVariant].id,
                'quantity': this.variants[this.selectedVariant].quantity
            })

        },
        removeFromCart() {
            this.$emit('remove-from-cart', {
                'id': this.variants[this.selectedVariant].id,
                'quantity': this.variants[this.selectedVariant].quantity
            })
        },
        updateVariant(index) {
            this.selectedVariant = index
            console.log(index)
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' ' + 'is on sale.'
            }
            return this.brand + ' ' + this.product + ' ' + 'is not on sale.'
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
})