import React, {Component} from 'react';
import axios from 'axios';

export default class ProductList extends Component {
    
    constructor(props) {
        super(props);
        this.customerType=this.customerType.bind(this);
        this.state = {products: []}
    }

    componentDidMount() {
            let role=''
            role = localStorage.getItem('role')
            if (role === '') {
                window.location.href = "/check/user"
            }
            else if(role === 'customer') {
                window.location.href = '/check/user'
            }
        axios.get('http://localhost:4000/product/user/'+localStorage.getItem('id'))
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    customerType(val) {
        if (val ===true)
        return "customer"
        return "vendor"
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            {/* <th>Password</th> */}
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            console.log("Sartak");
                                    console.log(currentProduct);

                            return (
                                <tr>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>{currentProduct.price}</td>
                                    {/* <td>{currentUser.password}</td> */}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}