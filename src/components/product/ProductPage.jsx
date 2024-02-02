import { useNavigate } from 'react-router-dom';
import './product-page.css';
import config from '../../config';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProductPage({userDetails, currentProduct, addToCart, userCart}) {
    const navigate = useNavigate();
    
    let viewedProduct = currentProduct;
    
    useEffect(() => {
        if(!currentProduct._id) {
            document.location.href = config.prefix;
            return;
        }
    }, [])

    return <div className="product-view">
        <div className="product-image-div">
            <div className='product-image-container' onMouseMove={(e) => {
                    const img = document.getElementsByClassName("product-image")[0];
                    const rect = document.getElementsByClassName("product-image-div")[0].getBoundingClientRect();

                    let [mouseX, mouseY] = [e.clientX - rect.left, e.clientY - rect.top - 200];

                    img.style.setProperty("--client-x", `${mouseX}px`);
                    img.style.setProperty("--client-y", `${mouseY}px`);
                }}>
                <img className="product-image" src={viewedProduct.photo} width={500} />
            </div>
        </div>
        <div className="product-details-div">
            <div className="product-details-container">
                <h1>{viewedProduct.title}</h1>
                <h3>{viewedProduct.description}</h3>
                <h2 id="price">Rs.{viewedProduct.price}</h2>
                <div className="buttons">
                    <button className={`add-to-cart-button${viewedProduct.outOfStock ? " disabled" : ""}`} onClick={() => {
                        if (viewedProduct.outOfStock) {
                            return;
                        }
                        if (!userDetails._id) {
                            document.getElementById("cart-view").classList.remove("visible") 
                            toast.warning("Please log in to add to cart");
                            navigate(config.loginPage);
                            return;
                        }
                        if (userCart.includes(viewedProduct._id)) {
                            toast.error("Product already added to cart");
                            return;
                        }
                        const token = localStorage.getItem(config.localTokenKey)
                        const cart = [...userCart, viewedProduct._id];

                        axios.put(config.getBackendUrl("/update-cart"), {cart: cart}, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then((res) => {
                            if (res.data.valid) {
                                toast.success("Added To Cart");
                                addToCart(viewedProduct._id);
                            }
                        })
                        .catch((err) => {
                            toast.error(err.response ? err.response.data.message : "Some error occurred");
                        })
                    }}>{viewedProduct.outOfStock ? "OUT OF STOCK" : "Add To Cart"}</button>
                    <button className="back-home-button secondary" onClick={() => {
                        document.location.href = config.prefix
                    }}>Go to Homepage</button>
                </div>
            </div>
        </div>
    </div>
}

export default ProductPage