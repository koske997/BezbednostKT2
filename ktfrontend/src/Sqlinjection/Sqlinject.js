import React from 'react';
import {updateObject} from '../utility';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';
import Navbar from '../Navbar/Navbar';

class Sqlinject extends React.PureComponent {
    state = {
        auth: {
            email: ''
        },
        validation: {
            email: true
        }
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

    loginHandler = (event) => {
        event.preventDefault();
        if(this.state.validation.email && this.state.validation.password)
            this.props.onLogin(this.state.auth.email, this.state.auth.password);
    }

    render() {
        return (
            <div className="container_1">
            <Navbar />
                <div className="container-content">
                    <h3>Search users by email</h3>
                    <div className="login">
                        <div className="box">
                            <label>Email</label>
                            <input type="email" placeholder="Email" 
                            onChange={(event) => this.inputChangdeHandler(event, 'email')}
                            />
                        </div>
                        
                    <a href="/" className="btn_1" onClick={(event) => {this.loginHandler(event); } }>Search</a>
                        
                    </div>
                    {/* <div className="invalid_1">
                        {(!this.state.validation.email || !this.state.validation.password) ? 
                            <p>Enter all fields</p> : null}
                    </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Sqlinject);