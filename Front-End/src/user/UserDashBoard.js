import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <span className="badge badge-danger">
            User Area
            <Link to="/cart" className="nav-link text-success">
              Manage Orders
            </Link>
          </span>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to User Dashboard"
      description="Get Your Details Here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
