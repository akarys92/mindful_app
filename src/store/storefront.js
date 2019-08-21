import React, { Component } from 'react';
import ItemCard from './item_card';
import Cart from './cart';
import './store.css'
import items from '../assets/items';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons'

/*** 
 * Store Front - 
 * Manages the commerce platform. The lifecycle of the storefront is: 
 *  1) Load the items from items.json
 *  2) Generate item cards for each
 *  3) Orchestrate sending items to the cart when they are purchased
 * ****/

export default class StoreFront extends Component { 
    constructor(props){
        super(props);
        this.state = {
            in_cart: [], 
            cart_open: false
        };
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.toggleCart = this.toggleCart.bind(this);
    }

    addToCart(new_item) {
        this.setState( { in_cart : [...this.state.in_cart, new_item]});
    }

    removeFromCart(id, size) {
        let new_cart = [];
        for(let i in this.state.in_cart) {
            let item = this.state.in_cart[i];
            if(id === item.item_key && size === item.size) {
                
            }
            else {
                new_cart.push( item );
            }
        }

        this.setState({ in_cart : new_cart });
    }

    toggleCart() {
        let currState = this.state.cart_open;
        this.setState({ cart_open: !currState });
    }

    generateItemCards() {
        let cards = items.map((item, index)=>{
            return (
               <ItemCard 
                   src_img={item.images} 
                   title={item.title}
                   price={item.price}
                   sizes={item.sizes}
                   item_key={item.key}
                   addToCart={ this.addToCart }
                   key={index}
               />
           );
       });
       return cards;
    }

    render() {
        let item_cards = this.generateItemCards();

        let currBody = this.state.cart_open ? 
                <section className="products"><Cart items={this.state.in_cart} remove={this.removeFromCart}/> </section>: 
                <section className="products">{item_cards}</section>

        return (
            <div className="store">
                <div className="store-header">
                    <div className="title-box">
                        <h1>Marketplace:</h1>
                    </div>
                    <div className="cart-box" onClick={this.toggleCart}>
                        {!this.state.cart_open ? (
                            <p><FontAwesomeIcon icon={faShoppingCart} /> ({this.state.in_cart.length})</p>
                        ) : (
                            <FontAwesomeIcon icon={faTimes} />
                        ) }
                        
                    </div>
                </div>
                    {currBody}
            </div>
            
        );
    }
}