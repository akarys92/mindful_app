import React, { Component } from 'react';
import './item_cards.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

/*** 
 * Item Card - 
 * Responsible for displaying item information and taking orders for a single item. 
 * Item card lifecycle: 
 *  1) Load associated image and information
 *  2) On Hover show sizing information
 *  3) On size selected keep sizing information
 *  4) On 'Add to Cart' send current configuration back to storefronta
 *  
 * ****/

export default class ItemCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            sizes: []
        }

        this.sizeSelected = this.sizeSelected.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        
    }

    sizeSelected(index) {
        this.setState( { selectedSize : index });
    }

    resize() {
        let isMobile = window.innerWidth < 650;
        this.setState({'is_mobile' : isMobile});
    }

    addToCart() {
        if(this.props.sizes.length === 0 || this.state.selectedSize != null) {
            this.props.addToCart({
                title: this.props.title,
                item_key: this.props.item_key, 
                price: this.props.price,
                size: this.state.selectedSize
            });
        }
    }

    getSizePicker() {
        const isMobile = this.state.is_mobile;

        if(isMobile) {
            let dropdown = <Dropdown className="size-select-drop" options={this.props.sizes} onChange={(s)=> {this.sizeSelected(s.value) }} value={this.state.selectedSize} placeholder="Size" />
            return dropdown;
        }

        else {
            let picker = this.props.sizes.map( (key, index)=>{
                let is_curr = this.state.selectedSize === key ? { background: "#fbce0a", color: "white" } : { background: "white", color: "black" };
                return (<a 
                    onClick={ ()=>{this.sizeSelected(key)} } 
                    style = { is_curr }
                    key= {index }
                    >{key}
                </a>);
            });
            let result = <div><p>Sizes:</p>{picker}</div> 
            return picker;
        }
    }
 
    render() {
        let source_img = this.props.src_img[0]; 
        let title = this.props.title;
        let price = this.props.price;
        let size_picker = this.getSizePicker();
        let has_size = this.props.sizes.length > 0 ?  
            this.getSizePicker() : <div></div>;   
        let add_to_cart = (this.props.sizes.length === 0 || this.state.selectedSize != null) ?
            "ADD TO CART" : "SELECT SIZE";
            //<h6>Sizes: </h6> : <h6></h6>;

        return (
            <div className="product-card">
                <div className="product-image">
                    <img src={source_img}  />
                </div>
                <div className="product-info">
                    <h5>{title}</h5>
                    <h6>${price}</h6>
                </div>
                <div className="order-options">
                    <div className="size-picker">
                        {has_size}
                    </div>
                    <div onClick={this.addToCart} className="add-cart">
                        {add_to_cart}
                    </div>
                </div>
            </div>
        );
    }
 }