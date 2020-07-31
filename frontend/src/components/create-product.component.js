import React, {Component} from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            quantity: '',
            price: '',
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        // this.onChoice=this.onChoice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeQuantity(event) {
        this.setState({ quantity: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }

    // onChoice(event) {
    //     this.setState({ iscustomer: event.target.value});
    // }
    componentDidMount() {
        
        let role = localStorage.getItem('role')
        if (role === '') {
            window.location.href = "/check/user"
        }
        else if(role === 'customer') {
            window.location.href = '/check/user'
        }
    }
    onSubmit(e) {
        e.preventDefault();
        // console.log("Check");
        // console.log(this.state.iscustomer);
        const newProduct = {
            name: this.state.name,
            quantity: this.state.quantity,
            price: this.state.price,
            vendorid: localStorage.getItem("id")
            // iscustomer: this.state.iscustomer

        }

        axios.post('http://localhost:4000/product/add', newProduct)
             .then(res => console.log(res.data));

        this.setState({
            name: '',
            quantity: '',
            price: '',
            // iscustomer: '',

        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.quantity}
                               onChange={this.onChangeQuantity}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    {/* <div className="form-group">
                        <label check>
                            <input
                                type="radio"
                                name="user"
                                className="form-control"
                                value = {true}
                                onChange={this.onChoice}
                                />
                            Customer
                        </label>
                    </div>
                    <div className="form-group">
                        <label check>
                            <input
                                type="radio"
                                name="user"
                                className="form-control"
                                value={false}
                                onChange={this.onChoice}
                                />
                            Vendor
                        </label>
                    </div> */}

                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}