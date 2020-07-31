import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import ProductList from './components/product-list.component'
import CreateProduct from './components/create-product.component'
import CheckUser from './components/login'


function App() {

function onclick()
{
  localStorage.setItem('role','');
  localStorage.setItem('id','');
  window.location.reload();

}
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-primary bg-dark" >
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {/* <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li> */}
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/product/create" className="nav-link">Create Product</Link>
              </li>
              <li className="navbar-item">
                <Link to="/product/show" className="nav-link">Products</Link>
              </li>
              <li className="navbar-item">
                <Link to ="/check/user" className="nav-link">Login</Link>
              </li>
              <li className="navbar-item">
                <button className="btn btn-danger"  onClick={ (e) => onclick()}>Logout</button>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        {/* <Route path="/" exact component={UsersList}/> */}
        <Route path="/create" component={CreateUser}/>
        <Route path="/product/create" component={CreateProduct}/>
        <Route path="/product/show" component={ProductList}/>
        <Route path="/check/user" component={CheckUser}/>
      </div>
    </Router>
  );
}

export default App;
