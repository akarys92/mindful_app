import React, { Component } from 'react';
import './cart.css';
/*** 
 * Cart - 
 * Responsible for checkout of items. Lifecycle of cart: 
 *  1) Display all items currently in cart with total cost
 *  2) Provide option to remove or change quantity of any items
 *  3) On checkout clicked, take shipping information, credit card information
 *  4) Send to Kite
 * ****/
export default class Cart extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            manifest: [], 
            email: "",
            shipping_address: "", 
            card: "",
            first_name: "",
            last_name: ""
        }
        this.updateManifest = this.updateManifest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    updateManifest() {
        // Need to update this track quantity better

        let manifest = this.props.items.map((item)=>{
            let key_size = item.item_key + item.size;
            return {
                key_size: key_size,
                item_key: item.item_key,
                size: item.size,
                price: item.price,
                quantity: 1
            };
        });
        
        this.setState( { manifest: manifest });
    }

    handleChange(event) {
        this.setState(event);
    }

    checkout() {
         let order = {
             "shipping": {
                 "first_name": this.state.first_name,
                 "last_name": this.state.last_name,
                 "email": this.state.email,
                 "shipping_address": this.state.shipping_address
             },
             "billing": {
                 "billing_address": this.state.billing_address,
                 "card": this.state.card
             },
             "items": this.props.items
         };
        
        console.log(order);
    }

    generateItemTable() {
        let items = this.props.items.map((item, key)=> {
            return (
                <tr key={key}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.size}</td>
                    <td>1</td>
                    <td onClick={()=>{this.props.remove(item.item_key, item.size)}}>X</td>
                </tr>
            );
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Remove?</th>
                    </tr>
                </thead>
                    <tbody>
                    { items }
                    </tbody>
            </table>);
    }

    render() {
        
        let itemTable = this.generateItemTable();

        return (
            <div className="cart">
                <div className="cartSection">
                    <h2>Shipping </h2>
                    <div className="cart-form">
                        <div>
                            <label>Email</label>
                            <input type="text" value={this.state.email} onChange={(event)=>{this.handleChange({ "email": event.target.value })}}></input>
                        </div>
                        <div>
                            <label>First Name</label>
                            <input type="text" value={this.state.first_name} onChange={(event)=>{this.handleChange({ "first_name": event.target.value })}}></input>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text" value={this.state.first_name} onChange={(event)=>{this.handleChange({ "last_name": event.target.value })}}></input>
                        </div>
                        <div>
                            <label>Shipping Address</label>
                            <input type="text" value={this.state.shipping_address} onChange={(event)=>{this.handleChange({ "shipping_address": event.target.value })}}></input>
                        </div>
                    </div>
                </div>

                <div className="cartSection">
                    <h2>Billing </h2>
                    <div className="cart-form">
                        <div>
                            <label>First Name</label>
                            <input type="text" value={this.state.first_name} onChange={(event)=>{this.handleChange({ "first_name": event.target.value })}}></input>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text" value={this.state.first_name} onChange={(event)=>{this.handleChange({ "last_name": event.target.value })}}></input>
                        </div>
                        <div>
                            <label>Billing Address</label>
                            <input type="text" value={this.state.billing_address} onChange={(event)=>{this.handleChange({ "billing_address": event.target.value })}}></input>
                        </div>
                        <div>
                            <label>Credit Card</label>
                            <input type="text" value={this.state.card} onChange={(event)=>{this.handleChange({ "card": event.target.value })}}></input>
                        </div>
                    </div>
                </div>

                <div className="cartSection">
                    <h2>Items </h2>
                    { itemTable }
                </div>
                
                <div className="cartSection">
                    <h2>Summary: </h2>
                    <div className="cart-form">
                        <button onClick={this.checkout}>Checkout</button>
                    </div>
                </div>
            </div>
        );
    }
}