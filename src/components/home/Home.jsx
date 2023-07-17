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

function Home({userDetails, changeProductView, addToCart, productsList, userCart}) {
    const navigate = useNavigate();
    let [categoryFilters, setCategoryFilters] = useState([])

    if (productsList[0] == "ERROR") {
        return <>Some Error Occurred</>
    }

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
                    if (categoryFilters.length > 0 && !categoryFilters.includes(product.category)) {
                        return;
                    }
                    return <div className='product-card' onClick={(e) => {
                        if (e.target.classList.contains("add-to-cart-button")) return;
                        changeProductView(product);
                        navigate(config.productPage);
                    }}>
                        <img className='product-img' src={product.photo} height={64} alt='Product Photo' />
                        <h3 className='product-title'>{product.title}</h3>
                        <p className='product-price'>Rs. {product.price}</p>
                        <div className='lower-container'>
                            <button className={`add-to-cart-button${product.outOfStock ? " disabled" : ""}`} onClick={() => {
                                if (product.outOfStock) {
                                    return;
                                }
                                if (!userDetails._id) {
                                    alert("Please log in to add to cart");
                                    return;
                                }
                                const token = localStorage.getItem(config.localTokenKey)
                                
                                const cart = userCart;
                                cart.push(product._id);

                                axios.put(config.getBackendUrl("/update-cart"), {cart: cart}, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                .then((res) => {
                                    if (res.data.valid) {
                                        alert("Added To Cart");
                                        addToCart(product._id);
                                    }
                                })
                                .catch((err) => {
                                    alert(err.response ? err.response.data.message : "Some error occurred");
                                })
                            }}>{product.outOfStock ? "OUT OF STOCK" : "Add To Cart"}</button>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}

export default Home;