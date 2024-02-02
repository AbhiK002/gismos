import axios from 'axios';
import config from '../../config';
import './confirm.css';
import { toast } from 'react-toastify';

function Confirm({userDetails, productsList, userCart, removeFromCart}) {
    let totalPrice = 0;
    const tax = 6.8;
    let cartItems = productsList.filter((product) => {
        return (userCart.includes(product._id))
    })

    return <div className="confirm-main">
        <h1>Order Summary</h1>
        <div className="cart-items-div">
            {
                userCart.length > 0 ? 
                cartItems.map((product) => {
                        totalPrice += product.price;
                        return <div className='cart-item'>
                            <img className='cart-img' src={product.photo} height={42}/>
                            <h4 className='cart-title'>{product.title}</h4>
                            <span className='cart-price'>Rs.{product.price}</span>
                            <button className='remove-cart-item' onClick={() => {
                                removeFromCart(product._id);
                            }}>Remove</button>
                        </div>
                })
                : <div className='cart-item'>Add some items to your cart first</div>
            }
        </div>
        <h1>Amount to Pay</h1>
        <div className='payment-summary'>
            <h3>Total Amount: </h3><span className='summary-value'>Rs.{totalPrice}</span>
            <h3>Tax: </h3><span className='summary-value'>{tax}%</span>
            <h3>Grand Total: </h3><span className='summary-value' id="grand">Rs.{totalPrice + (Math.ceil(totalPrice * tax / 100))}</span>
        </div>
        <h1>Payment</h1>
            <p>Choose any of the payment options below:</p>
            
        <div className='payment-div'>
            <span className='pay-option'><input type="radio" name="pay" className='inp' />Net Banking <span></span></span>
            <span className='pay-option'><input type="radio" name="pay" className='inp' />Credit Card <input type="text" placeholder='1234-5678-9012-3456' /></span>
            <span className='pay-option'><input type="radio" name="pay" className='inp' />Debit Card <input type="text" placeholder='1234-5678-9012-3456' /></span>
            <span className='pay-option'><input type="radio" name="pay" className='inp' />UPI / PayPal <input type="text" placeholder='your@upi.id' /></span>
            <span className='pay-option'><input type="radio" name="pay" className='inp' />Wallets <span></span></span>
            <span className='pay-option'><input type="radio" name="pay" className='inp' />Cash on Delivery <span></span></span>
        </div>
        <button className='confirm-order-button' onClick={() => {
            if (userCart.length < 1) {
                toast.error("Add some items to your cart first");
                return
            }
            const inps = document.getElementsByClassName("inp");
            let aa = 0;
            for (const inp of inps) {
                if (inp.checked) aa++;
            }
            if (aa == 0) {
                toast.warning("Select at least 1 option");
                return;
            }
            
            const token = localStorage.getItem(config.localTokenKey)
            const cart = userCart;
            const orders = userDetails.orders;

            axios.put(config.getBackendUrl("/confirm-order"), {cart: cart, orders: orders}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if (res.data.valid) {
                    toast.success("Order Placed!");
                    document.location.href = config.prefix;
                }
            })
            .catch((err) => {
                toast.error(err.response ? err.response.data.message : "Some error occurred");
                document.location.href = config.prefix;
            })
        }}>CONFIRM ORDER</button>
    </div>
}

export default Confirm