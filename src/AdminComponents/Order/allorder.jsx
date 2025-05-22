import React, { useEffect, useState } from "react";
import "../../adminCss/order/allorder.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import UpdateOrderPopup from "./updateorder";
import Loader from "../../components/loader/loader";

function AllOrder() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-all-second-order?status=${status}`, "GET");
      setOrders(response.data.Orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setSelectedStatus(newStatus);
  };

  const handleOpenPopup = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setSelectedOrderId(null);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(number);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'orange';
      case 'Shipped': return 'blue';
      case 'Delivered': return 'green';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="all-orders-container">
      <h1 className="dashboard-title">Order Management</h1>
      
      <div className="all_orders_status_buttons">
        <button
          className={`admin_add_product_button ${selectedStatus === "" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("")}
        >
          All Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Pending" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Pending")}
        >
          Pending Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Shipped" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Shipped")}
        >
          Shipped Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Delivered" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Delivered")}
        >
          Delivered Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Cancelled" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Cancelled")}
        >
          Cancelled Orders
        </button>
      </div>

      <div className="order-list">
        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <div className="no-orders-found">
            <img 
              src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif" 
              alt="No orders found" 
              className="no-orders-image"
            />
            <p>No orders found for the selected status</p>
          </div>
        ) : (
          <div className="main_order_list_container">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order_list_container">
                  <div className="order-products-section">
                    <h3>Products</h3>
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="order_item_details">
                        <img 
                          loading="lazy" 
                          src={item.product?.thumbnail} 
                          alt={item.product?.name} 
                          className="all_order_thumbnail" 
                        />
                        <div className="product-info">
                          <p><b>Name:</b> {item.product?.name}</p>
                          <p><b>Price:</b> {formatNumber(item.singleProductPrice)}</p>
                          <p><b>Qty:</b> {item.quantity}</p>
                          <p><b>Total:</b> {formatNumber(item.totalPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order_details all_order_details">
                    <h3>Order Info</h3>
                    <div><b>Order ID:</b> {order._id}</div>
                    <div data-status={order.status}>
                      <b>Status:</b> {order.status}
                    </div>
                    <div><b>Total:</b> {formatNumber(order.totalPrice)}</div>
                  </div>

                  <div className="all_order_shippingAddress all_order_details">
                    <h3>Shipping Address</h3>
                    <div><b>Name:</b> {order.shippingAddress?.fullName}</div>
                    <div><b>Phone:</b> {order.shippingAddress?.phoneNumber}</div>
                    <div><b>Address:</b> {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</div>
                  </div>

                  <div className="all_order_other_details all_order_details">
                    <h3>Payment & Date</h3>
                    <div><b>Method:</b> {order.paymentMethod}</div>
                    <div><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</div>
                    <div><b>Time:</b> {new Date(order.createdAt).toLocaleTimeString()}</div>
                  </div>
                </div>

                <div className="all_order_buttons_div">
                  <Link 
                    to={`/admin/order/${order._id}`} 
                    className="all_order_order_view_button"
                  >
                    View Details
                  </Link>
                  <button 
                    className="all_order_order_update_button" 
                    onClick={() => handleOpenPopup(order._id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOrderId && (
        <UpdateOrderPopup 
          orderId={selectedOrderId} 
          onClose={handleClose} 
          onUpdate={fetchOrders}
        />
      )}
    </div>
  );
}

export default AllOrder;