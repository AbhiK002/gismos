import config from "../../config";
import './orders.css'

function Orders({currentUser, productsList}) {
    if (currentUser._id == null) {
        document.location.href = config.prefix;
        return;
    }

    const userOrders = currentUser.orders;
    const userOrdersObjs = productsList.filter((product) => {
        return userOrders.includes(product._id)
    })

    return <div className="orders-main">
        <div className="orders-list-div">
            <h1>My Orders</h1>
            {userOrdersObjs.map((product) => {
                return <div className="order-item">
                    <img src={product.photo} alt="[Product Photo]" className="order-photo" />
                    <div className="order-details">
                        <h2>{product.title}</h2>
                        <h3>Rs.{product.price}</h3>
                        <p>Arriving in 7-8 days</p>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Orders