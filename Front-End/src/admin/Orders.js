import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getOrders, deleteOrder } from "./helper/adminapicall";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getOrders().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisOrder = (orderId) => {
    deleteOrder(orderId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        {orders.map((order, index) => {
          return (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{order.amount} $</h3>
              </div>
              <div className="col-4">
                <h3 className="text-white text-left">{order.status}</h3>
              </div>

              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/order/status/${order._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisOrder(order._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );

  return (
    <Base title="Welcome admin" description="Manage orders here">
      <h2 className="mb-4">All Orders:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">{myCategoryForm()}</div>
      </div>
    </Base>
  );
};

export default Orders;
