import React from 'react';
import {updateObject} from '../utility';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';
import Navbar from '../Navbar/Navbar';
import axios from '../axios-objects';


class ReflectedXss extends React.PureComponent {
    state = {
        auth: {
            email: ''
        },
        validation: {
            email: true
        },
        email: ''
    }

    inputChangdeHandler = (event, type) => {
        let auth = updateObject(this.state.auth, {
        [type]: event.target.value
    });
        this.setState({auth});

        if(event.target.value.length === 0) {
            let validation = updateObject(this.state.validation, {
                [type]: false
            });
            this.setState({validation});
        } else {
            let validation = updateObject(this.state.validation, {
                [type]: true
            });
            this.setState({validation});
        }
    }

    loginHandler = async(event) => {
        event.preventDefault();
        const {email} = this.state.auth;
        const emaill = {email};
        console.log(emaill);
        
        try {
            const response = await axios.post('/search', emaill);
            if (response) {
                this.setState({firstName: response.data.firstName, lastName: response.data.lastName, email: response.data.email})
            }
        } catch(err) {
            console.log(err);
        }
    
    }

    renderrr(tekst){
        return (
            <div>
             {tekst}   
            </div>    
        );
    }

    render() {
        return (
            <div className="container_1">
            <Navbar />
                <div className="container-content">
                    <h3>Try executing simple script</h3>
                    <div className="login">
                        <div className="box">
                            <label>Email</label>
                            <input type="email" placeholder="Enter script" 
                            onChange={(event) => this.setState({email: event.target.value})}
                            />
                        </div>
                        
                    <a href="/" className="btn_1" onClick={(event) => {this.loginHandler(event); } }>Execute</a>
                        
                    </div>
                    <div className="car-card">
                        <h3>User</h3>
                        <div className="car-card-inner">
                            {this.renderrr(this.state.email)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        loginn: state.auth.loginn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReflectedXss);