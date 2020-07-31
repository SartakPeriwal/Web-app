import React, {Component} from 'react';
import axios from 'axios';

export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.customerType=this.customerType.bind(this);
        this.state = {users: []}
    }

    componentDidMount() {
        let role = localStorage.getItem('role')
        // if (role === '') {
        //     window.location.href = "/check/user"
        // }
        // else if(role === 'customer') {
            // window.location.href = '/'
        // }
        axios.get('http://localhost:4000/')
             .then(response => {
                 this.setState({users: response.data});
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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            console.log("Sartak");
                                    console.log(currentUser);

                            return (
                                <tr>
                                    <td>{currentUser.username}</td>
                                    <td>{currentUser.email}</td>
                                    <td>{this.customerType(currentUser.iscustomer)}</td>
                                    <td>{currentUser.password}</td>
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