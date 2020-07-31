import React, {Component} from 'react';
import axios from 'axios';

export default class CheckUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            iscustomer: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChoice=this.onChoice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChoice(val) {
        console.log((val) ? "customer" : "vendor");
        this.setState({ iscustomer: val});
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log("check1");
        // console.log(this.state.iscustomer);
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            iscustomer: this.state.iscustomer

        }

        axios.post('http://localhost:4000/check/user', newUser)
             .then(res => {
                let role = '';                 
                if(res.data.authenticated) {
                    console.log(res.data)
                     alert('Login Successful!')
                     role = (newUser.iscustomer) ? "customer" : "vendor";
                     localStorage.setItem('id',res.data.id);
                }
                else {
                    alert("Login failed!");
                }
                localStorage.setItem('role', role);
             });

        this.setState({
            username: '',
            email: '',
            password: '',
            iscustomer: '',

        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="radio"
                                name="user"
                                className="form-control"
                                value = {true}
                                onClick={(e) => this.onChoice(true)}
                                />
                            Customer
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="radio"
                                name="user"
                                className="form-control"
                                value={false}
                                onClick={(e) => this.onChoice(false)}
                                />
                            Vendor
                        </label>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Check User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}