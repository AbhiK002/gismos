import { useEffect, useState } from 'react';
import config from '../../config';
import './home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const productCategories = [
    "Laptop", 
    "Mouse", 
    "Keyboard", 
    "Chargers", 
    "Headphones", 
    "Headsets", 
    "Earbuds", 
    "Speakers", 
    "Webcams"
]

function Home({userDetails, changeProductView, changeCart, productsList, currentCart}) {
    const navigate = useNavigate();
    let [categoryFilters, setCategoryFilters] = useState([])

    return <div className='home-main'>
        <div className='filters-menu'>
            <div className='filter-section' id="category">
                <h4>Filter by Category</h4>
                {productCategories.map((category, index) => {
                    return <div key={index} className='category-filter-item'>
                        <input type="checkbox" onChange={(e) => {
                            if (e.target.checked) {
                                setCategoryFilters([...categoryFilters, category])
                            }
                            else {
                                let list = categoryFilters.filter((cat) => {
                                    return cat != category
                                })
                                setCategoryFilters(list)
                            }
                        }} className='category-filter-checkbox' />
                        <label>{category}</label>
                    </div>
                })}
            </div>
        </div>
        <div className='home-content'>
            {
                productsList.map((product) => {
                    return <div className='product-card' onClick={() => {
                        changeProductView(product);
                        navigate(config.productPage);
                    }}>
                        <img src={product.photo} height={64} alt='Product Photo' />
                        <h3 className='product-title'>{product.title}</h3>
                        <p className='product-price'>{product.price}</p>
                        <div className='lower-container'>
                            <span>{product.outOfStock ? "OUT OF STOCK" : ""}</span>
                            <button className='add-to-cart-button' onClick={() => {
                                let userCart = currentCart;
                                userCart.push(product._id)
                                axios.put(config.getBackendUrl("/update-cart"), {cart: userCart})
                                .then((res) => {
                                    if (res.data.valid) {
                                        alert("Added To Cart");
                                        changeCart(userCart)
                                    }
                                })
                            }}>Add To Cart</button>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}

export default Home;