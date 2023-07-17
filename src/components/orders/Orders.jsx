function Orders({currentUser, productsList}) {
    console.log(currentUser);
    const userOrders = currentUser.orders;
    const userOrdersObjs = productsList.filter((product) => {
        userOrders.includes(product._id)
    })

    return <div className="orders-main">
        <div className="orders-list-div">
            {userOrdersObjs.map((product) => {
                return <div className="order-item">
                    <img src={product.photo} alt="[Product Photo]" className="order-photo" />
                    <div className="order-details">
                        <h3>{product.title}</h3>
                        <h4>Rs.{product.price}</h4>
                        <p>Arriving in 7-8 days</p>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Orders