import React from 'react';

export default class Nav extends React.Component{
    render() {
        return (
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/products/product-1.html">Product</a></li>
                <li><a href="/contact.html">Contact</a></li>
            </ul>
        );
    }
}