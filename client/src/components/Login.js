import React, { Component } from 'react'
import axios from 'axios';
import '../css/login.css';
import {withRouter} from 'react-router';

class Login extends Component {


    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            password: '',
            showError: false
        }
    }

    componentDidMount()
    {
        this.checkIfUserAlreadyLoggedIn();
    }

    checkIfUserAlreadyLoggedIn = async () => {
        let res = await axios.post(`${process.env.REACT_APP_URL}/login`,this.state);
        let data = window.storage;
        if(data && data != null && data.user && Object.keys(data.user).length !== 0 )
        {
            this.navigate(data.user);
        }
    }

    navigate(userData)
    {
             if(userData.is_admin == 1)
             {
                  this.props.history.push('/admin');
             }
             else
             {
                  this.props.history.push('/user');
             }
    }

    authenticateRes = (json) => {
        
        if(json.status == 200 && json.data && json.data.success == true)
        {
             this.setState({showError:false});
             let userData = {
                name: json.data.data.name,
                id: json.data.data.id,
                is_admin: json.data.data.is_admin,
                auth_token: json.data.data.auth_token,
             };
             let appState = {
                isLoggedIn: true,
                user: userData
             };
             window.storage = appState;
             this.navigate(appState.user);
        }
        else
        {
           this.setState({showError:true});
        }
    }

    

    textFieldChange = (event) => 
    {
        let name = event.target.name.trim();
        let value = event.target.value.trim();
        this.setState({[name]:value});
    }

    authenticate = async (event) =>
    {
        event.preventDefault();
        let res = await axios.post(`${process.env.REACT_APP_URL}/login`,this.state);
        this.authenticateRes(res);
    }

    render() {
        return (
         <div className="wrapper fadeInDown">
            <div className="error-msg" style={{display:!this.state.showError ? "none" : "block"}}>
                  Please Enter Valid Credentials to Proceed
            </div>
           <div className="fadeIn first">
               <h4 id="logText">LOG IN</h4>
           </div>
            <div id="formContent">
              <form>
                <input type="text" id="login" className="fadeIn second" name="name" placeholder="name" onChange={this.textFieldChange} />
                <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange={this.textFieldChange} />
                <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.authenticate} />
              </form>
          
            </div>
          </div>
        )
    }
}
export default withRouter(Login);